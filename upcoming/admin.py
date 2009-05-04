import models
from django.contrib import admin


class UpcomingAdmin(admin.ModelAdmin):
    fields = ['upload', 'chosen']
    list_display = ['uploaded', 'upload', 'chosen', ]


admin.site.register(models.UpcomingUpload, UpcomingAdmin)

