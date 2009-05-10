from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.utils import simplejson
from django.views.generic import list_detail
from models import Award, Education, Exhibition

def index(request):
    award_d = award(request)
    education_d = education(request)
    exhibition_d = exhibition(request)
    json = simplejson.dumps(dict(
        award = award_d,
        education = education_d,
        exhibition = exhibition_d,
    ))
    return HttpResponse(json, mimetype='application/json')
    return render_to_response('biography_div.html', dict(
        award_details = award_d['details'],
        award_years = award_d['years'],
        education_details = education_d['details'],
        education_years = education_d['years'],
        exhibition_details = exhibition_d['details'],
        exhibition_years = exhibition_d['years'],
    ))
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
    print dict(years=years, details=details)
    return dict(years=years, details=details)
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
    return dict(years=years, details=details)
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
    return dict(years=years, details=details)
    json = simplejson.dumps(dict(years=years, details=details))
    return HttpResponse(json, mimetype='application/json')

