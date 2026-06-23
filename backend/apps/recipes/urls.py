from django.urls import path
from .views import CategoryListView, RecipeListView, RecipeDetailView

urlpatterns = [
    path('categories/',      CategoryListView.as_view(), name='category-list'),
    path('recipes/',         RecipeListView.as_view(),   name='recipe-list'),
    path('recipes/<int:pk>/', RecipeDetailView.as_view(), name='recipe-detail'),
]
