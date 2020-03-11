# Cell Data Project - Frontend
This supports multi-file upload.

## Setup
Run the following to install the modules
```
npm i 
```
Navigate to /src/upload/upload.js line 171 and change the port to reflect the port of the server wher efile is to be uploaded.
```
req.open("POST", "http://localhost:8000/");
```
The request parameters sent to the server are as follows:

```
{'file': [{'filename': 'Test.fcs', 'body': b'test file for fcs', 'content_type': 'application/octet-stream'}]}
```

## Running the app - Dev Mode

```
npm run start 
```

##Modules Used

React-hook-form
Validation of the form inputs

Material - UI
Form look and Feel
