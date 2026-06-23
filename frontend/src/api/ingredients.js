import client from './client';

/** Fetch all ingredients. Optionally filter by name. */
export async function getAllIngredients({ search } = {}) {
  const params = {};
  if (search) params.search = search;
  const { data } = await client.get('/api/ingredients/', { params });
  return data;
}

/** Fetch a single ingredient with all recipes that use it. */
export async function getIngredientById(id) {
  const { data } = await client.get(`/api/ingredients/${id}/`);
  return data;
}
