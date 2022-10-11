import Head from 'next/head';
import React, { useRef, useState } from 'react';
import signupStyles from '../styles/signup.module.css';
import { useAuth } from '../contexts/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../components/layout';

export default function Login() {
    const router = useRouter();
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const [ error, setError ] = useState('');
    const [ loading, setLoading ] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError('');
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            router.push('/dashboard');
        } catch {
            setError('Failed to sign in');
        }

        setLoading(false);
    }

    return (
        <Layout>
            <Head>
                <title>Login</title>
            </Head>
            <div className={signupStyles["signup-container"]}>
                <div className={signupStyles["signup-card"]}>
                    <h2>Log In</h2>
                    {error && <span>{error}</span>}
                    <form action="" className={signupStyles["signup-form"]} onSubmit={handleSubmit}>
                        <label htmlFor="emailInput">Email</label>
                        <input type="text" ref={emailRef} id="emailInput" autoComplete="off" />
                        <label htmlFor="passwordInput">Password</label>
                        <input type="password" ref={passwordRef} id="passwordInput" />    
                        <button disabled={loading} type="submit">Log In</button>
                    </form>
                    <Link href="/forgot-password">Fogot Password?</Link>
                </div>
                <div>
                    Need an account? <Link href="/signup">Sign Up</Link>
                </div>
            </div>
        </Layout>
  )
}
