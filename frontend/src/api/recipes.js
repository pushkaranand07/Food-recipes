import client from './client';

/** Fetch all recipes. Optionally filter by category or search query. */
export async function getAllRecipes({ categoryId, search } = {}) {
  const params = {};
  if (categoryId) params.category_id = categoryId;
  if (search)     params.search = search;
  const { data } = await client.get('/api/recipes/', { params });
  return data;
}

/** Fetch a single recipe by its ID. */
export async function getRecipeById(id) {
  const { data } = await client.get(`/api/recipes/${id}/`);
  return data;
}

/** Fetch all food categories. */
export async function getAllCategories() {
  const { data } = await client.get('/api/categories/');
  return data;
}
