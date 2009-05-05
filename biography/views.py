from django.http import HttpResponse
from django.utils import simplejson
from django.views.generic import list_detail
from models import Award, Education, Exhibition

def index(request):
    return list_detail.object_list(
            request,
            queryset = Exhibition.objects.all(),
            template_name = 'biography.html',
            template_object_name = 'exhibitions',
            extra_context = dict(
                awards = Award.objects.all,
                educations = Education.objects.all,
            ),
        )

def exhibition(request):
    details = {}
    years = set([])
    for entry in Exhibition.objects.all():
        years.add(entry.year)
        try:
            details[entry.year]
        except KeyError:
            details[entry.year] = []
        finally:
            details[entry.year].append(entry.details)
    json = simplejson.dumps(dict(years=list(years), details=details))
    return HttpResponse(json, mimetype='application/json')

