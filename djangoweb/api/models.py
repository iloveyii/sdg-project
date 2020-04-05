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