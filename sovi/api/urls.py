from django.conf.urls import patterns, include, url
from sovi.api.teams import urls as teamUrls

urlpatterns = patterns(
    '',
    url(r'^teams/', include(teamUrls), name='Team API'),
)
