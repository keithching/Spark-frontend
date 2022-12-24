import Head from 'next/head';
import React, { useEffect, useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/router';
import profileStyle from '../styles/profile.module.css';
import Layout from '../components/layout';
import Image from 'next/image';

export default function Profile() {
    const router = useRouter();
    const [error, setError] = useState<string>("");
    const { currentUser, logout, updatePhotoURL } = useAuth();
    const profileImageRef = useRef(null);

    async function handleLogout() {
        setError('');
        try {
            await logout();
            router.push("/login");
        } catch {
            setError('Failed to log out');
        }
    }

    const [photoURL, setPhotoURL] = useState<string>("");
    // useEffect(() => {
    //     if (currentUser.photoURL) {
    //         console.log(currentUser.photoURL);
    //         setPhotoURL(currentUser.photoURL);
    //     }
    // }, [currentUser]);

    const [isHover, setIsHover] = useState<boolean>(false);
    const [isClick, setIsClick] = useState<boolean>(false);

    const handleProfilePhotoMouseOver = () => {
        setIsHover(true);
        profileImageRef.current.classList.add(`${profileStyle["profile-image-hover"]}`);
    }

    const handleProfilePhotoMouseOut = () => {
        setIsHover(false);
        profileImageRef.current.classList.remove(`${profileStyle["profile-image-hover"]}`);
    }

    const handleProfilePhotoClick = () => {
        setIsClick(true);
    }

    useEffect(() => {
        if (isClick) {
            console.log('fish!!');
            setIsClick(false);
        }
    }, [isClick]);

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
                <div 
                    className={profileStyle["profile-image"]}
                    onMouseOver={handleProfilePhotoMouseOver}
                    onMouseOut={handleProfilePhotoMouseOut}
                    onClick={handleProfilePhotoClick}
                    ref={profileImageRef}
                >
                    {isHover ? 
                        <div className={profileStyle["profile-image-upload-text"]}>upload</div>
                        : null
                    }
                    <Image 
                        src={photoURL}
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
