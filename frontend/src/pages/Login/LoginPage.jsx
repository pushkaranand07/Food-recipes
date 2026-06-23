import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from '../auth.module.css';

/**
 * LoginPage — /login
 * Public route. Redirects to previous page or home after login.
 */
export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  const { login } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(username, password);
      navigate(from, { replace: true });
    } catch (err) {
      const detail = err.response?.data?.detail || 'Invalid username or password.';
      setError(detail);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.logo}>🍽️</div>
          <h1 className={styles.brand}>InstaFood</h1>
          <p className={styles.subtitle}>Sign in to discover amazing recipes</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          {error && <p className={styles.error} role="alert">{error}</p>}

          <div className={styles.field}>
            <label className={styles.label} htmlFor="login-username">Username</label>
            <input
              id="login-username"
              type="text"
              className={styles.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              autoComplete="username"
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
            />
          </div>

          <button
            id="login-submit-btn"
            type="submit"
            className={styles.submitBtn}
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className={styles.footer}>
          Don't have an account?{' '}
          <Link to="/register" className={styles.link}>Create one</Link>
        </p>
      </div>
    </main>
  );
}
