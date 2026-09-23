from django.contrib import admin
from django.utils.html import format_html
from .models import Category, Ornament, OrnamentImage

class OrnamentImageInline(admin.TabularInline):
    model = OrnamentImage
    extra = 3
    fields = ['image', 'image_preview', 'alt_text', 'is_primary', 'display_order']
    readonly_fields = ['image_preview']

    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="max-height: 80px; max-width: 100px; border-radius: 4px; object-fit: cover;" />', obj.image.url)
        return "(No image uploaded)"
    image_preview.short_description = "Preview"


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'ornaments_count', 'display_order', 'is_active', 'image_thumbnail']
    list_editable = ['display_order', 'is_active']
    search_fields = ['name', 'description']
    prepopulated_fields = {'slug': ('name',)}
    list_filter = ['is_active']

    def ornaments_count(self, obj):
        return obj.ornaments.count()
    ornaments_count.short_description = "Ornaments"

    def image_thumbnail(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="height: 40px; width: 40px; border-radius: 50%; object-fit: cover;" />', obj.image.url)
        return "-"
    image_thumbnail.short_description = "Icon"


@admin.register(Ornament)
class OrnamentAdmin(admin.ModelAdmin):
    list_display = [
        'thumbnail_preview',
        'name',
        'category',
        'price_display',
        'purity',
        'availability',
        'is_featured',
        'created_at',
    ]
    list_editable = ['availability', 'is_featured']
    list_filter = ['category', 'availability', 'is_featured', 'created_at']
    search_fields = ['name', 'description', 'purity', 'category__name']
    prepopulated_fields = {'slug': ('name',)}
    inlines = [OrnamentImageInline]
    fieldsets = (
        ("Basic Information", {
            'fields': ('name', 'slug', 'category', 'description')
        }),
        ("Pricing & Availability", {
            'fields': ('price', 'is_price_on_request', 'availability', 'is_featured')
        }),
        ("Craftsmanship & Specifications", {
            'fields': ('purity', 'weight_approx')
        }),
    )

    def thumbnail_preview(self, obj):
        primary = obj.primary_image
        if primary and primary.image:
            return format_html('<img src="{}" style="height: 50px; width: 50px; border-radius: 6px; object-fit: cover; border: 1px solid #C5A059;" />', primary.image.url)
        return format_html('<span style="color: #999;">No image</span>')
    thumbnail_preview.short_description = "Image"

    def price_display(self, obj):
        if obj.is_price_on_request:
            return format_html('<span style="color: #856404; font-style: italic;">On Request</span>')
        if obj.price:
            return f"₹{obj.price:,.2f}"
        return "—"
    price_display.short_description = "Price (INR)"


@admin.register(OrnamentImage)
class OrnamentImageAdmin(admin.ModelAdmin):
    list_display = ['image_preview', 'ornament', 'alt_text', 'is_primary', 'display_order', 'created_at']
    list_filter = ['is_primary', 'ornament__category']
    search_fields = ['ornament__name', 'alt_text']
    list_editable = ['is_primary', 'display_order']

    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="max-height: 50px; max-width: 60px; border-radius: 4px; object-fit: cover;" />', obj.image.url)
        return "-"
    image_preview.short_description = "Thumbnail"
