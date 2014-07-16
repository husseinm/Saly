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

    url(r'^$', index, name='index'),
    url(r'^teams/$', index, name='script'),
    url(r'^events/$', index, name='script'),
    url(r'^awards/$', index, name='script'),
    url(r'^matches/$', index, name='script'),
    url(r'^script/$', index, name='script'),
    url(r'^reports/$', index, name='reports'),
    url(r'^preferences/$', index, name='current_preferences'),
    url(r'^login/$', login, name='login'),
    url(r'^logout/$', logout, {'next_page': 'login'}, name='logout'),
    url(r'^reset_password/$', password_reset, name='password_reset'),
)
