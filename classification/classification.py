#!/usr/bin/env python3
import os
from pylab import *
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from pandas.tools.plotting import table  # EDIT: see deprecation warnings below
import cytoflow as flow
import requests
# if your figures are too big or too small, you can scale them by changing matplotlib's DPI
import matplotlib
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report
from sklearn.metrics import accuracy_score

# Import libraries
import numpy as np
import pandas as pd
import os
from pylab import *
import seaborn as sns

import FlowCytometryTools
from FlowCytometryTools import FCMeasurement
from FlowCytometryTools import ThresholdGate
from FlowCytometryTools import FCPlate
from FlowCytometryTools.core.graph import plot_heat_map
from sklearn.preprocessing import StandardScaler

STATIC_DIR = os.path.realpath('/shared/static/')
SHARED_PLOT_DIR = os.path.realpath('/shared/class/')
SHARED_RAW_DIR = os.path.realpath('/shared/raw/multi/')
PRINCIPAL_COMPONENTS = list(['FSC-A', 'SSC-A'])

BIN_WIDTH = 100
CSV_FILE = 'fcs_file.csv'
# FCS_FILE = 'RFP_Well_A3.fcs'
TRAIN_FCS_FILE = 'train.fcs'
FCS_FILE = 'a1_24h_noc200.fcs'
FCS_FILE_A4 = 'cfp_well_a4.fcs'
ECOLI_FILE = 'ecoli.fcs'
CHECK_IF_FILE_EXIST = True


class Classification:
    def __init__(self, file_id='default', debug=False):
        if debug:
            self.set_dirs_for_debug()

        fcs_file_name = file_id + '_fcs_file.fcs'
        self.response = {}
        self.train()
        self.basic()
        # Show accuracy for train
        self.show_accuracy(self.models_array, self.X_train, self.Y_train, 'train')
        # Show accuracy for test
        self.show_accuracy(self.models_array, self.X_test, self.Y_test, 'test')
        # Predict the file_name
        self.predict(fcs_file_name)
        print(self.response)

    def set_dirs_for_debug(self):
        STATIC_DIR = os.path.realpath('../shared/static/')
        SHARED_PLOT_DIR = os.path.realpath('../shared/classification/')
        SHARED_RAW_DIR = os.path.realpath('../shared/raw/multi/')

    def train(self):
        # Make file path
        datafile = os.path.join(SHARED_RAW_DIR, TRAIN_FCS_FILE)
        train_sample = FCMeasurement(ID='Test Sample', datafile=datafile)
        # Get DF
        self.train_df = train_sample.data
        # Preprocess
        self.train_df = self.pre_process(self.train_df)
        # Compute diagnosis
        self.compute_diagnosis()
        # Show head
        print(self.train_df.head())
        # Split
        self.split_train_test()
        # Make models
        self.models_array = self.models()

    def predict(self, file_name):
        datafile = os.path.join(SHARED_RAW_DIR, file_name)
        sample = FCMeasurement(ID='Test Sample', datafile=datafile)
        df = sample.data
        df = self.pre_process(df)
        X = df.iloc[:, 0:len(PRINCIPAL_COMPONENTS)].values
        # Scale the data - feature scaling
        sc = StandardScaler()
        X = sc.fit_transform(X)
        predictions = {}
        counts = {}
        model_names = ['Logistic Regression', 'Decision Tree', 'Random Forest']

        for i in range(len(self.models_array)):
            print('===> Predict ', i)
            a = self.models_array[i].predict(X)
            unique_elements, counts_elements = np.unique(a, return_counts=True)
            print(np.asarray((unique_elements, counts_elements)))
            arr2 = (np.asarray((unique_elements, counts_elements)))
            predictions['elements'] = unique_elements
            counts[model_names[i]] = counts_elements

        predictions['counts'] = counts
        self.response['predictions'] = predictions
        return self.response

    def pre_process(self, df):
        # Principal component analysis
        return df[PRINCIPAL_COMPONENTS]

    def compute_diagnosis(self):
        self.train_df['diagnosis'] = self.train_df.apply(
            lambda row: 1 if row['FSC-A'] == 0 or row['SSC-A'] == 0 else 0,
            axis=1)
        # Arrange columns order
        self.train_df = self.train_df[['diagnosis'] + PRINCIPAL_COMPONENTS]

    def basic(self):
        # Count number of malignant and benign
        c = self.train_df['diagnosis'].value_counts()
        self.response['count_mb'] = c
        # Visualize
        sns.countplot(self.train_df['diagnosis'], label='count')
        png_file_path = os.path.join(SHARED_PLOT_DIR, 'count_mb.png')
        savefig(png_file_path)
        self.response['count_mb_visualize'] = 'count_mb.png'
        # Pair plot
        sns.pairplot(self.train_df.iloc[:, 0:len(PRINCIPAL_COMPONENTS) + 1], hue='diagnosis')
        png_file_path = os.path.join(SHARED_PLOT_DIR, 'pair_plot.png')
        savefig(png_file_path)

    # Create a function for all models
    def models(self):
        # Logistic Regression
        log = LogisticRegression(random_state=0)
        log.fit(self.X_train, self.Y_train)

        # Decision Tree
        tree = DecisionTreeClassifier(criterion='entropy', random_state=0)
        tree.fit(self.X_train, self.Y_train)

        # Random Forest RF
        forest = RandomForestClassifier(n_estimators=10, criterion='entropy', random_state=0)
        forest.fit(self.X_train, self.Y_train)

        return log, tree, forest

    def split_train_test(self):
        # Split the data into dependent(Y) and independent sets(X)
        X = self.train_df.iloc[:, 1:len(PRINCIPAL_COMPONENTS) + 1].values
        Y = self.train_df.iloc[:, 0].values
        # Split the dataset into 70% training and 30% testing data sets
        X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.30, random_state=0)
        # Scale the data - feature scaling
        sc = StandardScaler()
        self.X_train = sc.fit_transform(X_train)
        self.X_test = sc.fit_transform(X_test)
        self.Y_train = Y_train
        self.Y_test = Y_test

    def show_accuracy(self, model, X, Y, type='train'):
        # Show accuracy using the trained models
        model_names = ['Logistic Regression', 'Decision Tree', 'Random Forest']
        # print('######### TRAIN Accuracy ##########')
        scores = {}
        for i in range(len(model)):
            print('===> ' + model_names[i])
            print(classification_report(Y, model[i].predict(X)))
            score = accuracy_score(Y, model[i].predict(X))
            print(score)
            scores[model_names[i]] = round(score, 3)
            print()
        self.response[type + '_score'] = scores

    def get_train_file(self):
        pass

    def get_file_name(self, file_part):
        return "{}_{}_{}__{}_{}_{}".format(self.file_id, self.channel_name2.lower(), self.channel_name1.lower(),
                                           self.transformation, self.bins, file_part)

    def check_if_images_exist(self):
        file_part = 'gausian'
        file_name = "{}.{}".format(file_part, 'png')
        png_file = os.path.join(SHARED_PLOT_DIR, self.get_file_name(file_name))
        if os.path.exists(png_file) and os.path.isfile(png_file):
            for file_part in ['gausian', 'gausian_filtered_low_posterior', 'gausian_mixture_model_two_channels',
                              'gausian_posterior', 'gausian_posterior_table', 'gausian_table', 'histogram', 'k_means',
                              'k_means2']:
                file_name = "{}.{}".format(file_part, 'png')
                self.response[file_part] = self.get_file_name(file_name)
            return True
        return False

    def __df_to_png(self, df, file_path):
        # Clear prev sub plot
        subplots(clear=True)
        matplotlib.rc('figure', dpi=160)

        ax = plt.subplot(111, frame_on=False)  # no visible frame
        ax.xaxis.set_visible(False)  # hide the x axis
        ax.yaxis.set_visible(False)  # hide the y axis

        table(ax, df, loc='center')  # where df is your data frame
        savefig(file_path)
        return self.response

    def get_plots(self):
        return self.response


# If script ran from terminal
if __name__ == '__main__':
    STATIC_DIR = os.path.realpath('../shared/static/')
    SHARED_PLOT_DIR = os.path.realpath('../shared/classification/')
    SHARED_RAW_DIR = os.path.realpath('../shared/raw/multi/')

    mlearn = Classification('admin_hkr_se', True)

    print(os.path.basename(__file__))
    print(__name__)
