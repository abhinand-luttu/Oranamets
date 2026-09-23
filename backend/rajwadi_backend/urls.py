from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.views.static import serve
from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view(['GET'])
def api_root(request):
    return Response({
        'status': 'online',
        'store': 'Zivara - Gujarat Traditional Ornaments (Supplied from Kerala)',
        'location': 'Kerala, India',
        'endpoints': {
            'categories': request.build_absolute_uri('/api/categories/'),
            'ornaments': request.build_absolute_uri('/api/ornaments/'),
            'business_settings': request.build_absolute_uri('/api/business-settings/'),
            'inquiries': request.build_absolute_uri('/api/inquiries/'),
            'admin': request.build_absolute_uri('/admin/'),
        }
    })

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', api_root, name='api-root'),
    path('api/', include('ornaments.urls')),
    path('api/', include('settings_app.urls')),
]

# Serve media files in development and as fallback
urlpatterns += [
    re_path(r'^media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT}),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

admin.site.site_header = "Zivara Admin"
admin.site.site_title = "Zivara Portal"
admin.site.index_title = "Ornaments & Business Management"
