import { useEffect, useMemo, useState, useCallback } from 'react';
import {
  Box,
  Button,
  Stack,
  Typography,
  Skeleton,
  Paper,
  Grid,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DownloadIcon from '@mui/icons-material/Download';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import SearchBar from '../components/SearchBar/SearchBar.jsx';
import UserTable from '../components/UserTable/UserTable.jsx';
import PaginationBar from '../components/Pagination/PaginationBar.jsx';
import ConfirmDialog from '../components/ConfirmDialog/ConfirmDialog.jsx';
import { userService } from '../services/api.js';

function useDebouncedValue(value, delay = 400) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

export default function UserListPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [meta, setMeta] = useState({ total: 0, totalPages: 1 });
  const [confirm, setConfirm] = useState({ open: false, user: null });

  const debouncedSearch = useDebouncedValue(search, 400);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await userService.list({ page, limit, search: debouncedSearch });
      setUsers(res.data || []);
      setMeta(res.meta || { total: 0, totalPages: 1 });
    } catch (err) {
      toast.error(err.userMessage || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  }, [page, limit, debouncedSearch]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Reset to page 1 whenever search changes
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const handleDeleteRequest = (user) => setConfirm({ open: true, user });

  const handleDeleteConfirm = async () => {
    const { user } = confirm;
    setConfirm({ open: false, user: null });
    try {
      await userService.remove(user._id);
      toast.success('User deleted successfully');
      // If we just deleted the last item on a page > 1, go back a page
      if (users.length === 1 && page > 1) {
        setPage((p) => p - 1);
      } else {
        fetchUsers();
      }
    } catch (err) {
      toast.error(err.userMessage || 'Failed to delete user');
    }
  };

  const handleExport = () => {
    const url = userService.exportCsvUrl(debouncedSearch);
    window.open(url, '_blank', 'noopener');
  };

  const skeletons = useMemo(
    () =>
      Array.from({ length: limit }).map((_, i) => (
        <Skeleton key={i} variant="rectangular" height={56} sx={{ mb: 1, borderRadius: 1 }} />
      )),
    [limit]
  );

  return (
    <Box>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={2}
        alignItems={{ xs: 'stretch', md: 'center' }}
        justifyContent="space-between"
        sx={{ mb: 3 }}
      >
        <Box>
          <Typography variant="h4">Users</Typography>
          <Typography variant="body2" color="text.secondary">
            Manage user records — add, edit, view, search, and export.
          </Typography>
        </Box>
        <Stack direction="row" spacing={1.5} sx={{ flexShrink: 0 }}>
          <Button variant="outlined" startIcon={<DownloadIcon />} onClick={handleExport}>
            Export CSV
          </Button>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate('/users/new')}>
            Add User
          </Button>
        </Stack>
      </Stack>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <SearchBar value={search} onChange={setSearch} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body2" color="text.secondary" textAlign={{ xs: 'left', md: 'right' }}>
              {loading ? 'Loading...' : `${meta.total} total user${meta.total === 1 ? '' : 's'}`}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {loading ? (
        <Box>{skeletons}</Box>
      ) : (
        <UserTable users={users} onDelete={handleDeleteRequest} page={page} limit={limit} />
      )}

      <PaginationBar
        page={page}
        limit={limit}
        total={meta.total}
        totalPages={meta.totalPages}
        onPageChange={setPage}
        onLimitChange={(n) => {
          setLimit(n);
          setPage(1);
        }}
      />

      <ConfirmDialog
        open={confirm.open}
        title="Delete user?"
        message={
          confirm.user
            ? `This will permanently delete ${confirm.user.firstName} ${confirm.user.lastName}. This action cannot be undone.`
            : ''
        }
        confirmLabel="Delete"
        destructive
        onConfirm={handleDeleteConfirm}
        onCancel={() => setConfirm({ open: false, user: null })}
      />
    </Box>
  );
}
