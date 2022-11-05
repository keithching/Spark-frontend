import Head from 'next/head';
import React, { useEffect, useRef, useState } from 'react';
import signupStyles from '../styles/signup.module.css';
import { useAuth } from '../contexts/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../components/layout';

export default function Login() {
    const router = useRouter();
    // https://www.robinwieruch.de/typescript-react-useref/
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const { login } = useAuth();
    const [ error, setError ] = useState<string>('');
    const [ loading, setLoading ] = useState<boolean>(false);

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

    // show password field if email is a valid email format
    const [email, setEmail] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    useEffect(() => {
     if (email !== "" && emailRef.current.validity.valid) {
        setIsPasswordVisible(true);
     } 
    //  else setIsPasswordVisible(false);
    }, [email]);
    const [password, setPassword] = useState("");
    const [isLoginButtonVisible, setIsLoginButtonVisible] = useState(false);
    useEffect(() => {
        if (password !== "" && email !== "") {
           setIsLoginButtonVisible(true);
        } 
        // else setIsLoginButtonVisible(false);
       }, [password, email]);

    const handleEmailInputChange = () => {
        setEmail(emailRef.current.value);
    }

    return (
        <Layout>
            <Head>
                <title>Login</title>
            </Head>
            <div className={signupStyles["signup-container"]}>
                <div className={signupStyles["signup-card"]}>
                    <h2 className={signupStyles["signup-title"]}>Log In</h2>
                    {error && <span>{error}</span>}
                    <form action="" className={signupStyles["signup-form"]} onSubmit={handleSubmit}>
                        {/* <label htmlFor="emailInput">Email</label> */}
                        <input 
                            type="email" 
                            required
                            ref={emailRef} 
                            id="emailInput" autoComplete="off" autoFocus={true}
                            onBlur={({ target }) => {
                                if (!isPasswordVisible) target.focus()
                            }}
                            placeholder="email"
                            onChange={handleEmailInputChange}
                            value={email}
                        />
                        {/* <label htmlFor="passwordInput">Password</label> */}
                        <input type="password" ref={passwordRef} 
                            id="passwordInput" 
                            placeholder="password"
                            style={!isPasswordVisible ? {display: 'none'} : {display: 'block'}}
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        /> 
                        {/* TODO: show login button if email and password is legit    */}
                        <button 
                            disabled={loading} type="submit"
                            style={!isLoginButtonVisible ? {display: 'none'} : {display: 'block'}}
                        >Log In</button>
                    </form>
                    <div className={signupStyles["forget-password-link"]}>
                        <Link href="/forgot-password">Fogot Password?</Link>
                    </div>
                </div>
                <div className={signupStyles["sign-up-link"]}>
                    Need an account? <Link href="/signup">Sign Up</Link>
                </div>
            </div>
        </Layout>
  )
}
