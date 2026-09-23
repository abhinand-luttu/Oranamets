from django.db import models
from django.utils.text import slugify

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=120, unique=True, blank=True)
    description = models.TextField(blank=True, default='')
    image = models.ImageField(upload_to='categories/', blank=True, null=True)
    display_order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Category"
        verbose_name_plural = "Categories"
        ordering = ['display_order', 'name']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Ornament(models.Model):
    AVAILABILITY_CHOICES = [
        ('in_stock', 'In Stock'),
        ('made_to_order', 'Made to Order'),
        ('out_of_stock', 'Out of Stock'),
    ]

    name = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, unique=True, blank=True)
    category = models.ForeignKey(Category, related_name='ornaments', on_delete=models.CASCADE)
    description = models.TextField(help_text="Detailed description of the ornament, craftsmanship and design")
    price = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True, help_text="Price in INR (leave blank if on request)")
    is_price_on_request = models.BooleanField(default=False, help_text="Show 'Price on Request' instead of exact amount")
    availability = models.CharField(max_length=20, choices=AVAILABILITY_CHOICES, default='in_stock')
    is_featured = models.BooleanField(default=False, help_text="Feature this ornament on homepage")
    purity = models.CharField(max_length=100, blank=True, default='22K Gold', help_text="e.g. 22K Gold, Polki, Kundan, Antique")
    weight_approx = models.CharField(max_length=50, blank=True, default='', help_text="Approximate weight, e.g. 35g")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-is_featured', '-created_at']

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.name)
            slug = base_slug
            counter = 1
            while Ornament.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            self.slug = slug
        super().save(*args, **kwargs)

    @property
    def primary_image(self):
        primary = self.images.filter(is_primary=True).first()
        if primary:
            return primary
        return self.images.first()

    def __str__(self):
        return f"{self.name} ({self.category.name})"


class OrnamentImage(models.Model):
    ornament = models.ForeignKey(Ornament, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='ornaments/')
    alt_text = models.CharField(max_length=200, blank=True)
    is_primary = models.BooleanField(default=False)
    display_order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-is_primary', 'display_order', 'id']

    def save(self, *args, **kwargs):
        if not self.alt_text and self.ornament:
            self.alt_text = f"{self.ornament.name} Image"
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Image for {self.ornament.name}"
