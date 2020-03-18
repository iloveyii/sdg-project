import FlowCytometryTools
import os
from FlowCytometryTools import test_data_dir, test_data_file, FCMeasurement
import pandas as pd
#import numpy as np
#from pandas import read_csv
from pathlib import Path, PurePath
import json

dirpath = Path().parent.absolute()

rawdatadir = PurePath.joinpath(dirpath,'data/raw/')
transformeddatadir = PurePath.joinpath(dirpath,'data/transformed/')

    
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


    
def read_data(filename): 
    datafile = PurePath.joinpath(rawdatadir, filename)    #'sandysample.fcs'
#    from FlowCytometryTools import FCMeasurement
    df = FCMeasurement(ID='Test Sample', datafile=datafile)
    return df

def implementMain():
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
        print(channelnames)
        
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
def cleanTupleString(strings):
    newString = ''.join(json.dumps(strings))

    newString = newString.replace(" ","")
    newString = newString.replace("[","")
    newString = newString.replace("]","")
    newString = newString.replace('"','')

    return newString
    
def getColumnNames(filename):
    print("Reading columns from .fcs file ", filename)
    sample = read_data(filename)
    channelnames = cleanTupleString(sample.channel_names)
    return channelnames

def getPlotData(channelx, channely, transformation, filename):
    print("Reading selected columns from .fcs file ", filename)
    shortfilename = filename.split('.')[0]
    sample = read_data(filename)
    
    data1 = sample.data[channelx]
    data2 = sample.data[channely]
    data3 = pd.concat([data1,data2], axis=1)
    
    outfile = shortfilename + 'out.csv'
    save_data_file(data3,outfile)
    print('Plot Data Saved...', outfile)
#    print(channelnames)
    
    return data1, data2, data3.to_json(orient='records')



    
#implementMain()
#sampl = getColumnNames("A06 Ut SY.FCS")

#data1, data2, data3 = getPlotData("FSC-A", "PE-A", "hlog", "A06 Ut SY.FCS")
#jsn = data3.to_json(orient='records')
# 