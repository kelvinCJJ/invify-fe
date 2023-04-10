import Layout from "@/components/Layout";
import { ContextProvider } from "@/contexts/ContextProvider";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(
  <ContextProvider>
  <Component {...pageProps} />
  </ContextProvider>)
}
