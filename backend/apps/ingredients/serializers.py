from rest_framework import serializers
from .models import Ingredient, RecipeIngredient


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ('id', 'name', 'photo_url')


class RecipeIngredientSerializer(serializers.ModelSerializer):
    """Serializes an ingredient-quantity pair for a recipe's ingredient list."""
    ingredient_id = serializers.IntegerField(source='ingredient.id', read_only=True)
    name = serializers.CharField(source='ingredient.name', read_only=True)
    photo_url = serializers.URLField(source='ingredient.photo_url', read_only=True)

    class Meta:
        model = RecipeIngredient
        fields = ('ingredient_id', 'name', 'photo_url', 'quantity')


class IngredientDetailSerializer(serializers.ModelSerializer):
    """Ingredient detail with all recipes that use it."""
    recipes = serializers.SerializerMethodField()

    class Meta:
        model = Ingredient
        fields = ('id', 'name', 'photo_url', 'recipes')

    def get_recipes(self, obj):
        from apps.recipes.serializers import RecipeListSerializer
        recipes = [ri.recipe for ri in obj.recipe_ingredients.select_related('recipe__category').all()]
        return RecipeListSerializer(recipes, many=True).data
