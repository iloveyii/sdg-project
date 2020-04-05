#!/usr/bin/env python3
import os
from pylab import *
import pandas as pd
import FlowCytometryTools
from FlowCytometryTools import FCMeasurement
from FlowCytometryTools import ThresholdGate
from FlowCytometryTools import FCPlate
from FlowCytometryTools.core.graph import plot_heat_map

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
        self.ssample = tsample
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

    def plate_gated_counts(self):
        # Plot - Counting fluorescent events¶
        self.sample.plot(['Y2-A', 'B1-A'], kind='scatter', alpha=0.6, color='gray')

        # Clear prev sub plot
        subplots(clear=True)

        # Load plate
        plate = FCPlate.from_dir(ID='Demo Plate', path=RAW_DIR, parser='name')
        plate = plate.transform('hlog', channels=['Y2-A', 'B1-A'], b=500.0)

        # Drop empty cols / rows
        plate = plate.dropna()

        # Create a threshold gates
        y2_gate = ThresholdGate(1000.0, 'Y2-A', region='above')

        # Plot
        plate = plate.gate(y2_gate)
        plot_heat_map(plate.counts(), include_values=True, show_colorbar=True,
                      cmap=cm.Oranges)
        title('Heat map of fluorescent counts on plate')

        png_file = os.path.join(STATIC_DIR + '/img/', 'plate_gated_counts.png')
        print(png_file)
        grid(False)
        savefig(png_file)

    def __calculate_median_Y2(self, well):
        return well.data['Y2-A'].median()

    def plate_gated_median_fluorescence(self):
        # Load plate
        plate = FCPlate.from_dir(ID='Demo Plate', path=RAW_DIR, parser='name')
        plate = plate.transform('hlog', channels=['Y2-A', 'B1-A'], b=500.0)

        # Clear prev sub plot
        subplots(clear=True)

        # Drop empty cols / rows
        plate = plate.dropna()

        # Create a threshold gates
        from FlowCytometryTools import ThresholdGate
        y2_gate = ThresholdGate(1000.0, 'Y2-A', region='above')

        # Plot
        plate = plate.gate(y2_gate)

        output = plate.apply(self.__calculate_median_Y2)

        plot_heat_map(output, include_values=True, show_colorbar=True,
                      cmap=cm.Reds)
        title('Heat map of median RFP fluorescence on plate')

        png_file = os.path.join(STATIC_DIR + '/img/', 'plate_gated_median_fluorescence.png')
        print(png_file)
        grid(False)
        savefig(png_file)

    def __custom_compensate(self, original_sample):
        # Copy the original sample
        new_sample = original_sample.copy()
        new_data = new_sample.data
        original_data = original_sample.data

        # Our transformation goes here
        new_data['Y2-A'] = original_data['Y2-A'] - 0.15 * original_data['FSC-A']
        new_data['FSC-A'] = original_data['FSC-A'] - 0.32 * original_data['Y2-A']
        new_data = new_data.dropna()  # Removes all NaN entries
        new_sample.data = new_data
        return new_sample

    def compensation(self):
        # Load data
        sample = self.sample.transform('hlog')
        compensated_sample = sample.apply(self.__custom_compensate)

        ###
        # To do this with a collection (a plate):
        # compensated_plate = plate.apply(compensate, output_format='collection')
        #

        # Clear prev sub plot
        subplots(clear=True)

        # Plot
        sample.plot(['Y2-A', 'FSC-A'], kind='scatter', color='gray', alpha=0.6, label='Original');
        compensated_sample.plot(['Y2-A', 'FSC-A'], kind='scatter', color='green', alpha=0.6,
                                label='Compensated');

        legend(loc='best')
        png_file = os.path.join(STATIC_DIR + '/img/', 'compensation.png')
        print(png_file)
        grid(True)
        savefig(png_file)

    def __transform_using_this_method(self, original_sample):
        """ This function implements a log transformation on the data. """
        # Copy the original sample
        new_sample = original_sample.copy()
        new_data = new_sample.data

        # Our transformation goes here
        new_data['Y2-A'] = log(new_data['Y2-A'])
        new_data = new_data.dropna()  # Removes all NaN entries
        new_sample.data = new_data
        return new_sample

    def custom_transformation(self):
        # Load data
        sample = self.ssample

        # Transform using our own custom method
        custom_transform_sample = sample.apply(self.__transform_using_this_method)

        ###
        # To do this with a collection (a plate):
        # compensated_plate = plate.apply(transform_using_this_method,
        #                   output_format='collection')

        # Clear prev sub plot
        subplots(clear=True)

        # Plot
        custom_transform_sample.plot(['Y2-A'], color='green', alpha=0.9);
        grid(True)

        title('Custom log transformation')
        png_file = os.path.join(STATIC_DIR + '/img/', 'custom_transformation.png')
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
    plotting.plate_gated_counts()
    plotting.plate_gated_median_fluorescence()
    plotting.compensation()
    plotting.custom_transformation()

    print(os.path.basename(__file__))
    print(__name__)
