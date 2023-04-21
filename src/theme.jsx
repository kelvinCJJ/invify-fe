import { createTheme } from "@mui/material";

// colors
// export const colors = () => ({
//         primary: {
//           100: "#d2d8dc",
//           200: "#a6b1b9",
//           300: "#798a95",
//           400: "#4d6372",
//           500: "#203c4f",
//           600: "#1a303f",
//           700: "#13242f",
//           800: "#0d1820",
//           900: "#060c10",
//         },
//         white: {
//           100: "#f9f9f8",
//           200: "#f2f3f0",
//           300: "#ecede9",
//           400: "#e5e7e1",
//           500: "#dfe1da",
//           600: "#b2b4ae",
//           700: "#868783",
//           800: "#595a57",
//           900: "#2d2d2c",
//         },
//         gray: {
//           100: "#e4ecf3",
//           200: "#c9d8e6",
//           300: "#afc5da",
//           400: "#94b1cd",
//           500: "#799ec1",
//           600: "#617e9a",
//           700: "#495f74",
//           800: "#303f4d",
//           900: "#182027",
//         },
//         indigo: {
//           100: "#e2e7ec",
//           200: "#c6ceda",
//           300: "#a9b6c7",
//           400: "#8d9db5",
//           500: "#7085a2",
//           600: "#5a6a82",
//           700: "#435061",
//           800: "#2d3541",
//           900: "#161b20",
//         },
//         black: {
//           100: "#d2d4d6",
//           200: "#a6a8ac",
//           300: "#797d83",
//           400: "#4d5159",
//           500: "#202630",
//           600: "#1a1e26",
//           700: "#13171d",
//           800: "#0d0f13",
//           900: "#06080a",
//         },
// });


export const theme2 = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
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
