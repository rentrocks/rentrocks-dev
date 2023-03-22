

import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getDatabase } from "firebase/database";
import { getMessaging, isSupported } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyDxOdEND8_wuHDIhJ-Pl4d6V7G1--5I-jE",
    authDomain: "rent-rocks.firebaseapp.com",
    projectId: "rent-rocks",
    storageBucket: "rent-rocks.appspot.com",
    messagingSenderId: "759429873823",
    appId: "1:759429873823:web:fefb37fdcdee734239e2aa",
    measurementId: "G-FJRWXRQXHS"
};

if (getApps.length.length === 0) {
}
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)
export const rtdb = getDatabase(app)
export const storage = getStorage(app)
export const messaging = async () => await isSupported() && getMessaging(app)

// export const analytics = getAnalytics(app);
