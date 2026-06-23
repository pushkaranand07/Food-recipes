import { useEffect, useState, useCallback } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { getRecipeById } from '../../api/recipes';
import { LoadingSpinner, ErrorMessage, PageTitle } from '../../components/shared';
import styles from './IngredientsDetailsPage.module.css';

/**
 * IngredientsDetailsPage — /recipes/:recipeId/ingredients
 * Shows all ingredients for a specific recipe in a 3-column responsive grid.
 * Each item links to /ingredients/:ingredientId.
 */
export default function IngredientsDetailsPage() {
  const { recipeId } = useParams();
  const location = useLocation();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imgErrors, setImgErrors] = useState({});

  const fetchRecipeIngredients = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getRecipeById(recipeId);
      setRecipe(data);
    } catch {
      setError('Failed to load ingredients.');
    } finally {
      setLoading(false);
    }
  }, [recipeId]);

  useEffect(() => {
    fetchRecipeIngredients();
  }, [fetchRecipeIngredients]);

  return (
    <main>
      <div className="page-content">
        <div style={{ marginBottom: 'var(--space-4)' }}>
          <Link to={`/recipes/${recipeId}`} className="back-link" style={{ textDecoration: 'none', color: 'var(--color-primary)', fontWeight: 600, fontSize: 'var(--text-sm)' }}>
            &larr; Back to Recipe Detail
          </Link>
        </div>

        <PageTitle
          title={location.state?.recipeTitle ? `Ingredients for ${location.state.recipeTitle}` : 'Recipe Ingredients'}
          subtitle={recipe ? `All ${recipe.ingredients?.length || 0} ingredients required for this recipe` : ''}
        />

        {loading && <LoadingSpinner message="Loading ingredients list..." />}
        {error && <ErrorMessage message={error} onRetry={fetchRecipeIngredients} />}

        {!loading && !error && recipe && (
          <div className={styles.grid}>
            {recipe.ingredients && recipe.ingredients.length > 0 ? (
              recipe.ingredients.map((ing) => (
                <Link
                  key={ing.ingredient_id}
                  to={`/ingredients/${ing.ingredient_id}`}
                  className={styles.card}
                  id={`ingredient-card-${ing.ingredient_id}`}
                >
                  <div className={styles.imageWrapper}>
                    {!imgErrors[ing.ingredient_id] ? (
                      <img
                        src={ing.photo_url}
                        alt={ing.name}
                        className={styles.image}
                        onError={() => setImgErrors((e) => ({ ...e, [ing.ingredient_id]: true }))}
                      />
                    ) : (
                      <div className={styles.imageFallback}>🥦</div>
                    )}
                  </div>
                  <div className={styles.info}>
                    <h3 className={styles.name}>{ing.name}</h3>
                    <span className={styles.quantity}>{ing.quantity || 'to taste'}</span>
                  </div>
                </Link>
              ))
            ) : (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem', color: 'var(--color-text-3)' }}>
                No ingredients found for this recipe.
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
