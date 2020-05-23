import tornado.web  # GET, POST etc to receive requests
import tornado.ioloop  # Thread listens for requests; always needs to be up
from tornado.escape import json_decode
import json

from preprocess import getColumnNames, getPlotData  # , applyModel
from heatmap import generateGatedOutputsPlusHeatmap
from differences import generateDifferences
from db import loadOne, loadData, saveMeta, saveEntry, listArrayToJson
from helper import getFcsFilesToUse, getGatedHeatData, getGatedLineData
from pathlib import Path, PurePath

# import asyncio asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy()) #Tornado won't work without this

dirpath = PurePath.joinpath(Path().parent.absolute(), 'data/raw/')


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
        print('Inside /')
        self.render("build/index.html")

    def post(self):
        response = {"status": False}
        files = self.request.files["file"]
        for f in files:
            fpath = PurePath.joinpath(dirpath, f.filename)
            sizeBefore = 0
            if (fpath.is_file()):  # check if file exists already
                sizeBefore = (fpath.stat().st_size)

            if (sizeBefore == len(f.body)):  # check if file is same size as saved file
                response["message"] = f.filename + ' Already exists in the database'
            else:
                # Save the file in folder
                fh = open(f"{fpath}", "wb")  # wb is write in binary to accept any file format
                fh.write(f.body)
                fh.close()

                colNames = getColumnNames(f.filename)

                if (colNames != False):
                    # Write record to relational database
                    sql = """INSERT INTO tbmeta(location,category,uploaddate,filename,uploadname,channels)
                    VALUES(%s,%s,%s,%s,%s,%s) RETURNING id;"""
                    values = []
                    values.append(self.get_argument("location"))
                    values.append(self.get_argument("category"))
                    values.append(self.get_argument("dateTime"))
                    values.append(f.filename.split('.')[0])
                    values.append(f.filename)
                    values.append(colNames)

                    saveEntry(sql, values)

                    response["status"] = True
                else:
                    Path.unlink(fpath)  # Remove the file if it had been saved
                    response["message"] = f.filename + " is not a valid FCS file."

        self.write(json.dumps(response))


class PlotGraphHandler(BaseHandler):
    def get(self):
        response = {"status": False}
        selectedFcsFile = self.get_query_argument("fcs")
        xval = self.get_query_argument("xval")
        yval = self.get_query_argument("yval")
        transformation = self.get_query_argument("transformation")
        filesList = getFcsFilesToUse(self.get_query_argument("allfcs"), ".fcs")
        # Get all files
        ##loop through and prepare them for next step
        print(filesList)
        for item in filesList:
            # print(item)
            # print(selectedFcsFile)
            if (item != selectedFcsFile):
                getPlotData(xval, yval, transformation, item)

        results = getPlotData(xval, yval, transformation, selectedFcsFile)
        if (results):
            response["status"] = True
            response["payload"] = results
        else:
            response["message"] = "Something went wrong."

        self.write(results)


class GenerateHeatmapHandler(BaseHandler):
    def get(self):
        response = {"status": False}

        x1 = int(self.get_query_argument("x1"))
        y1 = int(self.get_query_argument("y1"))
        x2 = int(self.get_query_argument("x2"))
        y2 = int(self.get_query_argument("y2"))
        binwidth = int(self.get_query_argument("binwidth"))
        selectedFcsFile = self.get_query_argument("fcs")
        selectedFiles = self.get_query_argument("allfcs")

        transformedFilesList = getFcsFilesToUse(selectedFiles, "out.csv")
        gates = generateGatedOutputsPlusHeatmap(transformedFilesList, x1, y1, x2, y2, binwidth)

        if (gates):
            gatedFilesList = getFcsFilesToUse(selectedFiles, "-gate.csv")
            results = generateDifferences(gatedFilesList)

            response["status"] = True
            response["payload"] = getGatedHeatData(selectedFcsFile)
            response["linedata"] = getGatedLineData(gatedFilesList, x1, y1, x2, y2)
            print("Payload ready")
        else:
            response["message"] = "Something went wrong."

        self.write(json.dumps(response))


class TestHandler(BaseHandler):
    def get(self):
        response = {"status": False}

        df = getGatedLineData(
            ["A02 Kranvatten kvall SYBR.fcs", "A05 Kranvatten Sept SYBR .fcs", "A02 Kranvatten Augusti SYBR.fcs",
             "A03 Kranvatten Mars SYBR.fcs", "A03 Kranvatten morgon SYBR.fcs"], 5, 5, 12, 12)

        # print(df)
        self.write(json.dumps(df))
        # self.write(df)


class GetUploadsHandler(BaseHandler):
    def get(self):
        dateTo = self.get_query_argument("dateTo")
        dateFrom = self.get_query_argument("dateFrom")
        category = self.get_query_argument("category")
        location = self.get_query_argument("location")
        filters = ""
        params = []
        response = {"status": False}
        if category.strip() != "":
            filters = filters + "and category=%s "
            params.append(category)
        if location.strip() != "":
            filters = filters + "and location=%s "
            params.append(location)
        if dateFrom.strip() != "" and dateTo.strip() != "":
            filters = filters + "and uploaddate between %s and %s "
            params.append(dateFrom)
            params.append(dateTo)
        if dateFrom.strip() != "" and dateTo.strip() == "":
            filters = filters + "and uploaddate > %s "
            params.append(dateFrom)
        if dateFrom.strip() == "" and dateTo.strip() != "":
            filters = filters + "and uploaddate < %s "
            params.append(dateTo)

        query = "select distinct left(uploadname,-4) as name, uploadname as id from tbmeta where 1=1 "
        results = loadData(query + filters, params)
        if (results):
            response["status"] = True
            response["payload"] = results
        else:
            response["message"] = "Something went wrong."

        self.write(json.dumps(response))


class GetLocationsHandler(BaseHandler):
    def get(self):
        response = {"status": False}
        query = "select distinct location as name, location as id from  tbmeta "
        results = loadData(query, [])
        if (results):
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
        response = {"status": False}
        if (results):
            channels = listArrayToJson(results)
            response["status"] = True
            response["payload"] = channels
        else:
            response["message"] = "Something went wrong."
        self.write(json.dumps(response))


class GetUserData(BaseHandler):
    def get(self):
        print('Inside GetUserData')
        query = "select fullname,email,mobilephone,usergroup,userid,location,locationdescription,trials from tbusers where email = %s and password = %s "
        params = []
        params.append(self.get_query_argument("user"))
        params.append(self.get_query_argument("pass"))

        results = loadOne(query, params, True)

        response = {"status": False}
        if results:
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
        response = {"status": False}
        if (results):
            response["status"] = True
            response["payload"] = results
        else:
            response["message"] = "Something went wrong. Try another Email"

        self.write(json.dumps(response))


if __name__ == "__main__":
    app = tornado.web.Application([
        ("/", UploadHandler),
        ("/uploads/(.*)", tornado.web.StaticFileHandler, {"path": "/uploads"}),
        (r'/static/(.*)', tornado.web.StaticFileHandler, {'path': "./build/static/"}),
        ("/static/(.*)", tornado.web.StaticFileHandler, {"path": "./build/static/"}),
        ("/static/js/(.*)", tornado.web.StaticFileHandler, {"path": "./build/static/js/"}),
        ("/loadFcsFiles/", GetUploadsHandler),  # Get list of all uploaded fcs files from db
        ("/plotGraph/", PlotGraphHandler),
        ("/loadColumns/", GetColumnsHandler),
        ("/loadUser/", GetUserData),
        ("/loadUser/", GetUserData),
        ("/saveUser/", SaveUserData),
        ("/loadLocations", GetLocationsHandler),
        ("/loadLocations/", GetLocationsHandler),
        ("/generateHeatmap/", GenerateHeatmapHandler),
        ("/test/", TestHandler),
    ])

    port = 8000
    app.listen(port)
    print("Listening on port", port)

    tornado.ioloop.IOLoop.current().start()

    # tornado.ioloop.IOLoop.instance().start() #Starts instance only once and keeps it running

    # ### To take advantage of multiple CPUs
    # server = tornado.httpserver.HTTPServer(app)
    # server.bind(port)
    # server.start(0)  # forks one process per cpu
    # tornado.ioloop.IOLoop.current().start()
