import { useState } from 'react';
import headerStyles from '../styles/header.module.css';
import { useAuth } from '../contexts/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/router';

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
            <Link className={headerStyles.brand} href="/">Spark</Link>
            <div className={headerStyles["nav-utilities"]}>
                {!isLoading && 
                <>
                    {error && <span>{error}</span>}
                    {currentUser ?  `👋 ${currentUser.displayName}` : "こんにちは！"}
                    {currentUser ? 
                        <>
                            <button><Link href="/dashboard">Dashboard</Link></button>
                            <button><Link href="/profile">Profile</Link></button>
                            <button onClick={handleLogout}>Log Out</button>
                        </>
                        :
                        <>
                            <button id="login-btn"><Link href="/login">Log In</Link></button>
                            <button id="signup-btn"><Link href="/signup">Sign Up</Link></button>
                        </>
                    }
                </>
                }
            </div>
        </div>
    );
}

export default Header;