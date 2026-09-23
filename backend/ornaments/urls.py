from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, OrnamentViewSet, OrnamentImageViewSet

router = DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'ornaments', OrnamentViewSet, basename='ornament')
router.register(r'images', OrnamentImageViewSet, basename='ornament-image')

urlpatterns = [
    path('', include(router.urls)),
]
