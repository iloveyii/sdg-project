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

##[DEMO APP](https://hkr-iot-lab1.firebaseapp.com/)


## Installation
   * Clone repo `git clone https://github.com/iloveyii/iot-lab`
   * sudo docker-compose up 
   * Browse to to http://localhost:80. Please stop any service on port 80 before running.    

## Implementation

### OS install
  * Download Raspbian Buster with Desktop from `https://www.raspberrypi.org/downloads/raspbian/`.
  * Extract the image from the above step and write to SD card using Ubuntu Image Writer or Etcher.
  * In the boot partition of SD card `touch ssh` to enable ssh.
  * Auto connect to wifi, nano `/etc/wpa_supplicant/wpa_supplicant.conf` and add the following at the end
```bash
network={
   ssid="your-wifi"
   psk="your-wifi-password"
}
``` 
  * Eject SD card from computer and place in PI, power up PI.
  * To ssh to PI you need to find IP and may scan network by using `nmap -sS 192.168.0.0/24` or whatever is your network.
  * ssh pi@192.168.0.11, assuming this is your ip, default username is pi and password is raspberry. Change it by `sudo passwd pi`'
  * Install required packages `sudo apt install bluetooth bluez libbluetooth-dev libbluetooth-dev libudev-dev`
  
  
### Node - install
  * Install Node Version Manager (NVM)
    `curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash`
  * Source profile
    `source ~/.bashrc`
  * Install node v8 `nvm install 8`
  * Set as default `nvm use 8` 
  * If you want to use latest npm `npm install npm@latest -g`
  
     
## Firebase config
  * Create a google account (google.com)
  * Goto firebase console (https://console.firebase.google.com)
  * Add a project
  * Goto Project Overview and click Add app, select web (<>) and then follow the instructions.
  * From the above step you will get web app credentials.
  * To integrate with node js you need to install firebase-admin package
  * Goto Project settings ( gear icon)  > Service accounts and then click Generate new key, download it.
  * Now goto Real-time database and click ellipses (...) and then 'create new database'



## Issues and solution
   * The web app may not read the data initially from the realtime database
   * To fix it click Develop > Database > Real time database > Rules > then change read, write to 'true', then click publish.
   * Better to run command under root `sudo su`
   * Set home directory as `export NODEJS_HOME=/usr/share/nodejs/bin`
   * To set the display resolution `nano /boot/config.txt`, and set `hdmi_mode	16`.
   * sh: 1: node: Permission denied
```
npm config set user 0
npm config set unsafe-Color sensor started! 
perm true
```

## Install Code OSS on PI
   * `wget https://packagecloud.io/headmelted/codebuilds/gpgkey`
   * `sudo apt-key add gpgkey`
   * `sudo -s`
   * `. <( wget -O - https://code.headmelted.com/installers/apt.sh )`
   * `apt-get install code-oss=1.29.0-1539702286`
   * This rolls back to an earlier version. This does mean if you run apt-get update at a later date the latest version will be installed, breaking it again. To stop this happening, you can lock the version using:
     
     `apt-mark hold code-oss`
     Once a fix has been released, you can remove the version lock with:
     
     `apt-mark unhold code-oss`
   
## Firebase functions
   * npm i -g firebase-tools
   * firebase login
   * firebase init functions
   * firebase deploy --only functions --debug

## SD card
   * Clone SD cards 
```bash
    sudo dd if=/dev/sda of=~/sda.img bs=4096 conv=notrunc,noerror status=progress
```
