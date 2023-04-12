

import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getDatabase } from "firebase/database";
import { getMessaging, isSupported } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: process.env.PUBLIC_NEXT_API_KEY,
    authDomain: process.env.PUBLIC_NEXT_AUTHDOMAIN,
    projectId: process.env.PUBLIC_NEXT_PROJECTID,
    storageBucket: process.env.PUBLIC_NEXT_STORAGE_BUCKET,
    messagingSenderId: process.env.PUBLIC_NEXT_MESSAGEING_SENDER_ID,
    appId: process.env.PUBLIC_NEXT_APP_ID,
    measurementId: process.env.PUBLIC_NEXT_MEASUREMENT_ID,
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
