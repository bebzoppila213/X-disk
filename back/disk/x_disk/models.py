from django.db import models
from django.conf import settings
from django.core.validators import MaxValueValidator, MinValueValidator


class File(models.Model):
    ZIP = 'z'
    XLSX = 'x'
    DOCX = 'd'
    FILE_TYPES = (
        (ZIP, 'zip'),
        (XLSX, 'xlsx'),
        (DOCX, 'docx')
    )
    type = models.CharField(
        max_length=1,
        choices=FILE_TYPES,
    )
    name = models.CharField(max_length=255)
    size = models.IntegerField(validators=[
            MaxValueValidator(524288),
            MinValueValidator(1)
        ])
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    file = models.FileField(upload_to='documents/', null=True)
