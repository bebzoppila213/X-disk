from rest_framework import serializers
from x_disk.models import File

class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = ['id', 'type', 'name', 'size', 'file']

    def create(self, validated_data):
        return File.objects.create(**validated_data)