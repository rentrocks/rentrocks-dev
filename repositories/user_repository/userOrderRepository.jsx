import { sendEmailVerification, sendPasswordResetEmail, updateEmail, updatePassword, updateProfile } from "firebase/auth"
import { User } from "./models/user"
import { collection, doc, getDoc, getDocs, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { db, auth } from "@/utils/firebaseClient";

export const addOrder = (userId) => {
    return doc(db, `users/${userId}`)
}

export const generateNewOrderId = () => {
    return `ORDERID_${Math.floor(Math.random() * 1000000)}`
}

export const getTxnToken = async ({ orderId, custId, amount, mobile, email, firstName, lastName }) => {
    const res = await fetch(
        'https://rent-rocks.web.app/api/getPaytmToken',
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                oid: orderId,
                custId: custId,
                amount: amount,
                mobile: mobile,
                email: email,
                firstName: firstName,
                lastName: lastName,
            })
        }
    );
    const data = await res.json()
    const parsedData = JSON.parse(data)
    return parsedData.body.txnToken;
}

export const getTxnStatus = async (data) => {
    const { ORDERID, STATUS } = data;
    if (STATUS === "TXN_SUCCESS") {
        // post method fetch
        const res = await fetch('https://rent-rocks.web.app/api/getPaytmTxnStatus',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ORDERID: ORDERID,
                })
            }
        );
        const data = await res.json()
        const parsedData = JSON.parse(data)
        console.log(parsedData);
    } else {
        console.log(data);
    }
}