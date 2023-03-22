'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '@/utils/firebaseClient';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation';
const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setIsLoading(false);
        });

        return unsubscribe;
    }, []);

    const loginWithEmailPassword = async (email, password) => {
        try {
            await auth.signInWithEmailAndPassword(email, password);
        } catch (error) {
            console.error(error);
            alert(error.message)
        }
    }; const loginWithGoogleProvider = async () => {
        try {
            await signInWithPopup(auth, new GoogleAuthProvider());
            router.push('/dashboard')
        } catch (error) {
            console.error(error);
            alert(error.message)
        }
    };

    const logout = async () => {
        try {
            await auth.signOut();
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <AuthContext.Provider value={{
            currentUser,
            loginWithEmailPassword,
            loginWithGoogleProvider,
            isLoading,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext)