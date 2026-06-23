import { useEffect, useState, useRef, useCallback } from 'react';
import { getAllRecipes } from '../../api/recipes';
import { LoadingSpinner, ErrorMessage, PageTitle, RecipeGrid } from '../../components/shared';
import styles from './SearchPage.module.css';

/**
 * SearchPage — /search
 * Allows users to search recipes in real-time by title, category, or ingredients.
 */
export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Keep track of search timeout for debouncing
  const timeoutRef = useRef(null);

  const performSearch = useCallback(async (searchQuery) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllRecipes({ search: searchQuery });
      setRecipes(data);
    } catch {
      setError('Failed to fetch search results.');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleQueryChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    if (!val.trim()) {
      setRecipes([]);
      setLoading(false);
    }
  };

  const handleClear = () => {
    setQuery('');
    setRecipes([]);
    setLoading(false);
  };

  useEffect(() => {
    // Clear any pending timeouts
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (!query.trim()) {
      return;
    }

    // Set loading indicator immediately when user is typing (unless empty query)
    setLoading(true);

    // Debounce search by 300ms
    timeoutRef.current = setTimeout(() => {
      performSearch(query);
    }, 300);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [query, performSearch]);

  return (
    <main>
      <div className="page-content">
        <PageTitle title="Search Recipes" subtitle="Find your next meal by keyword, category, or ingredient" />

        {/* Search Bar Input */}
        <div className={styles.searchBarWrapper}>
          <div className={styles.searchContainer}>
            <svg className={styles.searchIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              placeholder="Search recipes, categories, or ingredients (e.g. Pizza, Oil)..."
              value={query}
              onChange={handleQueryChange}
              className={styles.searchInput}
              id="search-input-field"
              autoFocus
            />
            {query && (
              <button 
                onClick={handleClear} 
                className={styles.clearButton}
                aria-label="Clear search"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Search States */}
        {loading && <LoadingSpinner message="Searching recipes..." />}
        {error && <ErrorMessage message={error} />}

        {!loading && !error && (
          <div>
            {query.trim() ? (
              <div>
                <p className={styles.resultsCount}>
                  Found {recipes.length} {recipes.length === 1 ? 'result' : 'results'} for &ldquo;{query}&rdquo;
                </p>
                <RecipeGrid recipes={recipes} />
              </div>
            ) : (
              <div className={styles.emptyState}>
                <span className={styles.emptyIcon}>🔍</span>
                <h3>Start typing to discover</h3>
                <p>Search is smart and searches through recipe names, categories, and specific ingredients!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
