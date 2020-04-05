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

        # Clear prev sub plot
        subplots(clear=True)
        matplotlib.rc('figure', dpi=80)

        ax = plt.subplot(111, frame_on=False)  # no visible frame
        ax.xaxis.set_visible(False)  # hide the x axis
        ax.yaxis.set_visible(False)  # hide the y axis

        table(ax, ex2.data.head(), loc='center')  # where df is your data frame
        png_file = os.path.join(STATIC_DIR + '/img/', 'gausian_table.png')

        savefig(png_file)

    def __read_fcs_file_to_fcm(self):
        pass


# If script ran from terminal
if __name__ == '__main__':
    mlearn = MachineLearning()

    print(os.path.basename(__file__))
    print(__name__)
