import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from '../auth.module.css';

/**
 * RegisterPage — /register
 * Public route. Auto-logs in after successful registration.
 */
export default function RegisterPage() {
  const [form, setForm]       = useState({ username: '', email: '', password: '', password2: '' });
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate     = useNavigate();

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.password2) {
      setError("Passwords don't match.");
      return;
    }
    setLoading(true);
    try {
      await register(form.username, form.email, form.password, form.password2);
      navigate('/', { replace: true });
    } catch (err) {
      const data = err.response?.data;
      if (data) {
        const msgs = Object.entries(data).map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : v}`).join('\n');
        setError(msgs);
      } else {
        setError('Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: 'username', label: 'Username', type: 'text',     autoComplete: 'username',     placeholder: 'Choose a username' },
    { name: 'email',    label: 'Email',    type: 'email',    autoComplete: 'email',        placeholder: 'your@email.com' },
    { name: 'password', label: 'Password', type: 'password', autoComplete: 'new-password', placeholder: 'Create a password (min 8 chars)' },
    { name: 'password2',label: 'Confirm Password', type: 'password', autoComplete: 'new-password', placeholder: 'Confirm your password' },
  ];

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.logo}>🍽️</div>
          <h1 className={styles.brand}>Join InstaFood</h1>
          <p className={styles.subtitle}>Create an account to start exploring recipes</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          {error && <p className={styles.error} role="alert" style={{ whiteSpace: 'pre-line' }}>{error}</p>}

          {fields.map(({ name, label, type, autoComplete, placeholder }) => (
            <div key={name} className={styles.field}>
              <label className={styles.label} htmlFor={`register-${name}`}>{label}</label>
              <input
                id={`register-${name}`}
                name={name}
                type={type}
                className={styles.input}
                value={form[name]}
                onChange={handleChange}
                placeholder={placeholder}
                autoComplete={autoComplete}
                required
              />
            </div>
          ))}

          <button
            id="register-submit-btn"
            type="submit"
            className={styles.submitBtn}
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className={styles.footer}>
          Already have an account?{' '}
          <Link to="/login" className={styles.link}>Sign in</Link>
        </p>
      </div>
    </main>
  );
}
