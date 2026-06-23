import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getAllCategories } from '../../api/recipes';
import { LoadingSpinner, ErrorMessage, PageTitle } from '../../components/shared';
import styles from './CategoriesPage.module.css';

/**
 * CategoriesPage — /categories
 * Shows all food categories as large cards.
 */
export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);
  const [imgErrors, setImgErrors]   = useState({});

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllCategories();
      setCategories(data);
    } catch {
      setError('Failed to load categories.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <main>
      <div className="page-content">
        <PageTitle title="Browse Categories" subtitle="Find recipes by cuisine type" />

        {loading && <LoadingSpinner message="Loading categories..." />}
        {error   && <ErrorMessage message={error} onRetry={fetchCategories} />}

        {!loading && !error && (
          <div className={styles.grid}>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/categories/${cat.id}`}
                className={styles.card}
                id={`category-card-${cat.id}`}
                state={{ categoryName: cat.name }}
              >
                <div className={styles.imageWrapper}>
                  {!imgErrors[cat.id] ? (
                    <img
                      src={cat.photo_url}
                      alt={cat.name}
                      className={styles.image}
                      onError={() => setImgErrors((e) => ({ ...e, [cat.id]: true }))}
                    />
                  ) : (
                    <div className={styles.imageFallback}>🍽️</div>
                  )}
                  <div className={styles.overlay}>
                    <h2 className={styles.name}>{cat.name}</h2>
                    <p className={styles.count}>{cat.recipe_count} {cat.recipe_count === 1 ? 'recipe' : 'recipes'}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
