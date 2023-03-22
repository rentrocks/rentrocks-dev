import { db } from "@/utils/firebaseClient";
import { doc, getDoc } from "firebase/firestore";

export const getOrder = async (orderId) => {
    const ref = doc(db, `orders/${orderId}`)
    const res = await getDoc(ref)
    if (res.exists) {
        return res.data()
    } else {
        return null;
    }
}