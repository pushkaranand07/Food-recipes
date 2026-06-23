from django.db import models


class Category(models.Model):
    """A food category (e.g., Pizza, Italian Food)."""
    name = models.CharField(max_length=100)
    photo_url = models.URLField(max_length=500)

    class Meta:
        verbose_name_plural = 'categories'
        ordering = ['name']

    def __str__(self):
        return self.name


class Recipe(models.Model):
    """A recipe belonging to a category."""
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name='recipes',
    )
    title = models.CharField(max_length=200)
    photo_url = models.URLField(max_length=500)
    # Store the array of photo URLs as a JSON field
    photos_array = models.JSONField(default=list, blank=True)
    # Cooking time in minutes (stored as string to match original data)
    time = models.CharField(max_length=20)
    description = models.TextField(blank=True)

    class Meta:
        ordering = ['title']

    def __str__(self):
        return self.title
