from flask import Flask
from flask_restful import Resource, Api

app = Flask(__name__)
api = Api(app)


class Product(Resource) :
    def get(self):
        return {
            'products' : [
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
    app.run(host='0.0.0.0', port=3000, debug=True)
