#!/usr/bin/env python3
import os
from FlowCytometryTools import FCMeasurement, ThresholdGate, PolyGate
from pylab import *
import json

STATIC_DIR = os.path.realpath('/shared/static/')
SHARED_PLOT_DIR = os.path.realpath('/shared/plots/')
SHARED_RAW_DIR = os.path.realpath('/shared/raw/cell/')
RAW_DIR = SHARED_RAW_DIR

BIN_WIDTH = 100
CSV_FILE = 'fcs_file.csv'
# FCS_FILE = 'RFP_Well_A3.fcs'
FCS_FILE = 'a1_24h_noc200.fcs'
# FCS_FILE = 'a03_kranvatten_mars_sybr.fcs'
FCS_FILE_A4 = 'CFP_Well_A4.fcs'
ECOLI_FILE = 'ecoli.fcs'


class Basic:
    def __init__(self):
        self.datafile = os.path.join(RAW_DIR, FCS_FILE)
        print('Path to data file is : ' + self.datafile)
        self.sample = False
        self.read_data()

    def read_data(self):
        self.sample = FCMeasurement(ID='Test Sample', datafile=self.datafile)
        # self.sample = self.sample.transform('hlog', b=500)

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
    channels = basic.get_channel_names()
    print(channels)
    # meta = basic.get_meta()
    # print(json.dumps(meta.keys()))
    # print(basic.head())

