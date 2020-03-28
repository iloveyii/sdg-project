#!/usr/bin/env python3
import os
from FlowCytometryTools import FCMeasurement, ThresholdGate, PolyGate
from pylab import *
import json

RAW_DIR = os.path.dirname(os.path.realpath(__file__)) + '/data/raw/'
FCS_FILE = 'fcs_file.fcs'


class Basic:
    def __init__(self):
        self.datafile = os.path.join(RAW_DIR, FCS_FILE)
        print('Path to data file is : ' + self.datafile)
        self.sample = False
        self.read_data()

    def read_data(self):
        self.sample = FCMeasurement(ID='Test Sample', datafile=self.datafile)
        self.sample = self.sample.transform('hlog', channels=['Y2-A', 'B1-A', 'V2-A'], b=500)

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


if __name__ == '__main__':
    basic = Basic()
    # basic.plot_columns('V2-A')
    # channels = basic.get_channel_names()
    # meta = basic.get_meta()
    # print(json.dumps(meta.keys()))
    # print(basic.head())

