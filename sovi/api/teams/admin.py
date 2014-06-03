from django.contrib import admin
from sovi.api.teams.models import Team, TeamName, TeamWebsite

# Register your models here.
admin.site.register(Team)
admin.site.register(TeamWebsite)
admin.site.register(TeamName)
