# from django.urls import path
from django.conf.urls import url
from . import views

urlpatterns = [
    # Static pages
    url('about', views.about, name='about'),
    url('react', views.react, name='react'),
    # ML analysis in json
    url('mls', views.machine_learning, name='machine_learning'),
    # Cell analysis routes
    url('basic', views.basic, name='basic'),
    # Upload file
    url('register', views.register, name='register'),
    url('login', views.login, name='login'),
    url('forgot-password', views.forgot_password, name='forgot_password'),
    url('logout', views.logout, name='logout'),
    url('plots', views.plotting, name='plotting'),
    url('cls', views.classification, name='classification'),
    url('upload', views.upload, name='upload'),
    # Welcome page
    url('', views.welcome, name='welcome'),
    url(r'^/$', views.welcome, name='welcome'),
]
