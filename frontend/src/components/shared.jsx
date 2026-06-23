import React from 'react';

// ── LoadingSpinner ─────────────────────────────────────────────────────────────
export function LoadingSpinner({ size = 48, message = 'Loading...' }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem', gap: '1rem' }}>
      <div
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          border: `3px solid var(--color-border)`,
          borderTopColor: 'var(--color-primary)',
          animation: 'spin 0.8s linear infinite',
        }}
        role="status"
        aria-label={message}
      />
      <p style={{ color: 'var(--color-text-3)', fontSize: 'var(--text-sm)' }}>{message}</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// ── ErrorMessage ───────────────────────────────────────────────────────────────
export function ErrorMessage({ message = 'Something went wrong.', onRetry }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', padding: '4rem', gap: '1rem', textAlign: 'center',
    }}>
      <span style={{ fontSize: '3rem' }}>😕</span>
      <p style={{ color: 'var(--color-error)', fontWeight: 600 }}>{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            padding: '0.5rem 1.5rem', borderRadius: 'var(--radius-md)',
            background: 'var(--color-primary)', color: 'white',
            fontWeight: 600, cursor: 'pointer', border: 'none',
          }}
        >
          Try again
        </button>
      )}
    </div>
  );
}

// ── ProtectedRoute ─────────────────────────────────────────────────────────────
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return <LoadingSpinner message="Checking session..." />;
  if (!isAuthenticated) return <Navigate to="/login" state={{ from: location }} replace />;
  return children;
}

// ── PageTitle ──────────────────────────────────────────────────────────────────
export function PageTitle({ title, subtitle }) {
  return (
    <div style={{ marginBottom: 'var(--space-8)' }}>
      <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-3xl)', color: 'var(--color-text)', marginBottom: subtitle ? 'var(--space-2)' : 0 }}>
        {title}
      </h1>
      {subtitle && (
        <p style={{ color: 'var(--color-text-2)', fontSize: 'var(--text-base)' }}>{subtitle}</p>
      )}
    </div>
  );
}

// ── RecipeGrid ─────────────────────────────────────────────────────────────────
import RecipeCard from './RecipeCard/RecipeCard';

export function RecipeGrid({ recipes }) {
  if (!recipes?.length) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--color-text-3)' }}>
        <span style={{ fontSize: '3rem' }}>🍽️</span>
        <p style={{ marginTop: '1rem', fontWeight: 500 }}>No recipes found</p>
      </div>
    );
  }
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
      gap: 'var(--space-6)',
    }}>
      {recipes.map((r) => <RecipeCard key={r.id} recipe={r} />)}
    </div>
  );
}
