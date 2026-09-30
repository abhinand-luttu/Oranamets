from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token


class Command(BaseCommand):
    help = "Setup or reset dedicated non-staff Adhi creator account"

    def handle(self, *args, **options):
        User = get_user_model()
        user, created = User.objects.get_or_create(username='Adhi')
        user.set_password('Luttu@369')
        user.is_staff = False
        user.is_superuser = False
        user.is_active = True
        user.save()

        token, _ = Token.objects.get_or_create(user=user)

        self.stdout.write(
            self.style.SUCCESS(
                f"Successfully configured user '{user.username}' (staff={user.is_staff}, superuser={user.is_superuser}, token={token.key})"
            )
        )
