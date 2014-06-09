from django.db import models
from sovi.api.events.models import Event


class AwardName(models.Model):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name


class Award(models.Model):
    name = models.OneToOneField(AwardName)
    event = models.OneToOneField(Event)

    def __str__(self):
        return self.name + " @ " + self.event.name
