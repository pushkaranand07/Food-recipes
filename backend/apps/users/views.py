from rest_framework import generics, permissions
from .serializers import RegisterSerializer, UserSerializer
from .models import User


class RegisterView(generics.CreateAPIView):
    """
    POST /api/auth/register/
    Public endpoint — creates a new user account.
    Returns the created user (no tokens; client should login after).
    """
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]


class MeView(generics.RetrieveAPIView):
    """
    GET /api/auth/me/
    Protected endpoint — returns the currently authenticated user's profile.
    """
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user
