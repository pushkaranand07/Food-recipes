"""
URL configuration for InstaFood Django backend.
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

urlpatterns = [
    # Django admin
    path('admin/', admin.site.urls),

    # ── Auth endpoints ──────────────────────────────────────────────────────
    path('api/auth/login/',   TokenObtainPairView.as_view(),  name='token_obtain_pair'),
    path('api/auth/refresh/', TokenRefreshView.as_view(),     name='token_refresh'),
    path('api/auth/verify/',  TokenVerifyView.as_view(),      name='token_verify'),

    # Custom user endpoints (register, me)
    path('api/auth/', include('apps.users.urls')),

    # ── Feature endpoints ───────────────────────────────────────────────────
    path('api/', include('apps.recipes.urls')),
    path('api/', include('apps.ingredients.urls')),
]
