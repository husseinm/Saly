from django.db import models


class EventName(models.Model):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name


class EventWebsite(models.Model):
    website = models.URLField()

    def __str__(self):
        return self.website


class Event(models.Model):
    name = models.OneToOneField(EventName)
    type = models.CharField(max_length=64)
    isOfficial = models.BooleanField()
    website = models.OneToOneField(EventWebsite)
    country = models.CharField(max_length=64)
    state = models.CharField(max_length=64, blank=True)
    city = models.CharField(max_length=64)

    def __str__(self):
        return ("{0} {1} ({2}, {3} - {4}, {5}, {6})"
                .format(str(self.name), str(self.type), self.isOfficial,
                        self.website, self.country, self.state, self.city))
