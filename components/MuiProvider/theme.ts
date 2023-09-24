import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  palette: {
    mode: 'light',
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
    h1: {
      fontSize: '2rem',
    },
    h2: {
      fontSize: '1.8rem',
    },
    h3: {
      fontSize: '1.6rem',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        a: {
          color: '#1C5BA4',
          textDecoration: 'none',
          transition: 'background 300ms, color 300ms, opacity 300ms, border 300ms',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          color: '#333',
          backgroundColor: '#fff',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: 10,
        },
        elevation: {
          boxShadow: '0 3px 20px rgba(155, 166, 178, 0.25)',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.severity === 'info' && {
            backgroundColor: '#ffe',
          }),
        }),
      },
    },
  },
});

export default theme;
