from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    """
    Custom user model extending Django's AbstractUser.
    We keep username + email + password from AbstractUser.
    Add additional fields here as needed (e.g., avatar, bio).
    """
    email = models.EmailField(unique=True)

    # Use email as the unique identifier for display purposes
    # (login is still via username per simplejwt default)
    REQUIRED_FIELDS = ['email']

    def __str__(self):
        return self.username
