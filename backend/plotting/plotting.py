#!/usr/bin/env python3
import os
from pylab import *
import pandas as pd
import FlowCytometryTools
from FlowCytometryTools import FCMeasurement
from FlowCytometryTools import ThresholdGate
from FlowCytometryTools import FCPlate
from FlowCytometryTools.core.graph import plot_heat_map

SHARED_PLOTTING_DIR = os.path.realpath('/shared/plotting/')
SHARED_RAW_DIR = os.path.realpath('/shared/raw/cell/')

BIN_WIDTH = 100
CSV_FILE = 'fcs_file.csv'
# FCS_FILE = 'RFP_Well_A3.fcs'
FCS_FILE = 'a1_24h_noc200.fcs'
# FCS_FILE = 'a03_kranvatten_mars_sybr.fcs'
FCS_FILE_A4 = 'CFP_Well_A4.fcs'
ECOLI_FILE = 'ecoli.fcs'
CHECK_IF_FILE_EXIST = True
transformations = {
    'hlog': 'hlog',
    'tlog': 'tlog',
    'glog': 'glog',
}


class Plotting:
    def __init__(self, file_id='default', ch1=False, ch2=False, transformation='hlog', bins=100):
        fcs_file_name = file_id + '_fcs_file.fcs'
        self.file_id = file_id
        self.channel_name1 = ch1
        self.channel_name2 = ch2
        self.transformation = transformations[transformation]
        self.bins = int(bins)
        global SHARED_RAW_DIR
        self.response = {}
        # Locate sample data included with this package
        # SHARED_RAW_DIR = os.path.join(FlowCytometryTools.__path__[0], 'tests', 'data', 'Plate01')
        print('Raw dir in init :', SHARED_RAW_DIR)
        self.csv_file = os.path.join(SHARED_PLOTTING_DIR, CSV_FILE)
        self.__read_fcs_file_to_fcm(fcs_file_name)

    def __read_fcs_file_to_fcm(self, fcs_file_name):
        fcs_file = os.path.join(SHARED_RAW_DIR, fcs_file_name)
        if not os.path.exists(fcs_file):
            print('FCS file does not exist ', fcs_file)
            # return False
            fcs_file = os.path.join(SHARED_RAW_DIR, 'fcs_file.fcs')  # running from cli

        # Load data
        tsample = FCMeasurement(ID='Test Sample', datafile=fcs_file)
        if self.transformation:
            tsample = tsample.transform(self.transformation, b=self.bins)

        self.channel_names = tsample.channel_names
        if not self.channel_name1 and not self.channel_name2:
            print('Check if channel names False', self.channel_names)
            self.channel_name1 = self.channel_names[0]
            self.channel_name2 = self.channel_names[1]
        else:
            self.channel_names = [self.channel_name1, self.channel_name2]

        self.sample = tsample  # tsample.transform('hlog', channels=['Y2-A', 'B1-A', 'V2-A'], b=500.0)

    def histogram(self, channel_name=''):
        if not channel_name:
            channel_name = self.channel_names[0]
        # Plot Histogram
        if not channel_name:
            channel_name = self.channel_name1
            print('Channel name: ', channel_name)
        # Check if file already exists
        if CHECK_IF_FILE_EXIST:
            if self.check_if_images_exist('histogram1d'):
                return True

        self.sample.plot(channel_name, bins=self.bins, alpha=0.9, color='green')
        png_file = os.path.join(SHARED_PLOTTING_DIR, self.get_file_name('histogram1d.png'))
        print(png_file)
        grid(True)
        savefig(png_file)
        self.response['histogram1d'] = self.get_file_name('histogram1d.png')
        # show()

    def histogram2d(self, channel_name1='', channel_name2=''):
        # Plot Histogram 2D
        if not channel_name1:
            channel_name1 = self.channel_names[0]
            channel_name2 = self.channel_names[1]

        # Check if file already exists
        if CHECK_IF_FILE_EXIST:
            if self.check_if_images_exist('histogram2d'):
                return True

        self.sample.plot([channel_name1, channel_name2], bins=self.bins, alpha=0.9, cmap=cm.hot)
        png_file = os.path.join(SHARED_PLOTTING_DIR, self.get_file_name('histogram2d.png'))
        print(png_file)
        grid(True)
        savefig(png_file)
        self.response['histogram2d'] = self.get_file_name('histogram2d.png')

    def scatter(self, channel_name1='', channel_name2=''):
        if not channel_name1:
            channel_name1 = self.channel_names[0]
            channel_name2 = self.channel_names[1]

        # Check if file already exists
        if CHECK_IF_FILE_EXIST:
            if self.check_if_images_exist('scatter'):
                return True

        # Plot scatter
        self.sample.plot([channel_name1, channel_name2], kind='scatter', alpha=0.6, color='gray')
        png_file = os.path.join(SHARED_PLOTTING_DIR, self.get_file_name('scatter.png'))
        print(png_file)
        grid(True)
        savefig(png_file)
        self.response['scatter'] = self.get_file_name('scatter.png')

    def threshold_gate(self, channel_name=''):
        if not channel_name:
            channel_name = self.channel_names[0]

        # Check if file already exists
        if CHECK_IF_FILE_EXIST:
            if self.check_if_images_exist('threshold_gate'):
                return True

        # Create a threshold gates
        y2_gate = ThresholdGate(1000.0, channel_name, region='above')

        # Gate
        gated_sample = self.sample.gate(y2_gate)

        # Plot
        ax1 = subplot(121)
        self.sample.plot(channel_name, gates=[y2_gate], bins=self.bins, alpha=0.9)
        y2_gate.plot(color='k', linewidth=4, linestyle='-')
        title('Original Sample')

        ax2 = subplot(122, sharey=ax1, sharex=ax1)
        gated_sample.plot(channel_name, gates=[y2_gate], bins=self.bins, color='y', alpha=0.9)
        title('Gated Sample')

        tight_layout()
        png_file = os.path.join(SHARED_PLOTTING_DIR, self.get_file_name('threshold_gate.png'))
        print(png_file)
        grid(True)
        savefig(png_file)
        self.response['threshold_gate'] = self.get_file_name('threshold_gate.png')

    def plate_gated_counts(self, channel_name1='', channel_name2=''):
        if not channel_name1:
            channel_name1 = self.channel_names[0]
            channel_name2 = self.channel_names[1]

        # Check if file already exists
        if CHECK_IF_FILE_EXIST:
            if self.check_if_images_exist('plate_gated_counts'):
                return True

        # Plot - Counting fluorescent events¶
        self.sample.plot([channel_name1, channel_name2], kind='scatter', alpha=0.6, color='gray')

        # Clear prev sub plot
        subplots(clear=True)

        # Load plate
        plate = FCPlate.from_dir(ID='Demo Plate', path=SHARED_RAW_DIR, parser='name')
        plate = plate.transform('hlog', channels=[channel_name1, channel_name2], b=500.0)

        # Drop empty cols / rows
        plate = plate.dropna()

        # Create a threshold gates
        y2_gate = ThresholdGate(1000.0, channel_name1, region='above')

        # Plot
        plate = plate.gate(y2_gate)
        plot_heat_map(plate.counts(), include_values=True, show_colorbar=True,
                      cmap=cm.Oranges)
        title('Heat map of fluorescent counts on plate')

        png_file = os.path.join(SHARED_PLOTTING_DIR, self.get_file_name('plate_gated_counts.png'))
        print(png_file)
        grid(False)
        savefig(png_file)
        self.response['plate_gated_counts'] = self.get_file_name('plate_gated_counts.png')

    def __calculate_median_Y2(self, well, channel_name):
        if not channel_name:
            channel_name = self.channel_names[0]
        return well.data[channel_name].median()

    def plate_gated_median_fluorescence(self, channel_name1='', channel_name2=''):
        if not channel_name1:
            channel_name1 = self.channel_names[0]
            channel_name2 = self.channel_names[1]

        # Check if file already exists
        if CHECK_IF_FILE_EXIST:
            if self.check_if_images_exist('plate_gated_median_fluorescence'):
                return True

        # Load plate
        plate = FCPlate.from_dir(ID='Demo Plate', path=SHARED_RAW_DIR, parser='name')
        plate = plate.transform('hlog', channels=[channel_name1, channel_name2], b=500.0)

        # Clear prev sub plot
        subplots(clear=True)

        # Drop empty cols / rows
        plate = plate.dropna()

        # Create a threshold gates
        y2_gate = ThresholdGate(1000.0, channel_name1, region='above')

        # Plot
        plate = plate.gate(y2_gate)

        output = plate.apply(self.__calculate_median_Y2)

        plot_heat_map(output, include_values=True, show_colorbar=True,
                      cmap=cm.Reds)
        title('Heat map of median RFP fluorescence on plate')

        png_file = os.path.join(SHARED_PLOTTING_DIR, self.get_file_name('plate_gated_median_fluorescence.png'))
        print(png_file)
        grid(False)
        savefig(png_file)
        self.response['plate_gated_median_fluorescence'] = self.get_file_name('plate_gated_median_fluorescence.png')

    def __custom_compensate(self, original_sample, channel_name1='', channel_name2=''):
        if not channel_name1:
            channel_name1 = self.channel_names[0]
            channel_name2 = self.channel_names[1]
        # Copy the original sample
        new_sample = original_sample.copy()
        new_data = new_sample.data
        original_data = original_sample.data

        # Our transformation goes here
        new_data[channel_name1] = original_data[channel_name1] - 0.15 * original_data[channel_name2]
        new_data[channel_name2] = original_data[channel_name2] - 0.32 * original_data[channel_name1]
        new_data = new_data.dropna()  # Removes all NaN entries
        new_sample.data = new_data
        return new_sample

    def compensation(self, channel_name1='', channel_name2=''):
        if not channel_name1:
            channel_name1 = self.channel_names[0]
            channel_name2 = self.channel_names[1]

        # Check if file already exists
        if CHECK_IF_FILE_EXIST:
            if self.check_if_images_exist('compensation'):
                return True

        # Load data
        # sample = self.sample.transform('hlog')
        sample = self.sample
        compensated_sample = sample.apply(self.__custom_compensate)

        ###
        # To do this with a collection (a plate):
        # compensated_plate = plate.apply(compensate, output_format='collection')
        #

        # Clear prev sub plot
        subplots(clear=True)

        # Plot
        sample.plot([channel_name1, channel_name2], kind='scatter', color='gray', alpha=0.6, label='Original');
        compensated_sample.plot([channel_name1, channel_name2], kind='scatter', color='green', alpha=0.6,
                                label='Compensated');

        legend(loc='best')
        png_file = os.path.join(SHARED_PLOTTING_DIR, self.get_file_name('compensation.png'))
        print(png_file)
        grid(True)
        savefig(png_file)
        self.response['compensation'] = self.get_file_name('compensation.png')

    def __transform_using_this_method(self, original_sample, channel_name=''):
        """ This function implements a log transformation on the data. """
        if not channel_name:
            channel_name = self.channel_names[0]
        # Copy the original sample
        new_sample = original_sample.copy()
        new_data = new_sample.data

        # Our transformation goes here
        new_data[channel_name] = log(new_data[channel_name])
        new_data = new_data.dropna()  # Removes all NaN entries
        new_sample.data = new_data
        return new_sample

    def custom_transformation(self, channel_name=''):
        if not channel_name:
            channel_name = self.channel_names[0]

        # Check if file already exists
        if CHECK_IF_FILE_EXIST:
            if self.check_if_images_exist('custom_transformation'):
                return True

        # Load data
        # sample = self.ssample.transform('hlog')
        sample = self.sample

        # Transform using our own custom method
        custom_transform_sample = sample.apply(self.__transform_using_this_method)

        ###
        # To do this with a collection (a plate):
        # compensated_plate = plate.apply(transform_using_this_method,
        #                   output_format='collection')

        # Clear prev sub plot
        subplots(clear=True)

        # Plot
        custom_transform_sample.plot([channel_name], alpha=0.9);
        grid(True)

        title('Custom log transformation')
        png_file = os.path.join(SHARED_PLOTTING_DIR, self.get_file_name('custom_transformation.png'))
        print(png_file)
        grid(True)
        savefig(png_file)
        self.response['custom_transformation'] = self.get_file_name('custom_transformation.png')

    def get_plots(self):
        try:
            self.histogram(self.channel_name1)
            self.histogram2d(self.channel_name1, self.channel_name2)

            self.scatter(self.channel_name1, self.channel_name2)
            self.threshold_gate(self.channel_name1)

            self.compensation(self.channel_name1, self.channel_name2)
            self.custom_transformation(self.channel_name1)
        except Exception as inst:
            print('Err', inst)
        return self.response

    def get_file_name(self, file_part):
        print(self.file_id, self.channel_name2.lower())
        # return "{}_{}_{}__{}".format(self.file_id, self.channel_name2.lower(), self.channel_name1.lower(), file_part)
        return "{}_{}_{}__{}_{}_{}".format(self.file_id, self.channel_name2.lower(), self.channel_name1.lower(),
                                           self.transformation, self.bins, file_part)

    def check_if_images_exist(self, file_part):
        file_name = "{}.{}".format(file_part, 'png')
        png_file = os.path.join(SHARED_PLOTTING_DIR, self.get_file_name(file_name))
        if os.path.exists(png_file) and os.path.isfile(png_file):
            self.response[file_part] = self.get_file_name(file_name)
            return True


# If script ran from terminal
if __name__ == '__main__':
    script_path = os.path.abspath(__file__)
    dir_path = os.path.dirname(script_path)
    SHARED_RAW_DIR = os.path.realpath(os.path.join(dir_path, '../', 'shared/raw/cell/'))
    SHARED_PLOTTING_DIR = os.path.realpath(os.path.join(dir_path, '../', 'shared/plotting/'))
    plotting = Plotting()
    plotting.histogram()
    plotting.histogram2d()

    plotting.scatter()
    plotting.threshold_gate()

    # plotting.plate_gated_counts()
    # plotting.plate_gated_median_fluorescence()
    plotting.compensation()
    plotting.custom_transformation()

    print(os.path.basename(__file__))
    print(__name__)
