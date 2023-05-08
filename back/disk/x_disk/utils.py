from rest_framework.response import Response
from pathlib import Path


def checking_file_size(file, size):
    return file.size > size


def checking_file_type(file_name, allowed_types):
    file_type = Path(file_name).suffix[1:].lower()
    return file_type not in allowed_types


def get_file_type(file_name):
    return Path(file_name).suffix[1:].lower()


def max_file_size(file_name, file_size):
    def actual_decorator(func):
        def wrapper(self, request, format=None):
            file = request.FILES[file_name]
            if file.size > file_size:
                return Response({"messages": "Файл слишком большой", "status": 400})
            return func(self, request, format=None)
        return wrapper
    return actual_decorator


def checked_file_type(file_name, file_types):
    def actual_decorator(func):
        def wrapper(self, request, format=None):
            file = request.FILES[file_name]
            file_type = Path(file.name).suffix[1:].lower()
            if file_type not in file_types:
                return Response({"messages": "Такой тип файлов запрещён", "status": 400})
            return func(self, request, format=None)
        return wrapper
    return actual_decorator
