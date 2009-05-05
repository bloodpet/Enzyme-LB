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

def award(request):
    details = {}
    for entry in Award.objects.all():
        try:
            details[entry.year]
        except KeyError:
            details[entry.year] = []
        finally:
            details[entry.year].append(dict(award=entry.award, location=entry.location))
    years = details.keys()
    years.sort()
    years.reverse()
    json = simplejson.dumps(dict(years=years, details=details))
    return HttpResponse(json, mimetype='application/json')

def education(request):
    details = {}
    for entry in Education.objects.all():
        try:
            details[entry.years_taken]
        except KeyError:
            details[entry.years_taken] = []
        finally:
            details[entry.years_taken].append(dict(course=entry.course, location=entry.location))
    years = details.keys()
    years.sort()
    years.reverse()
    json = simplejson.dumps(dict(years=years, details=details))
    return HttpResponse(json, mimetype='application/json')

def exhibition(request):
    details = {}
    for entry in Exhibition.objects.all():
        try:
            details[entry.year]
        except KeyError:
            details[entry.year] = []
        finally:
            details[entry.year].append(entry.details)
    years = details.keys()
    years.sort()
    years.reverse()
    json = simplejson.dumps(dict(years=years, details=details))
    return HttpResponse(json, mimetype='application/json')

