from django.db import models

class Event(models.Model):
    name = models.CharField(max_length=255)
    isOfficial = models.BooleanField()
    website = models.URLField(blank=True)

    def __str__(self):
        return ("{0} - {1} - {2}".format(str(self.name), self.website,
                                         self.isOfficial))
