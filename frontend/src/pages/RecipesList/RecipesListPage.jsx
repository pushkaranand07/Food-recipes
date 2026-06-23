import { useEffect, useState, useCallback } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { getAllRecipes, getAllCategories } from '../../api/recipes';
import { LoadingSpinner, ErrorMessage, PageTitle, RecipeGrid } from '../../components/shared';

/**
 * RecipesListPage — /categories/:categoryId
 * Shows recipes belonging to a specific category.
 */
export default function RecipesListPage() {
  const { categoryId } = useParams();
  const location = useLocation();
  
  const [recipes, setRecipes] = useState([]);
  const [categoryName, setCategoryName] = useState(location.state?.categoryName || '');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategoryData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // 1. Fetch recipes for this category
      const recipesData = await getAllRecipes({ categoryId });
      setRecipes(recipesData);

      // 2. Resolve category name if not passed via router state
      if (!categoryName) {
        if (recipesData.length > 0) {
          setCategoryName(recipesData[0].category_name);
        } else {
          // If no recipes returned, fetch all categories to match the ID
          const categories = await getAllCategories();
          const currentCat = categories.find(c => c.id === parseInt(categoryId, 10));
          if (currentCat) {
            setCategoryName(currentCat.name);
          } else {
            setCategoryName('Recipes');
          }
        }
      }
    } catch {
      setError('Failed to load recipes for this category.');
    } finally {
      setLoading(false);
    }
  }, [categoryId, categoryName]);

  useEffect(() => {
    fetchCategoryData();
  }, [fetchCategoryData]);

  return (
    <main>
      <div className="page-content">
        <div style={{ marginBottom: 'var(--space-4)' }}>
          <Link to="/categories" className="back-link" style={{ textDecoration: 'none', color: 'var(--color-primary)', fontWeight: 600, fontSize: 'var(--text-sm)' }}>
            &larr; Back to Categories
          </Link>
        </div>

        <PageTitle 
          title={categoryName || 'Recipes'} 
          subtitle={!loading && !error ? `${recipes.length} delicious ${recipes.length === 1 ? 'recipe' : 'recipes'} found` : ''} 
        />

        {loading && <LoadingSpinner message="Loading category recipes..." />}
        {error && <ErrorMessage message={error} onRetry={fetchCategoryData} />}

        {!loading && !error && (
          <RecipeGrid recipes={recipes} />
        )}
      </div>
    </main>
  );
}
