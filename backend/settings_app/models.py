from django.db import models

class BusinessSettings(models.Model):
    store_name = models.CharField(max_length=150, default="Zivara")
    tagline = models.CharField(max_length=250, default="Gujarat Traditional Ornaments • Shipped Directly from Gujarat")
    whatsapp_number = models.CharField(max_length=20, default="+918848242986", help_text="WhatsApp phone number, e.g. +91 8848242986")
    phone_number = models.CharField(max_length=20, default="+918848242986", help_text="Contact number for direct voice calls")
    email = models.EmailField(default="contact@zivaraornaments.com")
    address = models.TextField(default="Gujarat, India (Direct Shipment Hub)")
    city = models.CharField(max_length=100, default="Gujarat, India")
    business_hours = models.CharField(max_length=200, default="Monday – Saturday: 9:30 AM – 7:30 PM | Available on WhatsApp & Call")
    about_summary = models.TextField(
        default="Zivara brings authentic Gujarat traditional ornaments directly to your doorstep. "
                "When you select an ornament, your order is processed by Zivara and shipped directly from Gujarat to your address. "
                "From intricate Jadau and Kundan pieces to timeless Kathiyawadi necklaces, bridal sets, and bangles, "
                "we deliver authentic Gujarat heritage jewellery with guaranteed doorstep delivery."
    )
    instagram_url = models.URLField(blank=True, default="https://instagram.com")
    facebook_url = models.URLField(blank=True, default="https://facebook.com")
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Business Setting"
        verbose_name_plural = "Business Settings"

    def __str__(self):
        return f"{self.store_name} Settings (WhatsApp: {self.whatsapp_number}, Location: {self.city})"

    @classmethod
    def get_settings(cls):
        obj, _ = cls.objects.get_or_create(id=1)
        return obj


class ContactInquiry(models.Model):
    name = models.CharField(max_length=120)
    phone = models.CharField(max_length=25)
    email = models.EmailField(blank=True, null=True)
    category_interest = models.CharField(max_length=100, blank=True, default='')
    ornament_name = models.CharField(max_length=200, blank=True, default='')
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_resolved = models.BooleanField(default=False)

    class Meta:
        verbose_name = "Contact Inquiry"
        verbose_name_plural = "Contact Inquiries"
        ordering = ['-created_at']

    def __str__(self):
        return f"Inquiry from {self.name} ({self.phone}) - {self.created_at.strftime('%Y-%m-%d')}"
