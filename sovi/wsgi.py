"""
WSGI config for Sovi project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/1.6/howto/deployment/wsgi/
"""
from os import environ
from django.core.wsgi import get_wsgi_application
from dj_static import Cling

environ['DJANGO_SETTINGS_MODULE'] = 'sovi.settings'
application = Cling(get_wsgi_application())
