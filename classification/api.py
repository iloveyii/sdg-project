from flask import Flask
from flask import request
from flask_wtf.csrf import CSRFProtect
from flask_restful import Resource, Api
from classification import Classification
from datetime import datetime
import json

app = Flask(__name__)
csrf = CSRFProtect(app)
api = Api(app)

dt = datetime.now()
gl = {'server_start_ts': dt.microsecond}


class Product(Resource):
    @csrf.exempt
    def get(self):
        global gl
        # return gl
        file_id = request.args.get('id')
        gl = {'server_start_ts': dt.microsecond, 'id': file_id}

        if not file_id:
            file_id = 'admin_hkr_se'
            print('ML Default FCS admin_hkr_se')
        else:
            print('ML RECEIVED FCS:', file_id)

        files = [file_id]
        cls = Classification(file_id, False)
        response = {}

        for file in files:
            response[file] = cls.predict(file)
            # response[file] = file

        gl.update(response)

        return response


api.add_resource(Product, '/')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=6000, debug=True)
# May have error in container
# ssh to container
# pip3 uninstall bottleneck
# pip3 install bottleneck==1.2
