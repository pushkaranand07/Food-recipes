from rest_framework import generics, filters
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Category, Recipe
from .serializers import CategorySerializer, RecipeListSerializer, RecipeDetailSerializer


class CategoryListView(generics.ListAPIView):
    """
    GET /api/categories/
    Returns all food categories with their recipe counts.
    Public endpoint — no auth required.
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class RecipeListView(generics.ListAPIView):
    """
    GET /api/recipes/
    Returns all recipes. Optional filters:
      ?category_id=<id>  — filter by category
      ?search=<query>    — search by title (DRF SearchFilter)
    """
    serializer_class = RecipeListSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'category__name', 'recipe_ingredients__ingredient__name']

    def get_queryset(self):
        queryset = Recipe.objects.select_related('category').all()
        category_id = self.request.query_params.get('category_id')
        if category_id:
            queryset = queryset.filter(category_id=category_id)
        return queryset


class RecipeDetailView(generics.RetrieveAPIView):
    """
    GET /api/recipes/<id>/
    Returns full recipe detail including photos array and ingredients.
    """
    queryset = Recipe.objects.select_related('category').prefetch_related(
        'recipe_ingredients__ingredient'
    )
    serializer_class = RecipeDetailSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
