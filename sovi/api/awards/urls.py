from django.conf.urls import patterns, url
from sovi.api.awards.views import getAllAwards, getAllAwardTypes

urlpatterns = patterns(
    '',
    url(r'^$', getAllAwards),
    url(r'^types/', getAllAwardTypes),
)
