import Head from 'next/head';
import React, { useRef, useState } from 'react';
import updateProfileStyles from '../styles/updateProfile.module.css';
import { useAuth } from '../contexts/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getEventProviders, updateEventProviderByEmail } from '../utils/helper';
import Layout from '../components/layout';

export default function UpdateProfile() {
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const passwordConfirmRef = useRef<HTMLInputElement>(null);
    const { currentUser, updatePassword, updateEmail, updateDisplayName } = useAuth();
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

        const promises = [];
        setLoading(true);
        setError('');

        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value));
        }
        if (passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value));
        }

        if (nameRef.current.value !== currentUser.displayName) {
            promises.push(updateDisplayName(nameRef.current.value));
        }

        if (nameRef.current.value !== currentUser.displayName || emailRef.current.value !== currentUser.email || passwordRef.current.value) {
            promises.push(updateEventProviderByEmail(emailRef.current.value, {
                name: nameRef.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value
            }));
        }

        Promise.all(promises).then(() => {
            router.push('/dashboard');
        }).catch(() => {
            setError('Failed to update account');
        }).finally(() => {
            setLoading(false);
        })

        setLoading(false);
    }

    return (
        <Layout>
            <Head>
                <title>Update Profile</title>
            </Head>
            <div className={updateProfileStyles["update-profile-container"]}>
                <div className={updateProfileStyles["update-profile-card"]}>
                    <h2>Update Profile</h2>
                    {error && <span>{error}</span>}
                    <form action="" className={updateProfileStyles["update-profile-form"]} 
                    onSubmit={handleSubmit}
                    >
                        <label htmlFor="nameInput">Name</label>
                        <input type="text" ref={nameRef} id="nameInput" 
                            required defaultValue={currentUser.displayName}/>
                        <label htmlFor="emailInput">Email</label>
                        <input type="text" ref={emailRef} id="emailInput" 
                            required defaultValue={currentUser.email}/>
                        <label htmlFor="passwordInput">Password</label>
                        <input type="password" ref={passwordRef} id="passwordInput" 
                            placeholder="Leave blank to keep the same" />
                        <label htmlFor="passwordConfirmInput">Password Confirmation</label>
                        <input type="password" ref={passwordConfirmRef} id="passwordConfirmInput" 
                            placeholder="Leave blank to keep the same" />
                        <button disabled={loading} type="submit">Update</button>
                    </form>
                </div>
                <div>
                    <Link href="/profile">Cancel</Link>
                </div>
            </div>
        </Layout>
  )
}
