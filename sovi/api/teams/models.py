from django.db import models


class Team(models.Model):
    number = models.IntegerField(primary_key=True, unique=True,
                                 verbose_name="Team #")
    name = models.CharField(max_length=255, blank=True)
    website = models.URLField(blank=True)
    country = models.CharField(max_length=64, blank=True)
    region = models.CharField(max_length=64, blank=True)
    locality = models.CharField(max_length=64, blank=True)

    def __str__(self):
        return ("{0} - {1} ({2}, {3}, {4}, {5})"
                .format(str(self.number), self.name, self.website,
                        self.country, self.region, self.locality))
