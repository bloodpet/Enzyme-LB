from django.conf.urls.defaults import *

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Example:
    # (r'^laurenbrincat/', include('laurenbrincat.foo.urls')),

    # Uncomment the admin/doc line below and add 'django.contrib.admindocs' 
    # to INSTALLED_APPS to enable admin documentation:
    # (r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    (r'^admin/(.*)', admin.site.root),

    # Static route
    (r'^media/(?P<path>.*)$', 'django.views.static.serve', {'document_root': '/home/egcalso/Work/EnzymeIT/LaurenBrincat/laurenbrincat/media/'}),

)
