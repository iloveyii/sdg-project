# from django.urls import path
from django.conf.urls import url
from . import views

urlpatterns = [
    # Static pages
    url('about', views.about, name='about'),
    url('react', views.react, name='react'),
    # ML analysis in json
    url('analysis', views.analysis, name='analysis'),
    # Cell analysis routes
    url('basic', views.basic, name='basic'),
    # Upload file
    url('login', views.login, name='login'),
    url('logout', views.logout, name='logout'),
    url('plotting', views.plotting, name='plotting'),
    url('upload', views.upload, name='upload'),
    # Welcome page
    url('', views.welcome, name='welcome'),
    url(r'^/$', views.welcome, name='welcome'),
]
