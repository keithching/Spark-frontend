import { useState } from 'react';
import '../styles/Header.css';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    // to implement:
    // view for event provider
    // view for user
    // a state for controlling views

    const [error, setError] = useState("");
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    async function handleLogout() {
        setError('');
        try {
            await logout();
            navigate('/');
        } catch {
            setError('Failed to log out');
        }
    }

    return (
        <div className="Header">
            <Link className="brand" to="/">Spark</Link>
            <div className="nav-utilities">
                {error && <span>{error}</span>}
                {currentUser ? currentUser.email : "こんにちは！"}
                {currentUser ? 
                    <>
                        <button><Link to="/dashboard">Dashboard</Link></button>
                        <button><Link to="/profile">Profile</Link></button>
                        <button onClick={handleLogout}>Log Out</button>
                    </>
                    :
                    <>
                        <button id="login-btn"><Link to="/login">Log In</Link></button>
                        <button id="signup-btn"><Link to="/signup">Sign Up</Link></button>
                    </>
                }
            </div>
        </div>
    );
}

export default Header;