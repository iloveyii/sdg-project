# from django.urls import path
from django.conf.urls import url
from . import views

urlpatterns = [
    url('about', views.about, name='about'),
    url('react', views.react, name='react'),
    url('analysis', views.analysis, name='analysis'),
    url('plot', views.get_plot, name='plot'),
    url('upload', views.upload, name='upload'),
    url('', views.welcome, name='welcome'),
    url(r'^/$', views.welcome, name='welcome'),
]
