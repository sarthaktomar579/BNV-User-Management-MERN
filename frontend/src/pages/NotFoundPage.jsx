import { Box, Typography, Button, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <Paper sx={{ p: 6, textAlign: 'center' }}>
      <Typography variant="h2" sx={{ fontWeight: 800, color: 'primary.main' }}>
        404
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{ mt: 1 }}>
        The page you are looking for does not exist.
      </Typography>
      <Box sx={{ mt: 3 }}>
        <Button component={Link} to="/users" variant="contained">
          Back to Users
        </Button>
      </Box>
    </Paper>
  );
}
