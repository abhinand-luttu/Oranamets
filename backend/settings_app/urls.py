from django.urls import path
from .views import BusinessSettingsView, ContactInquiryView

urlpatterns = [
    path('business-settings/', BusinessSettingsView.as_view(), name='business-settings'),
    path('inquiries/', ContactInquiryView.as_view(), name='contact-inquiries'),
]
