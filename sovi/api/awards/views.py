from django.contrib.auth.decorators import login_required
from django.http import HttpResponse

from sovi.utils import jsonSerializer
from sovi.api.awards.models import Award, AwardType


@login_required
def getAllAwards(request):
    return HttpResponse(jsonSerializer.serialize(Award.objects.all()),
                        content_type="application/json")


@login_required
def getAllAwardTypes(request):
    return HttpResponse(jsonSerializer.serialize(AwardType.objects.all()),
                        content_type="application/json")
