/**
 * AuthContext — provides authentication state and actions to the entire app.
 *
 * Token storage: localStorage (chosen for simplicity; see plan for tradeoffs).
 * On mount: reads tokens from localStorage and validates by calling /api/auth/me/.
 */
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { login as apiLogin, register as apiRegister, getMe } from '../api/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser]           = useState(null);
  const [isLoading, setIsLoading] = useState(true); // true while checking stored token

  // ── On app mount: try to restore session from localStorage ─────────────────
  useEffect(() => {
    async function restoreSession() {
      const token = localStorage.getItem('access_token');
      if (!token) {
        setIsLoading(false);
        return;
      }
      try {
        const me = await getMe();
        setUser(me);
      } catch {
        // Token is invalid/expired — clear storage
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
      } finally {
        setIsLoading(false);
      }
    }
    restoreSession();
  }, []);

  // ── Listen for forced logout events from the Axios interceptor ─────────────
  useEffect(() => {
    const handleForceLogout = () => {
      setUser(null);
    };
    window.addEventListener('auth:logout', handleForceLogout);
    return () => window.removeEventListener('auth:logout', handleForceLogout);
  }, []);

  // ── Login ──────────────────────────────────────────────────────────────────
  const login = useCallback(async (username, password) => {
    const tokens = await apiLogin(username, password);
    localStorage.setItem('access_token', tokens.access);
    localStorage.setItem('refresh_token', tokens.refresh);
    const me = await getMe();
    setUser(me);
    return me;
  }, []);

  // ── Register ───────────────────────────────────────────────────────────────
  const register = useCallback(async (username, email, password, password2) => {
    const newUser = await apiRegister(username, email, password, password2);
    // Auto-login after registration
    await login(username, password);
    return newUser;
  }, [login]);

  // ── Logout ─────────────────────────────────────────────────────────────────
  const logout = useCallback(() => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/** Hook to consume AuthContext. Must be used inside <AuthProvider>. */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
