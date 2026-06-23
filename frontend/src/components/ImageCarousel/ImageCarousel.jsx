import React, { useState } from 'react';
import styles from './ImageCarousel.module.css';

export default function ImageCarousel({ images = [] }) {
  const [current, setCurrent] = useState(0);
  const [imgError, setImgError] = useState({});

  if (!images.length) return null;

  const prev = () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));

  return (
    <div className={styles.carousel}>
      <div
        className={styles.track}
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((src, i) => (
          <div key={i} className={styles.slide}>
            {!imgError[i] ? (
              <img
                src={src}
                alt={`Photo ${i + 1}`}
                loading={i === 0 ? 'eager' : 'lazy'}
                onError={() => setImgError((e) => ({ ...e, [i]: true }))}
              />
            ) : (
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-surface-2)', fontSize: '3rem' }}>🍽️</div>
            )}
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button className={styles.prevBtn} onClick={prev} aria-label="Previous image">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <button className={styles.nextBtn} onClick={next} aria-label="Next image">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
          <div className={styles.dots} role="tablist">
            {images.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === current}
                className={`${styles.dot} ${i === current ? styles.active : ''}`}
                onClick={() => setCurrent(i)}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
