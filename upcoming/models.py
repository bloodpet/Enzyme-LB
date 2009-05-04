from django.db import models


class UpcomingUpload(models.Model):
    upload = models.FileField(upload_to='media/upcoming')
    is_video = models.BooleanField(default=False)
    chosen = models.BooleanField(default=False)
    uploaded = models.DateTimeField(default=False)

    def __unicode__(self):
        return self.uploaded.strftime('%Y-%m-%d %H:%M:%S')

    def save(self):
        import datetime
        self.uploaded = datetime.datetime.now()
        # If the file name is any one of these extensions
        # mark this upload as a video
        vid_ext = ['flv', 'avi', 'mov', 'mp4']
        filename = self.upload.name.lower()
        if True in map(filename.endswith, vid_ext):
            self.is_video = True
            if not filename.endswith('flv'):
                # Fork a process to convert this file to flv
                pass
        else:
            self.is_video = False
        if self.chosen:
            for entry in UpcomingUpload.objects.all():
                entry.chosen = False
                entry.save()
        return super(UpcomingUpload, self).save()


