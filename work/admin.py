import models
from django.contrib import admin


class WorkUploadInline(admin.StackedInline):
    model = models.WorkUpload
    fields = ['title', 'work_upload']
    extra = 4

class WorkAdmin(admin.ModelAdmin):
    inlines = [WorkUploadInline]

admin.site.register(models.WorkList, WorkAdmin)

