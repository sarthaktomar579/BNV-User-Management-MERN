import { Typography, Container, Box, IconButton, Tooltip } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Outlet } from 'react-router-dom';

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

      {/* Black header bar — the only header, per the latest design ask. */}
      <Box
        component="header"
        sx={{
          position: 'sticky',
          top: 0,
          bgcolor: themeTokens.surfaceDark,
          color: '#ffffff',
          py: 1.25,
          px: 2,
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography sx={{ fontWeight: 600, fontSize: { xs: 14, md: 16 }, letterSpacing: '0.02em' }}>
          MERN stack developer practical task
        </Typography>
        <Tooltip title="GitHub Repository">
          <IconButton
            component="a"
            href="https://github.com/sarthaktomar579/BNV-User-Management-MERN"
            target="_blank"
            rel="noreferrer"
            size="small"
            sx={{
              position: 'absolute',
              right: 12,
              color: 'rgba(255,255,255,0.85)',
              '&:hover': { color: '#fff', bgcolor: 'rgba(255,255,255,0.08)' },
            }}
          >
            <GitHubIcon fontSize="small" />
          </IconButton>
        </Tooltip>
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
