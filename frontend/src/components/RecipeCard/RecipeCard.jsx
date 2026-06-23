import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './RecipeCard.module.css';

export default function RecipeCard({ recipe }) {
  const [imgError, setImgError] = useState(false);

  return (
    <Link
      to={`/recipes/${recipe.id}`}
      className={styles.card}
      id={`recipe-card-${recipe.id}`}
      aria-label={`View recipe: ${recipe.title}`}
    >
      <div className={styles.imageWrapper}>
        {!imgError ? (
          <img
            className={styles.image}
            src={recipe.photo_url}
            alt={recipe.title}
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className={styles.imageFallback}>🍽️</div>
        )}
        <div className={styles.timeBadge}>
          ⏱ {recipe.time} min
        </div>
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>{recipe.title}</h3>
        {recipe.category_name && (
          <p className={styles.category}>
            <span className={styles.categoryDot} />
            {recipe.category_name}
          </p>
        )}
      </div>
    </Link>
  );
}
