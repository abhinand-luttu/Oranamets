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
        results = response.data if isinstance(response.data, list) else response.data.get('results', response.data)
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

    def test_adhi_account_attributes(self):
        from django.contrib.auth import get_user_model
        User = get_user_model()
        adhi = User.objects.get(username='Adhi')
        self.assertTrue(adhi.is_staff, "Adhi must be staff for admin access")
        self.assertTrue(adhi.check_password('1234') or adhi.check_password('Luttu@369'))

    def test_adhi_auth_login_success(self):
        # Test password 1234
        payload1 = {"username": "Adhi", "password": "1234"}
        response1 = self.client.post('/api/auth/login/', payload1, format='json')
        self.assertEqual(response1.status_code, status.HTTP_200_OK)
        self.assertIn('token', response1.data)
        self.assertEqual(response1.data['username'], "Adhi")
        self.assertTrue(response1.data['can_add_ornaments'])

        # Test password Luttu@369
        payload2 = {"username": "Adhi", "password": "Luttu@369"}
        response2 = self.client.post('/api/auth/login/', payload2, format='json')
        self.assertEqual(response2.status_code, status.HTTP_200_OK)
        self.assertEqual(response2.data['username'], "Adhi")
        self.assertTrue(response2.data['can_add_ornaments'])

    def test_adhi_auth_login_invalid(self):
        payload = {"username": "Adhi", "password": "WrongPassword123"}
        response = self.client.post('/api/auth/login/', payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_unauthenticated_user_cannot_create_ornament(self):
        payload = {
            "name": "Unauthorized Haar",
            "category_id": self.category.id,
            "description": "Attempt by guest",
            "price": 50000.00
        }
        response = self.client.post('/api/ornaments/', payload, format='json')
        self.assertIn(response.status_code, [status.HTTP_401_UNAUTHORIZED, status.HTTP_403_FORBIDDEN])

    def test_adhi_can_create_ornament_with_image(self):
        from rest_framework.authtoken.models import Token
        from django.contrib.auth import get_user_model
        from django.core.files.uploadedfile import SimpleUploadedFile
        import io
        from PIL import Image

        User = get_user_model()
        adhi = User.objects.get(username='Adhi')
        token, _ = Token.objects.get_or_create(user=adhi)

        # Create a tiny 1x1 test image
        img_io = io.BytesIO()
        test_img = Image.new('RGB', (10, 10), color='gold')
        test_img.save(img_io, format='JPEG')
        img_file = SimpleUploadedFile("test_ornament.jpg", img_io.getvalue(), content_type="image/jpeg")

        client = APIClient()
        client.credentials(HTTP_AUTHORIZATION=f'Token {token.key}')

        payload = {
            "name": "Adhi Temple Choker",
            "category": self.category.id,
            "description": "Traditional gold choker created via Add Ornaments feature",
            "price": 125000.00,
            "purity": "22K Gold",
            "availability": "in_stock",
            "is_featured": "true",
            "image": img_file,
        }

        response = client.post('/api/ornaments/', payload, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['name'], "Adhi Temple Choker")
        self.assertIsNotNone(response.data['primary_image_url'])

        # Verify saved in the exact same database and model
        created_ornament = Ornament.objects.get(name="Adhi Temple Choker")
        self.assertEqual(created_ornament.category, self.category)
        self.assertEqual(created_ornament.images.count(), 1)
        self.assertTrue(created_ornament.is_featured)

        # Verify public unauthenticated user can see it in public GET API
        public_client = APIClient()
        public_res = public_client.get('/api/ornaments/')
        self.assertEqual(public_res.status_code, status.HTTP_200_OK)
        names = [item['name'] for item in public_res.data.get('results', [])]
        self.assertIn("Adhi Temple Choker", names)

    def test_unauthenticated_cannot_delete_ornament(self):
        del_res = self.client.delete(f'/api/ornaments/{self.ornament.slug}/')
        self.assertIn(del_res.status_code, [status.HTTP_401_UNAUTHORIZED, status.HTTP_403_FORBIDDEN])
