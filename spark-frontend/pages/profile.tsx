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
    const photoRef = useRef<HTMLInputElement>(null);

    const ProfileImage = () => {
        // [Refactor] same code block from Modal.tsx
        
        const imageUploadTextRef = useRef(null);
        // no component rendering will be triggered with useRef
        const isClick = useRef(false);
        const isHover = useRef(false);
        const handleProfilePhotoMouseOver = () => {
            if (photoURL == '') {
                isHover.current = true;
                imageUploadTextRef.current.classList.add(`${profileStyle["show"]}`);
                profileImageRef.current.classList.add(`${profileStyle["profile-image-hover"]}`);
            }
        }

        const handleProfilePhotoMouseOut = () => {
            isHover.current = false;
            imageUploadTextRef.current.classList.remove(`${profileStyle["show"]}`);
            profileImageRef.current.classList.remove(`${profileStyle["profile-image-hover"]}`);
        }

        const handleProfilePhotoClick = () => {
            if (photoURL == '') {
                isClick.current = true;
                photoRef.current.click();
            }
        }

        const PhotoInput = () => {
            const [ photoFile, setPhotoFile ] = useState<any>(null);

            const handlePhotoInputChange = (e) => {
                // event cancelling
                if (e.target.value.length === 0) {
                    return;
                }
                let reader = new FileReader();
                reader.readAsDataURL(photoRef.current.files[0]);
                setPhotoFile(photoRef.current.files[0]);

                reader.onload = readerEvent => {
                    setPhotoURL(readerEvent.target.result);
                }
            };

            return (
                <div className={profileStyle["profile-image-upload-input"]}>
                    <input
                        style={{visibility: "hidden"}}
                        type="file" 
                        name="photoInput" 
                        id="photoInput" 
                        ref={photoRef}
                        onChange={handlePhotoInputChange}
                    />
                </div>
            );
        }

        return (
            <div className={profileStyle["profile-image-container"]}>
                <div 
                    className={profileStyle["profile-image"]}
                    onMouseOver={handleProfilePhotoMouseOver}
                    onMouseOut={handleProfilePhotoMouseOut}
                    onClick={handleProfilePhotoClick}
                    ref={profileImageRef}
                >
                    <div
                        ref={imageUploadTextRef}
                        className={profileStyle["profile-image-upload-text"]}
                    >UPLOAD</div>
                    <PhotoInput />
                    {
                        photoURL?
                        <Image 
                            src={photoURL}
                            alt="" 
                            width={400}
                            height={400}
                            objectFit='cover'
                        />
                        : null
                    }
                </div>
                {photoURL !== '' ? 
                    <div className={profileStyle["update-operation-buttons"]}>
                        <button className={profileStyle["update-button"]} onClick={handleUpdateClick}>update</button>
                        <button className={profileStyle["cancel-button"]} onClick={handleCancelClick}>cancel</button>
                    </div>
                    :
                    null
                }
            </div>
        );
    }

    const handleUpdateClick = () => {
        // TODO
        console.log('to implement profile image upload to Cloud Storage');
    }

    const handleCancelClick = () => {
        setPhotoURL('');
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
                    <div className={profileStyle["profile-info-name"]}>{currentUser.displayName}</div>
                    <div className={profileStyle["profile-info-email"]}>Email: {currentUser.email}</div>
                    <div className={profileStyle["profile-info-phone"]}>Phone: </div>
                    <div className={profileStyle["profile-info-about"]}>About: </div>
                    <div className={profileStyle["function-buttons"]}>
                        <button className={profileStyle["update-profile-button"]}>
                            <Link href="/update-profile">
                                Update Profile
                            </Link>
                        </button>
                        <button className={profileStyle["logout-button"]} onClick={handleLogout}>Log Out</button>
                    </div>

                </div>
                <ProfileImage />
            </div>
        </div>
      </Layout>
  )
}
