from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from .models import Category, Ornament, OrnamentImage
from settings_app.models import BusinessSettings, ContactInquiry

class RajwadiBackendTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.category = Category.objects.create(
            name="Necklace",
            slug="necklace",
            description="Royal Haar and Chokers"
        )
        self.ornament = Ornament.objects.create(
            name="Rajwadi Jadau Kundan Haar",
            slug="rajwadi-jadau-kundan-haar",
            category=self.category,
            description="Exquisite royal necklace",
            price=385000.00,
            availability="in_stock",
            is_featured=True,
            purity="22K Gold"
        )
        OrnamentImage.objects.create(
            ornament=self.ornament,
            alt_text="Front View",
            is_primary=True,
            display_order=0
        )
        self.settings = BusinessSettings.objects.create(
            store_name="Rajwadi Ornaments",
            whatsapp_number="+919876543210",
            phone_number="+919876543210"
        )

    def test_api_root(self):
        response = self.client.get('/api/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('categories', response.data['endpoints'])
        self.assertIn('ornaments', response.data['endpoints'])

    def test_category_list(self):
        response = self.client.get('/api/categories/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = response.data.get('results', response.data)
        self.assertGreaterEqual(len(results), 1)
        self.assertEqual(results[0]['name'], "Necklace")

    def test_ornament_list(self):
        response = self.client.get('/api/ornaments/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = response.data.get('results', response.data)
        self.assertGreaterEqual(len(results), 1)
        self.assertEqual(results[0]['name'], "Rajwadi Jadau Kundan Haar")

    def test_ornament_filter_by_category(self):
        response = self.client.get('/api/ornaments/?category=necklace')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = response.data.get('results', response.data)
        self.assertEqual(len(results), 1)

    def test_ornament_search(self):
        response = self.client.get('/api/ornaments/?search=Jadau')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = response.data.get('results', response.data)
        self.assertEqual(len(results), 1)

        # Non-matching search
        response_empty = self.client.get('/api/ornaments/?search=NonExistentItemXYZ')
        self.assertEqual(response_empty.status_code, status.HTTP_200_OK)
        results_empty = response_empty.data.get('results', response_empty.data)
        self.assertEqual(len(results_empty), 0)

    def test_ornament_detail(self):
        response = self.client.get('/api/ornaments/rajwadi-jadau-kundan-haar/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], "Rajwadi Jadau Kundan Haar")
        self.assertEqual(response.data['category']['name'], "Necklace")
        self.assertGreaterEqual(len(response.data['images']), 1)

    def test_business_settings_api(self):
        response = self.client.get('/api/business-settings/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['store_name'], "Rajwadi Ornaments")
        self.assertEqual(response.data['whatsapp_number'], "+919876543210")

    def test_contact_inquiry_submission(self):
        payload = {
            "name": "Pratapsinh Jadeja",
            "phone": "+919988776655",
            "email": "pratap@example.com",
            "category_interest": "Bridal Jewellery",
            "ornament_name": "Rajwadi Jadau Kundan Haar",
            "message": "Interested in viewing this piece in Ahmedabad showroom."
        }
        response = self.client.post('/api/inquiries/', payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(ContactInquiry.objects.count(), 1)
        inquiry = ContactInquiry.objects.first()
        self.assertEqual(inquiry.name, "Pratapsinh Jadeja")
