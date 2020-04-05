#!/usr/bin/env python3
import os
from pylab import *
import pandas as pd
import FlowCytometryTools
from FlowCytometryTools import FCMeasurement

from pandas.tools.plotting import table  # EDIT: see deprecation warnings below
import cytoflow as flow

# if your figures are too big or too small, you can scale them by changing matplotlib's DPI
import matplotlib

# matplotlib.rc('figure', dpi = 160)

RAW_DIR = ''
GATED_DIR = os.path.dirname(os.path.realpath(__file__)) + '/data/gated/'
STATIC_DIR = os.path.realpath(os.path.dirname(os.path.realpath(__file__)) + '/../static/')

BIN_WIDTH = 100
CSV_FILE = 'fcs_file.csv'
FCS_FILE = 'RFP_Well_A3.fcs'
FCS_FILE_A4 = 'CFP_Well_A4.fcs'
ECOLI_FILE = 'ecoli.fcs'


class MachineLearning:
    def __init__(self):
        global RAW_DIR
        # Locate sample data included with this package
        RAW_DIR = os.path.join(FlowCytometryTools.__path__[0], 'tests', 'data', 'Plate01')
        print('Raw dir in init :', RAW_DIR)
        fcs_file_path = os.path.join(RAW_DIR, FCS_FILE)
        print('FCS File', fcs_file_path)
        fcs_file_a4_path = os.path.join(RAW_DIR, FCS_FILE_A4)
        print('FCS File 4', fcs_file_a4_path)

        tube1 = flow.Tube(file=fcs_file_path,
                          conditions={"Dox": 10.0})
        tube2 = flow.Tube(file=fcs_file_a4_path,
                          conditions={"Dox": 1.0})

        import_op = flow.ImportOp(conditions={"Dox": "float"},
                                  tubes=[tube1, tube2],
                                  channels={'V2-A': 'V2-A',
                                            'Y2-A': 'Y2-A'})

        ex = import_op.apply()
        flow.HistogramView(scale='logicle',
                           channel='Y2-A').plot(ex)

        png_file = os.path.join(STATIC_DIR + '/img/', 'ml.png')
        print(png_file)
        grid(True)
        savefig(png_file)

        g = flow.GaussianMixtureOp(name="Gauss",
                                   channels=["Y2-A"],
                                   scale={"Y2-A": "logicle"},
                                   num_components=2)

        g.estimate(ex)
        g.default_view().plot(ex)
        ex2 = g.apply(ex)
        g.default_view().plot(ex2)
        png_file = os.path.join(STATIC_DIR + '/img/', 'gausian.png')
        print(png_file)
        grid(True)
        savefig(png_file)
        print(type(ex2.data.head()))

        png_file = os.path.join(STATIC_DIR + '/img/', 'gausian_table.png')
        self.__df_to_png(ex2.data.head(), png_file)

        subplots(clear=True)
        g = flow.GaussianMixtureOp(name="Gauss",
                                   channels=["V2-A"],
                                   scale={"V2-A": "logicle"},
                                   num_components=2,
                                   posteriors=True)

        g.estimate(ex)
        ex2 = g.apply(ex)
        g.default_view().plot(ex2)
        png_file = os.path.join(STATIC_DIR + '/img/', 'gausian_posterior.png')
        savefig(png_file)

        png_file = os.path.join(STATIC_DIR + '/img/', 'gausian_posterior_table.png')
        self.__df_to_png(ex2.data.head(), png_file)

        # We can use this second metadata column to filter out events with low posterior probabilities:
        ex2.query("Gauss_1_posterior > 0.9 | Gauss_2_posterior > 0.9").data.head()
        flow.HistogramView(channel="V2-A",
                           huefacet="Gauss",
                           scale="logicle",
                           subset="Gauss_1_posterior > 0.9 | Gauss_2_posterior > 0.9").plot(ex2)
        png_file = os.path.join(STATIC_DIR + '/img/', 'gausian_filtered_low_posterior.png')
        savefig(png_file)

        subplots(clear=True)
        # Basic usage, assigning each event to one of the mixture components: (the isolines in the default_view() are 1, 2 and 3 standard deviations away from the mean.)
        g = flow.GaussianMixtureOp(name="Gauss",
                                   channels=["V2-A", "Y2-A"],
                                   scale={"V2-A": "logicle",
                                          "Y2-A": "logicle"},
                                   num_components=2)

        g.estimate(ex)
        ex2 = g.apply(ex)
        g.default_view().plot(ex2, alpha=0.1)
        png_file = os.path.join(STATIC_DIR + '/img/', 'gausian_mixture_model_two_channels.png')
        savefig(png_file)

        subplots(clear=True)
        # K-Means
        k = flow.KMeansOp(name="KMeans",
                          channels=["V2-A", "Y2-A"],
                          scale={"V2-A": "logicle",
                                 "Y2-A": "logicle"},
                          num_clusters=2,
                          by=['Dox'])

        k.estimate(ex)
        ex2 = k.apply(ex)
        k.default_view(yfacet="Dox").plot(ex2)
        png_file = os.path.join(STATIC_DIR + '/img/', 'k_means.png')
        savefig(png_file)

        # FlowPeaks
        ecoli_file_path = os.path.join(RAW_DIR, FCS_FILE)
        ex = flow.ImportOp(tubes=[flow.Tube(file=ecoli_file_path)]).apply()

        flow.ScatterplotView(xchannel="FSC-A",
                             xscale='log',
                             ychannel="FSC-H",
                             yscale='log').plot(ex)
        png_file = os.path.join(STATIC_DIR + '/img/', 'flow_peaks.png')
        savefig(png_file)

        # K-MEANS2
        k = flow.KMeansOp(name="KMeans",
                          channels=["FSC-A", "FSC-H"],
                          scale={"FSC-A": "log",
                                 "FSC-H": "log"},
                          num_clusters=3)

        k.estimate(ex)
        ex2 = k.apply(ex)
        k.default_view().plot(ex2)
        png_file = os.path.join(STATIC_DIR + '/img/', 'k_means2.png')
        savefig(png_file)

    def __df_to_png(self, df, file_path):
        # Clear prev sub plot
        subplots(clear=True)
        matplotlib.rc('figure', dpi=160)

        ax = plt.subplot(111, frame_on=False)  # no visible frame
        ax.xaxis.set_visible(False)  # hide the x axis
        ax.yaxis.set_visible(False)  # hide the y axis

        table(ax, df, loc='center')  # where df is your data frame
        savefig(file_path)

    def __read_fcs_file_to_fcm(self):
        pass


# If script ran from terminal
if __name__ == '__main__':
    mlearn = MachineLearning()

    print(os.path.basename(__file__))
    print(__name__)
