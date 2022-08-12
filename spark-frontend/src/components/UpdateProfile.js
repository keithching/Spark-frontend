import React, { useRef, useState } from 'react';
import '../styles/Signup.css';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function UpdateProfile() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { currentUser, updatePassword, updateEmail } = useAuth();
    const [ error, setError ] = useState('');
    const [ loading, setLoading ] = useState(false);
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Password do not match');
        }

        const promises = [];
        setLoading(true);
        setError('');

        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value));
        }
        if (passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value));
        }

        Promise.all(promises).then(() => {
            navigate('/dashboard');
        }).catch(() => {
            setError('Failed to update account');
        }).finally(() => {
            setLoading(false);
        })

        setLoading(false);
    }

    return (
    <div className="signup-container">
        <div className="signup-card">
            <h2>Update Profile</h2>
            {error && <span>{error}</span>}
            <form action="" className="signup-form" 
            onSubmit={handleSubmit}
            >
                <label htmlFor="emailInput">Email</label>
                <input type="text" ref={emailRef} id="emailInput" 
                    required defaultValue={currentUser.email}/>
                <label htmlFor="passwordInput">Password</label>
                <input type="password" ref={passwordRef} id="passwordInput" 
                    placeholder="Leave blank to keep the same" />
                <label htmlFor="passwordConfirmInput">Password Confirmation</label>
                <input type="password" ref={passwordConfirmRef} id="passwordConfirmInput" 
                    placeholder="Leave blank to keep the same" />
                <button disabled={loading} type="submit">Update</button>
            </form>
        </div>
        <div>
            <Link to="/">Cancel</Link>
        </div>
    </div>
  )
}
