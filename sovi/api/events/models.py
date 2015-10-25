from django.db import models


class Event(models.Model):
    id = models.CharField(primary_key=True, unique=True, max_length=10,
                          verbose_name="Event Short Code")
    name = models.CharField(max_length=255)
    isOfficial = models.BooleanField(default=False)
    website = models.URLField(blank=True)

    def __str__(self):
        return ("{0} - {1} - {2}".format(str(self.name), self.website,
                                         self.isOfficial))
