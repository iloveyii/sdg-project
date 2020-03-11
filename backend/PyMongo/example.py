from flask import Flask, request, url_for
from flask_pymongo import PyMongo



app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb://localhost:27017/myData'
mongo = PyMongo(app)

@app.route('/')
def index():
    return '''
        <form method="POST" action="/create" enctype="multipart/form-data">
            <input type="text" name="username">
            <input type="file" name="profile_image">
            <input type="submit">
        </from>
    '''

@app.route('/create', methods=['POST'])
def create():
    if 'profile_image' in request.files:
        profile_image = request.files['profile_image']
        mongo.save_file(profile_image.filename, profile_image)
        mongo.db.users.insert({'username' : request.form.get('username'), 'profile_image_name' : profile_image.filename})


    return 'Done!'  


@app.route('/file/<filename>') 
def file(filename):
    return mongo.send_file(filename)         