from django.conf.urls import patterns, include, url
from django.conf import settings
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    (r'^static/(?P<path>.*)$', 'django.views.static.serve',{'document_root': settings.MEDIA_ROOT}),
    url(r'^$', 'tesigners.views.index', name='home'),
    url(r'^new_user/$', 'tesigners.views.create_user', name='create_user'),
    url(r'^signup/$', 'tesigners.views.signup', name='signup_user'),
    url(r'^dashboard/$', 'tesigners.views.dashboard', name='dashboard'),
    url(r'^authenticate_user/$', 'tesigners.views.authenticate_user', name='authenticate_user'),
    url(r'^orders/$', 'tesigners.views.show_order', name='show_order'),
    url(r'^products/$', 'tesigners.views.store_seller_supported_products', name='store_seller_supported_products'),
    # url(r'^webserver/', include('webserver.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
)

urlpatterns+= staticfiles_urlpatterns()
