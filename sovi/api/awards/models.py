from django.db import models
from sovi.api.events.models import Event
from sovi.api.teams.models import Team


class AwardType(models.Model):
    type = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.type


class Award(models.Model):
    recipient = models.ForeignKey(Team)
    event = models.ForeignKey(Event)
    type = models.ForeignKey(AwardType)

    def __str__(self):
        return str(self.type) + " @ " + self.event.name + " for " +\
            self.recipient.name
