from flask import Flask
from flask import request
from flask_restful import Resource, Api
from ml import MachineLearning

app = Flask(__name__)
api = Api(app)


class Product(Resource):
    def get(self):
        file_id = request.args.get('id')
        ch1 = request.args.get('ch1')
        ch2 = request.args.get('ch2')
        ml = MachineLearning(file_id, ch1, ch2)
        plots = ml.get_plots()
        print(request.args.get('id'))
        return plots


api.add_resource(Product, '/')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
# May have error in container
# ssh to container
# pip3 uninstall bottleneck
# pip3 install bottleneck==1.2
