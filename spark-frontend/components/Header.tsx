import { useState } from 'react';
import headerStyles from '../styles/header.module.css';
import { useAuth } from '../contexts/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';

const Header = () => {
    const router = useRouter();

    // to implement:
    // view for event provider
    // view for user
    // a state for controlling views

    const [error, setError] = useState<string>("");
    const { isLoading, currentUser, logout } = useAuth();

    async function handleLogout() {
        setError('');
        try {
            await logout();
            router.push('/');
        } catch {
            setError('Failed to log out');
        }
    }

    return (
        <div className={headerStyles.Header}>
            <nav className={headerStyles.brand}>
                <Link href="/">Spark</Link>
            </nav>
            <div className={headerStyles["nav-utilities"]}>
                {!isLoading && 
                <>
                    {error && <span>{error}</span>}
                    {currentUser ?  
                        <div className={headerStyles["user-greeting"]}>
                            <div className={headerStyles["profile-image"]}>
                                <Image 
                                    src={currentUser.photoURL}
                                    alt="" 
                                    width={30}
                                    height={30}
                                    objectFit='cover'
                                />
                            </div>
                            <span>{currentUser.displayName}</span>
                        </div>
                        : "こんにちは！"
                    }
                    {currentUser ? 
                        <>
                            <button><Link href="/dashboard">Dashboard</Link></button>
                            <button><Link href="/profile">Profile</Link></button>
                            <button onClick={handleLogout}>Log Out</button>
                        </>
                        :
                        <>
                            <button className={headerStyles["login-btn"]}><Link href="/login">Log In</Link></button>
                            <button className={headerStyles["signup-btn"]}><Link href="/signup">Sign Up</Link></button>
                        </>
                    }
                </>
                }
            </div>
        </div>
    );
}

export default Header;