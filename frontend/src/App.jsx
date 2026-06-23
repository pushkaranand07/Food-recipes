import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';

// Pages
import LoginPage from './pages/Login/LoginPage';
import RegisterPage from './pages/Register/RegisterPage';
import HomePage from './pages/Home/HomePage';
import CategoriesPage from './pages/Categories/CategoriesPage';
import RecipesListPage from './pages/RecipesList/RecipesListPage';
import RecipeDetailPage from './pages/RecipeDetail/RecipeDetailPage';
import IngredientsDetailsPage from './pages/IngredientsDetails/IngredientsDetailsPage';
import IngredientPage from './pages/Ingredient/IngredientPage';
import SearchPage from './pages/Search/SearchPage';

// Layout Wrapper
function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div 
        className={`overlay ${sidebarOpen ? 'active' : ''}`} 
        onClick={() => setSidebarOpen(false)} 
      />
      <div className="page-layout">
        <Outlet />
      </div>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Main App Routes (public — login accessible via navbar) */}
          <Route element={<AppLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/categories/:categoryId" element={<RecipesListPage />} />
            <Route path="/recipes/:recipeId" element={<RecipeDetailPage />} />
            <Route path="/recipes/:recipeId/ingredients" element={<IngredientsDetailsPage />} />
            <Route path="/ingredients/:ingredientId" element={<IngredientPage />} />
            <Route path="/search" element={<SearchPage />} />
          </Route>

          {/* Fallback Catch-All */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
