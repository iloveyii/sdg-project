#!/usr/bin/env python3
import os
import FlowCytometryTools
from FlowCytometryTools import FCMeasurement, ThresholdGate, PolyGate
from pylab import *
import json
from pathlib import Path, PurePath
import pandas as pd
from transformed import Transformed


HEAT_MAP_DIR = os.path.dirname(os.path.realpath(__file__)) + '/data/heatmap/'

BIN_WIDTH = 100
CSV_FILE = 'a06_ut_sy.csv'


class Hmap:
    def __init__(self):
        self.csv_file = os.path.join(HEAT_MAP_DIR, CSV_FILE)
        transformed = Transformed()
        self.df = transformed.transform_data()

    def __hmap_file_exists(self):
        if os.path.exists(self.csv_file):
            return True

        print('Heatmap file does not exist ' + self.csv_file)
        return False


    def generate_hmap(self):
        # No need to generate again
        if self.__hmap_file_exists():
            print('heatmap file already exists')
            df = pd.read_csv(self.csv_file)  # , header=None
            return df
        # Read transformed file and generate csv file in dir heatmap
        num_rows = self.df.shape[0]
        print("numrows = ", num_rows)
        datax = self.df['xcol']
        xmax = max(datax)
        datax = self.df['ycol']
        ymax = max(datax)
        print("MAX(x,y) = ", xmax, ',', ymax)
        xbin = int(xmax / BIN_WIDTH) + 1
        ybin = int(ymax / BIN_WIDTH) + 1
        binArray = np.zeros((xbin, ybin), dtype=np.int32)

        # Generate heatmap by counting number of events in a bin, for each data row
        for i in range(num_rows):
            dataxy = self.df.iloc[i]
            xval = int(dataxy[1] / BIN_WIDTH)
            yval = int(dataxy[2] / BIN_WIDTH)
            binArray[xval][yval] = 1 + binArray[xval][yval]

        # save_heatmap_gated_data(filename, 1, xbin, ybin, binArray)  # save heatmap data
        self.__save_heatmap_data(xbin, ybin, binArray)  # save gated data
        return True

    def __save_heatmap_data(self, xbin, ybin, df):
        try:
            if not os.path.exists(HEAT_MAP_DIR):
                os.mkdir(HEAT_MAP_DIR)

            fn = open(self.csv_file, 'w')
            for i in range(xbin):
                xystr = ""
                for j in range(ybin - 1):
                    xystr = xystr + str(df[i][j]) + ","
                xystr = xystr + str(df[i][ybin - 1]) + "\n"
                fn.writelines(xystr)
        except IOError:
            print("File not accessible")
        finally:
            fn.close()

        print('Heatmap Data Saved in ', self.csv_file)


hmap = Hmap()
hmap.generate_hmap()
