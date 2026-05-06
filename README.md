# BNV User Management — MERN Stack

A full-stack **User Management** application built for the **Bits and Volts Pvt. Ltd.** Full Stack (MERN) Intern assessment. It implements a complete CRUD workflow with pagination, server-side search, CSV export, robust validation and a responsive UI.

> **Stack:** MongoDB · Express · React (Vite) · Node.js · Material UI

---

## Live Demo

| Layer       | Platform | URL                                                |
| ----------- | -------- | -------------------------------------------------- |
| Frontend    | Vercel   | _Add your deployed URL here after deploying_       |
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

### Frontend → Vercel

1. Import the repo into Vercel.
2. **Root directory:** `frontend`
3. **Build command:** `npm run build`
4. **Output directory:** `dist`
5. Set env var `VITE_API_URL` to your deployed backend URL (e.g. `https://bnv-user-management-api.onrender.com/api`).

### Backend → Render

1. Create a new Web Service from this repo.
2. **Root directory:** `backend`
3. **Build command:** `npm install`
4. **Start command:** `npm start`
5. Add env vars: `MONGO_URI`, `CLIENT_URL`, `PORT` (Render injects `PORT` automatically).

> A `render.yaml` and `vercel.json` are included as ready-to-go blueprints.

---

## Author

**Sarthak Tomar** — Submitted for the Bits and Volts Pvt. Ltd. Full Stack Intern (MERN) assessment.
