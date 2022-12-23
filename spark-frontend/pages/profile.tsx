import Head from 'next/head';
import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/router';
import profileStyle from '../styles/profile.module.css';
import Layout from '../components/layout';
import Image from 'next/image';

export default function Profile() {
    const router = useRouter();
    const [error, setError] = useState<string>("");
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
            <div className={profileStyle["profile-container"]}>
                <div className={profileStyle["profile-info"]}>
                    {error && <span>{error}</span>}
                    <div>Name: {currentUser.displayName}</div>
                    <div>Email: {currentUser.email}</div>
                    <div>Phone: </div>
                    <div>About: </div>
                    <div className={profileStyle["function-buttons"]}>
                        <Link href="/update-profile" className="">
                            Update Profile
                        </Link>
                        <button onClick={handleLogout}>Log Out</button>
                    </div>
                </div>
                <div className={profileStyle["profile-image"]}>
                    <Image 
                        // src={currentUser.imageURL} 
                        src={""}
                        alt="" 
                        width={400}
                        height={400}
                        objectFit='cover'
                    />
                </div>
            </div>
        </div>
      </Layout>
  )
}
