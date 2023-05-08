from django.contrib import admin
from django.urls import path, include, re_path
from x_disk.views import Tess1

urlpatterns = [
    path("", Tess1.as_view()),
]
