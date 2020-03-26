#!/usr/bin/env python3
import os
import FlowCytometryTools
from FlowCytometryTools import FCMeasurement, ThresholdGate, PolyGate
from pylab import *
import json


class Basic:
    def __init__(self):
        # data directory path - please uncomment the following line if you are using Ubuntu
        # datadir = os.path.join(FlowCytometryTools.__path__[0], 'tests', 'data', 'Plate01')
        datadir = os.path.dirname(os.path.realpath(__file__)) + '/data/'
        self.datafile = os.path.join(datadir, 'RFP_Well_A3.fcs')
        print('Path to data file is : ' + self.datafile)
        self.tsample = False
        self.read_data()

    def read_data(self):
        self.tsample = FCMeasurement(ID='Test Sample', datafile=self.datafile)
        self.tsample = self.tsample.transform('hlog', channels=['Y2-A', 'B1-A', 'V2-A'], b=500)

    def plot_columns(self, col1):
        self.tsample.plot(col1, bins=100, alpha=0.9, color='green')

    def get_channel_names(self):
        return self.tsample.channel_names

    def get_meta(self):
        return self.tsample.meta

    def head(self):
        channelx = "HDR-T"
        channely = "FSC-A"

        return (self.tsample.data[[channelx, channely]][:-10]).head(10)

    def medians(self):
        channelx = "HDR-T"
        channely = "FSC-A"

        print((self.tsample.data[[channelx, channely]][:-10]).head(10))
        print(channelx, channely)


# basic = Basic()
# basic.plot_columns('V2-A')
# channels = basic.get_channel_names()
# meta = basic.get_meta()
# print(json.dumps(meta.keys()))
# print(basic.head())