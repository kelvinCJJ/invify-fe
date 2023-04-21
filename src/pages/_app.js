import Layout from "@/components/Layout";
import { ContextProvider } from "@/contexts/ContextProvider";
import "@/styles/globals.css";
import { theme2 } from "@/theme";
import { ThemeProvider } from "@emotion/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(
      <ContextProvider>
        <ThemeProvider theme={theme2}>
        <Component {...pageProps} />
        </ThemeProvider>
      </ContextProvider>
  );

}
