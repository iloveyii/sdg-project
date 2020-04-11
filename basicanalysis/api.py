from flask import Flask
from flask import request
from flask_restful import Resource, Api
from basic import Basic

app = Flask(__name__)
api = Api(app)


class Data(Resource):
    def get(self):
        file_id = request.args.get('id')
        if not file_id:
            file_id = 'hazrat_kth_se'
        basic = Basic(file_id)
        channels = basic.get_channel_names()
        print('BASIC Flask channels :', channels)

        return channels


api.add_resource(Data, '/')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000, debug=True)
