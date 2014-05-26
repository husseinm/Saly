from django.conf.urls import patterns, url
from django.contrib.auth.views import logout, password_reset
import sovi.admin.users.views as userViews

urlpatterns = patterns(
    '',
    url(r'^login/', userViews.login, name='login'),
    url(r'^logout/', logout, {'next_page': 'login'}, name='logout'),
    url(r'^password/new', password_reset, name='login'),
)
