import Head from 'next/head';
import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/router';
import profileStyle from '../styles/profile.module.css';
import Layout from '../components/layout';

export default function Profile() {
    const router = useRouter();
    const [error, setError] = useState("");
    const { currentUser, logout } = useAuth();

    async function handleLogout() {
        setError('');
        try {
            await logout();
            router.push("/login");
        } catch {
            setError('Failed to log out');
        }
    }

  return (
      <Layout>
        <Head>
            <title>Profile Page</title>
        </Head>
        <div className={profileStyle.profile}>
            <h1>Profile Page</h1>
            <div>Profile</div>
            {error && <span>{error}</span>}
            <div>Email: {currentUser.email}</div>
            <div>name: {currentUser.displayName}</div>
            <Link href="/update-profile" className="">
                Update Profile
            </Link>
            <button onClick={handleLogout}>Log Out</button>
        </div>
      </Layout>
  )
}
