// https://www.bundleapps.io/blog/nextjs-context-api-tutorial
import { AuthProvider } from "../contexts/AuthContext";
import { ThemeProvider } from "../contexts/ThemeContext";
import "../styles/global.css";
import Head from "next/head";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import PrivateRoute from "../components/PrivateRoute";

// https://nextjs.org/docs/advanced-features/custom-app
export default function App({ Component, pageProps }: AppProps) {
  // https://theodorusclarence.com/blog/nextjs-redirect-no-flashing
  // Add your protected routes here
  const protectedRoutes = ["/dashboard", "/profile", "/update-profile"];

  return (
    <AuthProvider>
      <ThemeProvider>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <PrivateRoute protectedRoutes={protectedRoutes}>
          <Component {...pageProps} />
        </PrivateRoute>
      </ThemeProvider>
    </AuthProvider>
  );
}
