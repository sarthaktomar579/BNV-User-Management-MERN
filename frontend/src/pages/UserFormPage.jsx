import { useEffect, useState } from 'react';
import { Box, Breadcrumbs, Button, Skeleton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import UserForm from '../components/UserForm/UserForm.jsx';
import { userService } from '../services/api.js';

export default function UserFormPage({ mode }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = mode === 'edit';

  const [initialValues, setInitialValues] = useState(null);
  const [loading, setLoading] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isEdit) {
      setInitialValues({});
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const res = await userService.get(id);
        if (!cancelled) setInitialValues(res.data);
      } catch (err) {
        toast.error(err.userMessage || 'Failed to load user');
        navigate('/users', { replace: true });
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id, isEdit, navigate]);

  const handleSubmit = async (values) => {
    setSubmitting(true);
    try {
      if (isEdit) {
        await userService.update(id, values);
        toast.success('User updated successfully');
      } else {
        await userService.create(values);
        toast.success('User created successfully');
      }
      navigate('/users');
    } catch (err) {
      // Field-level errors from server
      if (Array.isArray(err.fieldErrors) && err.fieldErrors.length) {
        err.fieldErrors.forEach((fe) => toast.error(`${fe.field}: ${fe.message}`));
      } else {
        toast.error(err.userMessage || 'Failed to save user');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <Button component={Link} to="/users" startIcon={<ArrowBackIcon />} size="small">
          Back to users
        </Button>
        <Breadcrumbs sx={{ mt: 1 }}>
          <Typography component={Link} to="/users" color="inherit" sx={{ textDecoration: 'none' }}>
            Users
          </Typography>
          <Typography color="text.primary">{isEdit ? 'Edit' : 'New'}</Typography>
        </Breadcrumbs>
      </Box>

      {loading || !initialValues ? (
        <Skeleton variant="rectangular" height={500} sx={{ borderRadius: 2 }} />
      ) : (
        <UserForm
          mode={isEdit ? 'edit' : 'create'}
          initialValues={initialValues}
          onSubmit={handleSubmit}
          submitting={submitting}
        />
      )}
    </Box>
  );
}
