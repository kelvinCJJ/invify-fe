import Layout from "@/components/Layout";
import { ContextProvider } from "@/contexts/ContextProvider";
import "@/styles/globals.css";
import { theme2 } from "@/theme";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(
    <ThemeProvider theme={theme2}>
      <ContextProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <CssBaseline />
          <Component {...pageProps} />
        </LocalizationProvider>
      </ContextProvider>
    </ThemeProvider>
  );

}
