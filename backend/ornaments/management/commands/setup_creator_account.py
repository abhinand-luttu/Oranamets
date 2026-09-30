from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token


class Command(BaseCommand):
    help = "Setup or reset dedicated Adhi creator and admin account"

    def handle(self, *args, **options):
        User = get_user_model()
        user, created = User.objects.get_or_create(username='Adhi')
        user.set_password('1234')
        user.is_staff = True
        user.is_superuser = True
        user.is_active = True
        user.save()

        token, _ = Token.objects.get_or_create(user=user)

        self.stdout.write(
            self.style.SUCCESS(
                f"Successfully configured user '{user.username}' (staff={user.is_staff}, superuser={user.is_superuser}, token={token.key})"
            )
        )
