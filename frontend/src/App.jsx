import { Routes, Route, Navigate } from 'react-router-dom';

import Layout from './components/Layout/Layout.jsx';
import UserListPage from './pages/UserListPage.jsx';
import UserFormPage from './pages/UserFormPage.jsx';
import UserViewPage from './pages/UserViewPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/users" replace />} />
        <Route path="/users" element={<UserListPage />} />
        <Route path="/users/new" element={<UserFormPage mode="create" />} />
        <Route path="/users/:id" element={<UserViewPage />} />
        <Route path="/users/:id/edit" element={<UserFormPage mode="edit" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
