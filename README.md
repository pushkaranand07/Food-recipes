# 🍽️ InstaFood — Recipes Web App

A full-stack recipes web application built with **React + Vite** on the frontend and **Django REST Framework** on the backend. Browse recipes, explore ingredients, search by keyword, and manage your account with JWT-based authentication.

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite 5, React Router DOM 7, CSS Modules |
| Backend | Django 4.2, Django REST Framework, SimpleJWT |
| Database | SQLite (dev) / PostgreSQL (prod) |
| Auth | JWT (Access + Refresh tokens) |

---

## 📁 Project Structure

```
react-native-recipes-app/
├── frontend/               # React + Vite web app
│   ├── src/
│   │   ├── api/            # Axios API clients (auth, recipes, ingredients)
│   │   ├── components/     # Reusable UI components (Navbar, Sidebar, etc.)
│   │   ├── context/        # AuthContext (JWT auth state)
│   │   ├── pages/          # All page components
│   │   └── styles/         # Global CSS design system
│   └── package.json
│
└── backend/                # Django REST Framework API
    ├── apps/
    │   ├── users/          # Custom user model + auth endpoints
    │   ├── recipes/        # Recipes CRUD + seeding
    │   └── ingredients/    # Ingredients + linked recipes
    ├── config/             # Django settings, URLs, WSGI
    └── manage.py
```

---

## ✨ Features

- 🔐 **Authentication** — Register, Login, JWT token refresh
- 🏠 **Home Page** — Featured recipes with image carousel
- 📋 **Recipes List** — Browse all recipes by category
- 🔍 **Search** — Search recipes by name or ingredient
- 🥗 **Ingredients** — Full ingredient list with linked recipes
- 📄 **Recipe Detail** — Full recipe info, photo gallery, ingredients
- 📦 **Categories** — Filter recipes by category
- 👤 **Protected Routes** — Auth-guarded pages

---

## ⚙️ Getting Started

### Prerequisites

- Python 3.10+
- Node.js 18+
- npm

---

### 🐍 Backend Setup

```bash
cd backend

# Create and activate virtual environment
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # Mac/Linux

# Install dependencies
pip install -r requirements.txt

# Create .env file
copy .env.example .env

# Run migrations
python manage.py migrate

# (Optional) Seed sample recipe data
python manage.py seed_data

# Start the server
python manage.py runserver 8000
```

Backend runs at: **http://localhost:8000**

---

### ⚡ Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
copy .env.example .env

# Start the dev server
npm run dev
```

Frontend runs at: **http://localhost:5173**

---

### 🔑 Environment Variables

**`backend/.env`**
```env
SECRET_KEY=your-secret-key
DEBUG=True
SQLITE=true
# DATABASE_URL=postgres://user:password@localhost:5432/dbname  # for PostgreSQL
```

**`frontend/.env`**
```env
VITE_API_URL=http://localhost:8000
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register/` | Register new user |
| POST | `/api/auth/login/` | Login & get JWT tokens |
| POST | `/api/auth/refresh/` | Refresh access token |
| GET | `/api/recipes/` | List all recipes |
| GET | `/api/recipes/:id/` | Get recipe detail |
| GET | `/api/recipes/?search=query` | Search recipes |
| GET | `/api/ingredients/` | List all ingredients |
| GET | `/api/ingredients/:id/` | Get ingredient detail |

---

## 🛠️ Development Commands

```bash
# Backend
python manage.py seed_data       # Seed sample data into DB
python manage.py createsuperuser  # Create admin user
python manage.py runserver 8000   # Start backend

# Frontend
npm run dev      # Start dev server
npm run build    # Build for production
npm run lint     # Run ESLint
```

---

## 🙌 Author

Built by **[@pushkaranand07](https://github.com/pushkaranand07)**
