import pandas as pd
import numpy as np 
from preprocess import read_data

#dataset = pd.read_csv('data.fcs', header=None, sep='\s\s+', engine='python')

#print(dataset.head())

def getColumnNames(filename):
    print("Reading .fcs file ", filename)
    shortfilename = filename.split('.')[0]
    sample = read_data(filename)
    return sample

#columns = getColumnNames('A06 Ut SY.FCS')

#print(columns.channel_names)

def getScatterPlotData(filename):
    data = 'Not ready yet'
    return data

#Load file

#Preprocess

#Create Model

#Apply Model

