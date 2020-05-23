
import numpy as np
from sklearn import svm, metrics
from sklearn.model_selection import cross_val_score, train_test_split

import os  
import pandas as pd 
import numpy as np
from pandas import read_csv

from pathlib import Path, PurePath
from helper import getFcsFilesToUse, getDataToModel

dirpath = Path().parent.absolute()

#rawdatadir = PurePath.joinpath(dirpath,'data/gated/')
diffdatadir = PurePath.joinpath(dirpath,'data/diff/')

def read_data(filename): 
    print("Reading file ", filename, "....")
    datafile = PurePath.joinpath(diffdatadir, filename)   
    df = pd.read_csv(datafile, header=None)     
    return df



filelist  = os.listdir(diffdatadir)  
samplesize = len(filelist)         
for i in range(samplesize):
    print(i, filelist[i])
    
filesToDf = getDataToModel(filelist, 5, 5, 12, 12)

data = pd.DataFrame(filesToDf)

X = data.iloc[:, [0,1]]
y = data.iloc[:, [2]]
X = X.astype(int)
y = y.astype(int)

XTrain, XTest, yTrain, yTest = train_test_split(X, y, test_size = 0.2, random_state=None)

def implementSVM():
    svc = svm.SVC(C=5, gamma=0.05).fit(X,y)
    
    cv_scores = cross_val_score(svc, X, y, cv=5)  
    
    
    yPred = svc.predict(XTest)
        
    cm = metrics.confusion_matrix(yTest, yPred)
    
    accuracy = metrics.accuracy_score(yPred, yTest)


    return cv_scores, accuracy, cm


cv_scores, accuracy, cm = implementSVM()    
