from django.contrib.auth.decorators import login_required
from django.contrib.auth.views import login as authLogin
from django.shortcuts import render, redirect
from sovi import settings


@login_required
def index(request):
    return render(request, 'admin.html')


def login(request):
    response = authLogin(request)

    if 'remember' not in request.POST:
        request.session.set_expiry(0)

    return response


def pageNotFound(request):
    redirect(settings.LOGIN_URL)
