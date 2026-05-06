import { useState } from 'react';
import {
  TextField,
  MenuItem,
  Grid,
  Button,
  Box,
  Stack,
  Paper,
  Typography,
  CircularProgress,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useNavigate } from 'react-router-dom';

import { validateUser, isValid } from '../../utils/validators.js';

const EMPTY = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  gender: 'Other',
  city: '',
  country: '',
  status: 'Active',
};

export default function UserForm({ initialValues, mode = 'create', onSubmit, submitting }) {
  const [values, setValues] = useState({ ...EMPTY, ...initialValues });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const navigate = useNavigate();

  const handleChange = (field) => (e) => {
    const v = e.target.value;
    setValues((prev) => ({ ...prev, [field]: v }));
    if (touched[field]) {
      setErrors(validateUser({ ...values, [field]: v }));
    }
  };

  const handleBlur = (field) => () => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validateUser(values));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const next = validateUser(values);
    setErrors(next);
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      city: true,
      country: true,
    });
    if (!isValid(next)) return;
    onSubmit(values);
  };

  const fieldProps = (name) => ({
    name,
    value: values[name] ?? '',
    onChange: handleChange(name),
    onBlur: handleBlur(name),
    error: Boolean(touched[name] && errors[name]),
    helperText: touched[name] && errors[name] ? errors[name] : ' ',
    fullWidth: true,
    size: 'small',
  });

  return (
    <Paper component="form" onSubmit={handleSubmit} sx={{ p: { xs: 2, md: 4 } }} noValidate>
      <Typography variant="h5" gutterBottom>
        {mode === 'edit' ? 'Edit User' : 'Add New User'}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Fields marked * are required.
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField label="First Name *" {...fieldProps('firstName')} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField label="Last Name *" {...fieldProps('lastName')} />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField label="Email *" type="email" {...fieldProps('email')} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField label="Phone *" {...fieldProps('phone')} inputProps={{ inputMode: 'numeric', maxLength: 10 }} />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField select label="Gender" {...fieldProps('gender')}>
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField select label="Status" {...fieldProps('status')}>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField label="City" {...fieldProps('city')} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField label="Country" {...fieldProps('country')} />
        </Grid>
      </Grid>

      <Box sx={{ mt: 3 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} justifyContent="flex-end">
          <Button variant="outlined" onClick={() => navigate(-1)} disabled={submitting}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            startIcon={submitting ? <CircularProgress size={16} color="inherit" /> : <SaveIcon />}
            disabled={submitting}
          >
            {mode === 'edit' ? 'Update User' : 'Create User'}
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
}
