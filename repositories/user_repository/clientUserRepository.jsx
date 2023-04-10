'use client'

import { useAuth } from "@/contexts/authContext"
import { db } from "@/utils/firebaseClient"
import { collection, doc, GeoPoint, onSnapshot, query, serverTimestamp, setDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { UserLocation } from "./models/userLocation"

export const AddCurrentLocation = () => {
    const { currentUser } = useAuth()
    const [location, setLocation] = useState(null);
    const addLocation = async ({ latitude, longitude }) => {
        if (!currentUser || !location) {
            return;
        }
        const myGeoLocation = new GeoPoint(latitude, longitude);
        const newId = doc(collection(db, 'ids')).id;
        const docRef = doc(db, `users/${currentUser.uid}/locations/${newId}`)
        const userLocation = new UserLocation({
            id: newId,
            geoLocation: myGeoLocation,
            ipAddress: (await fetch('https://api.ipify.org/?format=json').then(async (v) => await v.json())).ip,
            kIsWeb: true,
            timestamp: serverTimestamp(),
        })
        await setDoc(docRef, userLocation.toJson());
    };

    useEffect(() => {
        if ('geolocation' in navigator) {
            // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
            navigator.geolocation.getCurrentPosition(({ coords }) => {
                const { latitude, longitude } = coords;
                setLocation({ latitude, longitude });
            })
        }
    }, [currentUser]);

    useEffect(() => {
        if (location) {
            addLocation(location);
        }
    }, [location]);
}

export const userOrderListSnapshot = (userId) => {
    const [orderList, setOrderList] = useState(null);
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const q = query(collection(db, `users/${userId}/orders`));

    useEffect(() => {
        setError(null)
        try {
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const products = [];
                querySnapshot.forEach((doc) => {
                    products.push(doc.data());
                });
                setIsLoading(false)
                setOrderList(products);
            });
            return () => unsubscribe();
        } catch (error) {
            console.log(error);
            setError(error.message)
            setIsLoading(false)
        }

    }, [userId]);

    return { orderList, isLoading, error };
};