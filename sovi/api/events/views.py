from django.contrib.auth.decorators import login_required
from django.http import HttpResponse

from sovi.utils import jsonSerializer
from sovi.api.events.models import Event


@login_required
def getAllEvents(request):
    return HttpResponse(jsonSerializer.serialize(Event.objects.all()),
                        content_type="application/json")
