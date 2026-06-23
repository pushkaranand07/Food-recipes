import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { getIngredientById } from '../../api/ingredients';
import { LoadingSpinner, ErrorMessage, RecipeGrid } from '../../components/shared';
import styles from './IngredientPage.module.css';

/**
 * IngredientPage — /ingredients/:ingredientId
 * Displays an ingredient's photo and name, and lists all recipes that use it.
 */
export default function IngredientPage() {
  const { ingredientId } = useParams();

  const [ingredient, setIngredient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imgError, setImgError] = useState(false);

  const fetchIngredient = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getIngredientById(ingredientId);
      setIngredient(data);
    } catch {
      setError('Failed to load ingredient details.');
    } finally {
      setLoading(false);
    }
  }, [ingredientId]);

  useEffect(() => {
    fetchIngredient();
  }, [fetchIngredient]);

  return (
    <main>
      <div className="page-content">
        <div style={{ marginBottom: 'var(--space-4)' }}>
          <button 
            onClick={() => window.history.back()} 
            className="back-link" 
            style={{ 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer', 
              color: 'var(--color-primary)', 
              fontWeight: 600, 
              fontSize: 'var(--text-sm)',
              padding: 0
            }}
          >
            &larr; Go Back
          </button>
        </div>

        {loading && <LoadingSpinner message="Loading ingredient details..." />}
        {error && <ErrorMessage message={error} onRetry={fetchIngredient} />}

        {!loading && !error && ingredient && (
          <div>
            {/* Ingredient Detail Header */}
            <div className={styles.headerCard}>
              <div className={styles.imageContainer}>
                {!imgError ? (
                  <img
                    src={ingredient.photo_url}
                    alt={ingredient.name}
                    className={styles.image}
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className={styles.imageFallback}>🥦</div>
                )}
              </div>
              <div className={styles.headerInfo}>
                <span className={styles.label}>Ingredient</span>
                <h1 className={styles.name}>{ingredient.name}</h1>
                <p className={styles.meta}>
                  Featured in <strong>{ingredient.recipes?.length || 0}</strong> {ingredient.recipes?.length === 1 ? 'recipe' : 'recipes'}
                </p>
              </div>
            </div>

            {/* Recipes Grid */}
            <div className={styles.recipesSection}>
              <h2 className={styles.sectionTitle}>Recipes containing {ingredient.name}</h2>
              <RecipeGrid recipes={ingredient.recipes} />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
