import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './Sidebar.module.css';

const NAV_ITEMS = [
  { to: '/',           label: 'Home',       icon: '🏠', end: true },
  { to: '/categories', label: 'Categories', icon: '📂', end: false },
  { to: '/search',     label: 'Search',     icon: '🔍', end: false },
];

export default function Sidebar({ isOpen, onClose }) {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    onClose();
    navigate('/login');
  };

  const handleNavClick = () => onClose();

  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`} aria-label="Sidebar navigation">
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.logo}>
          <span className={styles.logoEmoji}>🍽️</span>
          <span className={styles.logoText}>InstaFood</span>
        </div>
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close sidebar"
          id="sidebar-close-btn"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      {/* Navigation */}
      <nav className={styles.nav}>
        {NAV_ITEMS.map(({ to, label, icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={handleNavClick}
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ''}`
            }
            id={`sidebar-${label.toLowerCase()}`}
          >
            <span className={styles.navIcon}>{icon}</span>
            {label}
          </NavLink>
        ))}

        {isAuthenticated && (
          <>
            <div className={styles.divider} />
            <button
              className={`${styles.navLink}`}
              onClick={handleLogout}
              id="sidebar-logout-btn"
              style={{ width: '100%', textAlign: 'left', color: 'var(--color-error)' }}
            >
              <span className={styles.navIcon}>🚪</span>
              Logout
            </button>
          </>
        )}
      </nav>

      {/* Footer */}
      <div className={styles.footer}>
        {user && (
          <p className={styles.footerText}>Logged in as <strong>{user.username}</strong></p>
        )}
      </div>
    </aside>
  );
}
