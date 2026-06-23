from rest_framework import serializers
from .models import Category, Recipe


class CategorySerializer(serializers.ModelSerializer):
    recipe_count = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ('id', 'name', 'photo_url', 'recipe_count')

    def get_recipe_count(self, obj):
        return obj.recipes.count()


class RecipeListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for list views."""
    category_name = serializers.CharField(source='category.name', read_only=True)
    category_id = serializers.IntegerField(source='category.id', read_only=True)

    class Meta:
        model = Recipe
        fields = ('id', 'title', 'photo_url', 'time', 'category_id', 'category_name')


class RecipeDetailSerializer(serializers.ModelSerializer):
    """Full serializer for the detail view (includes photos array and ingredients)."""
    category_name = serializers.CharField(source='category.name', read_only=True)
    category_id = serializers.IntegerField(source='category.id', read_only=True)
    # Ingredients are nested from the related RecipeIngredient model
    ingredients = serializers.SerializerMethodField()

    class Meta:
        model = Recipe
        fields = (
            'id', 'title', 'photo_url', 'photos_array', 'time',
            'description', 'category_id', 'category_name', 'ingredients',
        )

    def get_ingredients(self, obj):
        # Import here to avoid circular imports
        from apps.ingredients.serializers import RecipeIngredientSerializer
        return RecipeIngredientSerializer(obj.recipe_ingredients.all(), many=True).data
