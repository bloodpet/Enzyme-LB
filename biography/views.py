from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.utils import simplejson
from django.views.generic import list_detail
from models import Award, Education, Exhibition, Biography

def json_index(request):
    award_d = award(request)
    education_d = education(request)
    exhibition_d = exhibition(request)
    info_d = info(request)
    json = simplejson.dumps(dict(
        info = info_d,
        award = award_d,
        education = education_d,
        exhibition = exhibition_d,
    ))
    return HttpResponse(json, mimetype='application/json')

def index(request):
    import re
    pattern_start = re.compile('<[a-z]*>')
    pattern_end = re.compile('</[a-z]*>')
    #award_d = award(request)
    #education_d = education(request)
    #exhibition_d = exhibition(request)
    award_d = Award.objects.all()
    education_d = Education.objects.all()
    exhibition_d = Exhibition.objects.all()
    info_d = info(request)
    info_d['info'] = pattern_start.sub('', info_d['info'])
    info_d['info'] = pattern_end.sub('', info_d['info'])
    return render_to_response('biography_index.html', dict(
        info = info_d,
        award = award_d,
        education = education_d,
        exhibition = exhibition_d,
    ))

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

def info(request):
    details = {}
    for entry in Biography.objects.all():
        details['info'] = entry.info
    return details
    json = simplejson.dumps(details)
    return HttpResponse(json, mimetype='application/json')



