from django.conf.urls import patterns, url
from django.contrib.auth.views import login, logout, password_reset

urlpatterns = patterns(
    '',
    url(r'^login/', login, name='login'),
    url(r'^logout/', logout, {'next_page': 'login'}, name='logout'),
    url(r'^password/new', password_reset, name='login'),
)
