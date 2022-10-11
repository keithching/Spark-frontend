// https://www.bundleapps.io/blog/nextjs-context-api-tutorial
import { AuthProvider } from '../contexts/AuthContext';
import '../styles/global.css';
import Head from 'next/head';

// https://nextjs.org/docs/advanced-features/custom-app
export default function App({ Component, pageProps }) {
    return (
        <AuthProvider>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Component {...pageProps} />
        </AuthProvider>
    );
}