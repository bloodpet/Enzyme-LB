from django.http import HttpResponse
from models import UpcomingUpload

def index(request):
    img = UpcomingUpload.objects.filter(chosen=True)[0]
    return HttpResponse('<img src="/%s" />' % img.upload)

