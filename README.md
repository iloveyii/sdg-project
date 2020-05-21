PC3 Cell Analysis
=====================================

This is a micro services based web application for analysing the prostrate cancer cells. This application gets data from 
FCS file uploaded by the user and then using Flow Cytometry Tools in Python the results are shown
visually on a web application.

The following tools and technologies have been used in this project.


Python                   |  Docker
:-------------------------:|:-------------------------:
![Python](https://github.com/iloveyii/cell-analysis/blob/master/install/python.png)  |  ![Docker](https://github.com/iloveyii/sdg-project/blob/master/install/dockerhero.jpg)
![JS](https://github.com/iloveyii/cell-analysis/blob/master/install/js1.png)  |  ![Node](https://github.com/iloveyii/cell-analysis/blob/master/install/node1.png)
![Django](https://github.com/iloveyii/cell-analysis/blob/master/install/phyton-django.jpg)  |  ![html5](https://github.com/iloveyii/cell-analysis/blob/master/install/html51.png)
![React](https://github.com/iloveyii/cell-analysis/blob/master/install/react.jpg)  |  ![Micro-service](https://github.com/iloveyii/sdg-project/blob/master/install/microservices.png)
![hkr](https://github.com/iloveyii/cell-analysis/blob/master/install/hkr.png)  | ![machine learning](https://github.com/iloveyii/cell-analysis/blob/master/install/machine-learning.jpeg)   

## [DEMO APP](http://pc3.servebeer.com/)

![screenshots](https://github.com/iloveyii/cell-analysis/blob/master/run.gif)

## Add SSH key to Github
   ![install-demo](https://github.com/iloveyii/cell-analysis/blob/master/install/add_ssh_key_to_github.gif)
   * ssh-keygen
   * cat ~/.ssh/id_rsa.pub 
   * Copy and paste to github
   
## Installation
   ### Docker 
   ![install-demo](https://github.com/iloveyii/cell-analysis/blob/master/install/install_docker_ubuntu1804.gif)
   *  sudo apt update
   *  sudo apt install apt-transport-https ca-certificates curl software-properties-common
   *  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
   *  sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"
   *  sudo apt update
   *  apt-cache policy docker-ce
   *  sudo apt install docker-ce
   *  sudo systemctl status docker
   
   ### Docker compose
   ![install-demo](https://github.com/iloveyii/cell-analysis/blob/master/install/install_docker_compose_ubuntu1804.gif)
   *  sudo curl -L https://github.com/docker/compose/releases/download/1.21.2/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
   * sudo chmod +x /usr/local/bin/docker-compose
   * docker-compose --version
   
   ### Clone repo
   ![install-demo](https://github.com/iloveyii/cell-analysis/blob/master/install/clone_repo.gif)

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
   * After the containers are up browse to:
   http://localhost
 
 
## Directory structure
   ![Directory-structure](https://github.com/iloveyii/sdg-project/blob/master/install/directory_structure.png)

## How it works ?
## Contributions
   * Two docker images prepare for this project and hosted on https://hub.docker.gom
   * A Droplet purchased and deployed on Digital Ocean.
   * An open source project for Cancer cell analysis using Flow Cytometry on github.
