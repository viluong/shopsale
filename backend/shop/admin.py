from django.contrib import admin

from shop import models

admin.site.register(models.Product)
admin.site.register(models.Order)
admin.site.register(models.Category)
