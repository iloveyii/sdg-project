PC3 Cell Analysis
=====================================

This is a micro services based web application for analysing the prostrate cancer cells. This application gets data from 
FCS file uploaded by the user and then using Flow Cytometry Tools in Python the results are shown
visually on a web application.

The following tools and technologies have been used in this project.


Firebase                   |  IFTTT
:-------------------------:|:-------------------------:
![fb](https://github.com/iloveyii/iot-lab/blob/master/images/firebase1.png)  |  ![ifttt](https://github.com/iloveyii/iot-lab/blob/master/images/ifttt1.png)
![fb](https://github.com/iloveyii/iot-lab/blob/master/images/html51.png)  |  ![ifttt](https://github.com/iloveyii/iot-lab/blob/master/images/js1.png)
![fb](https://github.com/iloveyii/iot-lab/blob/master/images/node1.png)  |  ![ifttt](https://github.com/iloveyii/iot-lab/blob/master/images/smarthome.jpg)
![fb](https://github.com/iloveyii/iot-lab/blob/master/images/thingy.jpg)  | ![fb](https://github.com/iloveyii/iot-lab/blob/master/images/hkr.png)   

## [DEMO APP](https://hkr-iot-lab1.firebaseapp.com/)

![screenshots](https://github.com/iloveyii/cell-analysis/blob/master/run.gif)

## Add SSH key to Github
   * ssh-keygen
   * cat ~/.ssh/id_rsa.pub 
   * Copy and paste to github
   
## Installation
   ### Docker 
   *  sudo apt update
   *  sudo apt install apt-transport-https ca-certificates curl software-properties-common
   *  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
   *  sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"
   *  sudo apt update
   *  apt-cache policy docker-ce
   *  sudo apt install docker-ce
   *  sudo systemctl status docker
   
   ### Docker compose
   *  sudo curl -L https://github.com/docker/compose/releases/download/1.21.2/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
   * sudo chmod +x /usr/local/bin/docker-compose
   * docker-compose --version
   
   
   ### Clone repo
   * Clone repo `git clone git@github.com:iloveyii/cell-analysis.git`
   * cd cell-analysis
   * Pull some images from hub.docker.com
```     
    docker pull node:8
    docker pull alikth/basic_cell:latest
    docker pull alikth/ml_cell:latest
```
   * Run docker-compose
   `sudo docker-compose up `
 
## Contributions
   * Two docker images prepare for this project and hosted on https://hub.docker.gom
   * A Droplet purchased and deployed on Digital Ocean.
   * An open source project for Cancer cell analysis using Flow Cytometry on github.
