# from django.urls import path
from django.conf.urls import url
from . import views

urlpatterns = [
    # Static pages
    url('about', views.about, name='about'),
    url('react', views.react, name='react'),
    # DB data
    url('analysis', views.analysis, name='analysis'),
    # Cell analysis routes
    url('basic', views.basic, name='basic'),
    url('transformed', views.transformed, name='transformed'),
    url('heatmap', views.heatmap, name='heatmap'),
    url('gated', views.gated, name='gated'),
    # Upload file
    url('plot', views.get_plot, name='plot'),
    url('upload', views.upload, name='upload'),
    # Welcome page
    url('', views.welcome, name='welcome'),
    url(r'^/$', views.welcome, name='welcome'),
]
