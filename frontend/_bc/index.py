import tornado.web #GET, POST etc to receive requests
import tornado.ioloop #Thread listens for requests; always needs to be up
import json

from preprocess import getColumnNames, getPlotData #, applyModel
from db import loadOne, loadData, saveMeta, listArrayToJson
# from nodb saveFcs, getFcs
 
import asyncio
asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy()) #Tornado won't work without this


class BaseHandler(tornado.web.RequestHandler):
    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "x-requested-with")
        self.set_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')

    def options(self):
        self.set_status(204)
        self.finish()

class MainHandler(BaseHandler):
    def get(self):
        self.render("index.html")

    def post(self): #If exists, doesn't overwrite
        # print("on my way") 
        # print(self.get_argument("location"))
        files = self.request.files["file"]
        for f in files:
            fh = open(f"uploads/{f.filename}", "wb") #wb is write in binary to accept any file format
            fh.write(f.body)
            fh.close()
            
            colNames = getColumnNames(f.filename)
            # print(colNames)

            #Write record to relational database
            saveResponse = saveMeta(self.get_argument("location"), self.get_argument("category"), self.get_argument("dateTime"), "000", f.filename, colNames)

            self.write({"status":"success", "message":"saved"})

class PlotGraphHandler(BaseHandler):
    def get(self):
        self.write(self.get_query_argument("fcs"))
        self.write(self.get_query_argument("xval"))
        self.write(self.get_query_argument("yval"))
        self.write(self.get_query_argument("transformation"))
        
        fcsFilename = self.get_query_argument("fcs")
        xval = self.get_query_argument("xval")
        yval = self.get_query_argument("yval")
        transformation = self.get_query_argument("transformation")
        
        
        data1, data2, data3 = getPlotData(xval, yval, transformation, fcsFilename)
        
        
#        data1, data2, data3 = getPlotData("FSC-A", "PE-A", "hlog", "A06 Ut SY.FCS")
        # self.write("Not implemented yet")
        # query = "select channels from tbmeta where id=%s "
        # results = loadOne(query, self.get_query_argument("fcs"))
        # channels = listArrayToJson(results) 
        # self.write(channels)


class GetUploadsHandler(BaseHandler):
    def get(self):
        query = "select distinct left(uploadname,-4) as name, id from tbmeta"
        results = loadData(query)
        self.write(json.dumps(results))


class GetColumnsHandler(BaseHandler):
    def get(self):
        query = "select channels from tbmeta where id=%s "
        results = loadOne(query, self.get_query_argument("fcs"))
        channels = listArrayToJson(results) 
        self.write(channels)

if (__name__ == "__main__"):
    app = tornado.web.Application([
        ("/", MainHandler),
        ("/uploads/(.*)", tornado.web.StaticFileHandler, {"path":"/uploads"}),
        ("/loadFcsFiles", GetUploadsHandler), #Get list of all uploaded fcs files from db
        ("/plotGraph", PlotGraphHandler),
        ("/loadColumns/", GetColumnsHandler)
    ])



    port = 8000
    app.listen(port)
    print("Listening on port", port)

    tornado.ioloop.IOLoop.instance().start() #Starts instance only once and keeps it running