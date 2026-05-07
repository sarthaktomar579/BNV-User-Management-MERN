import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Box,
  Typography,
  TableContainer,
  Paper,
  Avatar,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

import UserCardList from './UserCardList.jsx';
import UserActionMenu from './UserActionMenu.jsx';

function getInitials(u) {
  return `${(u.firstName || '').charAt(0)}${(u.lastName || '').charAt(0)}`.toUpperCase() || '?';
}

function userLocation(u) {
  return u.location || [u.city, u.country].filter(Boolean).join(', ') || '—';
}

export default function UserTable({ users, onDelete, page = 1, limit = 10 }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (!users.length) {
    return (
      <Paper sx={{ p: 6, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          No users found
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Try adjusting your search or add a new user to get started.
        </Typography>
      </Paper>
    );
  }

  if (isMobile) {
    return <UserCardList users={users} onDelete={onDelete} page={page} limit={limit} />;
  }

  // Sequential row number that respects pagination — what the mockup shows
  // in the "ID" column. Real Mongo _ids are still used internally.
  const startIndex = (page - 1) * limit;

  return (
    <TableContainer component={Paper} sx={{ overflow: 'hidden' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: 64 }}>ID</TableCell>
            <TableCell>FullName</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="center">Profile</TableCell>
            <TableCell align="center" sx={{ width: 96 }}>
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((u, i) => (
            <TableRow key={u._id} hover>
              <TableCell>{startIndex + i + 1}</TableCell>
              <TableCell>
                <Typography fontWeight={600}>
                  {u.firstName} {u.lastName}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {userLocation(u)}
                </Typography>
              </TableCell>
              <TableCell>{u.email}</TableCell>
              <TableCell>{u.gender || '—'}</TableCell>
              <TableCell>
                <Chip
                  label={u.status}
                  size="small"
                  color={u.status === 'Active' ? 'success' : 'default'}
                  variant={u.status === 'Active' ? 'filled' : 'outlined'}
                  sx={{ fontWeight: 600, minWidth: 80 }}
                />
              </TableCell>
              <TableCell align="center">
                <Box sx={{ display: 'inline-flex' }}>
                  <Avatar
                    src={u.profileImage || undefined}
                    alt={`${u.firstName} ${u.lastName}`}
                    sx={{ width: 36, height: 36, fontSize: 14, fontWeight: 700, bgcolor: 'primary.main' }}
                  >
                    {getInitials(u)}
                  </Avatar>
                </Box>
              </TableCell>
              <TableCell align="center">
                <UserActionMenu user={u} onDelete={onDelete} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
