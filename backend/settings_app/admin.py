from django.contrib import admin
from django.utils.html import format_html
from .models import BusinessSettings, ContactInquiry

@admin.register(BusinessSettings)
class BusinessSettingsAdmin(admin.ModelAdmin):
    list_display = ['store_name', 'whatsapp_number', 'phone_number', 'city', 'updated_at']
    fieldsets = (
        ("Store Identity", {
            'fields': ('store_name', 'tagline', 'about_summary')
        }),
        ("Contact & Communication", {
            'fields': ('whatsapp_number', 'phone_number', 'email')
        }),
        ("Location & Hours", {
            'fields': ('address', 'city', 'business_hours')
        }),
        ("Social Profiles", {
            'fields': ('instagram_url', 'facebook_url')
        }),
    )

    def has_add_permission(self, request):
        # Only allow 1 instance
        return not BusinessSettings.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False


@admin.register(ContactInquiry)
class ContactInquiryAdmin(admin.ModelAdmin):
    list_display = ['name', 'phone', 'category_interest', 'ornament_name', 'created_at', 'is_resolved', 'whatsapp_quick_link']
    list_filter = ['is_resolved', 'category_interest', 'created_at']
    list_editable = ['is_resolved']
    search_fields = ['name', 'phone', 'email', 'ornament_name', 'message']
    readonly_fields = ['created_at', 'whatsapp_quick_link']

    def whatsapp_quick_link(self, obj):
        clean_phone = ''.join(c for c in obj.phone if c.isdigit())
        if clean_phone:
            url = f"https://wa.me/{clean_phone}"
            return format_html('<a href="{}" target="_blank" style="color: #25D366; font-weight: bold;">Chat on WhatsApp ↗</a>', url)
        return "-"
    whatsapp_quick_link.short_description = "WhatsApp Action"
