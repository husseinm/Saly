from django.conf.urls import patterns, include, url, handler404
from django.contrib import admin
from django.contrib.auth.views import logout, password_reset
from sovi.views import login, index
from sovi.api import urls as apiUrls

admin.autodiscover()
handler404 = 'sovi.views.pageNotFound'

urlpatterns = patterns(
    '',
    url(r'^admin/', include(admin.site.urls), name='admin'),
    url(r'^api/', include(apiUrls), name='api'),

    url(r'^$', index),
    url(r'^data/$', index),
    url(r'^data/teams/$', index),
    url(r'^data/events/$', index),
    url(r'^data/awards/$', index),
    url(r'^data/matches/$', index),
    url(r'^script/$', index),
    url(r'^reports/$', index),
    url(r'^preferences/$', index),
    url(r'^login/$', login, name='login'),
    url(r'^logout/$', logout, {'next_page': 'login'}),
    url(r'^reset_password/$', password_reset),
)
