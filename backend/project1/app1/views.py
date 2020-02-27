from django.shortcuts import render
from django.shortcuts import render
from django.http import HttpResponse
from django.core import serializers
from django.http.response import JsonResponse
from app1.models import Model
import json
from django.views.decorators.csrf import csrf_exempt
from cell.analysis import Analysis

# Create your views here.
@csrf_exempt
def upload(request):
    if request.method == 'POST':
        upload_file = request.FILES['fcs']
        print(upload_file.name)
        print(upload_file.size)
        analyze = Analysis(upload_file.name)
        data = {
            'name': upload_file.name,
            'size': upload_file.size,
            'analysis': analyze.do()
        }
        json_str = json.dumps(data)
        return HttpResponse(json_str)

    else:
        return HttpResponse('Not post')


def hello(request):
    text = """<h1>welcome to my app !</h1>"""
    return HttpResponse(text)


def about(request):
    return render(request, 'about.html')


def welcome(request):
    return render(request, 'welcome.html')

def analysis(request):
    data = {
        'user': {
            'name': 'Alex',
            'age': 19
        }
    }
    a = Model.objects.all()
    # print(serializers.serialize('json', a))
    # json_str = json.dumps(data)
    # print(json_str)
    json_str = serializers.serialize('json', a)
    return HttpResponse(json_str)


def get_plot(request):
    a = Analysis('testfilename')
    img = a.snapshot()
    return HttpResponse(img, mimetype="image/png")

