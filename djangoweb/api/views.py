from django.shortcuts import render
from django.http import HttpResponse
from django.core import serializers
from django.http.response import JsonResponse
from django.shortcuts import redirect
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
import ast
import os, shutil
import sys
import json
import re
from api.models.models import Model
import requests

from django.core.files.storage import FileSystemStorage

FILE_FIELD_NAME = 'fcs_file'
sid = ''
SHARED_PLOTTING_DIR = os.path.realpath('/shared/plotting/')
SHARED_ML_DIR = os.path.realpath('/shared/machinelearning/')
CORS_ORIGIN_WHITELIST = (
    '*',
    'localhost:3000'
)


def if_login(request):
    global sid
    try:
        value = sid or request.COOKIES.get('sid')
        s = requests.Session()
        cookie_obj = requests.cookies.create_cookie(name='sid', value=value)
        s.cookies.set_cookie(cookie_obj)
        r = s.get('http://node_auth_server:8090/api/v1/islogin')
        is_logged_in = r.json()
        print(value, r.json())
        if is_logged_in['login'] == 'success':
            print('USER Logged In')
            return True
        print('USER NOT Logged In')
        return False
    except Exception as inst:
        print('Err', inst)


def format_to_filename(string1, no_dot=False):
    if no_dot:
        return re.sub('[^0-9a-zA-Z]+', '_', string1).lower()
    return re.sub('[^0-9a-zA-Z.]+', '_', string1).lower()


def clear_user_files(request):
    file_id = get_logged_in_email_to_file_format(request)
    try:
        directory = os.scandir(SHARED_ML_DIR)
        for file in directory:
            if file.name.startswith(file_id):
                file_path = os.path.join(SHARED_ML_DIR, file.name)
                os.remove(file_path)
    except Exception as e:
        print('Failed to delete %s. Reason: %s' % (SHARED_ML_DIR, e))

    try:
        directory = os.scandir(SHARED_PLOTTING_DIR)
        for file in directory:
            if file.name.startswith(file_id):
                file_path = os.path.join(SHARED_PLOTTING_DIR, file.name)
                os.remove(file_path)
    except Exception as e:
        print('Failed to delete %s. Reason: %s' % (SHARED_PLOTTING_DIR, e))


# Create your views here.
@csrf_exempt
def upload(request):
    global if_login, get_logged_in_user, format_to_filename
    if not if_login(request):
        return redirect('/api/login.html')
    if request.method == 'POST' and request.FILES[FILE_FIELD_NAME]:
        user = get_logged_in_user(request)
        upload_file = request.FILES[FILE_FIELD_NAME]
        print('FILE is POSTED', upload_file)
        print(upload_file.name)
        print(upload_file.size)
        fs = FileSystemStorage()
        filename_formatted = format_to_filename(user['email'], True) + '_' + 'fcs_file.fcs'
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
        # return HttpResponse(json_str)
        # Clean prev files
        clear_user_files(request)
        return render(request, 'upload.html', context=data)
    else:
        text = """<h1>welcome to my app - hello !</h1>"""
        context = {
            'name': 'CELL ANALYSIS'
        }
        return render(request, 'upload.html', context=context)
        # return HttpResponse(text)


def get_logged_in_email_to_file_format(request):
    if if_login(request):
        user = get_logged_in_user(request)
        if user:
            email = user['email']
            return format_to_filename(email, True)
    return False


def about(request):
    global if_login
    if not if_login(request):
        return redirect('/api/login.html')
    # print('ABOUT: ', is_login(request))
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
    global get_logged_in_user
    print(get_logged_in_user(request))
    print('WElcome SID: ', sid)
    return render(request, 'welcome.html')


def logout(request):
    global sid
    sid = ''
    """
    s = requests.Session()
    cookie_obj = requests.cookies.create_cookie(name='sid', value=sid)
    s.cookies.set_cookie(cookie_obj)
    r = s.get('http://node_auth_server:8090/api/v1/logout')
    print(r.json())
    response = HttpResponse(render(request, 'login.html'))
    response.set_cookie('sid', 'sid')
    """
    return redirect('/api/login.html')


def get_logged_in_user(request):
    value = sid or request.COOKIES.get('sid')
    s = requests.Session()
    cookie_obj = requests.cookies.create_cookie(name='sid', value=value)
    s.cookies.set_cookie(cookie_obj)
    r = s.get('http://node_auth_server:8090/api/v1/get_logged_in_user')
    is_logged_in = r.json()
    print('get_logged_in_user Response from auth server : ', is_logged_in)
    if is_logged_in['status'] == 'success':
        return is_logged_in
    return False


@csrf_exempt
def register(request):
    errors = {}
    if request.method == 'POST':
        form = request.POST
        if not form['email'] or not form['password'] or not form['confirm_password']:
            errors = {
                'msg': 'Email and password cannot be blank.'
            }
            print('Errors:', errors, form)
        else:
            # submit for to auth server
            s = requests.Session()
            # form['username'] = 'django'
            try:
                r = s.post('http://node_auth_server:8090/api/v1/register', form)
                is_login = r.json()
                print('Response from auth server : ', is_login)
                if is_login['register'] == 'success':
                    r = s.post('http://node_auth_server:8090/api/v1/login', form)
                    is_login = r.json()
                    if is_login['login'] == 'success':
                        response = HttpResponse(render(request, 'upload.html'))
                        response.set_cookie('sid', r.cookies['sid'])
                        return response
            except Exception as inst:
                print('Err', inst)
            return redirect('/api/login.html')
    return render(request, 'register.html', context=errors)


@csrf_exempt
def forgot_password(request):
    return render(request, 'forgot_password.html')


@csrf_exempt
def login(request):
    global sid
    print('LOGIN SID: ', request.COOKIES.get('sid'))
    response = HttpResponse(render(request, 'login.html'))
    if request.method == 'POST':
        form = request.POST
        print(form)
        s = requests.Session()
        try:
            r = s.post('http://node_auth_server:8090/api/v1/login', form)
            is_login = r.json()
            print('Response from auth server : ', is_login)
            if is_login['login'] == 'success':
                sid = r.cookies['sid']
                print(is_login, sid)
                response = HttpResponse(render(request, 'upload.html'))
            else:
                sid = ''
        except Exception as inst:
            print('Err', inst)
    response.set_cookie('sid', sid)
    return response


# MachineLearning plots
@csrf_exempt
def machine_learning(request):
    id = get_logged_in_email_to_file_format(request)
    data = {
        'actions': {'type': 'read', 'ok': 1},
        'list': [],
        'id': id,
    }
    # return HttpResponse(json.dumps(data))

    if not id:
        response = {
            'status': 'fail',
            'msg': 'User not logged in'
        }
    else:
        params = ''
        if request.GET['channel1'] and request.GET['channel2']:
            ch1 = request.GET['channel1']
            ch2 = request.GET['channel2']
            print(ch1, ch2)
            params = "&ch1={}&ch2={}".format(ch1, ch2)
            if request.GET['bins']:
                params += '&bins=' + request.GET['bins']
            if request.GET['transformation']:
                params += '&transformation=' + request.GET['transformation']

        URL = 'http://machinelearning:5000?id=' + id + params
        r = requests.get(URL)
        response = r.json()
        data = {
            'actions': {'type': 'read', 'ok': 1},
            'list': response,
            'id': id,
            'params': params
        }
    # print(r.json())
    # a = Model.objects.all()
    # print(serializers.serialize('json', a))
    # json_str = json.dumps(data)
    # print(json_str)
    #  json_str = serializers.serialize('json', r.json())
    return HttpResponse(json.dumps(data))


# Plotting plots
@csrf_exempt
def basic(request):
    id = get_logged_in_email_to_file_format(request)
    # @todo
    id = 'default'
    if not id:
        response = {
            'status': 'fail',
            'msg': 'User not logged in'
        }
    else:
        if not id:
            id = ''
        URL = 'http://basicanalysis:3000?id=' + id
        r = requests.get(URL)
        response = r.json()
        data = {
            'actions': {'type': 'read', 'ok': 1},
            'list': response
        }
        print(data)
    return HttpResponse(json.dumps(data))


@csrf_exempt
def plotting(request):
    id = get_logged_in_email_to_file_format(request)
    params = ''
    data = {
        'actions': {'type': 'read', 'ok': 1},
        'list': [],
        'id': id,
        'params': params
    }
    response = {
        'status': 'fail',
        'msg': 'logged in'
    }
    if not id:
        data = {
            'actions': {'type': 'read', 'ok': 1},
            'list': [],
            'id': id,
            'params': params,
            'status': 'fail',
            'msg': 'User not logged in'
        }
    else:
        if request.GET and request.GET['channel1'] and request.GET['channel2']:
            ch1 = request.GET['channel1']
            ch2 = request.GET['channel2']
            print(ch1, ch2)
            params = "&ch1={}&ch2={}".format(ch1, ch2)
            if request.GET['bins']:
                params += '&bins=' + request.GET['bins']
            if request.GET['transformation']:
                params += '&transformation=' + request.GET['transformation']

        if not id:
            id = ''
        URL = 'http://plotting:4000?id=' + id + params

        r = requests.get(URL)
        print(r)
        response = r.json()
        data = {
            'actions': {'type': 'read', 'ok': 1},
            'list': response,
            'id': id,
            'params': params
        }
        print(data)
    return HttpResponse(json.dumps(data))
