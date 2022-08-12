import React, { useRef, useState } from 'react';
import '../styles/Signup.css';
import { useAuth } from '../contexts/AuthContext';

export default function Signup() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup } = useAuth();
    const [ error, setError ] = useState('');
    const [ loading, setLoading ] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Password do not match');
        }

        try {
            setError('');
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value);
        } catch {
            setError('Failed to create an account');
        }

        setLoading(false);
    }

    return (
    <div className="signup-container">
        <div className="signup-card">
            <h2>Sign Up</h2>
            {error && <span>{error}</span>}
            <form action="" className="signup-form" onSubmit={handleSubmit}>
                <label htmlFor="emailInput">Email</label>
                <input type="text" ref={emailRef} id="emailInput" />
                <label htmlFor="passwordInput">Password</label>
                <input type="password" ref={passwordRef} id="passwordInput" />
                <label htmlFor="passwordConfirmInput">Password Confirmation</label>
                <input type="password" ref={passwordConfirmRef} id="passwordConfirmInput" />
                <button disabled={loading} type="submit">Sign Up</button>
            </form>
        </div>
        <div>
            Already have an account? Log In
        </div>
    </div>
  )
}
