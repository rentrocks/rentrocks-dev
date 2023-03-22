'use client'

import { useAuth } from "@/contexts/authContext";
import { app, db } from "@/utils/firebaseClient";
import { collection, deleteDoc, doc, getCountFromServer, onSnapshot, query, serverTimestamp, setDoc, writeBatch } from "firebase/firestore";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { useEffect, useState } from "react";
import { setCookie, getCookie } from 'cookies-next';


export const RequestNotificationService = () => {
    const { currentUser } = useAuth()

    const addDeviceForNotification = async () => {
        const messaging = getMessaging()

        if (!currentUser) {
            return;
        }

        // onMessage(messaging, (message) => {
        //     console.log('Message received. ', message);
        //     // Display a notification using the received payload data
        //     new Notification(message.notification.title, { body: message.notification.body })
        // });

        const token = getCookie('fcmToken');
        if (token) {
            console.log("FCM token : " + token);
            return;
        }
        await Notification.requestPermission().then(async (permission) => {
            if (permission != 'granted') {
                return;
            }
        })
        await getToken(messaging, { vapidKey: 'BKUAsE3XfC6oI4H7m8gzPM69ZphqUvnwM9q-6WxjEXXfAgIIBjjp_Unh8kru1mU0OEh_nxwpdZJG_c4hSNLHkwE' })
            .then(async (currentToken) => {
                if (currentToken) {
                    const newId = currentToken.toString();
                    const docRef = doc(db, `users/${currentUser.uid}/notification_tokens/${newId}`)
                    const newToken = {
                        id: newId,
                        kIsWeb: true,
                        token: currentToken,
                        timestamp: serverTimestamp(),
                    }
                    await setDoc(docRef, newToken);
                    setCookie('fcmToken', currentToken, { maxAge: 30 * 24 * 60 * 60 * 1000 });
                } else {
                    console.log('No registration token available. Request permission to generate one.');
                }
            }).catch((err) => {
                console.log('An error occurred while retrieving token. ', err);
            });

    };

    useEffect(() => {
        if (currentUser) {
            addDeviceForNotification();
        }
    }, [currentUser]);

}

export function getNotification() {
    const { currentUser } = useAuth()
    const [notificationList, setNotificationList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        setIsLoading(true)
        const unsub = onSnapshot(collection(db, `users/${currentUser.uid}/notifications`), (snapshot) => {
            setNotificationList(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            setIsLoading(false)
        })
        return () => unsub()
    }, [currentUser, isLoading])
    return { notificationList }
}
export function getOldNotification() {
    const { currentUser } = useAuth()
    const [notificationList, setNotificationList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        setIsLoading(true)
        const unsub = onSnapshot(collection(db, `users/${currentUser.uid}/notifications_old`), (snapshot) => {
            setNotificationList(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            setIsLoading(false)
        })
        return () => unsub()
    }, [currentUser, isLoading])
    return { notificationList }
}
export const markNotificationAsRead = async ({ uid, notification }) => {
    if (!uid || !notification) {
        return;
    }
    try {
        const notificationRef = doc(db, `users/${uid}/notifications/${notification.id}`)
        const oldNotificationRef = doc(db, `users/${uid}/notifications_old/${notification.id}`)
        const batch = writeBatch(db);
        batch.delete(notificationRef)
        batch.set(oldNotificationRef, notification)
        await batch.commit();
        console.log('Marked As Read');
    } catch (error) {
        console.log(error.message);
    }
}
export const deleteOldNotification = async ({ uid, notification }) => {
    if (!uid || !notification) {
        return;
    }
    try {
        const notificationRef = doc(db, `users/${uid}/notifications_old/${notification.id}`)
        const oldNotificationRef = doc(db, `users/${uid}/notifications_deleted/${notification.id}`)
        const batch = writeBatch(db);
        batch.delete(notificationRef)
        batch.set(oldNotificationRef, notification)
        await batch.commit();
        console.log('Deleted');
    } catch (error) {
        console.log(error.message);
    }
}

export const getNotificationCount = async (uid) => {
    if (!uid) {
        return null;
    }
    try {
        const collRef = collection(db, `users/${uid}/notifications`)
        const snap = await getCountFromServer(collRef)
        return snap.data().count;
    } catch (error) {
        console.log(error.message);
    }
}