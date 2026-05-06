# BNV User Management — MERN Stack

A full-stack **User Management** application built for the **Bits and Volts Pvt. Ltd.** Full Stack (MERN) Intern assessment. It implements a complete CRUD workflow with pagination, server-side search, CSV export, robust validation and a responsive UI.

> **Stack:** MongoDB · Express · React (Vite) · Node.js · Material UI

---

## Live Demo

The whole stack — React UI + Express API — is deployed to a single Netlify site.

| Layer        | Platform | URL                                                          |
| ------------ | -------- | ------------------------------------------------------------ |
| App (FE+BE)  | Netlify  | _Add your deployed URL here after deploying_                 |
| Repository   | GitHub   | https://github.com/sarthaktomar579/BNV-User-Management-MERN  |

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
├── backend/                      # Express + Mongoose source
│   ├── src/
│   │   ├── config/db.js          # Cached Mongoose connection (serverless-safe)
│   │   ├── controllers/userController.js
│   │   ├── middleware/errorHandler.js
│   │   ├── middleware/validators.js
│   │   ├── models/User.js
│   │   ├── routes/userRoutes.js
│   │   ├── seed.js
│   │   └── app.js                # The Express app (no .listen)
│   ├── server.js                 # Long-running entry (local dev / Render fallback)
│   ├── package.json
│   └── .env.example
├── frontend/                     # Vite + React + MUI client
│   ├── src/
│   │   ├── components/   (Layout, UserTable, UserForm, SearchBar, Pagination)
│   │   ├── pages/        (UserListPage, UserFormPage, UserViewPage)
│   │   ├── services/api.js
│   │   ├── utils/validators.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/_redirects
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── netlify/
│   └── functions/
│       ├── api.js                # Wraps Express via serverless-http
│       └── package.json
├── netlify.toml                  # Single-platform deployment config
├── render.yaml                   # Optional alternative for traditional hosting
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

The Express API is deployed as a **Netlify Function** (`netlify/functions/api.js`) using `serverless-http`. The React app is built to a static bundle and served from the same Netlify site, with a redirect rule that routes `/api/*` to the function. **One platform, one deploy, no sleep.**

### Steps

1. Create a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster and grab the connection string (`mongodb+srv://...`).
2. Sign in to [Netlify](https://app.netlify.com) → **Add new site → Import from Git** → pick this repo.
3. Netlify reads `netlify.toml` and auto-fills everything (build command, publish dir, function dir, redirects, even `VITE_API_URL=/api`). Just add **one** environment variable in the Netlify dashboard:
   - `MONGO_URI` → your Atlas connection string
4. Click **Deploy**. You'll get a `*.netlify.app` URL — paste it into the **Live Demo** table above.

### How it works

```
 user → https://your-site.netlify.app/users          → static React app (CDN, always-on)
 user → https://your-site.netlify.app/api/users      → Netlify Function → Express → MongoDB Atlas
```

- First request after a quiet period: ~1–3 sec cold-start (much faster than Render's 30–50 sec wake from sleep).
- Warm requests: ~50–150 ms.
- MongoDB connection is **cached** on the function's module scope, so warm invocations skip the handshake.

### Optional: traditional hosting on Render

If you'd rather run the backend as a long-running Node process (e.g. for heavy CSV exports that exceed the 10s function timeout), `render.yaml` and `vercel.json` are kept in the repo as alternatives. See `render.yaml` for the Render blueprint.

---

## Author

**Sarthak Tomar** — Submitted for the Bits and Volts Pvt. Ltd. Full Stack Intern (MERN) assessment.
