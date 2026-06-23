import client from './client';

/** Login with username + password. Returns { access, refresh }. */
export async function login(username, password) {
  const { data } = await client.post('/api/auth/login/', { username, password });
  return data;
}

/** Register a new account. Returns the created user object. */
export async function register(username, email, password, password2) {
  const { data } = await client.post('/api/auth/register/', {
    username, email, password, password2,
  });
  return data;
}

/** Fetch the current user's profile. Requires a valid access token. */
export async function getMe() {
  const { data } = await client.get('/api/auth/me/');
  return data;
}
