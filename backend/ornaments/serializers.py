from rest_framework import serializers
from .models import Category, Ornament, OrnamentImage

class OrnamentImageSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = OrnamentImage
        fields = ['id', 'image', 'image_url', 'alt_text', 'is_primary', 'display_order']

    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None


class CategorySerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    ornaments_count = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description', 'image', 'image_url', 'display_order', 'is_active', 'ornaments_count']

    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None

    def get_ornaments_count(self, obj):
        return obj.ornaments.count()


class OrnamentListSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    category_slug = serializers.CharField(source='category.slug', read_only=True)
    primary_image_url = serializers.SerializerMethodField()
    all_image_urls = serializers.SerializerMethodField()

    class Meta:
        model = Ornament
        fields = [
            'id',
            'name',
            'slug',
            'category',
            'category_name',
            'category_slug',
            'description',
            'price',
            'is_price_on_request',
            'availability',
            'is_featured',
            'purity',
            'weight_approx',
            'primary_image_url',
            'all_image_urls',
            'created_at',
        ]

    def get_primary_image_url(self, obj):
        primary = obj.primary_image
        if primary and primary.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(primary.image.url)
            return primary.image.url
        return None

    def get_all_image_urls(self, obj):
        request = self.context.get('request')
        urls = []
        for img in obj.images.all():
            if img.image:
                if request:
                    urls.append(request.build_absolute_uri(img.image.url))
                else:
                    urls.append(img.image.url)
        return urls


class OrnamentDetailSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), source='category', write_only=True
    )
    images = OrnamentImageSerializer(many=True, read_only=True)

    class Meta:
        model = Ornament
        fields = [
            'id',
            'name',
            'slug',
            'category',
            'category_id',
            'description',
            'price',
            'is_price_on_request',
            'availability',
            'is_featured',
            'purity',
            'weight_approx',
            'images',
            'created_at',
            'updated_at',
        ]
