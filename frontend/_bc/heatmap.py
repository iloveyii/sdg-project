#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Mon Mar  2 06:07:29 2020

@author: dave

This program performs two major functions
1. It generates the heamap (which can be visualised if needed)
2. It filters gated data
The number of bins into which the data is aggregated depends on the data range and desired BINWIDTH (below)
The data range is programatically calculate from the input itself
The total number of bins is the range divided by the BINWIDTH (assuming there are no negative values)
If the data contains negative values, then the range is the difference between the maximm and the minimum in a column of data.

*** Note that if BINWIDTH is smaller, the program will be slower and needs more memory
"""

#BINWIDTH = 1000
#rawdatadir = '/home/dave/codes/python/FlowCytometryTools-master/data/transformed/'
#heatmapdatadir = '/home/dave/codes/python/FlowCytometryTools-master/data/heatmap/'
#gateddatadir = '/home/dave/codes/python/FlowCytometryTools-master/data/gated/'

import os
import pandas as pd
import numpy as np
from pandas import read_csv

from pathlib import Path, PurePath

dirpath = Path().parent.absolute()

rawdatadir = PurePath.joinpath(dirpath,'data/transformed/')
heatmapdatadir = PurePath.joinpath(dirpath,'data/heatmap/')
gateddatadir = PurePath.joinpath(dirpath,'data/gated/')
####################################################    
"""
This function saves the heatmap (frequency count) and the gated output for further processing
The heatmap is generated from the transformed data in the 'rawdatadir' directory
The gated output is generated from the heatmap (before saving)
Name        = save_heatmap_gated_data

Input arguments      = 
    outfile = destination file
    datatype = integer (1= output is heat map, 2 = output is gated)
    dataf   = frame containing data to be saved
    xbin    = number of rows
    ybin    = number of columns

Returns     = NONE

Used local vaiables    = 
    filename    = full path of output file
    fn          = file pointer
    xystr        = string for arranging output data in .csv format
    i, j        = counters (index)
"""

def save_heatmap_gated_data(outfile, datatype, xbin, ybin, dataf):
    print('Now Saving ', outfile, "...") 
    if (datatype == 1):
        filename = PurePath.joinpath(heatmapdatadir, (outfile + "-hm.csv"))        
    else:
        filename = PurePath.joinpath(gateddatadir, (outfile + "-gate.csv"))

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

Returns     = data frame with contents of the file

Used local variables    =
    df      = data frame to return the content to the caller
"""
def read_data(filename): 
    datafile = PurePath.joinpath(rawdatadir, filename)              #'transformdata.csv'
    df = pd.read_csv(datafile)                      #, header=None
    print("\nRead file ", filename, "....")
    return df

##################################
"""
This function is used to filter data in a frame according to a predefined gate coordinates and save it to to an output file

Name        = read_data

Input arguments      = 
    x1,x2,y1,y2  = coordinates of a rectangular gate  
    dataframe    = input data frame
    
Returns     = data frame with contents of the gated output 

Used local variables    =
    i, j    = counters (index)
    gated   = data frame to return the content to the caller

"""
def gating(x1, x2, y1, y2, dataframe):
    gated = np.zeros((1+x2-x1, 1+y2-y1), dtype=np.uint16)

    for i in range(0,x2-x1):
        for j in range(0,y2-y1):
            gated[i][j] = dataframe[i+x1][j+y1]
            
    return gated
    
####################################################    
"""
This function generates heatmap and gated filtered files.
The heatmap represents the frequency of the number of events in a specific bin.
The bin size depends on the input data range and BIN_WIDTH (declared earlier)
The gated data is the filtered output depending on the gate filter location
It then saves the resulting data into two files: heatmap (full heatmap) and gated (filtered).
Name    = generate_map_and_gate

Input arguments 
    dframe     = frame containing the row 2-column data (may be transformed)
    filename   = name of output file 

Returns         = None
Used local variables    =
    numrows     = number of rows of data
    numcols     = number of columns in the data   
    datax       = vector to read data from colx
    datay       = vector to read data from coly
    xmax        = maximum for colx
    ymax        = maximum for coly
    x1,x2,y1,y2 = coordinates of a rectangular gate
    xbin        = number of rows (number of vertical bins)
    ybin        = number of columns (number of horizontal bins)
    binArray    = 2D matrix for holding the count (frequency) of data in a 2D bin [xbin X ybin]) 
    i, j        = counters (index)
    filename    = name of output file
""" 

def generate_map(dframe, filename, x1, y1, x2, y2, binwidth):
    print("Generating Heatmap for: ", filename, "...")
    numrows = dframe.shape[0]
    print ("numrows = ", numrows)
    datax = dframe['xcol']
    xmax = max(datax)
    datax = dframe[' ycol']
    ymax = max(datax)
    print("MAX(x,y) = ", xmax, ',', ymax)
    xbin = int(xmax/binwidth) + 1
    ybin = int(ymax/binwidth) + 1
    binArray = np.zeros((xbin, ybin), dtype=np.int32)
    
    #Generate heatmap by counting number of events in a bin, for each data row
    for i in range(numrows):
        dataxy = dframe.iloc[i]
        xval = int(dataxy[1] / binwidth)
        yval = int(dataxy[2] / binwidth)
        binArray[xval][yval] = 1 + binArray[xval][yval]
        
    print("Heatmap Generation Complete for: ", filename, ". Now saving...")
    save_heatmap_gated_data(filename, 1, xbin, ybin, binArray)   #save heatmap data
    
    """
    Generate gated output from the heatmap
    Gate coordinates: (x1, y1) - (x2, y2)
    """
    gateddata = gating(x1, x2, y1, y2, binArray)
    print("Gating Complete for: ", filename, ". Now saving...")
    save_heatmap_gated_data(filename, 2, x2-x1, y2-y1, gateddata)    #save gated data
     


#def implementMain():       
#    filelist = os.listdir(rawdatadir)
#    
#    for longfilename in filelist:
#        dframe = read_data(longfilename)
#        shortfilename = longfilename.split('out.')[0]
#        generate_map(dframe, shortfilename)
#



#binwidth??
def generateGatedOutputsPlusHeatmap(listOfFiles, x1, y1, x2, y2, binwidth):
#    list of files is from db (get filters or something) that match filter criteria only
    try:
        for longfilename in listOfFiles:
            dframe = read_data(longfilename)
            shortfilename = longfilename.split('out.')[0]
            generate_map(dframe, shortfilename, x1, y1, x2, y2, binwidth)
            print("Gating complete")
        return True
    except:
        return False
    




#lfiles = ['A02 Kranvatten kvall SYBRout.csv','A06 Ut SYout.csv']
#generateGatedOutputsPlusHeatmap(lfiles,5,5,12,12)










        

"""
print ("\nResult:")  
  
for i in range(x1,x2):
    pstr = ""
    for j in range(y1,y2):
        pstr = pstr + str((gated[i-x1][j-y1])) + "\t"
    print(pstr)
"""    
