# BNV User Management — MERN Stack

A full-stack **User Management** application built for the **Bits and Volts Pvt. Ltd.** Full Stack (MERN) Intern assessment. It implements a complete CRUD workflow with pagination, server-side search, CSV export, robust validation and a responsive UI.

> **Stack:** MongoDB · Express · React (Vite) · Node.js · Material UI

---

## Live Demo

| Layer       | Platform | URL                                                |
| ----------- | -------- | -------------------------------------------------- |
| Frontend    | Netlify  | _Add your deployed URL here after deploying_       |
| Backend API | Render   | _Add your deployed URL here after deploying_       |
| Repository  | GitHub   | https://github.com/sarthaktomar579/BNV-User-Management-MERN |

---

## Features

### Backend (Express + MongoDB)

- **CRUD API** — Create, Read, Update, Delete user records
- **Pagination** — `?page=1&limit=10` with total count & page metadata
- **Search API** — Case-insensitive search across name, email, phone & city
- **CSV Export API** — Streams the current dataset as a downloadable `.csv`
- **Validation** — Server-side checks via `express-validator`
- **Error Handling** — Centralized middleware with consistent JSON responses
- **CORS + Helmet + Morgan** — Production-ready middleware stack

### Frontend (React + Vite + MUI)

- **3 Screens** — Listing (table), Add/Edit form, View details
- **Multiple Routing** — `react-router-dom` (`/`, `/users/new`, `/users/:id/edit`, `/users/:id`)
- **Component Driven** — Reusable `UserTable`, `UserForm`, `SearchBar`, `Pagination`, `Layout` components
- **Field Validation** — Email, phone, required, length rules with inline error messages
- **Notifications** — `react-toastify` for success / failure feedback
- **Responsive Design** — Adapts cleanly between mobile and desktop via MUI Grid + breakpoints
- **No inline styles** — Styling done via MUI `sx` / theme

---

## Project Structure

```
BNV-User-Management-MERN/
├── backend/
│   ├── src/
│   │   ├── config/db.js
│   │   ├── controllers/userController.js
│   │   ├── middleware/errorHandler.js
│   │   ├── middleware/validators.js
│   │   ├── models/User.js
│   │   ├── routes/userRoutes.js
│   │   └── app.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/   (Layout, UserTable, UserForm, SearchBar, Pagination)
│   │   ├── pages/        (UserListPage, UserFormPage, UserViewPage)
│   │   ├── services/api.js
│   │   ├── utils/validators.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── README.md
└── .gitignore
```

---

## Getting Started (Local)

### Prerequisites

- Node.js ≥ 18
- A MongoDB connection string (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

### 1. Clone

```bash
git clone https://github.com/sarthaktomar579/BNV-User-Management-MERN.git
cd BNV-User-Management-MERN
```

### 2. Backend

```bash
cd backend
npm install
cp .env.example .env   # then fill in MONGO_URI
npm run dev            # http://localhost:5000
```

`backend/.env`:

```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/bnv_users
CLIENT_URL=http://localhost:5173
```

### 3. Frontend

```bash
cd frontend
npm install
cp .env.example .env   # then set VITE_API_URL
npm run dev            # http://localhost:5173
```

`frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

---

## API Reference

Base URL: `/api/users`

| Method | Endpoint              | Description                                           |
| ------ | --------------------- | ----------------------------------------------------- |
| GET    | `/api/users`          | List users — `?page&limit&search`                     |
| GET    | `/api/users/:id`      | Get one user                                          |
| POST   | `/api/users`          | Create user                                           |
| PUT    | `/api/users/:id`      | Update user                                           |
| DELETE | `/api/users/:id`      | Delete user                                           |
| GET    | `/api/users/export`   | Download CSV of all users                             |

### User Schema

```jsonc
{
  "firstName": "Sarthak",
  "lastName":  "Tomar",
  "email":     "sarthak@example.com",
  "phone":     "9876543210",
  "gender":    "Male",
  "city":      "Pune",
  "country":   "India",
  "status":    "Active"
}
```

---

## Deployment

### Frontend → Netlify (recommended)

A `netlify.toml` is committed at the repo root, so Netlify will pick up the build settings automatically.

1. Sign in to [Netlify](https://app.netlify.com) → **Add new site → Import from Git**.
2. Pick this repo. Netlify will read `netlify.toml` and use:
   - **Base:** `frontend`
   - **Build command:** `npm run build`
   - **Publish directory:** `frontend/dist`
3. Add a single environment variable:
   - `VITE_API_URL` → your deployed backend URL, e.g. `https://bnv-user-management-api.onrender.com/api`
4. Deploy. Netlify gives you a `*.netlify.app` URL — paste it into the **Live Demo** table above.

> SPA routing is already handled via `frontend/public/_redirects` and the `netlify.toml` redirect rule, so deep links like `/users/:id` work after refresh.

### Backend → Render

A `render.yaml` blueprint is committed at the repo root.

1. Sign in to [Render](https://render.com) → **New → Web Service** → connect this repo.
2. Render auto-detects `render.yaml`. Confirm:
   - **Root directory:** `backend`
   - **Build command:** `npm install`
   - **Start command:** `npm start`
3. Add env vars (in the Render dashboard):
   - `MONGO_URI` → your MongoDB Atlas connection string
   - `CLIENT_URL` → your Netlify URL (e.g. `https://bnv-user-management.netlify.app`)
4. Deploy. Once the service is live, copy the URL back into the frontend's `VITE_API_URL` and redeploy Netlify.

> A `vercel.json` is also included, so Vercel works as a drop-in alternative to Netlify if preferred.

---

## Author

**Sarthak Tomar** — Submitted for the Bits and Volts Pvt. Ltd. Full Stack Intern (MERN) assessment.
