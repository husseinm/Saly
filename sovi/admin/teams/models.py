from django.db import models


class TeamName(models.Model):
    number = models.IntegerField(primary_key=True, unique=True,
                                 verbose_name="Team #")
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name


class Team(models.Model):
    number = models.IntegerField(primary_key=True, unique=True,
                                 verbose_name="Team #")
    name = models.OneToOneField(TeamName)
    website = models.URLField()  # Max Length is 200...
    country = models.CharField(max_length=64)
    state = models.CharField(max_length=64, blank=True)
    city = models.CharField(max_length=64)

    def __str__(self):
        return ("{0} - {1} ({2}, {3}, {4}, {5})"
                .format(str(self.number), str(self.name), self.website,
                        self.country, self.state, self.city))
