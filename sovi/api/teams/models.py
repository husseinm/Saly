from django.db import models


class TeamName(models.Model):
    number = models.IntegerField(primary_key=True, unique=True,
                                 verbose_name="Team #")
    name = models.TextField()

    def __str__(self):
        return str(self.number) + " - " + self.name


class TeamWebsite(models.Model):
    number = models.IntegerField(primary_key=True, unique=True,
                                 verbose_name="Team #")
    website = models.URLField()

    def __str__(self):
        return str(self.number) + " - " + self.website


class Team(models.Model):
    number = models.IntegerField(primary_key=True, unique=True,
                                 verbose_name="Team #")
    name = models.OneToOneField(TeamName, null=True)
    website = models.OneToOneField(TeamWebsite, null=True)
    country = models.CharField(max_length=64, blank=True)
    region = models.CharField(max_length=64, blank=True)
    locality = models.CharField(max_length=64, blank=True)

    def __str__(self):
        name = 'NULL'
        website = 'NULL'

        if self.name is not None:
            name = self.name.name
        if self.website is not None:
            website = self.website.website

        return ("{0} - {1} ({2}, {3}, {4}, {5})"
                .format(str(self.number), name, website, self.country,
                        self.region, self.locality))
