from django.conf.urls import patterns, url
from sovi.api.events.views import getAllEvents

urlpatterns = patterns(
    '',
    url(r'^$', getAllEvents),
)
