#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Thu Mar  5 23:21:57 2020

@author: dave

INSTALL The Flow Cytometry package first.
It is available at: 
    https://eyurtsev.github.io/FlowCytometryTools/index.html
    
This program reads an .fcs file and does the following:
    1. Show the attributes (channels) of the sample
    2. Show other metadata about the sample
    3. Show the size of the data (Frame size = ros X columns)
    4. Allows you to select two columns from the list and extract their values
    5. Show some statistical parameters of the selected columns 

"""
import FlowCytometryTools    #The cytometry package you have installed

import pandas as pd
import numpy as np
from pandas import read_csv
    
def read_data(): 
    datadir = '/home/dave/codes/python/FlowCytometryTools-master/data/raw/'
    datafile = datadir + 'BCK_16_May_11_33.fcs'   #'sandysample.fcs'
    from FlowCytometryTools import FCMeasurement
    testsample = FCMeasurement(ID='Test Sample', datafile=datafile)
    return testsample

"""
Program starts below:
    It reads the file into a frame called 'sample'
"""
 
sample = read_data()
print('\n****Sample reading complete.****\n')
print(sample.channel_names)

print('\n****Now printing meta data...')
print(type(sample.meta))

print('\n****Now printing meta data keys...')
print(sample.meta.keys())

print('\n****Now printing channel names...')
print('----------------------------------\n')
print(sample.channels)

print('\n****Now printing meta values (meta[$BEGINSTEXT])...')
print(sample.meta['$BEGINSTEXT'])

print('\n****Now printing name of first channel [0]...', sample.channel_names[0])
print('\n****Now printing type of sample data...')
print(type(sample.data))

print('\n****Now printing data shape (dimension)...')
print('(',sample.data.shape[0],',',sample.data.shape[1],')')

"""
#You can hard code the channels if you want to.
#Then you should uncomment lines 86-87 and comment lins 89-91 if you want to hard code
ichannelx = 4
ichannely = 6
"""
print('Please select two channels you would like to process from the following:\n', sample.channel_names)
ichannelx = input("First Channel: ")
ichannely = input("Second Channel: ")

channelnames = sample.channel_names
channelx = channelnames[int(ichannelx)-1]
channely = channelnames[int(ichannely)-1]


print('\n****Now printing rows of sample data...')
#print(sample.data[['SSC-A', 'FSC-A']][:-10])

print(sample.data[[channelx, channely]][:-10])
print('\n\n****Now printing rows of sample data values...')

print('\n****Now sample rows from selected channels ...')
print(sample.data[[channelx, channely]][100:110].values)

print('\n****Now printing statistics of the first channel...(', channelx, ')')
print("median\t\t", sample.data[channelx].median())
print(sample.data[channelx].describe())

print('\n****Now printing statistics of the second channel...(', channely, ')')
print("median\t\t", sample.data[channely].median())
print(sample.data[channely].describe())

print('\n************* E N D ************* \n')
