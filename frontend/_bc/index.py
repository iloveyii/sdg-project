import tornado.web #GET, POST etc to receive requests
import tornado.ioloop #Thread listens for requests; always needs to be up
from tornado.escape import json_decode
import json

from preprocess import getColumnNames, getPlotData #, applyModel
from db import loadOne, loadData, saveMeta, saveEntry, listArrayToJson
from pathlib import Path, PurePath

import asyncio
asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy()) #Tornado won't work without this

dirpath = PurePath.joinpath(Path().parent.absolute(),'data/raw/')

class BaseHandler(tornado.web.RequestHandler):
    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "*")
        self.set_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')

    def options(self):
        # self.set_header("Access-Control-Allow-Headers", "*")
        self.set_status(204)
        self.finish()

class UploadHandler(BaseHandler):
    def get(self):
        self.render("index.html")

    def post(self): #If exists, doesn't overwrite
        # print("on my way") 
        # print(self.get_argument("location"))
        files = self.request.files["file"]
        for f in files:
            fh = open(f"{dirpath}/{f.filename}", "wb") #wb is write in binary to accept any file format
            fh.write(f.body)
            fh.close()
            
            colNames = getColumnNames(f.filename)

            #Write record to relational database
            sql = """INSERT INTO tbmeta(location,category,datetime,filename,uploadname,channels)
            VALUES(%s,%s,%s,%s,%s,%s) RETURNING id;"""
            values = []
            values.append(self.get_argument("location"))
            values.append(self.get_argument("category"))
            values.append(self.get_argument("dateTime"))
            values.append("xxxxxxxxxxxx")
            values.append(f.filename)
            values.append(colNames)

            saveEntry(sql, values)

            saveResponse = saveMeta(self.get_argument("location"), self.get_argument("category"), self.get_argument("dateTime"), "000", f.filename, colNames)

        self.write({"status":"success", "message":"saved"})

class PlotGraphHandler(BaseHandler):
    def get(self):
        # self.write(self.get_query_argument("fcs"))
        # self.write(self.get_query_argument("xval"))
        # self.write(self.get_query_argument("yval"))
        # self.write(self.get_query_argument("transformation"))
        
        fcsFilename = self.get_query_argument("fcs")
        xval = self.get_query_argument("xval")
        yval = self.get_query_argument("yval")
        transformation = self.get_query_argument("transformation")
        
        
        data1, data2, data3 = getPlotData(xval, yval, transformation, fcsFilename)

        self.write(data3)
        
        
#        data1, data2, data3 = getPlotData("FSC-A", "PE-A", "hlog", "A06 Ut SY.FCS")
        # self.write("Not implemented yet")
        # query = "select channels from tbmeta where id=%s "
        # results = loadOne(query, self.get_query_argument("fcs"))
        # channels = listArrayToJson(results) 
        # self.write(channels)


class GetUploadsHandler(BaseHandler):
    def get(self):
        query = "select distinct left(uploadname,-4) as name, uploadname as id from tbmeta"
        results = loadData(query)
        self.write(json.dumps(results))


class GetColumnsHandler(BaseHandler):
    def get(self):
        query = "select channels from tbmeta where uploadname=%s "
        params = []
        params.append(self.get_query_argument("fcs"))
        results = loadOne(query, params, False)
        response = {"status":False}
        if(results):
            channels = listArrayToJson(results) 
            response["status"] = True
            response["payload"] = channels
        else:
            response["message"] = "Something went wrong."
        self.write(json.dumps(response))

class GetUserData(BaseHandler):
    def get(self):
        query = "select fullname,email,mobilephone,usergroup,userid,location,locationdescription,trials from tbusers where email = %s and password = %s "
        params = []
        params.append(self.get_query_argument("user"))
        params.append(self.get_query_argument("pass"))
        results = loadOne(query, params, True)
        response = {"status":False}
        if(results):
            response["status"] = True
            response["payload"] = results
        else:
            response["message"] = "Something went wrong."

        self.write(json.dumps(response))

class SaveUserData(BaseHandler): 

    def post(self):
        self.set_header("Content-Type", 'application/json')
        self.args = json_decode(self.request.body)
        sql = """INSERT INTO tbusers (email,password,fullname,trials,locked,active)
        VALUES(%s,%s,%s,%s,%s,%s) RETURNING userid;"""
        values = []
        values.append(self.args.get("email"))
        values.append(self.args.get("password"))
        values.append(self.args.get("name"))
        values.append(0)
        values.append(False)
        values.append(True)

        results = saveEntry(sql, values)
        print(results)
        response = {"status":False}
        if(results):
            response["status"] = True
            response["payload"] = results
        else:
            response["message"] = "Something went wrong. Try another Email"

        self.write(json.dumps(response))

if (__name__ == "__main__"):
    app = tornado.web.Application([
        ("/", UploadHandler),
        ("/uploads/(.*)", tornado.web.StaticFileHandler, {"path":"/uploads"}),
        ("/loadFcsFiles", GetUploadsHandler), #Get list of all uploaded fcs files from db
        ("/plotGraph/", PlotGraphHandler),
        ("/loadColumns/", GetColumnsHandler),
        ("/loadUser/", GetUserData),
        ("/saveUser/", SaveUserData)
    ])


    port = 8000
    app.listen(port)
    print("Listening on port", port)

    tornado.ioloop.IOLoop.instance().start() #Starts instance only once and keeps it running