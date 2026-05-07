import { useMemo, useState } from 'react';
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
  Avatar,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  FormHelperText,
  InputAdornment,
} from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import { useNavigate } from 'react-router-dom';

import { validateUser, isValid } from '../../utils/validators.js';

const EMPTY = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  gender: 'Male',
  location: '',
  profileImage: '',
  status: 'Active',
};

// Builds a single, friendly "location" value from either the new field
// or the legacy city/country pair so editing existing records is seamless.
function normalizeInitial(initial) {
  if (!initial) return EMPTY;
  const next = { ...EMPTY, ...initial };
  if (!next.location && (initial.city || initial.country)) {
    next.location = [initial.city, initial.country].filter(Boolean).join(', ');
  }
  return next;
}

function getInitials(first, last) {
  const f = (first || '').trim().charAt(0).toUpperCase();
  const l = (last || '').trim().charAt(0).toUpperCase();
  return (f + l) || '?';
}

export default function UserForm({ initialValues, mode = 'create', onSubmit, submitting }) {
  const [values, setValues] = useState(() => normalizeInitial(initialValues));
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
      location: true,
      profileImage: true,
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

  // Avatar preview — uses the URL the user typed; falls back to initials if it
  // hasn't loaded yet or fails. The `key` forces React to re-mount the <img>
  // when the URL changes so the broken-image state resets.
  const initials = useMemo(() => getInitials(values.firstName, values.lastName), [values.firstName, values.lastName]);

  return (
    <Paper component="form" onSubmit={handleSubmit} sx={{ p: { xs: 2, md: 4 } }} noValidate>
      <Stack alignItems="center" spacing={1.5} sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Register Your Details
        </Typography>
        <Avatar
          key={values.profileImage || 'no-image'}
          src={values.profileImage || undefined}
          alt={`${values.firstName} ${values.lastName}`.trim() || 'Profile'}
          sx={{
            width: 96,
            height: 96,
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            fontSize: 32,
            fontWeight: 700,
            border: '3px solid',
            borderColor: 'background.paper',
            boxShadow: '0 0 0 1px rgba(0,0,0,0.08)',
          }}
        >
          {initials}
        </Avatar>
      </Stack>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField label="First Name *" placeholder="Enter Your First Name" {...fieldProps('firstName')} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField label="Last Name *" placeholder="Enter Your Last Name" {...fieldProps('lastName')} />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label="Email *"
            type="email"
            placeholder="Enter Your Email"
            {...fieldProps('email')}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Mobile *"
            placeholder="Enter Your Mobile Number"
            {...fieldProps('phone')}
            inputProps={{ inputMode: 'numeric', maxLength: 10 }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl
            error={Boolean(touched.gender && errors.gender)}
            sx={{ mt: 0.5 }}
          >
            <FormLabel sx={{ fontSize: 13, fontWeight: 500, mb: 0.5 }}>Select Your Gender</FormLabel>
            <RadioGroup
              row
              name="gender"
              value={values.gender}
              onChange={handleChange('gender')}
              onBlur={handleBlur('gender')}
            >
              <FormControlLabel value="Male" control={<Radio size="small" />} label="Male" />
              <FormControlLabel value="Female" control={<Radio size="small" />} label="Female" />
              {/* Preserve legacy "Other" for records that already have it set, but
                  hide it as a primary option per the BNV mockup. */}
              {values.gender === 'Other' && (
                <FormControlLabel value="Other" control={<Radio size="small" />} label="Other" />
              )}
            </RadioGroup>
            <FormHelperText>{touched.gender && errors.gender ? errors.gender : ' '}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField select label="Select Your Status" {...fieldProps('status')}>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label="Profile Image URL"
            placeholder="https://example.com/avatar.jpg"
            {...fieldProps('profileImage')}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LinkIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Enter Your Location"
            placeholder="e.g. Pune, India"
            {...fieldProps('location')}
          />
        </Grid>
      </Grid>

      <Box sx={{ mt: 3 }}>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          disabled={submitting}
          startIcon={submitting ? <CircularProgress size={18} color="inherit" /> : null}
          sx={{ py: 1.25, fontSize: 16 }}
        >
          {mode === 'edit' ? 'Update' : 'Submit'}
        </Button>
        <Button
          fullWidth
          variant="text"
          onClick={() => navigate(-1)}
          disabled={submitting}
          sx={{ mt: 1, color: 'text.secondary' }}
        >
          Cancel
        </Button>
      </Box>
    </Paper>
  );
}
