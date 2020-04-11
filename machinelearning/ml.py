#!/usr/bin/env python3
import os
from pylab import *
import pandas as pd

from pandas.tools.plotting import table  # EDIT: see deprecation warnings below
import cytoflow as flow
import requests
# if your figures are too big or too small, you can scale them by changing matplotlib's DPI
import matplotlib

STATIC_DIR = os.path.realpath('/shared/static/')
SHARED_PLOT_DIR = os.path.realpath('/shared/machinelearning/')
SHARED_RAW_DIR = os.path.realpath('/shared/raw/cell/')

BIN_WIDTH = 100
CSV_FILE = 'fcs_file.csv'
# FCS_FILE = 'RFP_Well_A3.fcs'
FCS_FILE = 'a1_24h_noc200.fcs'
FCS_FILE_A4 = 'cfp_well_a4.fcs'
ECOLI_FILE = 'ecoli.fcs'


class MachineLearning:
    def __init__(self, file_id):
        fcs_file_name = file_id + '_fcs_file.fcs'
        self.file_id = file_id
        self.response = {}
        # Locate sample data included with this package
        print('Raw dir in init :', SHARED_RAW_DIR)
        fcs_file_path = os.path.join(SHARED_RAW_DIR, fcs_file_name)
        print('FCS File', fcs_file_path)
        fcs_file_a4_path = os.path.join(SHARED_RAW_DIR, FCS_FILE_A4)
        print('FCS File 4', fcs_file_a4_path)
        af_op = flow.AutofluorescenceOp()
        # Get channel_names
        URL = 'http://basicanalysis:3000?id=' + file_id
        r = requests.get(URL)
        self.channel_names = r.json()
        self.channel_name1 = self.channel_names[0]
        self.channel_name2 = self.channel_names[1]
        print(r.json())
        tube1 = flow.Tube(file=fcs_file_path,
                          conditions={"Dox": 10.0})
        tube2 = flow.Tube(file=fcs_file_a4_path,
                          conditions={"Dox": 1.0})

        import_op = flow.ImportOp(conditions={"Dox": "float"},
                                  tubes=[tube1, tube2],
                                  channels={self.channel_name1: self.channel_name1,
                                            self.channel_name2: self.channel_name2})

        ex = import_op.apply()
        flow.HistogramView(scale='logicle',
                           channel=self.channel_name2).plot(ex)

        png_file = os.path.join(SHARED_PLOT_DIR, self.file_id + '_histogram.png')
        print(png_file)
        grid(True)
        savefig(png_file)
        self.response['histogram'] = self.file_id + '_histogram.png'

        g = flow.GaussianMixtureOp(name="Gauss",
                                   channels=[self.channel_name1],
                                   scale={self.channel_name1: "logicle"},
                                   num_components=2)

        g.estimate(ex)
        g.default_view().plot(ex)
        ex2 = g.apply(ex)
        g.default_view().plot(ex2)
        png_file = os.path.join(SHARED_PLOT_DIR, self.file_id + '_gausian.png')
        print(png_file)
        grid(True)
        savefig(png_file)
        self.response['gausian'] = self.file_id + '_gausian.png'

        print(type(ex2.data.head()))

        png_file = os.path.join(SHARED_PLOT_DIR, self.file_id + '_gausian_table.png')
        self.__df_to_png(ex2.data.head(), png_file)
        self.response['gausian_table'] = self.file_id + '_gausian_table.png'

        subplots(clear=True)
        g = flow.GaussianMixtureOp(name="Gauss",
                                   channels=[self.channel_name1],
                                   scale={self.channel_name1: "logicle"},
                                   num_components=2,
                                   posteriors=True)

        g.estimate(ex)
        ex2 = g.apply(ex)
        g.default_view().plot(ex2)
        png_file = os.path.join(SHARED_PLOT_DIR, self.file_id + '_gausian_posterior.png')
        savefig(png_file)
        self.response['gausian_posterior'] = self.file_id + '_gausian_posterior.png'

        png_file = os.path.join(SHARED_PLOT_DIR, self.file_id + '_gausian_posterior_table.png')
        self.__df_to_png(ex2.data.head(), png_file)
        self.response['gausian_posterior_table'] = self.file_id + '_gausian_posterior_table.png'

        # We can use this second metadata column to filter out events with low posterior probabilities:
        ex2.query("Gauss_1_posterior > 0.9 | Gauss_2_posterior > 0.9").data.head()
        flow.HistogramView(channel=self.channel_name1,
                           huefacet="Gauss",
                           scale="logicle",
                           subset="Gauss_1_posterior > 0.9 | Gauss_2_posterior > 0.9").plot(ex2)
        png_file = os.path.join(SHARED_PLOT_DIR, self.file_id + '_gausian_filtered_low_posterior.png')
        savefig(png_file)
        self.response['gausian_filtered_low_posterior'] = self.file_id + '_gausian_filtered_low_posterior.png'

        subplots(clear=True)
        # Basic usage, assigning each event to one of the mixture components: (the isolines in the default_view() are 1, 2 and 3 standard deviations away from the mean.)
        g = flow.GaussianMixtureOp(name="Gauss",
                                   channels=[self.channel_name1, self.channel_name2],
                                   scale={self.channel_name1: "logicle",
                                          self.channel_name2: "logicle"},
                                   num_components=2)

        g.estimate(ex)
        ex2 = g.apply(ex)
        g.default_view().plot(ex2, alpha=0.1)
        png_file = os.path.join(SHARED_PLOT_DIR, self.file_id + '_gausian_mixture_model_two_channels.png')
        savefig(png_file)
        self.response['gausian_mixture_model_two_channels'] = self.file_id + '_gausian_mixture_model_two_channels.png'

        subplots(clear=True)
        # K-Means
        self.k_means(ex)

        # FlowPeaks
        """
        ecoli_file_path = os.path.join(SHARED_RAW_DIR, ECOLI_FILE)
        print('Ecoli ', ecoli_file_path)
        ex = flow.ImportOp(tubes=[flow.Tube(file=ecoli_file_path)]).apply()

        flow.ScatterplotView(xchannel=self.channel_name1,
                             xscale='log',
                             ychannel=self.channel_name2,
                             yscale='log').plot(ex)
        png_file = os.path.join(SHARED_PLOT_DIR, 'flow_peaks.png')
        savefig(png_file)
        self.response['flow_peaks'] = 'flow_peaks.png'
        """
        # K-MEANS2
        self.k_means2(ex)

    def k_means(self, ex):
        k = flow.KMeansOp(name="KMeans",
                          channels=[self.channel_name1, self.channel_name2],
                          scale={self.channel_name1: "logicle",
                                 self.channel_name2: "logicle"},
                          num_clusters=2,
                          by=['Dox'])

        k.estimate(ex)
        ex2 = k.apply(ex)
        k.default_view(yfacet="Dox").plot(ex2)
        png_file = os.path.join(SHARED_PLOT_DIR, self.file_id + '_k_means.png')
        savefig(png_file)
        self.response['k_means'] = self.file_id + '_k_means.png'

    def k_means2(self, ex):
        k = flow.KMeansOp(name="KMeans",
                          channels=[self.channel_name1, self.channel_name2],
                          scale={self.channel_name1: "log",
                                 self.channel_name2: "log"},
                          num_clusters=3)

        k.estimate(ex)
        ex2 = k.apply(ex)
        k.default_view().plot(ex2)
        png_file = os.path.join(SHARED_PLOT_DIR, self.file_id + '_k_means2.png')
        savefig(png_file)
        self.response['k_means2'] = self.file_id + '_k_means2.png'

    def __df_to_png(self, df, file_path):
        # Clear prev sub plot
        subplots(clear=True)
        matplotlib.rc('figure', dpi=160)

        ax = plt.subplot(111, frame_on=False)  # no visible frame
        ax.xaxis.set_visible(False)  # hide the x axis
        ax.yaxis.set_visible(False)  # hide the y axis

        table(ax, df, loc='center')  # where df is your data frame
        savefig(file_path)
        return self.response

    def get_plots(self):
        return self.response


# If script ran from terminal
if __name__ == '__main__':
    mlearn = MachineLearning()

    print(os.path.basename(__file__))
    print(__name__)
