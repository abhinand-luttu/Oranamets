from django.contrib.auth import authenticate
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token


@api_view(['POST'])
@permission_classes([AllowAny])
def api_login(request):
    """
    Authenticates staff/creator user (e.g. Adhi) and returns an authentication token.
    Adhi has is_staff=False, so they cannot access Django Admin, but can use this token
    to add ornaments through the protected Add Ornaments interface.
    """
    username = request.data.get('username', '').strip()
    password = request.data.get('password', '').strip()

    if not username or not password:
        return Response(
            {'detail': 'Please provide both username and password.'},
            status=status.HTTP_400_BAD_REQUEST
        )

    user = authenticate(request, username=username, password=password)

    if not user:
        return Response(
            {'detail': 'Invalid credentials. Please verify your username and password.'},
            status=status.HTTP_401_UNAUTHORIZED
        )

    if not user.is_active:
        return Response(
            {'detail': 'This account has been deactivated.'},
            status=status.HTTP_403_FORBIDDEN
        )

    # Generate or retrieve the user's permanent REST API token
    token, _ = Token.objects.get_or_create(user=user)

    can_create = user.is_staff or user.username == 'Adhi' or user.has_perm('ornaments.add_ornament')

    return Response({
        'token': token.key,
        'username': user.username,
        'is_staff': user.is_staff,
        'can_add_ornaments': can_create,
    }, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def api_me(request):
    """
    Verifies that the token is valid and returns user permissions.
    """
    user = request.user
    can_create = user.is_staff or user.username == 'Adhi' or user.has_perm('ornaments.add_ornament')
    return Response({
        'username': user.username,
        'is_staff': user.is_staff,
        'can_add_ornaments': can_create,
    })
