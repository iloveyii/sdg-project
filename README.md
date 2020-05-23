PC3 Cell Analysis
=====================================

This is a micro services based web application for analysing the prostrate cancer cells. This application gets data from 
FCS file uploaded by the user and then using Flow Cytometry Tools in Python the results are shown
visually on a web application.

The following tools and technologies have been used in this project.


Python                   |  Docker
:-------------------------:|:-------------------------:
![Python](https://github.com/iloveyii/sdg-project/blob/master/install/python.png)  |  ![Docker](https://github.com/iloveyii/sdg-project/blob/master/install/dockerhero.jpg)
![JS](https://github.com/iloveyii/sdg-project/blob/master/install/js1.png)  |  ![Node](https://github.com/iloveyii/sdg-project/blob/master/install/node1.png)
![Django](https://github.com/iloveyii/sdg-project/blob/master/install/phyton-django.jpg)  |  ![html5](https://github.com/iloveyii/sdg-project/blob/master/install/html51.png)
![React](https://github.com/iloveyii/sdg-project/blob/master/install/react.jpg)  |  ![Micro-service](https://github.com/iloveyii/sdg-project/blob/master/install/microservices.png)
![hkr](https://github.com/iloveyii/sdg-project/blob/master/install/hkr.png)  | ![machine learning](https://github.com/iloveyii/sdg-project/blob/master/install/machine-learning.jpeg)   

## [DEMO APP](http://pc3.servebeer.com/)
### [LINK 1](http://pc3.servebeer.com/)
### [LINK 2](http://pc3.servebeer.com:8000/)

| screenshot1 | screenshot2 |
| :---         |          ---: |
| ![screenshots](https://github.com/iloveyii/sdg-project/blob/master/install/classifcation.gif)   | ![screenshots](https://github.com/iloveyii/sdg-project/blob/master/install/custom_plots.gif)    |
## Add SSH key to Github
   ![install-demo](https://github.com/iloveyii/sdg-project/blob/master/install/add_ssh_key_to_github.gif)
   * ssh-keygen
   * cat ~/.ssh/id_rsa.pub 
   * Copy and paste to github
   
## Installation
   ### Docker 
   ![install-demo](https://github.com/iloveyii/sdg-project/blob/master/install/install_docker_ubuntu1804.gif)
   *  sudo apt update
   *  sudo apt install apt-transport-https ca-certificates curl software-properties-common
   *  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
   *  sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"
   *  sudo apt update
   *  apt-cache policy docker-ce
   *  sudo apt install docker-ce
   *  sudo systemctl status docker
   
   ### Docker compose
   ![install-demo](https://github.com/iloveyii/sdg-project/blob/master/install/install_docker_compose_ubuntu1804.gif)
   *  sudo curl -L https://github.com/docker/compose/releases/download/1.21.2/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
   * sudo chmod +x /usr/local/bin/docker-compose
   * docker-compose --version
   
   ### Clone github repository and run application
   ![install-demo](https://github.com/iloveyii/sdg-project/blob/master/install/clone_repo.gif)

   * Clone repo `git clone git@github.com:iloveyii/sdg-project.git`
   * cd sdg-project
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
   
   ![compose-up](https://github.com/iloveyii/sdg-project/blob/master/install/docker-compose-up.gif)

 
 
## Directory structure
   ![Directory-structure](https://github.com/iloveyii/sdg-project/blob/master/install/directory_structure.png)
   
   This application has been divided into two major modules, one for frontend and the second for backend. The front end
   provides user interface and has been developed in React.
   The backend provides the different APIs for analysis of the FCS files and has been developed in Python, Django, Node.
### Frontend
   * The frontend has further subdirectories for components, pages, context and themes.
   * The component directory contains all the React components used
   * The pages provide different containers
   * The context is using React hook context api.
   * Themes contains different themes available for the frontend.
   
### Backend
   * The directories (basicanalysis, classification, machinelearning, node_auth_server, plotting) are the microservices developed in Python.
   * Each service has basically two files, i.e api.py and service_name.py (e.g basic.py, classification.py etc)
   * The api.py is a restful service in Flask, which gets data from the related class and sends it to API gateway service.
   * The main API gateway is contained in djangoweb directory and written in Python Django framework. 
   * The sub directory djangoweb/api is where the code from API gateway resides and has all the models, migrations, templates, router (url.py) and main controller(views.py).
   * The request coming from browser is first checked in the url.py. If it matches a path then the associated method in the views.py is called. 
   * The methods in views.py in turn calls the different services and sends their response to the frontend.
   * The shared directory contains all the plots generated by all the services, which are served to the browser.

## How it works ?
   * The backend is based on micro services architecture using Docker containers. 
   * Each sub directory e.g (classification, machinelearning) correspond to a docker container. Each container provides a service to the application. 
   * For example the db container provide service about database. All the services of the application are listed and configured in the docker-compose.yml.
   * This separation and organization of code into different directories give the freedom of easily maintaining and deployment, plus stability in the code. It also provide easy scalability by popping up more containers and services in an easy and independent way. 
   * The backend has a gateway service which handle each request from the frontend. The inner containers/services are not directly accessible from outside which makes it more secure. 
   * When the user first login to the system the gateway service routes the request to the node auth server which returns json web token to the gateway. The gateway sends the token to the user browser which stores it in cookies and uses it for further communication with the gateway.
   * After the login the user can call the gateway for any service for example the frontend sends request for basic analysis, which the gateway receives and send it to the basicanalysis service internally. 
   * As soon as the gateway gets the response from any service it is then returned to the frontend/browser.
   This process is illustrated in the figure above (micro services).
   
## Contributions
   * Two docker images prepare for this project and hosted on [Docker Hub](https://hub.docker.com)
   * A premium droplet deployed on [Digital Ocean](https://www.digitalocean.com/).
   * A premium EC2 deployed on [AWS](https:/aws.com).
   * An open source project for Cancer cell analysis using Flow Cytometry on github.
