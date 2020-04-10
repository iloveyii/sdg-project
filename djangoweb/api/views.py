from django.shortcuts import render
from django.http import HttpResponse
from django.core import serializers
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
import ast
import json
import re
from api.models.models import Model
import requests

from django.core.files.storage import FileSystemStorage

FILE_FIELD_NAME = 'fcs_file'


# Create your views here.
@csrf_exempt
def upload(request):
    if request.method == 'POST' and request.FILES[FILE_FIELD_NAME]:
        upload_file = request.FILES[FILE_FIELD_NAME]
        print('FILE is POSTED', upload_file)
        print(upload_file.name)
        print(upload_file.size)
        fs = FileSystemStorage()
        filename_formatted = (re.sub('[^0-9a-zA-Z.]+', '_', upload_file.name)).lower()
        fs.delete(filename_formatted)
        filename = fs.save(filename_formatted, upload_file)

        uploaded_file_url = fs.url(filename)
        # analyze = Analysis(upload_file.name)
        data = {
            'name': upload_file.name,
            'size': upload_file.size,
            'file_url': uploaded_file_url,
            'path': fs.path(filename_formatted)
        }
        json_str = json.dumps(data)
        return HttpResponse(json_str)

    else:
        text = """<h1>welcome to my app - hello !</h1>"""
        context = {
            'name': 'CELL ANALYSIS'
        }
        return render(request, 'upload.html', context=context)
        # return HttpResponse(text)


def about(request):
    model = Model()
    # model.create('filename', 'plot_paths', 'results')
    a = Model.objects.all()
    # print(serializers.serialize('json', a))
    value = request.COOKIES.get('sid')
    s = requests.Session()
    cookie_obj = requests.cookies.create_cookie(name='sid', value=value)
    s.cookies.set_cookie(cookie_obj)
    r = s.get('http://node_auth_server:8090/api/v1/islogin')
    is_login = r.json()
    print(value, r.json())
    if is_login['login'] == 'success':
        print('You are logged in')

    return render(request, 'about.html')


def react(request):
    print("Inside react")
    return render(request, 'index.html')


def welcome(request):
    return render(request, 'welcome.html')


# MachineLearning plots
@csrf_exempt
def analysis(request):
    data = {
        'user': {
            'name': 'Alex',
            'age': 19
        }
    }
    URL = 'http://machinelearning:5000'
    r = requests.get(URL)
    print(r.json())
    # a = Model.objects.all()
    # print(serializers.serialize('json', a))
    # json_str = json.dumps(data)
    # print(json_str)
    #  json_str = serializers.serialize('json', r.json())
    return HttpResponse(r)


# Plotting plots
@csrf_exempt
def basic(request):
    URL = 'http://basicanalysis:3000'
    r = requests.get(URL)
    print(r.json())
    return HttpResponse(r)


@csrf_exempt
def plotting(request):
    URL = 'http://plotting:4000'
    r = requests.get(URL)
    print(r.json())
    return HttpResponse(r)
