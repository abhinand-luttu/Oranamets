from rest_framework import serializers
from .models import BusinessSettings, ContactInquiry

class BusinessSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessSettings
        fields = [
            'id',
            'store_name',
            'tagline',
            'whatsapp_number',
            'phone_number',
            'email',
            'address',
            'city',
            'business_hours',
            'about_summary',
            'instagram_url',
            'facebook_url',
            'updated_at',
        ]


class ContactInquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactInquiry
        fields = [
            'id',
            'name',
            'phone',
            'email',
            'category_interest',
            'ornament_name',
            'message',
            'created_at',
        ]
        read_only_fields = ['id', 'created_at']
