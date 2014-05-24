from django.contrib import admin
from sovi.admin.teams.models import Team, TeamName

# Register your models here.
admin.site.register(Team)
admin.site.register(TeamName)
