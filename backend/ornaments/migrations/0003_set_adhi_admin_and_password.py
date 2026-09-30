from django.db import migrations


def set_adhi_admin_and_password(apps, schema_editor):
    from django.contrib.auth import get_user_model
    from rest_framework.authtoken.models import Token
    User = get_user_model()
    adhi, _ = User.objects.get_or_create(username='Adhi')
    adhi.set_password('1234')
    adhi.is_staff = True
    adhi.is_superuser = True
    adhi.is_active = True
    adhi.save()

    Token.objects.get_or_create(user=adhi)


def reverse_migration(apps, schema_editor):
    pass


class Migration(migrations.Migration):

    dependencies = [
        ('ornaments', '0002_create_adhi_user'),
    ]

    operations = [
        migrations.RunPython(set_adhi_admin_and_password, reverse_code=reverse_migration),
    ]
