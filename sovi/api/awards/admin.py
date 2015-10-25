from django.contrib import admin
from sovi.api.awards.models import Award, AwardType

# Register your models here.
admin.site.register(Award)
admin.site.register(AwardType)
