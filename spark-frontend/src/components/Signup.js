import React, { useRef, useState } from 'react';
import '../styles/Signup.css';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { getEventProviders, createEventProvider } from '../utils/helper';

export default function Signup() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const nameRef = useRef();
    const { signup, updateDisplayName } = useAuth();
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

        try {
            setError('');
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value);

            await updateDisplayName(nameRef.current.value);

            // push this event provider data to the server database
            await createEventProvider({
                name: nameRef.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value
            });

            navigate('/dashboard');
        } catch(err) {
            console.error(err);
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
                <label htmlFor="nameInput">Name</label>
                <input type="text" ref={nameRef} id="nameInput" required autoComplete="off" />
                <label htmlFor="emailInput">Email</label>
                <input type="text" ref={emailRef} id="emailInput" required autoComplete="off" />
                <label htmlFor="passwordInput">Password</label>
                <input type="password" ref={passwordRef} id="passwordInput" required />
                <label htmlFor="passwordConfirmInput">Password Confirmation</label>
                <input type="password" ref={passwordConfirmRef} id="passwordConfirmInput" required />
                <button disabled={loading} type="submit">Sign Up</button>
            </form>
        </div>
        <div>
            Already have an account? <Link to="/login">Log In</Link>
        </div>
    </div>
  )
}
