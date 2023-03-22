import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/utils/firebaseClient";

export const useFirestoreSnapshot = (collection, docId) => {
    const [data, setData] = useState(null);
    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, collection, docId), (doc) => {
            const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
            console.log(source, " data: ", doc.data());
            setData(doc.data());
        });
        return () => unsubscribe();
    }, [collection, docId]);

    return data;
};
