'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { db, rtdb } from '@/utils/firebaseClient';
import { useRouter } from 'next/navigation';
import { User } from '@/repositories/user_repository/models/user';
import { useAuth } from './authContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { ref, onValue, push, onDisconnect, set, serverTimestamp, update } from "firebase/database";
import { rtdbUserRef } from '@/repositories/user_repository/presenceRepository';
const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null)
    const router = useRouter();
    const { currentUser } = useAuth()

    useEffect(() => {
        if (!currentUser) {
            setIsLoading(false)
            return;
        }
        const unsubscribe = onSnapshot(doc(db, `users/${currentUser.uid}`), (snapshot) => {
            if (snapshot.exists) {
                setUser(User.fromJson(snapshot.data()));
            } else {
                setError('User Not Found');
            }
            setIsLoading(false)
        });
        return unsubscribe;
    }, [currentUser]);



    useEffect(() => {
        if (!currentUser) {
            return;
        }
        const userRef = rtdbUserRef(currentUser.uid);
        const connectedRef = ref(rtdb, `.info/connected`);
        const unsubscribe = onValue(connectedRef, (snap) => {
            if (snap.val() === true) {
                update(userRef, {
                    isOnline: true,
                    lastSeen: serverTimestamp(),
                    deviceType: 'website',
                })
                onDisconnect(userRef).update({
                    isOnline: false,
                    lastSeen: serverTimestamp(),
                    deviceType: 'website',
                })
            }
        });

        return unsubscribe;
    }, [currentUser]);

    return (
        <UserContext.Provider value={{
            user,
            isLoading,
            error,
        }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext)