from django.http import HttpResponse
from django.utils import simplejson

from models import Info

def index(request):
    data = {}
    rows = Info.objects.all()
    for row in rows:
        data[row.title.lower()] = row.info
    json = simplejson.dumps(data)
    return HttpResponse(json, mimetype='application/json')


