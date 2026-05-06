import { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Avatar,
  Grid,
  Chip,
  Button,
  Skeleton,
  Stack,
  Divider,
  Breadcrumbs,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PublicIcon from '@mui/icons-material/Public';
import WcIcon from '@mui/icons-material/Wc';
import EventIcon from '@mui/icons-material/Event';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { userService } from '../services/api.js';

function getInitials(u) {
  if (!u) return '';
  return `${(u.firstName || '').charAt(0)}${(u.lastName || '').charAt(0)}`.toUpperCase();
}

function InfoRow({ icon, label, value }) {
  return (
    <Stack direction="row" spacing={2} alignItems="flex-start" sx={{ py: 1.25 }}>
      <Box sx={{ color: 'primary.main', mt: 0.25 }}>{icon}</Box>
      <Box>
        <Typography variant="caption" color="text.secondary" display="block">
          {label}
        </Typography>
        <Typography variant="body1" fontWeight={500}>
          {value || '—'}
        </Typography>
      </Box>
    </Stack>
  );
}

export default function UserViewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await userService.get(id);
        if (!cancelled) setUser(res.data);
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
  }, [id, navigate]);

  if (loading) {
    return <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 2 }} />;
  }

  if (!user) return null;

  const fullName = `${user.firstName} ${user.lastName}`.trim();
  const location = [user.city, user.country].filter(Boolean).join(', ') || 'Not provided';

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
          <Typography color="text.primary">{fullName}</Typography>
        </Breadcrumbs>
      </Box>

      <Paper
        sx={{
          p: { xs: 3, md: 4 },
          background: 'linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%)',
          color: 'white',
          border: 'none',
        }}
      >
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={3}
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          justifyContent="space-between"
        >
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2.5} alignItems={{ xs: 'flex-start', sm: 'center' }}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                bgcolor: 'rgba(255,255,255,0.2)',
                color: 'white',
                fontSize: 32,
                fontWeight: 700,
                border: '2px solid rgba(255,255,255,0.4)',
              }}
            >
              {getInitials(user)}
            </Avatar>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {fullName}
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                {user.email}
              </Typography>
              <Box sx={{ mt: 1 }}>
                <Chip
                  label={user.status}
                  size="small"
                  sx={{
                    bgcolor: user.status === 'Active' ? 'success.main' : 'grey.700',
                    color: 'white',
                    fontWeight: 600,
                  }}
                />
              </Box>
            </Box>
          </Stack>

          <Button
            component={Link}
            to={`/users/${user._id}/edit`}
            variant="contained"
            startIcon={<EditIcon />}
            sx={{
              bgcolor: 'white',
              color: 'primary.main',
              '&:hover': { bgcolor: 'grey.100' },
            }}
          >
            Edit User
          </Button>
        </Stack>
      </Paper>

      <Paper sx={{ p: { xs: 2, md: 4 }, mt: 2 }}>
        <Typography variant="h6" gutterBottom>
          Contact Information
        </Typography>
        <Divider sx={{ mb: 1 }} />
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <InfoRow icon={<EmailIcon />} label="Email" value={user.email} />
            <InfoRow icon={<PhoneIcon />} label="Phone" value={user.phone} />
            <InfoRow icon={<WcIcon />} label="Gender" value={user.gender} />
          </Grid>
          <Grid item xs={12} md={6}>
            <InfoRow icon={<LocationOnIcon />} label="City" value={user.city} />
            <InfoRow icon={<PublicIcon />} label="Country" value={user.country} />
            <InfoRow icon={<LocationOnIcon />} label="Full Location" value={location} />
          </Grid>
        </Grid>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Account Details
        </Typography>
        <Divider sx={{ mb: 1 }} />
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <InfoRow
              icon={<EventIcon />}
              label="Created At"
              value={user.createdAt ? new Date(user.createdAt).toLocaleString() : '—'}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <InfoRow
              icon={<EventIcon />}
              label="Last Updated"
              value={user.updatedAt ? new Date(user.updatedAt).toLocaleString() : '—'}
            />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
