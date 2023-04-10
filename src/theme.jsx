import { createContext, useState, useMemo } from "react";
import { IconButton, createTheme } from "@mui/material";

// colors
export const colors = (mode) => ({
  ...(mode === "dark"
    ? {
        primary: {
          100: "#d2d8dc",
          200: "#a6b1b9",
          300: "#798a95",
          400: "#4d6372",
          500: "#203c4f",
          600: "#1a303f",
          700: "#13242f",
          800: "#0d1820",
          900: "#060c10",
        },
        white: {
          100: "#f9f9f8",
          200: "#f2f3f0",
          300: "#ecede9",
          400: "#e5e7e1",
          500: "#dfe1da",
          600: "#b2b4ae",
          700: "#868783",
          800: "#595a57",
          900: "#2d2d2c",
        },
        gray: {
          100: "#e4ecf3",
          200: "#c9d8e6",
          300: "#afc5da",
          400: "#94b1cd",
          500: "#799ec1",
          600: "#617e9a",
          700: "#495f74",
          800: "#303f4d",
          900: "#182027",
        },
        indigo: {
          100: "#e2e7ec",
          200: "#c6ceda",
          300: "#a9b6c7",
          400: "#8d9db5",
          500: "#7085a2",
          600: "#5a6a82",
          700: "#435061",
          800: "#2d3541",
          900: "#161b20",
        },
        black: {
          100: "#d2d4d6",
          200: "#a6a8ac",
          300: "#797d83",
          400: "#4d5159",
          500: "#202630",
          600: "#1a1e26",
          700: "#13171d",
          800: "#0d0f13",
          900: "#06080a",
        },
      }
    : {
        primary: {
          100: "#060c10",
          200: "#0d1820",
          300: "#13242f",
          400: "#1a303f",
          500: "#203c4f",
          600: "#4d6372",
          700: "#798a95",
          800: "#a6b1b9",
          900: "#d2d8dc",
        },
        white: {
          100: "#2d2d2c",
          200: "#595a57",
          300: "#868783",
          400: "#b2b4ae",
          500: "#dfe1da",
          600: "#e5e7e1",
          700: "#ecede9",
          800: "#f2f3f0",
          900: "#f9f9f8",
        },
        gray: {
          100: "#182027",
          200: "#303f4d",
          300: "#495f74",
          400: "#617e9a",
          500: "#799ec1",
          600: "#94b1cd",
          700: "#afc5da",
          800: "#c9d8e6",
          900: "#e4ecf3",
        },
        indigo: {
          100: "#161b20",
          200: "#2d3541",
          300: "#435061",
          400: "#5a6a82",
          500: "#7085a2",
          600: "#8d9db5",
          700: "#a9b6c7",
          800: "#c6ceda",
          900: "#e2e7ec",
        },
        black: {
          100: "#06080a",
          200: "#0d0f13",
          300: "#13171d",
          400: "#1a1e26",
          500: "#202630",
          600: "#4d5159",
          700: "#797d83",
          800: "#a6a8ac",
          900: "#d2d4d6",
        },
      }),
});

// mui theme settings
export const themeSettings = (mode) => {
  const colors = tokens(mode);

  return {
    palette: {
      mode,
      primary: {
        main: colors.primary[500],
        light: colors.primary[100],
        dark: colors.primary[900],
      },
      secondary: {
        main: colors.indigo[500],
        light: colors.indigo[100],
        dark: colors.indigo[900],
      },
      background: {
        default: colors.white[500],
        paper: colors.white[500],
      },
      text: {
        primary: colors.black[500],
        secondary: colors.gray[500],
      },
    },
    typography: {
      fontFamily: "Inter, sans-serif",
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
  };
};

//context for color mode
export const ColorModeContext = createContext({
    toggleColorMode: () => {},
    colorMode: "dark",
});

export const useMode = () => {
  const [colorMode, setColorMode] = useState("dark");

  const toggleColorMode = () => {
    setColorMode((prevMode) => (prevMode === "dark" ? "light" : "dark"));
  };

  const theme = useMemo(() => createTheme(themeSettings(colorMode)), [
    colorMode,
  ]);

  return { theme, colorMode };
}


