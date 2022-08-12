import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Profile.css';

export default function Profile() {
    const [error, setError] = useState("");
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    async function handleLogout() {
        setError('');
        try {
            await logout();
            navigate('/login');
        } catch {
            setError('Failed to log out');
        }
    }

  return (
    <div className='profile'>
        <h1>Dashboard Page</h1>
        <div>Profile</div>
        {error && <span>{error}</span>}
        Email: {currentUser.email}
        <Link to="/update-profile" className="">
            Update Profile
        </Link>
        <button onClick={handleLogout}>Log Out</button>
    </div>
  )
}