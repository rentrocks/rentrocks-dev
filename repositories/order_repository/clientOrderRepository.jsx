import { db } from "@/utils/firebaseClient";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

export const getOrderSnapshot = (orderId) => {
    if(!orderId){
        return { order : null, isLoading : true, error : "OrderId is Empty" };
    }
    const [order, setOrder] = useState(null);
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        setError(null)
        try {
            const unsubscribe = onSnapshot(doc(db, `orders/${orderId}`), (snap) => {
                setIsLoading(false)
                setOrder(snap.data());
                console.log(snap.data());
            });
            return () => unsubscribe();
        } catch (error) {
            console.log(error);
            setError(error.message)
            setIsLoading(false)
        }

    }, [orderId]);

    return { order, isLoading, error };
};