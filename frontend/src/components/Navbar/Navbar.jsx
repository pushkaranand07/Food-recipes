import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './Navbar.module.css';

const NAV_ITEMS = [
  { to: '/',           label: 'Home',       icon: '🏠' },
  { to: '/categories', label: 'Categories', icon: '📂' },
  { to: '/search',     label: 'Search',     icon: '🔍' },
];

export default function Navbar({ onMenuClick }) {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.inner}>
        {/* Hamburger — shown on mobile or to open sidebar */}
        <button
          className={styles.menuBtn}
          onClick={onMenuClick}
          aria-label="Open navigation menu"
          id="navbar-menu-btn"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>

        {/* Brand */}
        <NavLink to="/" className={styles.brand}>
          <span className={styles.brandLogo}>🍽️</span>
          <span className={styles.brandName}>InstaFood</span>
        </NavLink>

        {/* Desktop nav links */}
        <nav className={styles.nav} aria-label="Main navigation">
          {NAV_ITEMS.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ''}`
              }
              id={`nav-${label.toLowerCase()}`}
            >
              <span>{icon}</span>
              <span>{label}</span>
            </NavLink>
          ))}

          {isAuthenticated && (
            <>
              <div className={styles.userChip}>
                <div className={styles.userAvatar}>
                  {user?.username?.[0]?.toUpperCase() || 'U'}
                </div>
                <span className={styles.userName}>{user?.username}</span>
              </div>
              <button
                className={styles.logoutBtn}
                onClick={handleLogout}
                id="navbar-logout-btn"
                aria-label="Logout"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16 17 21 12 16 7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                <span>Logout</span>
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
