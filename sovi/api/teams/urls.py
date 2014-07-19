from django.conf.urls import patterns, url
from sovi.api.teams.views import *

urlpatterns = patterns(
    '',
    url(r'^$', getAllTeams, name='Get All Teams'),
)
