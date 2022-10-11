import Head from 'next/head';
import React, { useRef, useState } from 'react';
import signupStyles from '../styles/signup.module.css';
import { useAuth } from '../contexts/AuthContext';
// import { Link } from 'react-router-dom';
import Link from 'next/link';
import Layout from '../components/layout';

export default function ForgotPassword() {
    const emailRef = useRef();
    const { resetPassword } = useAuth();
    const [ error, setError ] = useState('');
    const [message, setMessage] = useState('');
    const [ loading, setLoading ] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setMessage('')
            setError('');
            setLoading(true);
            await resetPassword(emailRef.current.value);
            setMessage('Check your inbox for further instructions')
        } catch {
            setError('Failed to reset password');
        }

        setLoading(false);
    }

    return (
        <Layout>
            <Head>
                <title>Forgot Password</title>
            </Head>
            <div className={signupStyles.signup-container}>
                <div className={signupStyles.signup-card}>
                    <h2>Password Reset</h2>
                    {error && <span>{error}</span>}
                    {message && <span>{message}</span>}
                    <form action="" className={signupStyles.signup-form} onSubmit={handleSubmit}>
                        <label htmlFor="emailInput">Email</label>
                        <input type="text" ref={emailRef} id="emailInput" />
                        <button disabled={loading} type="submit">Reset Password</button>
                    </form>
                    <Link href="/login">Login</Link>
                </div>
                <div>
                    Need an account? <Link href="/signup">Sign Up</Link>
                </div>
            </div>
        </Layout>
  )
}
