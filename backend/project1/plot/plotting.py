#!/usr/bin/env python3
import os
from pylab import *
import pandas as pd
import FlowCytometryTools
from FlowCytometryTools import FCMeasurement
from FlowCytometryTools import ThresholdGate

RAW_DIR = ''
GATED_DIR = os.path.dirname(os.path.realpath(__file__)) + '/data/gated/'
STATIC_DIR = os.path.realpath(os.path.dirname(os.path.realpath(__file__)) + '/../static/')

BIN_WIDTH = 100
CSV_FILE = 'fcs_file.csv'
FCS_FILE = 'RFP_Well_A3.fcs'


class Plotting:
    def __init__(self):
        global RAW_DIR
        # Locate sample data included with this package
        RAW_DIR = os.path.join(FlowCytometryTools.__path__[0], 'tests', 'data', 'Plate01')
        print('Raw dir in init :', RAW_DIR)
        self.csv_file = os.path.join(GATED_DIR, CSV_FILE)
        self.__read_fcs_file_to_fcm()

    def __read_fcs_file_to_fcm(self):
        fcs_file = os.path.join(RAW_DIR, FCS_FILE)
        if not os.path.exists(fcs_file):
            print('FCS file does not exist ', fcs_file)
            return False
        # Load data
        tsample = FCMeasurement(ID='Test Sample', datafile=fcs_file)
        self.sample = tsample.transform('hlog', channels=['Y2-A', 'B1-A', 'V2-A'], b=500.0)

    def histogram(self):
        # Plot Histogram
        self.sample.plot('Y2-A', bins=100, alpha=0.9, color='green')
        png_file = os.path.join(STATIC_DIR + '/img/', 'histogram.png')
        print(png_file)
        grid(True)
        savefig(png_file)
        # show()

    def histogram2d(self):
        # Plot Histogram 2D
        self.sample.plot(['Y2-A', 'B1-A'], bins=100, alpha=0.9, cmap=cm.hot)
        png_file = os.path.join(STATIC_DIR + '/img/', 'histogram2d.png')
        print(png_file)
        grid(True)
        savefig(png_file)

    def scatter(self):
        # Plot scatter
        self.sample.plot(['Y2-A', 'B1-A'], kind='scatter', alpha=0.6, color='gray')
        png_file = os.path.join(STATIC_DIR + '/img/', 'scatter.png')
        print(png_file)
        grid(True)
        savefig(png_file)

    def threshold_gate(self):
        # Create a threshold gates
        y2_gate = ThresholdGate(1000.0, 'Y2-A', region='above')

        # Gate
        gated_sample = self.sample.gate(y2_gate)

        # Plot
        ax1 = subplot(121);
        self.sample.plot('Y2-A', gates=[y2_gate], bins=100, alpha=0.9)
        y2_gate.plot(color='k', linewidth=4, linestyle='-')
        title('Original Sample')

        ax2 = subplot(122, sharey=ax1, sharex=ax1);
        gated_sample.plot('Y2-A', gates=[y2_gate], bins=100, color='y', alpha=0.9);
        title('Gated Sample');

        tight_layout()
        png_file = os.path.join(STATIC_DIR + '/img/', 'threshold_gate.png')
        print(png_file)
        grid(True)
        savefig(png_file)


# If script ran from terminal
if __name__ == '__main__':
    plotting = Plotting()
    plotting.histogram()
    plotting.histogram2d()
    plotting.scatter()
    plotting.threshold_gate()
    print(os.path.basename(__file__))
    print(__name__)
