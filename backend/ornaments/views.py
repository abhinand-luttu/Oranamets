from rest_framework import viewsets, permissions, filters
from django.db.models import Q
from .models import Category, Ornament, OrnamentImage
from .serializers import (
    CategorySerializer,
    OrnamentListSerializer,
    OrnamentDetailSerializer,
    OrnamentImageSerializer,
)

class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and request.user.is_staff


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.filter(is_active=True).order_by('display_order', 'name')
    serializer_class = CategorySerializer
    permission_classes = [IsAdminOrReadOnly]
    lookup_field = 'slug'

    def get_queryset(self):
        # Admin can view all including inactive
        if self.request.user and self.request.user.is_staff:
            return Category.objects.all().order_by('display_order', 'name')
        return Category.objects.filter(is_active=True).order_by('display_order', 'name')


class OrnamentViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAdminOrReadOnly]
    lookup_field = 'slug'

    def get_serializer_class(self):
        if self.action in ['retrieve', 'create', 'update', 'partial_update']:
            return OrnamentDetailSerializer
        return OrnamentListSerializer

    def get_queryset(self):
        queryset = Ornament.objects.select_related('category').prefetch_related('images').all()

        # Category filter
        category = self.request.query_params.get('category', None)
        if category:
            if category.isdigit():
                queryset = queryset.filter(category_id=int(category))
            else:
                queryset = queryset.filter(category__slug=category)

        # Availability filter
        availability = self.request.query_params.get('availability', None)
        if availability:
            queryset = queryset.filter(availability=availability)

        # Featured filter
        featured = self.request.query_params.get('featured', None)
        if featured is not None:
            if featured.lower() in ['true', '1', 'yes']:
                queryset = queryset.filter(is_featured=True)

        # Search filter (name, description, purity)
        search = self.request.query_params.get('search', None)
        if search:
            queryset = queryset.filter(
                Q(name__icontains=search) |
                Q(description__icontains=search) |
                Q(purity__icontains=search) |
                Q(category__name__icontains=search)
            )

        # Sorting
        ordering = self.request.query_params.get('ordering', None)
        if ordering == 'price_asc':
            queryset = queryset.order_by('price')
        elif ordering == 'price_desc':
            queryset = queryset.order_by('-price')
        elif ordering == 'name_asc':
            queryset = queryset.order_by('name')
        elif ordering == 'latest':
            queryset = queryset.order_by('-created_at')
        else:
            # Default ordering: featured first, then latest
            queryset = queryset.order_by('-is_featured', '-created_at')

        return queryset


class OrnamentImageViewSet(viewsets.ModelViewSet):
    queryset = OrnamentImage.objects.all()
    serializer_class = OrnamentImageSerializer
    permission_classes = [permissions.IsAdminUser]
