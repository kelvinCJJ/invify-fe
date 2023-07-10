import { createTheme } from "@mui/material";

export const theme2 = createTheme({
  
  status: {
    danger: '#e53e3e',
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#244553',
      contrastText: '#fff',
    },
    info: {
      main:'#202630',
      contrastText:'#fff'
    },
    success: {
      main: '#408f51',
      contrastText: '#fff',
    },
    warning: {
      main: '#bd7f19',
      contrastText: '#fff',
    },
    error: {
      main: '#f44336',
      contrastText: '#fff',
    },
    light: {
      main: '#DFE1DA',
      contrastText: '#fff',
    },
    dark: {
      main: '#202630',
      contrastText: '#fff',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: 16,
    h1: {
      fontSize: 40,
    },
    h2: {
      fontSize: 32,
    },
    h3: {
      fontSize: 24,
    },
    h4: {
      fontSize: 20,
    },
    h5: {
      fontSize: 16,
    },
    h6: {
      fontSize: 14,
    },
  },
});

// mui theme settings
const theme = createTheme({
  palette: {
    white: {
      main: "#ffffff",
    },
  },
  
});
