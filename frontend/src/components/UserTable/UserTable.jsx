import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Tooltip,
  Chip,
  Box,
  Typography,
  TableContainer,
  Paper,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from 'react-router-dom';

import UserCardList from './UserCardList.jsx';

export default function UserTable({ users, onDelete }) {
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
    return <UserCardList users={users} onDelete={onDelete} />;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((u) => (
            <TableRow key={u._id} hover>
              <TableCell>
                <Typography fontWeight={600}>
                  {u.firstName} {u.lastName}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {u.gender}
                </Typography>
              </TableCell>
              <TableCell>{u.email}</TableCell>
              <TableCell>{u.phone}</TableCell>
              <TableCell>
                {u.city || '—'}
                {u.country ? `, ${u.country}` : ''}
              </TableCell>
              <TableCell>
                <Chip
                  label={u.status}
                  size="small"
                  color={u.status === 'Active' ? 'success' : 'default'}
                  variant={u.status === 'Active' ? 'filled' : 'outlined'}
                />
              </TableCell>
              <TableCell align="right">
                <Box sx={{ display: 'inline-flex', gap: 0.5 }}>
                  <Tooltip title="View">
                    <IconButton size="small" component={Link} to={`/users/${u._id}`}>
                      <VisibilityIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit">
                    <IconButton size="small" component={Link} to={`/users/${u._id}/edit`} color="primary">
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton size="small" color="error" onClick={() => onDelete(u)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
