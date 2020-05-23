from django.db import models
from django.utils import timezone

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
    email = models.CharField(max_length=100, default='')
    password = models.TextField(default='')
    fullname = models.TextField(default='')
    trials = models.IntegerField(default=0)
    locked = models.IntegerField(default=0)
    active = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    def __str__(self):
        return "Email: {} Full name: {} active: {}".format(self.email, self.fullname, self.active)

