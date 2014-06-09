from django.contrib import admin
from sovi.api.awards.models import Award, AwardName

# Register your models here.
admin.site.register(Award)
admin.site.register(AwardName)
