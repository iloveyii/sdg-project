from flask import Flask
from flask_restful import Resource, Api
from basic import Basic

app = Flask(__name__)
api = Api(app)


class Api(Resource) :
    def get(self):
        basic = Basic()
        channels = basic.get_channel_names()

        return channels


api.add_resource(Api, '/')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000, debug=True)
