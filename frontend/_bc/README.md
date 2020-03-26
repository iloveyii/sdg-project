# Cell Data Project - Backend
This implements all endpoints

## Setup
Run the following to install the modules
```
pip install pandas, FlowCytometryTools, Tornado, psycopg2, asyncio
```
The default URL is:
```
http://localhost:8000
```
The available endpoints are:

* /
* /loadFcsFiles
* /plotGraph
* /loadColumns
* /loadUser
* /saveUser



## Entry Point to the app 
In the console, type the following (or use the npm run server from the frontend folder)

```
Python index.py 
```


## Troubleshooting
```bash
sudo apt-get install python-psycopg2
sudo apt-get install python3-psycopg2
```
