from django.db import models


class Video(models.Model):
    url = models.URLField(primary_key=True, unique=True)

    def __str__(self):
        return self.url


class GameData(models.Model):
    def __str__(self):
        return "Yearly Data"


class Game(models.Model):
    number = models.IntegerField()
    time = models.DateTimeField(auto_now_add=True)
    round = models.SmallIntegerField()
    data = models.OneToOneField(GameData)
    level = models.CharField(max_length=40)
    blueTeamOne = models.IntegerField()
    blueTeamTwo = models.IntegerField()
    blueTeamThree = models.IntegerField()
    redTeamOne = models.IntegerField()
    redTeamTwo = models.IntegerField()
    redTeamThree = models.IntegerField()

    def __str__(self):
        return ("#{0} Round {1} ({2}, {3} - {4}) Blue: {5}, {6}), {7}"
                " - Red: {8}, {9}, {10}"
                .format(str(self.number), self.round, self.level, self.time,
                        self.blueTeamOne, self.blueTeamTwo, self.blueTeamThree,
                        self.redTeamOne, self.redTeamTwo, self.redTeamThree))
