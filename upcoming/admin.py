import models
from django.contrib import admin


class UpcomingAdmin(admin.ModelAdmin):
    fields = ['upload', 'chosen']

admin.site.register(models.UpcomingUpload, UpcomingAdmin)

