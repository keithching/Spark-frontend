import React, { useRef, useState } from 'react';
import '../styles/Signup.css';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const [ error, setError ] = useState('');
    const [ loading, setLoading ] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError('');
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            navigate('/dashboard');
        } catch {
            setError('Failed to sign in');
        }

        setLoading(false);
    }

    return (
    <div className="signup-container">
        <div className="signup-card">
            <h2>Log In</h2>
            {error && <span>{error}</span>}
            <form action="" className="signup-form" onSubmit={handleSubmit}>
                <label htmlFor="emailInput">Email</label>
                <input type="text" ref={emailRef} id="emailInput" autoComplete="off" />
                <label htmlFor="passwordInput">Password</label>
                <input type="password" ref={passwordRef} id="passwordInput" />    
                <button disabled={loading} type="submit">Log In</button>
            </form>
            <Link to="/forgot-password">Fogot Password?</Link>
        </div>
        <div>
            Need an account? <Link to="/signup">Sign Up</Link>
        </div>
    </div>
  )
}
