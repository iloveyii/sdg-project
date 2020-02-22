# Cell Data Project - Frontend

## Setup
Run the following to install the modules
```
npm i 
```
Navigate to /src/upload/upload.js line 171 and change the port to reflect the port of the server wher efile is to be uploaded.
```
req.open("POST", "http://localhost:5001/");
```
The request parameters sent to the server are as follows:

```
{'file': [{'filename': 'Test.fcs', 'body': b'test file for fcs', 'content_type': 'application/octet-stream'}]}
```