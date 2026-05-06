import { AppBar, Toolbar, Typography, Container, Box, IconButton, Tooltip } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { Link, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="sticky" color="default" sx={{ bgcolor: 'background.paper', borderBottom: '1px solid #e5e7eb' }}>
        <Toolbar>
          <Box
            component={Link}
            to="/users"
            sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'primary.main' }}
          >
            <PeopleAltIcon />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              BNV&nbsp;User&nbsp;Management
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Tooltip title="GitHub Repository">
            <IconButton
              component="a"
              href="https://github.com/sarthaktomar579/BNV-User-Management-MERN"
              target="_blank"
              rel="noreferrer"
              size="small"
            >
              <GitHubIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 }, flexGrow: 1 }}>
        <Outlet />
      </Container>

      <Box component="footer" sx={{ py: 2, textAlign: 'center', color: 'text.secondary', fontSize: 14 }}>
        Built with the MERN stack — for the Bits and Volts assessment.
      </Box>
    </Box>
  );
}
