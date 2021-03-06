from django.db import models
from django.utils import timezone

initial = False

# Create your models here.


class Model(models.Model):
    filename = models.CharField(max_length=100, default='')
    # date = models.DateTimeField(default=timezone.now)
    results = models.TextField(default='')
    plot_paths = models.TextField(default='')
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    def __str__(self):
        return self.filename

    def create(self, filename, plot_paths, results):
        a = Model()
        a.filename = filename
        a.plot_paths = plot_paths
        a.results = results
        a.save()

    def read(self):
        return Model.objects.all()


class User(models.Model):
    email = models.CharField(max_length=100, default='')
    # date = models.DateTimeField(default=timezone.now)
    password = models.TextField(default='')
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    def __str__(self):
        return self.email

    def create(self, email, password):
        a = User()
        a.email = email
        a.password = password
        a.save()

    def read(self):
        return User.objects.all()


class UserFiles(models.Model):
    user_id = models.IntegerField()
    filename_1 = models.CharField(max_length=100, default='')
    filename_2 = models.CharField(max_length=100, default='')
    filename_3 = models.CharField(max_length=100, default='')
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    def __str__(self):
        return self.email

    def create(self, email, password):
        a = User()
        a.email = email
        a.password = password
        a.save()

    def read(self):
        return User.objects.all()


class tbusers(models.Model):
    userid = models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')
    email = models.CharField(max_length=100, default='')
    password = models.TextField(max_length=100, default='')
    fullname = models.TextField(max_length=100, default='')
    trials = models.IntegerField(default=0)
    locked = models.BooleanField(default=False)
    active = models.BooleanField(default=True)
    mobilephone = models.TextField(max_length=20, default='NA', null=True)
    usergroup = models.TextField(max_length=50, default='admin', null=True)
    location = models.TextField(max_length=100, default='NA', null=True)
    locationdescription = models.TextField(max_length=1000, default='NA', null=True)

    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    def __init__(self):
        self.initial = False

    class Meta:
        db_table = '"tbusers"'

    def __str__(self):
        return "Email: {} Full name: {} active: {}".format(self.email, self.fullname, self.active)

class tbmeta(models.Model):
    # location,category,recorddate,filename,uploadname,channels
    id = models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')
    location = models.TextField(max_length=100, default='NA', null=True)
    category = models.TextField(max_length=50, default='admin', null=True)
    recorddate = models.DateTimeField(auto_now_add=True, null=True)
    uploaddate = models.DateTimeField(auto_now_add=True, null=True)
    filename = models.TextField(max_length=100, default='')
    uploadname = models.TextField(max_length=100, default='')
    channels = models.CharField(max_length=100, default='')

    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    def __init__(self):
        self.initial = False

    class Meta:
        db_table = '"tbmeta"'
