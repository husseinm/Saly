"""
Django settings for sovi project.

For more information on this file, see
https://docs.djangoproject.com/en/1.6/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.6/ref/settings/
"""

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
import os
BASE_DIR = os.path.dirname(os.path.dirname(__file__))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.6/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'mjv8v(%08$eb-o^-u5qc$v#d-!cfo!1k-3u3atu04w=9r5kh_8'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

TEMPLATE_DEBUG = True

# MUST add host name here for the server to work without debug
ALLOWED_HOSTS = ['localhost', 'http://guarded-waters-180.herokuapp.com/']


# Application definition

INSTALLED_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'sovi',
    'sovi.metadata',
    'sovi.api',
    'sovi.api.teams',
    'sovi.api.events',
    'sovi.api.awards',
    'sovi.api.matches',
)

MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
)

ROOT_URLCONF = 'sovi.urls'

WSGI_APPLICATION = 'sovi.wsgi.application'

# Template
TEMPLATE_DIRS = {
    os.path.join(BASE_DIR, 'sovi/templates')
}

# Internationalization
# https://docs.djangoproject.com/en/1.6/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'America/New_York'

USE_I18N = True

USE_L10N = True

USE_TZ = True

LOGIN_URL = '/login'

LOGIN_REDIRECT_URL = '/'

LOGOUT_URL = '/logout'

# Static asset configuration
import os

PROJECT_PATH = os.path.dirname(os.path.abspath(__file__))
STATIC_ROOT = 'staticfiles'
STATIC_URL = '/static/'

STATICFILES_DIRS = (
    os.path.join(PROJECT_PATH, '../client/build'),
)

# Heroku + Local Database
import dj_database_url

DATABASES = {
    'default': dj_database_url.config(default=
                                      'postgres://Mahdi@localhost/sovi')
}
