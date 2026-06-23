from rest_framework import generics, filters
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Ingredient
from .serializers import IngredientSerializer, IngredientDetailSerializer


class IngredientListView(generics.ListAPIView):
    """
    GET /api/ingredients/
    Returns all ingredients. Supports ?search=<query> for name filtering.
    """
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']


class IngredientDetailView(generics.RetrieveAPIView):
    """
    GET /api/ingredients/<id>/
    Returns ingredient detail with all recipes that use it.
    """
    queryset = Ingredient.objects.prefetch_related(
        'recipe_ingredients__recipe__category'
    )
    serializer_class = IngredientDetailSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
