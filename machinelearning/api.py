from flask import Flask
from flask import request
from flask_wtf.csrf import CSRFProtect
from flask_restful import Resource, Api
from ml import MachineLearning
from datetime import datetime

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
        ch1 = request.args.get('ch1')
        ch2 = request.args.get('ch2')
        transformation = request.args.get('transformation')
        bins = request.args.get('bins')
        gl = {'server_start_ts': dt.microsecond, 'id': file_id, 'ch1': ch1, 'bins': bins,
              'transformation': transformation}
        if not file_id or not ch1 or not ch2:
            file_id = 'default'
            ch1 = 'HDR-T'
            ch2 = 'FSC-A'
            print('ML Default FCS and  chs', ch1, ch2)
        else:
            print('ML RECEIVED FCS and chs', file_id, ch1, ch2)

        ml = MachineLearning(file_id, ch1, ch2, transformation, bins)
        plots = ml.get_plots()
        gl.update(plots)
        return plots


api.add_resource(Product, '/')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
# May have error in container
# ssh to container
# pip3 uninstall bottleneck
# pip3 install bottleneck==1.2
