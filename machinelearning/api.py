from flask import Flask
from flask_restful import Resource, Api
from ml import MachineLearning
app = Flask(__name__)
api = Api(app)


class Product(Resource):
    def get(self):
        mlearn = MachineLearning()
        return {
            'products': [
                'applen',
                'banan',
                'frukt',
                'choklad',
                'mjölk',
                'blommor'
            ]
        }


api.add_resource(Product, '/')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
# May have error in container
# ssh to container
# pip3 uninstall bottleneck
# pip3 install bottleneck==1.2