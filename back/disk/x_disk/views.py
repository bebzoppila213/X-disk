import json
import os
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from x_disk.utils import max_file_size, checked_file_type, get_file_type
from x_disk.models import File
from x_disk.serializers import FileSerializer
from django.db.models import Sum


class Tess1(APIView):

    permission_classes = [IsAuthenticated]

    @checked_file_type('file', ['zip', 'rar', '7zip', 'xlsx', 'docx'])
    @max_file_size('file', 4194304)
    def post(self, request, format=None):
        file = request.FILES['file']
        file_type = get_file_type(file.name)
        occupied_space = (File.objects.filter(owner=request.user).aggregate(
            Sum('size', default=0))['size__sum'] + file.size) / (1024 * 1024)

        if occupied_space > 10:
            return Response({"messages": "Недостаточно места на диске", "status": 400})

        serializer = FileSerializer(
            data={"type": file_type[0], "name": file.name, "size": file.size, "file": request.FILES['file']})
        if serializer.is_valid():
            serializer.save(owner=request.user)
        return Response({"status": 201, "data": serializer.data})

    def get(self, request, format=None):
        files = File.objects.filter(owner=request.user)
        serializer = FileSerializer(files, many=True)
        return Response(serializer.data)

    def delete(self, request, format=None):
        data = json.loads(request.body)
        file = File.objects.get(pk=data['fileId'], owner=request.user)
        path = file.file.path
        if os.path.isfile(path):
            os.remove(path)
        file.delete()
        return Response({"messages": "Фаил удалён"})
