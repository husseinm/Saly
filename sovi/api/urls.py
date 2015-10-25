from django.conf.urls import patterns, include, url
from sovi.api.teams import urls as teamUrls
from sovi.api.events import urls as eventUrls
from sovi.api.awards import urls as awardUrls

urlpatterns = patterns(
    '',
    url(r'^teams/', include(teamUrls)),
    url(r'^events/', include(eventUrls)),
    url(r'^awards/', include(awardUrls)),
)
