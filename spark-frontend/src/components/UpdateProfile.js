import React, { useRef, useState } from 'react';
import '../styles/UpdateProfile.css';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { getEventProviders, updateEventProviderByEmail } from '../utils/helper';

export default function UpdateProfile() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { currentUser, updatePassword, updateEmail, updateDisplayName } = useAuth();
    const [ error, setError ] = useState('');
    const [ loading, setLoading ] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        // check uniqueness of user input name
        const eventProviderNames = (await getEventProviders()).map(provider => provider.name);
        
        if (eventProviderNames.includes(nameRef.current.value)) {
            return setError('Name is already taken');
        }

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

        if (nameRef.current.value !== currentUser.displayName) {
            promises.push(updateDisplayName(nameRef.current.value));
        }

        if (nameRef.current.value !== currentUser.displayName || emailRef.current.value !== currentUser.email || passwordRef.current.value) {
            promises.push(updateEventProviderByEmail(emailRef.current.value, {
                name: nameRef.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value
            }));
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
    <div className="update-profile-container">
        <div className="update-profile-card">
            <h2>Update Profile</h2>
            {error && <span>{error}</span>}
            <form action="" className="update-profile-form" 
            onSubmit={handleSubmit}
            >
                <label htmlFor="nameInput">Name</label>
                <input type="text" ref={nameRef} id="nameInput" 
                    required defaultValue={currentUser.displayName}/>
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
            <Link to="/profile">Cancel</Link>
        </div>
    </div>
  )
}
