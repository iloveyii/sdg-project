#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Mon Mar  2 09:05:13 2020

@author: dave
This module does the following:
1. reads FCS files as input
2. Selects 2 columns (channels) from the data according to the user's choice (in the front end app), 
3. Transforms the data according to the user's choice (if needed)
4. Saves the selected columns (and transformed if needed) in a .csv file.

Input files are located in 'rawdatadir' (below)
Output files are stored in 'transformeddatadir' (below) 
"""

#import FlowCytometryTools
import os
from FlowCytometryTools import test_data_dir, test_data_file, FCMeasurement

import pandas as pd
import numpy as np
from pandas import read_csv

from pathlib import Path, PurePath

dirpath = Path().parent.absolute()

rawdatadir = PurePath.joinpath(dirpath,'data/raw/')
transformeddatadir = PurePath.joinpath(dirpath,'data/transformed/')


####################################################    
"""
This function saves the content of a data frame to a file
Name        = save_data_file

Input arguments      = 
    df    = frame containing data to be saved
    outfile  = name of output file without the full path  

Returns     = NONE

Used local variables    =
    filename = fullpath of destination file
    fn      = file pointer
    df      = data frame to return the content to the caller
    x       = array (vector) for each data row in frame 
    xstr    = string to concatenate data tuples to write in .csv format
    i       = index (counter) integer
"""
    
def save_data_file(df, outfile):

    filename = PurePath.joinpath(transformeddatadir, outfile)
    fn = open(filename,'w')
    xstr = str('seq') + "," + str('xcol') + ", " + str('ycol') + "\n"
    fn.writelines(xstr)

    for i in range(len(df)):
        x = df.iloc[i].values
        xstr = str(i) + "," + str(x[0]) + ", " + str(x[1]) + "\n"
        fn.writelines(xstr)
    fn.close()
    print('Data Saved in ', filename,'... Sample = ',xstr)

####################################################    
"""
This function reads the input file and returns its content in a data frame
Name        = read_data

Input arguments      = 
    filename = full path of input file 

Returns     = data frame with contents of the file

Used local variables    =
    df      = data frame to return the content to the caller
"""
    
def read_data(filename): 
    datafile = PurePath.joinpath(rawdatadir, filename)    #'sandysample.fcs'
#    from FlowCytometryTools import FCMeasurement
    df = FCMeasurement(ID='Test Sample', datafile=datafile)
    return df

"""
This is the program entry point (main)
The program starts by retrieving the list of files in the rawdatadir folder/directory
It then selects the desired columns from the ro .fcs file
The names of the columns are defined by the user in the front end (web part)
Name    = none

Input arguments = none 

Returns         = None
Calls the os package
Calls local
    read_data() to retrieve raw data
    save_data() to store the result
Used local variables    =
    filelist        = array containing names of files in the rawdatadir folder
    longgilename    = full file name (not including the path) with extension 
    shortfilename   = filename without extension (before the .) 
    sample          = data frame to retrieve the entire data (before selection)
    ichannelx       = integer index of frist selected column (starts from 1)
    ichannely       = integer index of second selected column (starts from 1)
    channelx        = the first selected data column
    channely        = the second selected data column
    data1           = vector (1D) to hold first column data
    data2           = vector (1D) to hold second column data
    data3           = matrix (2D) holding the two colmns combiled
    outfile         = name of target file for the resulting data
"""

ichannelx = 4       #FL-1
ichannely = 6       #FL-3

filelist = os.listdir(rawdatadir)

for longfilename in filelist:
    print("Reading .fcs file ", longfilename)
    shortfilename = longfilename.split('.')[0]
    sample = read_data(longfilename)
    
    channelnames = sample.channel_names
    channelx = channelnames[int(ichannelx)-1]
    channely = channelnames[int(ichannely)-1]

#tsample = sample.transform('hlog', channels=[channelx, channely], b=1000.0)
#Transformation is selected in the FE
    
    data1 = sample.data[channelx]
    data2 = sample.data[channely]
    data3= pd.concat([data1,data2], axis=1)
    outfile = shortfilename + 'out.csv'
    save_data_file(data3,outfile)
    print('Raw Data Saved...', outfile)
    
"""
If you want, you can modify the above code as follows (after selecting the channels)     
    tsample = sample.transform('hlog', channels=[channelx, channely], b=1000.0)
    #tsample = sample.transform('glog', channels=[channelx, channely])
    
    data1 = tsample[channelx]
    data2 = tsample[channely]
    data3= pd.concat([data1,data2], axis=1)
    savedataclassic(data3,'transformdata.csv')
    print('Transform Data Saved...')
"""