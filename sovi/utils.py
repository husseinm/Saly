from django.core.serializers.json import Serializer


class JsonSerializer(Serializer):
    def start_object(self, obj):
        self._current = {}

        for field in obj._meta.concrete_model._meta.local_fields:
            field.serialize = True

    def get_dump_object(self, obj):
        return self._current

jsonSerializer = JsonSerializer()
