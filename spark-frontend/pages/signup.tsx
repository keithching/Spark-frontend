import Head from 'next/head';
import React, { useRef, useState } from 'react';
import signupStyles from '../styles/signup.module.css';
import { useAuth } from '../contexts/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getEventProviders, createEventProvider } from '../utils/helper';
import Layout from '../components/layout';

export default function Signup() {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const passwordConfirmRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    const { signup, updateDisplayName } = useAuth();
    const [ error, setError ] = useState<string>('');
    const [ loading, setLoading ] = useState<boolean>(false);
    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();

        // check uniqueness of user input name
        const eventProviderNames = (await getEventProviders()).map(provider => provider.name);
        
        if (eventProviderNames.includes(nameRef.current.value)) {
            return setError('Name is already taken');
        }

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Password do not match');
        }

        try {
            setError('');
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value);

            await updateDisplayName(nameRef.current.value);

            // push this event provider data to the server database
            await createEventProvider({
                name: nameRef.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value // to refactor. take away password field from database. use firebase auth entirely instead
            });

            router.push('/dashboard');
        } catch(err) {
            console.error(err);
            setError('Failed to create an account');
        }

        setLoading(false);
    }

    return (
        <Layout>
            <Head>
                <title>Signup</title>
            </Head>
            <div className={signupStyles["signup-container"]}>
                <div className={signupStyles["signup-card"]}>
                    <h2 className={signupStyles["signup-title"]}>Sign Up</h2>
                    {error && <span>{error}</span>}
                    <form action="" className={signupStyles["signup-form"]} onSubmit={handleSubmit}>
                        {/* <label htmlFor="nameInput">Name</label> */}
                        <input 
                            type="text" 
                            ref={nameRef} 
                            id="nameInput" 
                            required autoComplete="off" 
                            placeholder='name'
                        />
                        {/* <label htmlFor="emailInput">Email</label> */}
                        <input 
                            type="email" ref={emailRef} 
                            id="emailInput" required autoComplete="off" 
                            placeholder='email'
                        />
                        {/* <label htmlFor="passwordInput">Password</label> */}
                        <input 
                            type="password" ref={passwordRef} 
                            id="passwordInput" required 
                            placeholder='password'    
                        />
                        {/* <label htmlFor="passwordConfirmInput">Password Confirmation</label> */}
                        <input 
                            type="password" ref={passwordConfirmRef} 
                            id="passwordConfirmInput" required 
                            placeholder='password again'
                        />
                        <button disabled={loading} type="submit">Sign Up</button>
                    </form>
                </div>
                <div className={signupStyles["sign-up-link"]}>
                    Already have an account? <Link href="/login">Log In</Link>
                </div>
            </div>
        </Layout>
  )
}
