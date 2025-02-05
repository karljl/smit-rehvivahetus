import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { createTheme, ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter } from 'react-router';
import '@fontsource/kalam/400.css';
import '@fontsource-variable/montserrat/wght.css';

let theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3a4856',
    },
    text: {
      primary: '#f4f4f4',
    },
  },
  typography: {
    h1: {
      fontFamily: 'Montserrat Variable, sans-serif',
      fontWeight: 500,
      fontSize: '2rem',
    },
    h2: {
      fontFamily: 'Montserrat Variable, sans-serif',
      fontWeight: 500,
      fontSize: '1.6rem',
    },
    h3: {
      fontFamily: 'Montserrat Variable, sans-serif',
      fontWeight: 500,
      fontSize: '1.1rem',
    },
    subtitle1: {
      fontFamily: 'Kalam, cursive',
      fontWeight: 400,
      fontSize: '1.4rem',
    },
    subtitle2: {
      fontFamily: 'Montserrat Variable, sans-serif',
      fontWeight: 400,
      fontSize: '0.9rem',
    },
    body1: {
      fontFamily: 'Montserrat Variable, sans-serif',
      fontWeight: 400,
      fontSize: '1.2rem',
    },
    body2: {
      fontFamily: 'Montserrat Variable, sans-serif',
      fontWeight: 400,
      fontSize: '0.9rem',
    },
  },
});

theme = createTheme(theme, {
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        img: {
          maxHeight: '100%',
          maxWidth: '100%',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: 'inherit',
          '&:hover': {
            color: 'inherit',
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          '&:hover': {
            color: '#9eadbd',
          },
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          '&.main-nav > li:last-child': {
            color: '#bca5af',
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          padding: '0 !important',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        cell: {
          outline: 'none !important',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: '10000',
          padding: theme.spacing(3, 6),
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundImage: 'none',
        },
      },
    },
    MuiIconButton: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          transition: 'none',
          '&.table-button': {
            border: '1px solid',
            borderRadius: 2,
            padding: theme.spacing(1, 3),
            '&:disabled': {
              color: theme.palette.error.dark,
            },
          },
        },
      },
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
