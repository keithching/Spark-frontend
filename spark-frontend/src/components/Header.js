import { useState } from 'react';
import '../styles/Header.css';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const VIEW = '[TOP SECRET] Highest previledge admin dashboard';
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
                {currentUser ? currentUser.email : "not yet sign in"}
                {currentUser ? 
                    <button onClick={handleLogout}>Log Out</button>
                    :
                    <>
                        <button><Link to="/login">Log In</Link></button>
                        <button><Link to="/signup">Sign Up</Link></button>
                    </>
                }
            </div>
        </div>
    );
}

export default Header;