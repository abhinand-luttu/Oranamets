from django.db import migrations


def create_creator_account(apps, schema_editor):
    from django.contrib.auth import get_user_model
    User = get_user_model()
    adhi, _ = User.objects.get_or_create(username='Adhi')
    adhi.set_password('Luttu@369')
    adhi.is_staff = False
    adhi.is_superuser = False
    adhi.is_active = True
    adhi.save()


def remove_creator_account(apps, schema_editor):
    from django.contrib.auth import get_user_model
    User = get_user_model()
    User.objects.filter(username='Adhi').delete()


class Migration(migrations.Migration):

    dependencies = [
        ('ornaments', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(create_creator_account, reverse_code=remove_creator_account),
    ]
