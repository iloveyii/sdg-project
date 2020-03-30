#!/usr/bin/env python3
import os
from FlowCytometryTools import FCMeasurement, ThresholdGate, PolyGate
from pylab import *
import pandas as pd

RAW_DIR = os.path.dirname(os.path.realpath(__file__)) + '/data/raw/'
TRANSFORMED_DIR = os.path.dirname(os.path.realpath(__file__)) + '/data/transformed/'

FCS_FILE = 'fcs_file.fcs'
CSV_FILE = 'fcs_file.csv'


class Transformed:
    def __init__(self, filename=FCS_FILE):
        global FCS_FILE
        FCS_FILE = filename
        self.sample = False
        self.__read_fcs_file_to_fcm()

    def __read_fcs_file_to_fcm(self):
        fcs_file = os.path.join(RAW_DIR, FCS_FILE)
        if not os.path.exists(TRANSFORMED_DIR):
            os.mkdir(TRANSFORMED_DIR)
        self.csv_file = os.path.join(TRANSFORMED_DIR, CSV_FILE)
        if not os.path.exists(fcs_file):
            return self.__save_empty_csv_file()
        self.sample = FCMeasurement(ID='Test Sample', datafile=fcs_file)

    def __save_empty_csv_file(self):
        file_handle = open(self.csv_file, 'w')
        xstr = "{},{},{}\n".format(str('seq'), str('xcol'), str('ycol'))
        file_handle.writelines(xstr)
        file_handle.close()

    # Converts df to CSV file and save to heatmap dir
    def __df_values_to_transformed_csv(self, df):
        try:
            file_handle = open(self.csv_file, 'w')
            xstr = "{},{},{}\n".format(str('seq'), str('xcol'), str('ycol'))
            file_handle.writelines(xstr)
            # Extract the required cols and save to CSV
            for i in range(len(df)):
                x = df.iloc[i].values
                xstr = "{},{},{}\n".format(str(i), str(x[0]), str(x[1]))
                file_handle.writelines(xstr)
            file_handle.close()
            print('Transformed Data Saved in ', self.csv_file, '... Sample = ', xstr)
        except IOError:
            print("File not accessible")
        finally:
            file_handle.close()

        return True

    # This function extracts data of the specified channels into a df
    def transform_data(self, ichannelx=4, ichannely=6):
        if self.__transform_file_exists():
            print('transform file exist ')
            df = pd.read_csv(self.csv_file)  # , header=None
            return df
        channel_names = self.sample.channel_names
        channelx = channel_names[int(ichannelx) - 1]
        channely = channel_names[int(ichannely) - 1]

        data1 = self.sample.data[channelx]
        data2 = self.sample.data[channely]
        data3 = pd.concat([data1, data2], axis=1)

        self.__df_values_to_transformed_csv(data3)
        print('Transformed Data Saved...', CSV_FILE)
        print('TYPE: ', type(data3))
        df = pd.read_csv(self.csv_file)  # , header=None
        return df

    def __transform_file_exists(self):
        if os.path.exists(self.csv_file):
            return True
        return False

    def get_plot_data(self, channelx, channely, transformation, filename):
        print("GET PLOT DATA :- Reading selected columns from .fcs file ", filename)
        data1 = self.sample.data[channelx]
        data2 = self.sample.data[channely]
        data3 = pd.concat([data1, data2], axis=1)
        return data3


# If script ran from terminal
if __name__ == '__main__':
    tr = Transformed()
    tr.transform_data()
    print(os.path.basename(__file__))
    print(__name__)
    df = tr.get_plot_data('FSC-A', 'SSC-A', 'hlog', 'fname.tst')
    print(df.values)
