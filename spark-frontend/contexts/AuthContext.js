import React, { useContext, useState, useEffect } from 'react'
// import { getAuth } from "firebase/auth";
import { auth } from '../firebase';
import { 
    createUserWithEmailAndPassword, 
    onAuthStateChanged, 
    sendPasswordResetEmail, 
    signInWithEmailAndPassword, 
    signOut,
    updateEmail as firebaseUpdateEmail,
    updatePassword as firebaseUpdatePassword,
    updateProfile
} from 'firebase/auth';

// https://www.youtube.com/watch?v=PKwu15ldZ7k
const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext) ;
}

// https://www.youtube.com/watch?v=5LrDIWkK_Bc
export function AuthProvider({ children }) {
    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
    const [ currentUser, setCurrentUser ] = useState()
    const [ loading, setLoading ] = useState(true);

    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function logout() {
        return signOut(auth);
    }

    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email);
    }

    function updateEmail(email) {
        return firebaseUpdateEmail(auth.currentUser, email);
    }

    function updatePassword(password) {
        return firebaseUpdatePassword(auth.currentUser, password);
    }

    function updateDisplayName(name) {
        return updateProfile(auth.currentUser, { displayName:name });
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        adminEmail,
        currentUser,
        login,
        signup,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,
        updateDisplayName
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
