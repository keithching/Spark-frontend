import React, { useContext, useState, useEffect } from 'react'
// import { getAuth } from "firebase/auth";
import { auth } from '../firebase';
import { User } from 'firebase/auth';
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

interface AuthContextType {
    adminEmail: string
    // https://qiita.com/mtitg/items/3f1b6e61cee2f01f04a8
    currentUser: User | null | undefined
    login: (email: string, password: string) => void
    signup: (email: string, password: string) => void
    logout: () => void
    resetPassword: (email: string) => void
    updateEmail: (email: string) => void
    updatePassword: (password: string) => void
    updateDisplayName: (name: string) => void
}


// https://www.youtube.com/watch?v=PKwu15ldZ7k
// https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#non-null-assertion-operator-postfix-
const AuthContext = React.createContext<AuthContextType | undefined>(undefined!);

export function useAuth() {
    return useContext(AuthContext) ;
}

// https://www.youtube.com/watch?v=5LrDIWkK_Bc
export function AuthProvider({ children }) {
    const adminEmail: string = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
    const [ currentUser, setCurrentUser ] = useState<User | null | undefined>(undefined);
    const [ loading, setLoading ] = useState<boolean>(true);

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
