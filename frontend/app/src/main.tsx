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
      main: '#3a4856'
    },
    text: {
      primary: '#f4f4f4'
    }
  },
  typography: {
    h1: {
      fontFamily: 'Montserrat Variable, sans-serif',
      fontWeight: 500,
      fontSize: '2rem'
    },
    h2: {
      fontFamily: 'Montserrat Variable, sans-serif',
      fontWeight: 500,
      fontSize: '1.6rem'
    },
    subtitle1: {
      fontFamily: 'Kalam, cursive',
      fontWeight: 400,
      fontSize: '1.4rem'
    },
    body1: {
      fontFamily: 'Montserrat Variable, sans-serif',
      fontWeight: 400,
      fontSize: '1.2rem'
    },
    body2: {
      fontFamily: 'Montserrat Variable, sans-serif',
      fontWeight: 400,
      fontSize: '0.9rem'
    }
  }
});

theme = createTheme(theme, {
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        img: {
          maxHeight: '100%',
          maxWidth: '100%'
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: 'inherit',
          '&:hover': {
            color: 'inherit'
          }
        }
      }
    },
    MuiLink: {
      styleOverrides: {
        root: {
          '&:hover': {
            color: '#9eadbd'
          }
        }
      }
    },
    MuiList: {
      styleOverrides: {
        root: {
          '&.main-nav > li:last-child': {
            color: '#bca5af'
          }
        }
      }
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          padding: '0 !important'
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: 'none'
        }
      }
    }
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
