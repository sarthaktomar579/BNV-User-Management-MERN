import { createTheme } from '@mui/material/styles';

// Color tokens chosen to match the Bits and Volts mockup:
//   - primary red used for buttons, badges, accents
//   - dark surface used for the "MERN stack developer practical task" sub-header
//   - soft off-white page background that lets the BNV watermark show through
const tokens = {
  primary: '#a02333',
  primaryDark: '#82192a',
  surfaceDark: '#0f0f12',
  surfaceMuted: '#f3eef0',
  border: '#e6dfe1',
};

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: tokens.primary, dark: tokens.primaryDark, contrastText: '#ffffff' },
    secondary: { main: tokens.surfaceDark },
    background: { default: tokens.surfaceMuted, paper: '#ffffff' },
    text: { primary: '#1a1a1a', secondary: '#5b5b66' },
    divider: tokens.border,
  },
  typography: {
    fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
    h4: { fontWeight: 700 },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: { borderRadius: 10 },
  components: {
    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: { root: { border: `1px solid ${tokens.border}` } },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        containedPrimary: {
          boxShadow: 'none',
          '&:hover': { backgroundColor: tokens.primaryDark },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 700,
          background: tokens.surfaceDark,
          color: '#ffffff',
          borderColor: tokens.surfaceDark,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        colorSuccess: {
          backgroundColor: tokens.primary,
          color: '#ffffff',
        },
      },
    },
  },
});

export const themeTokens = tokens;
export default theme;
