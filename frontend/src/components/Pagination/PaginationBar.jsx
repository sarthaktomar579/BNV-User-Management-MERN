import { Box, Pagination, Select, MenuItem, Typography, Stack } from '@mui/material';

export default function PaginationBar({ page, totalPages, total, limit, onPageChange, onLimitChange }) {
  const start = total === 0 ? 0 : (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={2}
      alignItems="center"
      justifyContent="space-between"
      sx={{ mt: 2 }}
    >
      <Typography variant="body2" color="text.secondary">
        Showing <b>{start}</b>–<b>{end}</b> of <b>{total}</b>
      </Typography>

      <Stack direction="row" spacing={2} alignItems="center">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Rows per page
          </Typography>
          <Select
            size="small"
            value={limit}
            onChange={(e) => onLimitChange(Number(e.target.value))}
            sx={{ minWidth: 80 }}
          >
            {[5, 10, 20, 50].map((n) => (
              <MenuItem key={n} value={n}>
                {n}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Pagination
          count={Math.max(totalPages, 1)}
          page={page}
          onChange={(_, p) => onPageChange(p)}
          color="primary"
          shape="rounded"
          size="small"
        />
      </Stack>
    </Stack>
  );
}
