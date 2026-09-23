from rest_framework import views, generics, permissions, status
from rest_framework.response import Response
from .models import BusinessSettings, ContactInquiry
from .serializers import BusinessSettingsSerializer, ContactInquirySerializer

class BusinessSettingsView(views.APIView):
    """
    Get or update global store settings (phone, WhatsApp number, address, etc.)
    """
    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]

    def get(self, request):
        settings = BusinessSettings.get_settings()
        serializer = BusinessSettingsSerializer(settings, context={'request': request})
        return Response(serializer.data)

    def put(self, request):
        settings = BusinessSettings.get_settings()
        serializer = BusinessSettingsSerializer(settings, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ContactInquiryView(generics.ListCreateAPIView):
    """
    Submit a customer inquiry (Public POST) or list inquiries (Admin GET)
    """
    serializer_class = ContactInquirySerializer

    def get_permissions(self):
        if self.request.method == 'POST':
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]

    def get_queryset(self):
        return ContactInquiry.objects.all().order_by('-created_at')
