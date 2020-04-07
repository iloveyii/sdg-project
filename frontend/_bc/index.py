import tornado.web #GET, POST etc to receive requests
import tornado.ioloop #Thread listens for requests; always needs to be up
from tornado.escape import json_decode
import json

from preprocess import getColumnNames, getPlotData #, applyModel
from heatmapgen_test import generateGatedOutputsPlusHeatmap
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

    def post(self): 
        response = {"status":False}
        files = self.request.files["file"]
        for f in files:
            colNames = getColumnNames(f.filename)

            if(colNames != False):
                #Write record to relational database
                sql = """INSERT INTO tbmeta(location,category,uploaddate,filename,uploadname,channels)
                VALUES(%s,%s,%s,%s,%s,%s) RETURNING id;"""
                values = []
                values.append(self.get_argument("location"))
                values.append(self.get_argument("category"))
                values.append(self.get_argument("dateTime"))
                values.append("xxxxxxxxxxxx")
                values.append(f.filename)
                values.append(colNames)

                saveEntry(sql, values)
                
                #Save the file in folder
                fh = open(f"{dirpath}/{f.filename}", "wb") #wb is write in binary to accept any file format
                fh.write(f.body)
                fh.close()

                response["status"] = True
            else:
                response["message"] = f.filename + " is not a valid FCS file."

        self.write(json.dumps(response))

class PlotGraphHandler(BaseHandler):
    def get(self):        
        fcsFilename = self.get_query_argument("fcs")
        xval = self.get_query_argument("xval")
        yval = self.get_query_argument("yval")
        transformation = self.get_query_argument("transformation")
        
        data1, data2, data3 = getPlotData(xval, yval, transformation, fcsFilename)

        self.write(data3)

class GenerateHeatmapHandler(BaseHandler):
    def get(self):
        response = {"status":False}
        fcsFilename = self.get_query_argument("allfcs")
        print(json.loads(fcsFilename))
        # xval = self.get_query_argument("xval")
        # yval = self.get_query_argument("yval")
        x1 = int(self.get_query_argument("x1"))
        y1 = int(self.get_query_argument("y1"))
        x2 = int(self.get_query_argument("x2"))
        y2 = int(self.get_query_argument("y2"))
        # transformation = self.get_query_argument("transformation")
        lfiles = ['A02 Kranvatten kvall SYBRout.csv','A06 Ut SYout.csv']
        results = generateGatedOutputsPlusHeatmap(lfiles, x1, y1, x2, y2)
        if(results):
            response["status"] = True
            # response["payload"] = results
        else:
            response["message"] = "Something went wrong."

        self.write(response)

class GetUploadsHandler(BaseHandler):
    def get(self):
        dateTo = self.get_query_argument("dateTo")
        dateFrom = self.get_query_argument("dateFrom")
        category = self.get_query_argument("category")
        location = self.get_query_argument("location")
        filters = ""
        params = []
        response = {"status":False}
        print(dateTo + "---" + dateFrom + "......" + category + "]]" )
        if category.strip() != "": 
            filters = filters + "and category=%s "
            params.append(category)
        if location.strip() != "": 
            filters = filters + "and location=%s "
            params.append(location)
        if dateFrom.strip() != ""  and dateTo.strip() != "": 
            filters = filters + "and uploaddate between %s and %s "
            params.append(dateFrom)
            params.append(dateTo)
        if dateFrom.strip() != ""  and dateTo.strip() == "": 
            filters = filters + "and uploaddate > %s "
            params.append(dateFrom)
        if dateFrom.strip() == ""  and dateTo.strip() != "": 
            filters = filters + "and uploaddate < %s "
            params.append(dateTo)
            
        query = "select distinct left(uploadname,-4) as name, uploadname as id from tbmeta where 1=1 "
        results = loadData(query + filters, params)
        if(results):
            response["status"] = True
            response["payload"] = results
        else:
            response["message"] = "Something went wrong."

        self.write(json.dumps(response))

class GetLocationsHandler(BaseHandler):
    def get(self):
        response = {"status":False}
        query = "select distinct location as name, location as id from  tbmeta "
        results = loadData(query, [])
        if(results):
            response["status"] = True
            response["payload"] = results
        else:
            response["message"] = "Something went wrong."

        self.write(json.dumps(response))

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
        ("/loadFcsFiles/", GetUploadsHandler), #Get list of all uploaded fcs files from db
        ("/plotGraph/", PlotGraphHandler),
        ("/loadColumns/", GetColumnsHandler),
        ("/loadUser/", GetUserData),
        ("/saveUser/", SaveUserData),
        ("/loadLocations", GetLocationsHandler),
        ("/generateHeatmap/", GenerateHeatmapHandler),
    ])


    port = 8000
    app.listen(port)
    print("Listening on port", port)

    tornado.ioloop.IOLoop.instance().start() #Starts instance only once and keeps it running