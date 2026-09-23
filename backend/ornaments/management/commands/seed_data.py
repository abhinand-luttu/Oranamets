import os
import urllib.request
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.core.files.base import ContentFile
from django.conf import settings
from PIL import Image, ImageDraw, ImageFont
import io

from ornaments.models import Category, Ornament, OrnamentImage
from settings_app.models import BusinessSettings

User = get_user_model()

class Command(BaseCommand):
    help = "Seed Zivara Ornaments with Gujarat traditional categories, ornaments, images, and admin credentials."

    def handle(self, *args, **options):
        self.stdout.write("--- Starting Zivara Database Seeding ---")

        # 1. Superuser
        admin_user, created = User.objects.get_or_create(username='admin')
        if created:
            admin_user.set_password('rajwadi@admin2026')
            admin_user.email = 'admin@zivaraornaments.com'
            admin_user.is_staff = True
            admin_user.is_superuser = True
            admin_user.save()
            self.stdout.write(self.style.SUCCESS("[OK] Superuser created: admin / rajwadi@admin2026"))
        else:
            admin_user.set_password('rajwadi@admin2026')
            admin_user.save()
            self.stdout.write(self.style.SUCCESS("[OK] Superuser password updated: admin / rajwadi@admin2026"))

        # 2. Business Settings
        business_settings = BusinessSettings.get_settings()
        business_settings.store_name = "Zivara"
        business_settings.tagline = "Gujarat Traditional Ornaments • Shipped Directly from Gujarat"
        business_settings.whatsapp_number = "+918848242986"
        business_settings.phone_number = "+918848242986"
        business_settings.email = "contact@zivaraornaments.com"
        business_settings.address = "Gujarat, India (Direct Shipment Hub)"
        business_settings.city = "Gujarat, India"
        business_settings.business_hours = "Monday - Saturday: 9:30 AM - 7:30 PM | Available on WhatsApp & Call"
        business_settings.about_summary = (
            "Zivara brings authentic Gujarat traditional ornaments directly to your doorstep. "
            "When you select an ornament, your order is processed by Zivara and shipped directly from Gujarat to your provided address. "
            "From intricate Jadau and Kundan pieces to timeless Kathiyawadi necklaces, bridal sets, and bangles, "
            "we deliver authentic Gujarat heritage jewellery with guaranteed doorstep delivery."
        )
        business_settings.save()
        self.stdout.write(self.style.SUCCESS("[OK] Business Settings initialized for Zivara (Shipped from Gujarat)"))

        # 3. Categories
        categories_data = [
            ("Necklace", "necklace", "Royal Haar, Chokers, Hasli, and Kundan Neckpieces", 1),
            ("Earrings", "earrings", "Kathiyawadi Jhumkas, Chandbalis, and Kan-Chain Drops", 2),
            ("Bangles", "bangles", "Traditional Patla, Kangan, and Gokhru Bridal Bangles", 3),
            ("Rings", "rings", "Statement Cocktails, Navratna, and Royal Arsi Rings", 4),
            ("Bridal Jewellery", "bridal-jewellery", "Complete Gujarati & Rajasthani Wedding Ensembles", 5),
            ("Traditional Jewellery", "traditional-jewellery", "Centuries-old Heritage Designs & Antique Heirlooms", 6),
            ("Gujarat Special", "gujarat-special", "Authentic Pachchikam, Kathiyawadi, & Vadodara Court Art", 7),
            ("Other", "other", "Maang Tikka, Nath, Bajuband, and Hathphool Ornaments", 8),
        ]

        category_objs = {}
        for name, slug, desc, order in categories_data:
            cat, _ = Category.objects.update_or_create(
                slug=slug,
                defaults={
                    'name': name,
                    'description': desc,
                    'display_order': order,
                    'is_active': True,
                }
            )
            category_objs[slug] = cat

        self.stdout.write(self.style.SUCCESS(f"[OK] {len(category_objs)} Categories created"))

        # Helper function to generate luxury jewellery preview image
        def create_ornament_image(title, subtitle, angle_label, bg_color=(44, 24, 16), accent_color=(197, 160, 89)):
            width, height = 800, 800
            img = Image.new('RGB', (width, height), color=bg_color)
            draw = ImageDraw.Draw(img)

            # Draw outer gold borders
            draw.rectangle([(24, 24), (width - 24, height - 24)], outline=accent_color, width=3)
            draw.rectangle([(32, 32), (width - 32, height - 32)], outline=(107, 29, 47), width=1)
            draw.rectangle([(40, 40), (width - 40, height - 40)], outline=accent_color, width=1)

            # Corner decorative accents
            for corner in [(48, 48), (width - 48, 48), (48, height - 48), (width - 48, height - 48)]:
                cx, cy = corner
                draw.rectangle([(cx - 10, cy - 10), (cx + 10, cy + 10)], outline=accent_color, width=2)
                draw.polygon([(cx, cy - 8), (cx + 8, cy), (cx, cy + 8), (cx - 8, cy)], fill=accent_color)

            # Center medallion
            center_x, center_y = width // 2, height // 2 - 40
            draw.ellipse([(center_x - 180, center_y - 180), (center_x + 180, center_y + 180)], outline=accent_color, width=2)
            draw.ellipse([(center_x - 170, center_y - 170), (center_x + 170, center_y + 170)], outline=(107, 29, 47), width=4)
            draw.ellipse([(center_x - 150, center_y - 150), (center_x + 150, center_y + 150)], outline=accent_color, width=1)

            # Draw royal jewel motif in center
            draw.polygon([
                (center_x, center_y - 90),
                (center_x + 90, center_y),
                (center_x, center_y + 90),
                (center_x - 90, center_y)
            ], outline=accent_color, width=3, fill=(107, 29, 47))

            draw.polygon([
                (center_x, center_y - 50),
                (center_x + 50, center_y),
                (center_x, center_y + 50),
                (center_x - 50, center_y)
            ], fill=accent_color)

            # Text labels
            brand_text = "ZIVARA"
            draw.text((center_x, 100), brand_text, fill=accent_color, anchor="mm")
            draw.text((center_x, 125), "* GUJARAT TRADITIONAL ORNAMENTS *", fill=(247, 242, 233), anchor="mm")

            draw.text((center_x, height - 190), title.upper(), fill=(253, 251, 247), anchor="mm")
            draw.text((center_x, height - 150), subtitle, fill=accent_color, anchor="mm")
            draw.text((center_x, height - 110), f"[{angle_label}]", fill=(180, 160, 140), anchor="mm")

            buf = io.BytesIO()
            img.save(buf, format='JPEG', quality=92)
            return ContentFile(buf.getvalue())

        # 4. Curated Ornaments
        ornaments_data = [
            {
                "name": "Rajwadi Jadau Kundan Haar",
                "category": "necklace",
                "description": (
                    "Handcrafted royal necklace inspired by the royal court of Vadodara. "
                    "Features exquisite uncut polki diamonds set in 22K gold foil with natural Basra pearl drops "
                    "and a deep maroon Jaipur Meenakari reverse. A masterwork worn for auspicious royal ceremonies."
                ),
                "price": 385000.00,
                "is_price_on_request": False,
                "availability": "in_stock",
                "is_featured": True,
                "purity": "22K Hallmarked Gold with Uncut Polki & Basra Pearls",
                "weight_approx": "92g approx.",
                "images": [
                    ("Primary Royal Showcase", (44, 24, 16), (212, 175, 55)),
                    ("Pendant Close-up & Kundan Setting", (107, 29, 47), (197, 160, 89)),
                    ("Reverse Meenakari Craftsmanship", (35, 18, 12), (212, 175, 55)),
                ]
            },
            {
                "name": "Kathiyawadi Jhumka with Kan Chain",
                "category": "earrings",
                "description": (
                    "Traditional Gujarati Kathiyawadi bell-shaped jhumkas accompanied by delicate hair-support kan chains. "
                    "Features intricate filigree wirework, natural ruby drops, and fine pearl cluster fringe."
                ),
                "price": 125000.00,
                "is_price_on_request": False,
                "availability": "in_stock",
                "is_featured": True,
                "purity": "22K Antique Yellow Gold",
                "weight_approx": "34g approx.",
                "images": [
                    ("Pair Showcase", (44, 24, 16), (197, 160, 89)),
                    ("Bell Filigree Detail", (107, 29, 47), (212, 175, 55)),
                    ("Kan Chain Ear Support", (30, 20, 18), (197, 160, 89)),
                ]
            },
            {
                "name": "Royal Pachchikam Navratna Choker",
                "category": "gujarat-special",
                "description": (
                    "Ancient Kutch Pachchikam craftsmanship embedding nine sacred astrological gemstones (Navratna) "
                    "in delicate claw settings over a silver-gold matrix. A rare heritage piece crafted by Bhuj master artisans."
                ),
                "price": 275000.00,
                "is_price_on_request": False,
                "availability": "in_stock",
                "is_featured": True,
                "purity": "22K Gold & Silver Alloy (Pachchikam Art)",
                "weight_approx": "68g approx.",
                "images": [
                    ("Front Royal Choker View", (30, 15, 20), (212, 175, 55)),
                    ("Navratna Gemstones Close-up", (107, 29, 47), (197, 160, 89)),
                ]
            },
            {
                "name": "Traditional Patla & Kangan Set",
                "category": "bangles",
                "description": (
                    "Classic Gujarati broad bridal Patla bangles adorned with embossed elephant and floral motifs, "
                    "highlighted with fine Jaipur maroon and emerald green Meenakari enamel."
                ),
                "price": 210000.00,
                "is_price_on_request": False,
                "availability": "in_stock",
                "is_featured": True,
                "purity": "22K Gold with Red & Green Enamel",
                "weight_approx": "58g pair",
                "images": [
                    ("Bangle Pair View", (44, 24, 16), (197, 160, 89)),
                    ("Floral Embossing Detail", (107, 29, 47), (212, 175, 55)),
                ]
            },
            {
                "name": "Meenakari Mayur Peacock Ring",
                "category": "rings",
                "description": (
                    "Grand royal statement ring sculpted in the silhouette of a dancing peacock with vibrant turquoise "
                    "and ruby glass enamel, surrounded by micro-seed pearls and faceted uncut diamond eye."
                ),
                "price": 68000.00,
                "is_price_on_request": False,
                "availability": "in_stock",
                "is_featured": False,
                "purity": "22K Yellow Gold with Hand Enamel",
                "weight_approx": "16g",
                "images": [
                    ("Top Cocktail View", (35, 20, 25), (212, 175, 55)),
                    ("Side Profile & Feather Carving", (44, 24, 16), (197, 160, 89)),
                ]
            },
            {
                "name": "Gujarati Damini & Mathapatti",
                "category": "bridal-jewellery",
                "description": (
                    "Opulent forehead ornament featuring multi-strand pearl and gold chains with an ornate floral centerpiece borla, "
                    "traditionally worn by Gujarati brides on wedding day. Exudes royal grace and elegance."
                ),
                "price": 195000.00,
                "is_price_on_request": False,
                "availability": "in_stock",
                "is_featured": True,
                "purity": "22K Gold & Uncut Kundan",
                "weight_approx": "48g",
                "images": [
                    ("Bridal Mathapatti Spread", (107, 29, 47), (212, 175, 55)),
                    ("Center Borla Rosette", (44, 24, 16), (197, 160, 89)),
                ]
            },
            {
                "name": "Heritage Hasli Choker",
                "category": "traditional-jewellery",
                "description": (
                    "Rigid collar neckpiece traditionally favored by Saurashtra royal households. "
                    "Constructed with hand-beaten solid gold torque, spiral terminal knobs, and cabochon rubies."
                ),
                "price": 290000.00,
                "is_price_on_request": False,
                "availability": "in_stock",
                "is_featured": False,
                "purity": "22K Solid Gold with Antique Patina",
                "weight_approx": "74g",
                "images": [
                    ("Hasli Collar Overview", (44, 24, 16), (197, 160, 89)),
                    ("Finial Knob Detailing", (30, 15, 10), (212, 175, 55)),
                ]
            },
            {
                "name": "Rajputana Borla Maang Tikka",
                "category": "bridal-jewellery",
                "description": (
                    "Spherical bell-shaped Borla with radiant round polki centerpiece and ruby rim, "
                    "adorned with delicate seed pearl stringing. Perfect accompaniment to royal lehengas."
                ),
                "price": 52000.00,
                "is_price_on_request": False,
                "availability": "in_stock",
                "is_featured": False,
                "purity": "22K Gold with Kundan Polki",
                "weight_approx": "14g",
                "images": [
                    ("Borla Front Angle", (107, 29, 47), (212, 175, 55)),
                    ("Side Profile & Pearl String", (44, 24, 16), (197, 160, 89)),
                ]
            },
            {
                "name": "Handcrafted Meenakari Bajuband (Armlet)",
                "category": "gujarat-special",
                "description": (
                    "Traditional Gujarati upper arm ornament featuring reversible royal miniature paintings in glass enamel "
                    "on the reverse and dazzling uncut Kundan on the obverse, tied with hand-woven crimson zari cord."
                ),
                "price": 145000.00,
                "is_price_on_request": False,
                "availability": "in_stock",
                "is_featured": True,
                "purity": "22K Gold with Crimson Zari Silk Cord",
                "weight_approx": "38g",
                "images": [
                    ("Bajuband Front Kundan", (44, 24, 16), (212, 175, 55)),
                    ("Reverse Enamel Miniature", (107, 29, 47), (197, 160, 89)),
                ]
            },
            {
                "name": "Chandbali Pearl Drop Earrings",
                "category": "earrings",
                "description": (
                    "Crescent moon shaped royal earrings with concentric gold filigree rings, micro-pearl tassels, "
                    "and natural Colombian emerald drop highlights."
                ),
                "price": 98000.00,
                "is_price_on_request": False,
                "availability": "in_stock",
                "is_featured": False,
                "purity": "22K Yellow Gold & Freshwater Pearls",
                "weight_approx": "26g",
                "images": [
                    ("Pair View", (30, 20, 18), (197, 160, 89)),
                    ("Crescent Arch & Pearls", (107, 29, 47), (212, 175, 55)),
                ]
            },
            {
                "name": "Imperial Bridal Hathphool (Hand Harness)",
                "category": "bridal-jewellery",
                "description": (
                    "Exquisite bridal hand ornament connecting five ornate floral rings to a royal kundan wristlet "
                    "through cascading pearl strands. Crafted exclusively for regal wedding moments."
                ),
                "price": None,
                "is_price_on_request": True,
                "availability": "made_to_order",
                "is_featured": True,
                "purity": "22K Hallmarked Gold & Natural Pearls",
                "weight_approx": "52g",
                "images": [
                    ("Full Hand Spread Display", (107, 29, 47), (212, 175, 55)),
                    ("Center Flower Rosette", (44, 24, 16), (197, 160, 89)),
                ]
            },
            {
                "name": "Vintage Gokhru Spike Bangles",
                "category": "traditional-jewellery",
                "description": (
                    "Pair of iconic Gujarati Gokhru bangles with distinctive triangular faceted studs and embossed rim, "
                    "symbolizing prosperity and royal lineage in Saurashtra."
                ),
                "price": 185000.00,
                "is_price_on_request": False,
                "availability": "in_stock",
                "is_featured": False,
                "purity": "22K Gold Antique Finish",
                "weight_approx": "50g pair",
                "images": [
                    ("Bangle Pair View", (44, 24, 16), (197, 160, 89)),
                    ("Gokhru Pyramid Stud Close-up", (35, 18, 12), (212, 175, 55)),
                ]
            },
        ]

        for item in ornaments_data:
            cat = category_objs[item["category"]]
            ornament, created = Ornament.objects.update_or_create(
                name=item["name"],
                defaults={
                    'category': cat,
                    'description': item["description"],
                    'price': item["price"],
                    'is_price_on_request': item["is_price_on_request"],
                    'availability': item["availability"],
                    'is_featured': item["is_featured"],
                    'purity': item["purity"],
                    'weight_approx': item["weight_approx"],
                }
            )

            # Clear existing images for clean re-seed
            ornament.images.all().delete()

            for idx, (label, bg_c, acc_c) in enumerate(item["images"]):
                img_content = create_ornament_image(
                    title=item["name"],
                    subtitle=item["purity"],
                    angle_label=label,
                    bg_color=bg_c,
                    accent_color=acc_c
                )
                filename = f"{ornament.slug}-angle-{idx + 1}.jpg"
                orn_img = OrnamentImage(
                    ornament=ornament,
                    alt_text=f"{item['name']} - {label}",
                    is_primary=(idx == 0),
                    display_order=idx,
                )
                orn_img.image.save(filename, img_content, save=True)

            self.stdout.write(f"  [OK] Ornament '{ornament.name}' seeded with {len(item['images'])} images.")

        self.stdout.write(self.style.SUCCESS("[OK] All ornaments successfully seeded!"))
