#!/usr/bin/env python3
import os
import FlowCytometryTools
from FlowCytometryTools import FCMeasurement, ThresholdGate, PolyGate
from pylab import *


class Basic:
    def __init__(self):
        # data directory path
        datadir = os.path.join(FlowCytometryTools.__path__[0], 'tests', 'data', 'Plate01')
        self.datafile = os.path.join(datadir, 'RFP_Well_A3.fcs')
        self.read_data()

    def read_data(self):
        self.tsample = FCMeasurement(ID='Test Sample', datafile=self.datafile)
        self.tsample = self.tsample.transform('hlog', channels=['Y2-A', 'B1-A', 'V2-A'], b=500)

    def plot_columns(self,col1):
        self.tsample.plot(col1, bins=100, alpha=0.9, color='green')

    def get_channel_names(self):
        return self.tsample.channel_names


# TEST RUN
basic = Basic()
basic.plot_columns('V2-A')
print(basic.get_channel_names())
