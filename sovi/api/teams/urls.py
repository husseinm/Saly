from django.conf.urls import patterns, url
from sovi.api.teams.views import getAllTeams

urlpatterns = patterns(
    '',
    url(r'^$', getAllTeams),
)
