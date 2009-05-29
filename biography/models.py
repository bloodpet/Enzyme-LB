from django.db import models


class Award(models.Model):
    award = models.CharField(max_length=256)
    location = models.CharField(max_length=256)
    year = models.IntegerField()

    def __unicode__(self):
        return self.award


class Education(models.Model):
    course = models.CharField(max_length=256, unique=True)
    location = models.CharField(max_length=256)
    years_taken = models.CharField(max_length=256)

    def __unicode__(self):
        return self.course


class Exhibition(models.Model):
    year = models.IntegerField()
    details = models.CharField(max_length=512, unique=True)

    def __unicode__(self):
        return '%s: %s' % (self.year, self.details)


class Biography(models.Model):
    info = models.TextField(blank=True)

    def __unicode__(self):
        return self.info
