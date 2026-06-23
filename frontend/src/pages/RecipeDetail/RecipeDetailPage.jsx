import { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getRecipeById } from '../../api/recipes';
import ImageCarousel from '../../components/ImageCarousel/ImageCarousel';
import { LoadingSpinner, ErrorMessage } from '../../components/shared';
import styles from './RecipeDetailPage.module.css';

/**
 * RecipeDetailPage — /recipes/:recipeId
 * Shows full recipe with photo carousel, title, cooking time, category link, 
 * description and a call-to-action button to see the ingredients details.
 */
export default function RecipeDetailPage() {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRecipe = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getRecipeById(recipeId);
      setRecipe(data);
    } catch {
      setError('Failed to load recipe detail.');
    } finally {
      setLoading(false);
    }
  }, [recipeId]);

  useEffect(() => {
    fetchRecipe();
  }, [fetchRecipe]);

  if (loading) return <main><div className="page-content"><LoadingSpinner message="Loading recipe details..." /></div></main>;
  if (error || !recipe) return <main><div className="page-content"><ErrorMessage message={error || 'Recipe not found'} onRetry={fetchRecipe} /></div></main>;

  // Combine single photo_url and photos_array if not already clean
  let photos = [];
  if (recipe.photos_array && recipe.photos_array.length > 0) {
    photos = recipe.photos_array;
  } else if (recipe.photo_url) {
    photos = [recipe.photo_url];
  }

  return (
    <main>
      <div className="page-content">
        <div style={{ marginBottom: 'var(--space-4)' }}>
          <Link to="/" className="back-link" style={{ textDecoration: 'none', color: 'var(--color-primary)', fontWeight: 600, fontSize: 'var(--text-sm)' }}>
            &larr; Back to Home
          </Link>
        </div>

        <div className={styles.container}>
          {/* Top Carousel Area */}
          <div className={styles.carouselWrapper}>
            <ImageCarousel images={photos} />
          </div>

          {/* Info Card */}
          <div className={styles.contentCard}>
            <div className={styles.metaRow}>
              <Link 
                to={`/categories/${recipe.category_id}`} 
                state={{ categoryName: recipe.category_name }}
                className={styles.categoryBadge}
              >
                {recipe.category_name}
              </Link>
              <div className={styles.timeBadge}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={styles.timeIcon}>
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                {recipe.time} mins
              </div>
            </div>

            <h1 className={styles.title}>{recipe.title}</h1>

            <div className={styles.actions}>
              <Link 
                to={`/recipes/${recipe.id}/ingredients`} 
                state={{ recipeTitle: recipe.title }}
                className={styles.ingredientsBtn}
                id="view-ingredients-btn"
              >
                <span className={styles.btnIcon}>🥗</span> View Ingredients Grid
              </Link>
            </div>

            <div className={styles.divider}></div>

            <h2 className={styles.sectionTitle}>Preparation Instructions</h2>
            <div className={styles.description}>
              {recipe.description ? (
                recipe.description.split('\n\n').map((paragraph, index) => (
                  <p key={index} className={styles.paragraph}>{paragraph}</p>
                ))
              ) : (
                <p className={styles.paragraph}>No instructions provided.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
