#!/usr/bin/env python3
import os
import FlowCytometryTools
from FlowCytometryTools import FCMeasurement, ThresholdGate, PolyGate
from pylab import *
import json
from pathlib import Path, PurePath
import pandas as pd

dir_path = Path().absolute()

raw_path = PurePath.joinpath(dir_path, 'data/raw/')
transformed_path = PurePath.joinpath(dir_path, 'data/transformed/')

RAW_DIR = os.path.dirname(os.path.realpath(__file__)) + '/data/raw/'
TRANSFORMED_DIR = os.path.dirname(os.path.realpath(__file__)) + '/data/transformed/'
HEAT_MAP_DIR = os.path.dirname(os.path.realpath(__file__)) + '/data/heatmap/'
GATED_DIR = os.path.dirname(os.path.realpath(__file__)) + '/data/gated/'


class Basic:
    def __init__(self):
        # data directory path - please uncomment the following line if you are using Ubuntu
        # datadir = os.path.join(FlowCytometryTools.__path__[0], 'tests', 'data', 'Plate01')
        self.datafile = os.path.join(RAW_DIR, 'RFP_Well_A3.fcs')
        print('Path to data file is : ' + self.datafile)
        self.sample = False
        self.read_data()

    def read_data(self):
        self.sample = FCMeasurement(ID='Test Sample', datafile=self.datafile)
        # self.sample = self.sample.transform('hlog', channels=['Y2-A', 'B1-A', 'V2-A'], b=500)

    def plot_columns(self, col1):
        self.sample.plot(col1, bins=100, alpha=0.9, color='green')

    def get_channel_names(self):
        return self.sample.channel_names

    def get_meta(self):
        return self.sample.meta

    def head(self):
        channelx = "HDR-T"
        channely = "FSC-A"

        return (self.sample.data[[channelx, channely]][:-10]).head(10)

    def medians(self):
        channelx = "HDR-T"
        channely = "FSC-A"

        print((self.sample.data[[channelx, channely]][:-10]).head(10))
        print(channelx, channely)

    def df_values_to_csv(self, df, out_file):
        file_name = PurePath.joinpath(transformed_path, out_file)
        file_handle = open(file_name, 'w+')
        xstr = "{},{},{}\n".format(str('seq'), str('xcol'), str('ycol'))
        file_handle.writelines(xstr)

        for i in range(len(df)):
            x = df.iloc[i].values
            xstr = "{},{},{}\n".format(str(i), str(x[0]), str(x[1]))
            file_handle.writelines(xstr)
        file_handle.close()
        print('Data Saved in ', file_name, '... Sample = ', xstr)

    # This function extracts data of the specified channels into a csv file
    def extract_channels_data(self, ichannelx=4, ichannely=6):
        long_filename = 'RFP_Well_A3.fcs'
        print("Reading .fcs file ", long_filename)
        short_filename = long_filename.split('.')[0]

        channel_names = self.sample.channel_names
        channelx = channel_names[int(ichannelx) - 1]
        channely = channel_names[int(ichannely) - 1]

        # Transformation is selected in the FE

        data1 = self.sample.data[channelx]
        data2 = self.sample.data[channely]
        data3 = pd.concat([data1, data2], axis=1)
        outfile = short_filename + '_out.csv'
        self.df_values_to_csv(data3, outfile)
        print('Raw Data Saved...', outfile)


basic = Basic()
# basic.plot_columns('V2-A')
# channels = basic.get_channel_names()
# meta = basic.get_meta()
# print(json.dumps(meta.keys()))
# print(basic.head())
basic.extract_channels_data()
