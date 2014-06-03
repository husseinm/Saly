from django.contrib import admin
from sovi.api.events.models import Event, EventName, EventWebsite

# Register your models here.
admin.site.register(Event)
admin.site.register(EventName)
admin.site.register(EventWebsite)
