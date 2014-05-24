from django.conf.urls import patterns, include, url
from django.contrib import admin as sudoAdmin
import sovi.admin.urls as adminUrls

sudoAdmin.autodiscover()
urlpatterns = patterns(
    '',
    url(r'^sudo/', include(sudoAdmin.site.urls), name='sudo'),
    url(r'^', include(adminUrls), name='admin'),
)
