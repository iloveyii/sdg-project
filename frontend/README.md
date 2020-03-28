# Cell Data Project - Frontend
This supports multi-file upload.

## Setup
###Frontend
Run the following to install the modules
```
npm i 
```
Inside the .env file, change the port to reflect the port of the server where file is to be uploaded.
```
http://localhost:8000
```
The request parameters sent to the server are as follows:

```
{'file': [{'filename': 'Test.fcs', 'body': b'test file for fcs', 'content_type': 'application/octet-stream'}]}
```
###Backend
Open the readme in the _bc folder and follow the instructions.


## Running the app - Dev Mode
###Frontend

```
npm run start 
```
###Backend 

```
npm run server
```

##Modules Used - Frontend

React-hook-form
Validation of the form inputs

Material - UI
Form look and Feel


