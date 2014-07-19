from django.contrib.auth.decorators import login_required
from django.http import HttpResponse

from sovi.utils import jsonSerializer
from sovi.api.teams.models import Team


@login_required
def getAllTeams(request):
    return HttpResponse(jsonSerializer.serialize(Team.objects.all()),
                        content_type="application/json")
