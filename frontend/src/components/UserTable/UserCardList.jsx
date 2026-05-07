import { Card, CardContent, Stack, Typography, Chip, Box, Avatar, Divider } from '@mui/material';

import UserActionMenu from './UserActionMenu.jsx';

function getInitials(u) {
  return `${(u.firstName || '').charAt(0)}${(u.lastName || '').charAt(0)}`.toUpperCase() || '?';
}

function userLocation(u) {
  return u.location || [u.city, u.country].filter(Boolean).join(', ') || '—';
}

export default function UserCardList({ users, onDelete, page = 1, limit = 10 }) {
  const startIndex = (page - 1) * limit;

  return (
    <Stack spacing={1.5}>
      {users.map((u, i) => (
        <Card key={u._id}>
          <CardContent sx={{ pb: '12px !important' }}>
            <Stack direction="row" spacing={1.5} alignItems="flex-start">
              <Avatar
                src={u.profileImage || undefined}
                alt={`${u.firstName} ${u.lastName}`}
                sx={{ width: 48, height: 48, bgcolor: 'primary.main', fontWeight: 700 }}
              >
                {getInitials(u)}
              </Avatar>
              <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={1}>
                  <Box sx={{ minWidth: 0 }}>
                    <Typography variant="caption" color="text.secondary">
                      #{startIndex + i + 1}
                    </Typography>
                    <Typography variant="subtitle1" fontWeight={700} noWrap>
                      {u.firstName} {u.lastName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {u.email}
                    </Typography>
                  </Box>
                  <Chip
                    label={u.status}
                    size="small"
                    color={u.status === 'Active' ? 'success' : 'default'}
                    variant={u.status === 'Active' ? 'filled' : 'outlined'}
                    sx={{ fontWeight: 600 }}
                  />
                </Stack>
              </Box>
            </Stack>

            <Divider sx={{ my: 1.5 }} />

            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="caption" color="text.secondary" display="block">
                  {u.phone} · {u.gender || '—'}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {userLocation(u)}
                </Typography>
              </Box>
              <UserActionMenu user={u} onDelete={onDelete} />
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}
