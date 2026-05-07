import { AppBar, Toolbar, Typography, Container, Box, IconButton, Tooltip, Stack } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Link, Outlet } from 'react-router-dom';

import BnvLogo from './BnvLogo.jsx';
import { themeTokens } from '../../theme.js';

export default function Layout() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Faded BNV watermark behind the page content */}
      <Box
        aria-hidden
        sx={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0.05,
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: '40vw', md: '24vw' },
            fontWeight: 900,
            letterSpacing: '-0.05em',
            color: themeTokens.surfaceDark,
            userSelect: 'none',
          }}
        >
          BNV
        </Typography>
      </Box>

      {/* Top branded header — logo + company tagline */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: 'background.paper',
          borderBottom: `1px solid ${themeTokens.border}`,
          color: 'text.primary',
          zIndex: 2,
        }}
      >
        <Toolbar sx={{ minHeight: { xs: 64, md: 80 }, px: { xs: 2, md: 4 } }}>
          <Box component={Link} to="/users" sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
            <BnvLogo size={36} />
            <Box sx={{ lineHeight: 1.1 }}>
              <Typography sx={{ fontWeight: 800, fontSize: { xs: 18, md: 22 }, color: 'text.primary' }}>
                BNV
              </Typography>
              <Typography sx={{ fontSize: 10, letterSpacing: '0.18em', color: 'text.secondary', fontWeight: 700 }}>
                BITS AND VOLTS
              </Typography>
            </Box>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <Stack alignItems="flex-end" sx={{ display: { xs: 'none', sm: 'flex' } }}>
            <Typography sx={{ fontWeight: 700, fontSize: { sm: 14, md: 16 } }}>
              Bits and Volts Pvt. Ltd.
            </Typography>
            <Typography sx={{ fontWeight: 700, fontSize: { sm: 14, md: 16 } }}>Pune, India</Typography>
          </Stack>

          <Tooltip title="GitHub Repository">
            <IconButton
              component="a"
              href="https://github.com/sarthaktomar579/BNV-User-Management-MERN"
              target="_blank"
              rel="noreferrer"
              size="small"
              sx={{ ml: 2 }}
            >
              <GitHubIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      {/* Black sub-header bar — "MERN stack developer practical task" */}
      <Box
        sx={{
          bgcolor: themeTokens.surfaceDark,
          color: '#ffffff',
          py: 1.25,
          textAlign: 'center',
          zIndex: 2,
        }}
      >
        <Typography sx={{ fontWeight: 600, fontSize: { xs: 14, md: 16 }, letterSpacing: '0.02em' }}>
          MERN stack developer practical task
        </Typography>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 }, flexGrow: 1, position: 'relative', zIndex: 1 }}>
        <Outlet />
      </Container>

      <Box
        component="footer"
        sx={{ py: 2, textAlign: 'center', color: 'text.secondary', fontSize: 14, position: 'relative', zIndex: 1 }}
      >
        Built with the MERN stack — for the Bits and Volts assessment.
      </Box>
    </Box>
  );
}
