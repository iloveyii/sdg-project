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
SHARED_PLOT_DIR = os.path.realpath('/shared/class/')
SHARED_RAW_DIR = os.path.realpath('/shared/raw/class/')

BIN_WIDTH = 100
CSV_FILE = 'fcs_file.csv'
# FCS_FILE = 'RFP_Well_A3.fcs'
FCS_FILE = 'a1_24h_noc200.fcs'
FCS_FILE_A4 = 'cfp_well_a4.fcs'
ECOLI_FILE = 'ecoli.fcs'
CHECK_IF_FILE_EXIST = True


class Classification:
    def __init__(self, file_id='default', ch1=False, ch2=False, transformation='hlog', bins=100):
        fcs_file_name = file_id + '_fcs_file.fcs'
        self.file_id = file_id
        self.transformation = transformation
        self.bins = bins
        self.response = {}
        self.channel_name1 = ch1
        self.channel_name2 = ch2
        print('ML setting ch names from params', ch1, ch2)
        # Check if images already exist
        if self.check_if_images_exist():
            return None
        # Locate sample data included with this package
        print('Raw dir in init :', SHARED_RAW_DIR)
        fcs_file_path = os.path.join(SHARED_RAW_DIR, fcs_file_name)
        print('FCS File', fcs_file_path)
        fcs_file_a4_path = os.path.join(SHARED_RAW_DIR, FCS_FILE_A4)
        print('FCS File 4', fcs_file_a4_path)
        af_op = flow.AutofluorescenceOp()
        # Get channel_names
        if not ch1 or not ch2:
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

        png_file = os.path.join(SHARED_PLOT_DIR, self.get_file_name('histogram.png'))
        print(png_file)
        grid(True)
        savefig(png_file)
        self.response['histogram'] = self.get_file_name('histogram.png')

        g = flow.GaussianMixtureOp(name="Gauss",
                                   channels=[self.channel_name1],
                                   scale={self.channel_name1: "logicle"},
                                   num_components=2)

        g.estimate(ex)
        g.default_view().plot(ex)
        ex2 = g.apply(ex)
        g.default_view().plot(ex2)
        png_file = os.path.join(SHARED_PLOT_DIR, self.get_file_name('gausian.png'))
        print(png_file)
        grid(True)
        savefig(png_file)
        self.response['gausian'] = self.get_file_name('gausian.png')

        print(type(ex2.data.head()))

        png_file = os.path.join(SHARED_PLOT_DIR, self.get_file_name('gausian_table.png'))
        self.__df_to_png(ex2.data.head(), png_file)
        self.response['gausian_table'] = self.get_file_name('gausian_table.png')

        subplots(clear=True)
        g = flow.GaussianMixtureOp(name="Gauss",
                                   channels=[self.channel_name1],
                                   scale={self.channel_name1: "logicle"},
                                   num_components=2,
                                   posteriors=True)

        g.estimate(ex)
        ex2 = g.apply(ex)
        g.default_view().plot(ex2)
        png_file = os.path.join(SHARED_PLOT_DIR, self.get_file_name('gausian_posterior.png'))
        savefig(png_file)
        self.response['gausian_posterior'] = self.get_file_name('gausian_posterior.png')

        png_file = os.path.join(SHARED_PLOT_DIR, self.get_file_name('gausian_posterior_table.png'))
        self.__df_to_png(ex2.data.head(), png_file)
        self.response['gausian_posterior_table'] = self.get_file_name('gausian_posterior_table.png')

        # We can use this second metadata column to filter out events with low posterior probabilities:
        ex2.query("Gauss_1_posterior > 0.9 | Gauss_2_posterior > 0.9").data.head()
        flow.HistogramView(channel=self.channel_name1,
                           huefacet="Gauss",
                           scale="logicle",
                           subset="Gauss_1_posterior > 0.9 | Gauss_2_posterior > 0.9").plot(ex2)
        png_file = os.path.join(SHARED_PLOT_DIR, self.get_file_name('gausian_filtered_low_posterior.png'))
        savefig(png_file)
        self.response['gausian_filtered_low_posterior'] = self.get_file_name('gausian_filtered_low_posterior.png')

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
        png_file = os.path.join(SHARED_PLOT_DIR, self.get_file_name('gausian_mixture_model_two_channels.png'))
        savefig(png_file)
        self.response['gausian_mixture_model_two_channels'] = self.get_file_name(
            'gausian_mixture_model_two_channels.png')

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

    def get_file_name(self, file_part):
        return "{}_{}_{}__{}_{}_{}".format(self.file_id, self.channel_name2.lower(), self.channel_name1.lower(),
                                           self.transformation, self.bins, file_part)

    def check_if_images_exist(self):
        file_part = 'gausian'
        file_name = "{}.{}".format(file_part, 'png')
        png_file = os.path.join(SHARED_PLOT_DIR, self.get_file_name(file_name))
        if os.path.exists(png_file) and os.path.isfile(png_file):
            for file_part in ['gausian', 'gausian_filtered_low_posterior', 'gausian_mixture_model_two_channels',
                              'gausian_posterior', 'gausian_posterior_table', 'gausian_table', 'histogram', 'k_means',
                              'k_means2']:
                file_name = "{}.{}".format(file_part, 'png')
                self.response[file_part] = self.get_file_name(file_name)
            return True
        return False

    def check_if_images_exist2(self):
        dir = os.scandir(SHARED_PLOT_DIR)
        print('CHECK if images exist ', dir)
        user_channels = self.get_file_name('')
        for file in dir:
            if file.name.startswith(user_channels):
                parts = file.name.partition('__')
                if len(parts) != 3:
                    print(file.name, user_channels, parts, sys.getdefaultencoding())
                    continue
                file_name = parts[2]
                keys = file_name.split('.')
                key = keys[0]
                print(key, file.name)
                self.response[key] = file.name
        return bool(self.response)

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
        png_file = os.path.join(SHARED_PLOT_DIR, self.get_file_name('k_means.png'))
        savefig(png_file)
        self.response['k_means'] = self.get_file_name('k_means.png')

    def k_means2(self, ex):
        k = flow.KMeansOp(name="KMeans",
                          channels=[self.channel_name1, self.channel_name2],
                          scale={self.channel_name1: "log",
                                 self.channel_name2: "log"},
                          num_clusters=3)

        k.estimate(ex)
        ex2 = k.apply(ex)
        k.default_view().plot(ex2)
        png_file = os.path.join(SHARED_PLOT_DIR, self.get_file_name('k_means2.png'))
        savefig(png_file)
        self.response['k_means2'] = self.get_file_name('k_means2.png')

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
    STATIC_DIR = os.path.realpath('../shared/static/')
    SHARED_PLOT_DIR = os.path.realpath('../shared/Class/')
    SHARED_RAW_DIR = os.path.realpath('../shared/raw/cell/')

    mlearn = Class('admin_hkr_se', 'HDR-T', 'FSC-A', 'hlog', 100)
    print(mlearn.get_plots())

    print(os.path.basename(__file__))
    print(__name__)
