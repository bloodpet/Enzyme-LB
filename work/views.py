from django.http import HttpResponse
from django.utils import simplejson
from django.views.generic import list_detail
#from django.views.generic.simple import direct_to_template
from django.shortcuts import render_to_response, get_object_or_404

from models import WorkList, WorkUpload
from django.core import serializers

def index(request):
    return render_to_response('index.html')
    return list_detail.object_list(
            request,
            queryset = WorkList.objects.all(),
            template_name = 'index.html',
        )

#def page_detail(request, name, upload_id):
def page_detail(request):
    name = request.REQUEST['name']
    upload_id = request.REQUEST['id']
    p = get_object_or_404(WorkUpload, pk=upload_id)
    json = simplejson.dumps(dict(
            title = p.title,
            upload = p.work_upload.name,
            flv = p.flv_filename,
            is_video = p.is_video,
        ))
    return HttpResponse(json, mimetype='application/json')

#def page_list(request, name):
def page_list(request):
    name = request.REQUEST['name']
    json = simplejson.dumps(dict(
            name = name,
            rows = list(WorkUpload.objects.filter(work_list__name=name).values()),
        ))
    return HttpResponse(json, mimetype='application/json')
    return list_detail.object_list(
            request,
            queryset = WorkUpload.objects.filter(work_list__name=name),
            extra_context = dict(name = name),
        )

def work_list(request, name=None):
    works = serializers.serialize('json', WorkList.objects.all())
    data = dict(
            works = serializers.serialize('json', WorkList.objects.all()),
            chosen = name,
        )
    print works
    json = simplejson.dumps(data)
    return HttpResponse(works)
    return HttpResponse(json, mimetype='application/json')
    #return list_detail.object_list(
            #request,
            #queryset = WorkList.objects.all(),
            #extra_context = dict(name = name),
        #)

