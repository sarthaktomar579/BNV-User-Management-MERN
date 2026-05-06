import { Card, CardContent, Stack, Typography, Chip, Box, IconButton, Divider } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from 'react-router-dom';

export default function UserCardList({ users, onDelete }) {
  return (
    <Stack spacing={1.5}>
      {users.map((u) => (
        <Card key={u._id}>
          <CardContent sx={{ pb: '12px !important' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <Box>
                <Typography variant="subtitle1" fontWeight={700}>
                  {u.firstName} {u.lastName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {u.email}
                </Typography>
              </Box>
              <Chip
                label={u.status}
                size="small"
                color={u.status === 'Active' ? 'success' : 'default'}
                variant={u.status === 'Active' ? 'filled' : 'outlined'}
              />
            </Stack>

            <Divider sx={{ my: 1.5 }} />

            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="caption" color="text.secondary" display="block">
                  {u.phone}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {u.city || '—'}
                  {u.country ? `, ${u.country}` : ''}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 0.5 }}>
                <IconButton size="small" component={Link} to={`/users/${u._id}`}>
                  <VisibilityIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" color="primary" component={Link} to={`/users/${u._id}/edit`}>
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" color="error" onClick={() => onDelete(u)}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}
