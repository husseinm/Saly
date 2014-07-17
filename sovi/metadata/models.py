from django.db import models


class TeamLastModify(models.Model):
    page = models.IntegerField(primary_key=True, unique=True)
    time = models.CharField(max_length=29)
