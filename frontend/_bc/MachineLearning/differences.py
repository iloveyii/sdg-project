#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Tue Mar  3 00:54:51 2020

@author: dave

This code calculates the difference between gated samples according to the following:
1. It calculates the Hamming distance (can be modified to geometric if needed)
2. The calculated distances between each pair of files are saved in to a file.
3. The gated samples are read in the 'rawdatadir' folder (directory)
4. The input files are read into frames (matrices)
5. Each input file is expected to have equal number of rows and columns
6. The output files are stored in the 'diffdatadir' directory below 

The number of files is N(N-1)/2 where N is the number of samples in the directory
"""

rawdatadir = '/home/dave/codes/python/FlowCytometryTools-master/data/gated/'  #input files
diffdatadir = '/home/dave/codes/python/FlowCytometryTools-master/data/diff/'  #output files

import os  
import pandas as pd 
import numpy as np
from pandas import read_csv

####################################################
"""
This function saves the distance matrix
Name        = save_diff_data

Input arguments      = 
    outfile = destination file
    dataf   = frame containing data to be saved
    xbin    = number of rows
    ybin    = number of columns
Returns     = NONE

Used local vaiables    = 
    outfile     = name of output file
    filename    = full path of output file
    fn          = file pointer
"""

def save_diff_data(outfile, dataf, xbin, ybin):
    print('Now Saving ', outfile, "...") 
    filename = diffdatadir + outfile + "-diff.csv"        

    fn = open(filename,'w')
    for i in range(xbin):
        xystr = ""
        for j in range(ybin-1):
            xystr = xystr + str(dataf[i][j]) + ","
        xystr = xystr + str(dataf[i][ybin-1]) + "\n"
        fn.writelines(xystr)
    
    fn.close()
    print('Data Saved in ', outfile) 
    
####################################################    
"""
This function reads the input file and returns its content in a data frame
Name        = read_data

Input arguments      = 
    filename = full path of input file 
    dataf   = frame containing data to be saved
Returns     = data frame with contents of the file

Used local variables    =
    df      = data frame to return the content to the caller
"""    
def read_data(filename): 
    print("Reading file ", filename, "....")
    datafile = rawdatadir + filename               #gateddata.csv'
    df = pd.read_csv(datafile, header=None)      #, index_col=0)
    return df

####################################################    
"""
This function is used for this particular file naming convention.
Here, the file names use _ and sequential integers.
This integers are extracted and used for naming the output file 
Name    = get_file_no

Input arguments
    filename    = short name of the file

Returns         = integer (file number)

Used local variables    =
    fno = integer value (sequence) in the file name. For example, the file name -sample_47_may.fcs' returns 47.  
"""
def get_file_no(filename):
    leftstr = filename.split('-')[0]
    fno = leftstr.split('_')[4]
    return fno

####################################################    
"""
This function calculates the difference matrix of frames extracted from two data files.
The difference (absolute) is the distance between the frames.
If needed, the formula for geometric distance can be applied (Pythagorean) 
It then saves the resulting matrix to a file.
Name    = get_and_save_diff

Input arguments 
    Sample1     = file containing the gated data for the first sample
    Sample2     = filee containing the gated data for the second sample

Returns         = None
Used local variables    =
    dframe1     = data frame for sample1 
    dframe2     = data frame for sample2 
    numrows     = number of rows of data
    numcols     = number of columns in the data   
    dataxy1     = vector to read data from ith row of frame1
    dataxy2     = vector to read data from ith row of frame2
    diffArray   = 2D matrix for holding the difference between the corresponding 
    filename    = name of output file
"""    
def get_and_save_diff(sample1, sample2):
    print("Calculating difference between: ", sample1, " and ", sample2, "...")
    dframe1 = read_data(sample1)
    dframe2 = read_data(sample2)
    numrows = dframe1.shape[0]
    numcols = dframe1.shape[1]
#    print ("Number of row, cols = (", numrows, ",", numcols, ")")
    diffArray = np.zeros((numrows, numcols), dtype=np.int32)
    for i in range(numrows):
       dataxy1 = dframe1.iloc[i]
       dataxy2 = dframe2.iloc[i]        
       for j in range(numcols):
            diffArray[i][j] = abs(dataxy1[j] - dataxy2[j])
            
    filename = getfileno(sample1) + "-" + getfileno(sample2)
    save_diff_data(filename, diffArray, numrows, numcols)

####################################################    
"""
This is the program entry point (main)
The program starts by retrieving the list of files in the rawdatadir folder/directory
It then calculates the distance between two files 
Name    = none

Input arguments = none 

Returns         = None
Calls the os package
Used local variables    =
    filelist    = array containing names of files in the rawdatadir folder
    samplesize  = number of files in folder
    i, j, k     = loop counters
"""
filelist  = os.listdir(rawdatadir)  #retrieve file names
samplesize = len(filelist)          #get the number of files and print the list
for i in range(samplesize):
    print(i, filelist[i])
    
print("Sample Size = ", samplesize, "\n")
k=0
for i in range(samplesize):
    for j in range(i+1,samplesize):
        get_and_save_diff(filelist[i], filelist[j])
        print(i,"-",j)
        k=k+1
print("Total number of inter-file difference computations:- ", k)
