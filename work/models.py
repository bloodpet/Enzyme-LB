from django.db import models
from laurenbrincat.utils import upload


class WorkList(models.Model):
    name = models.CharField(max_length=128, unique=True)
    description = models.TextField(blank=True)

    def __unicode__(self):
        return self.name

class WorkUpload(models.Model):
    work_list = models.ForeignKey(WorkList)
    title = models.CharField(max_length=128, blank=True)
    # File
    work_upload = models.FileField(upload_to='media/work')
    flv_filename = models.CharField(max_length=100)
    is_video = models.BooleanField(default=False)

    def __unicode__(self):
        return self.title

    def save(self):
        # If the file name is any one of these extensions
        # mark this upload as a video
        vid_ext = ['flv', 'avi', 'mov', 'mp4']
        filename = self.work_upload.name.lower()
        if True in map(filename.endswith, vid_ext):
            self.is_video = True
            if not filename.endswith('flv'):
                # Fork a process to convert this file to flv
                #self.work_upload = upload.video2flv(self.work_upload)
                self.flv_filename = upload.video2flv(self.work_upload)
                pass
            else:
                self.flv_filename = self.work_upload.name
        else:
            self.is_video = False
            upload.image_resize(self.work_upload)
        return super(WorkUpload, self).save()


