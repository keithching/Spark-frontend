import React, { useContext, useState, useEffect } from 'react'
// import { getAuth } from "firebase/auth";
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

// https://www.youtube.com/watch?v=PKwu15ldZ7k
const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext) ;
}

// https://www.youtube.com/watch?v=5LrDIWkK_Bc
export function AuthProvider({ children }) {
    const [ currentUser, setCurrentUser ] = useState()
    const [ loading, setLoading ] = useState(true);

    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        signup
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
