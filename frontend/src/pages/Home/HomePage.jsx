import { useEffect, useState, useCallback } from 'react';
import { getAllRecipes } from '../../api/recipes';
import { LoadingSpinner, ErrorMessage, PageTitle, RecipeGrid } from '../../components/shared';

/**
 * HomePage — /
 * Displays all recipes in a responsive grid.
 */
export default function HomePage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRecipes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllRecipes();
      setRecipes(data);
    } catch {
      setError('Failed to load recipes. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  return (
    <main>
      <div className="page-content">
        <PageTitle title="All Recipes" subtitle={`${recipes.length} delicious recipes to explore`} />

        {loading && <LoadingSpinner message="Loading recipes..." />}
        {error   && <ErrorMessage message={error} onRetry={fetchRecipes} />}
        {!loading && !error && <RecipeGrid recipes={recipes} />}
      </div>
    </main>
  );
}
