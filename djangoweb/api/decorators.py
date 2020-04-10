from django.shortcuts import render
from django.http import HttpResponse
from django.core import serializers
from django.http.response import JsonResponse
from django.shortcuts import redirect
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
import ast
import json
import re
from api.models.models import Model
import requests
sid = ''


def if_user_is_logged_in(func):

    def if_user_is_logged(request):
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
                func()
            return redirect('/api/login.html')
        except Exception as inst:
            print('Err', inst)
    return if_user_is_logged
