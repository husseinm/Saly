from django.db import models


class LastModify(models.Model):
    page = models.IntegerField(primary_key=True, unique=True)
    model = models.CharField(max_length=10)
    time = models.CharField(max_length=29)
