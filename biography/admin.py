import models                     
from django.contrib import admin  


class AwardAdmin(admin.ModelAdmin):
    list_display = ('year', 'award', 'location', )

admin.site.register(models.Exhibition)
admin.site.register(models.Education)
admin.site.register(models.Award)
admin.site.register(models.Biography)

