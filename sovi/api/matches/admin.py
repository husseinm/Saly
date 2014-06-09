from django.contrib import admin
from sovi.api.matches.models import Game, GameData, Video

# Register your models here.
admin.site.register(Game)
admin.site.register(GameData)
admin.site.register(Video)
