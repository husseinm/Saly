from django.contrib.auth.views import login as authLogin


def login(request):
    response = authLogin(request)

    if 'remember' not in request.POST:
        request.session.set_expiry(0)

    return response
