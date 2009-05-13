from django.db import models

class Info(models.Model):
    title = models.CharField(max_length=128)
    info = models.CharField(max_length=512)

    def __unicode__(self):
        return '%s: %s' % (self.title, self.info)


