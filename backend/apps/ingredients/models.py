from django.db import models


class Ingredient(models.Model):
    """A single ingredient (e.g., Oil, Salt, Garlic)."""
    name = models.CharField(max_length=200)
    photo_url = models.URLField(max_length=500, blank=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name


class RecipeIngredient(models.Model):
    """
    Through-model linking a Recipe to an Ingredient with a quantity string.
    E.g., Recipe "Brownies" uses Ingredient "Salt" in quantity "2 tablespoons".
    """
    recipe = models.ForeignKey(
        'recipes.Recipe',
        on_delete=models.CASCADE,
        related_name='recipe_ingredients',
    )
    ingredient = models.ForeignKey(
        Ingredient,
        on_delete=models.CASCADE,
        related_name='recipe_ingredients',
    )
    quantity = models.CharField(max_length=100, blank=True)

    class Meta:
        ordering = ['ingredient__name']

    def __str__(self):
        return f'{self.recipe.title} — {self.ingredient.name} ({self.quantity})'
