from django.http import HttpResponse
from django.utils import simplejson
from django.views.generic import list_detail
#from django.views.generic.simple import direct_to_template
from django.shortcuts import render_to_response, get_object_or_404

from models import WorkList, WorkUpload

def index(request):
    return render_to_response('index.html')
    return list_detail.object_list(
            request,
            queryset = WorkList.objects.all(),
            template_name = 'index.html',
        )

def page_detail(request, name, upload_id):
    p = get_object_or_404(WorkUpload, pk=upload_id)
    json = simplejson.dumps(dict(
            title = p.title,
            upload = p.work_upload.name,
            is_video = p.is_video,
        ))
    return HttpResponse(json, mimetype='application/json')

def page_list(request, name):
    print 'page list'
    return list_detail.object_list(
            request,
            queryset = WorkUpload.objects.filter(work_list__name=name),
            extra_context = dict(name = name),
        )

def work_list(request, name=None):
    return list_detail.object_list(
            request,
            queryset = WorkList.objects.all(),
            extra_context = dict(name = name),
        )

