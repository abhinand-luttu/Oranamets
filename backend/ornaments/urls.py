from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, OrnamentViewSet, OrnamentImageViewSet
from .auth_views import api_login, api_me

router = DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'ornaments', OrnamentViewSet, basename='ornament')
router.register(r'images', OrnamentImageViewSet, basename='ornament-image')

urlpatterns = [
    path('auth/login/', api_login, name='auth-login'),
    path('auth/me/', api_me, name='auth-me'),
    path('', include(router.urls)),
]
