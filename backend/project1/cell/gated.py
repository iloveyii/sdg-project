#!/usr/bin/env python3
import os
import FlowCytometryTools
from FlowCytometryTools import FCMeasurement, ThresholdGate, PolyGate
from pylab import *
import json
from pathlib import Path, PurePath
import pandas as pd
from transformed import Transformed


GATED_DIR = os.path.dirname(os.path.realpath(__file__)) + '/data/gated/'

BIN_WIDTH = 100
CSV_FILE = 'a06_ut_sy.csv'


class Gated:
    def __init__(self):
        self.csv_file = os.path.join(GATED_DIR, CSV_FILE)
        transformed = Transformed()
        self.df = transformed.transform_data()

    def __gated_file_exists(self):
        if os.path.exists(self.csv_file):
            return True

        print('Gated file does not exist ' + self.csv_file)
        return False


    def generate_gated(self):
        # No need to generate again
        if self.__gated_file_exists():
            print('Gated file already exists')
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

        # The gate coordinates belw are hard coded for a rectangular gate.
        # The front nd web app should simplify this step
        x1 = 5
        y1 = 5
        x2 = 12
        y2 = 12

        """
        Generate gated output from the heatmap
        Gate coordinates: (x1, y1) - (x2, y2)
        """
        gateddata = self.__gating(x1, x2, y1, y2, binArray)
        print("Gating Complete for: ", ". Now saving...")
        self.__save_heatmap_gated_data(x2 - x1, y2 - y1, gateddata)  # save gated data

    def __gating(self, x1, x2, y1, y2, df):
        gated = np.zeros((1 + x2 - x1, 1 + y2 - y1), dtype=np.uint16)

        for i in range(0, x2 - x1):
            for j in range(0, y2 - y1):
                gated[i][j] = df[i + x1][j + y1]

        return gated

    def __save_heatmap_gated_data(self, xbin, ybin, df):
        try:
            if not os.path.exists(GATED_DIR):
                os.mkdir(GATED_DIR)

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


if __name__ == '__main__':
    gated = Gated()
    gated.generate_gated()
    print(os.path.basename(__file__))
    print(__name__)

