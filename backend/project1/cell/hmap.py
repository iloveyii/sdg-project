#!/usr/bin/env python3
import os
import FlowCytometryTools
from FlowCytometryTools import FCMeasurement, ThresholdGate, PolyGate
from pylab import *
import json
from pathlib import Path, PurePath
import pandas as pd

RAW_DIR = os.path.dirname(os.path.realpath(__file__)) + '/data/raw/'
TRANSFORMED_DIR = os.path.dirname(os.path.realpath(__file__)) + '/data/transformed/'
HEAT_MAP_DIR = os.path.dirname(os.path.realpath(__file__)) + '/data/heatmap/'
GATED_DIR = os.path.dirname(os.path.realpath(__file__)) + '/data/gated/'

BIN_WIDTH = 100
FCS_FILE = 'a06_ut_sy.fcs'
CSV_FILE = 'a06_ut_sy.csv'


class Hmap:
    def __init__(self):
        self.sample = False
        self.__read_csv_file_to_fcm()
        self.__transform_data()

    def __read_fcs_file_to_fcm(self):
        fcs_file = os.path.join(RAW_DIR, FCS_FILE)
        self.sample = FCMeasurement(ID='Test Sample', datafile=fcs_file)
        # self.sample = self.sample.transform('hlog', channels=['Y2-A', 'B1-A', 'V2-A'], b=500)

    # Converts df to CSV file and save to heatmap dir
    def __df_values_to_csv(self, df):
        file_name_hmap = os.path.join(HEAT_MAP_DIR, CSV_FILE)
        # If file exists no need to generate again
        if os.path.exists(file_name_hmap):
            print("File already exists: " + file_name_hmap)
            return True

        try:
            file_handle = open(file_name_hmap, 'w')
            xstr = "{},{},{}\n".format(str('seq'), str('xcol'), str('ycol'))
            file_handle.writelines(xstr)
            # Extract the required cols and save to CSV
            for i in range(len(df)):
                x = df.iloc[i].values
                xstr = "{},{},{}\n".format(str(i), str(x[0]), str(x[1]))
                file_handle.writelines(xstr)
            file_handle.close()
            print('Data Saved in ', file_name_hmap, '... Sample = ', xstr)
        except IOError:
            print("File not accessible")
        finally:
            file_handle.close()

        return True

    # This function extracts data of the specified channels into a df
    def __transform_data(self, ichannelx=4, ichannely=6):
        channel_names = self.sample.channel_names
        channelx = channel_names[int(ichannelx) - 1]
        channely = channel_names[int(ichannely) - 1]

        data1 = self.sample.data[channelx]
        data2 = self.sample.data[channely]
        data3 = pd.concat([data1, data2], axis=1)

        self.__df_values_to_csv(data3)
        print('Transformed Data Saved...', CSV_FILE)

    def __read_transformed_csv_file(self):
        file_name = os.path.join(TRANSFORMED_DIR, CSV_FILE)
        df = pd.read_csv(file_name)  # , header=None
        print("Read file ", file_name, "....")
        return df

    def __hmap_file_exists(self):
        file_name = os.path.join(HEAT_MAP_DIR, CSV_FILE)
        if os.path.exists(file_name):
            return True

        print('hmpa file does not exist ' + file_name)
        return False


    def generate_hmap(self):
        # No need to generate again
        if self.__hmap_file_exists():
            print('heatmap file already exists')
            return True
        # Read transformed file and generate csv file in dir heatmap
        df = self.__read_transformed_csv_file()
        num_rows = df.shape[0]
        print("numrows = ", num_rows)
        datax = df['xcol']
        xmax = max(datax)
        datax = df['ycol']
        ymax = max(datax)
        print("MAX(x,y) = ", xmax, ',', ymax)
        xbin = int(xmax / BIN_WIDTH) + 1
        ybin = int(ymax / BIN_WIDTH) + 1
        binArray = np.zeros((xbin, ybin), dtype=np.int32)

        # Generate heatmap by counting number of events in a bin, for each data row
        for i in range(num_rows):
            dataxy = df.iloc[i]
            xval = int(dataxy[1] / BIN_WIDTH)
            yval = int(dataxy[2] / BIN_WIDTH)
            binArray[xval][yval] = 1 + binArray[xval][yval]

        # save_heatmap_gated_data(filename, 1, xbin, ybin, binArray)  # save heatmap data

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
            if not os.path.exists(HEAT_MAP_DIR):
                os.mkdir(HEAT_MAP_DIR)

            outfile = os.path.join(HEAT_MAP_DIR, FCS_FILE)

            fn = open(outfile, 'w')
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

        print('Data Saved in ', outfile)


hmap = Hmap()
# basic.plot_columns('V2-A')
# channels = basic.get_channel_names()
# meta = basic.get_meta()
# print(json.dumps(meta.keys()))
# print(basic.head())
hmap.generate_hmap()
