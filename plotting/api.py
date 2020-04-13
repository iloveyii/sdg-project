from flask import Flask
from flask import request
from flask_wtf.csrf import CSRFProtect
from flask_restful import Resource, Api
from plotting import Plotting

app = Flask(__name__)
csrf = CSRFProtect(app)
api = Api(app)


class Data(Resource):
    @csrf.exempt
    def get(self):
        file_id = request.args.get('id')
        if not file_id:
            file_id = 'hazrat_kth_se'
        ch1 = request.args.get('ch1')
        ch2 = request.args.get('ch2')
        print('PLOTTING chs', ch1, ch2)
        plotting = Plotting(file_id, ch1, ch2)
        plots = plotting.get_plots()

        return plots


api.add_resource(Data, '/')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=4000, debug=True)
