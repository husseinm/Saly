from django.conf.urls import patterns, include, url
import sovi.admin.views as adminViews
import sovi.admin.users.urls as userViews

urlpatterns = patterns(
    '',
    url(r'^users/', include(userViews), name='users'),
    url(r'^$', adminViews.index, name='admin'),
)
