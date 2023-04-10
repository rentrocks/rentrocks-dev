import { sendEmailVerification, sendPasswordResetEmail, updateEmail, updatePassword, updateProfile } from "firebase/auth"
import { User } from "./models/user"
import { collection, doc, getDoc, getDocs, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { db, auth } from "@/utils/firebaseClient";

export const getUserRef = (userId) => {
    return doc(db, `users/${userId}`)
}

export const getUser = async (userId) => {
    const ref = doc(db, `users/${userId}`)
    const res = await getDoc(ref)
    if (res.exists) {
        return User.fromJson(res.data())
    } else {
        return User.empty;
    }
}

export const updateUserPhotoUrl = async (photoURL) => {
    await updateProfile(auth.currentUser, {
        photoURL: photoURL,
    })
}
export const updateUserDisplayName = async (displayName) => {
    await updateProfile(auth.currentUser, {
        displayName: displayName,
    })
}
export const updateUserEmail = async (email) => {
    await updateEmail(auth.currentUser, email)
}

export const sentEmailVerfication = async () => {
    await sendEmailVerification(auth.currentUser)
}

export const updateUserPassword = async (newPassword) => {
    await updatePassword(auth.currentUser, newPassword)
}

export const sendUserPasswordResetEmail = async (email) => {
    await sendPasswordResetEmail(auth, email)
}
export const updateUserPhoneNumber = async (uid, phoneNumber) => {
    // TODO: Write a function to update phone numbner
}

export const disableUser = async (uid) => {
    // TODO: Write a function to disable user
}

export const addProductToCart = async (user, productId) => {
    if (!user || typeof user !== 'object' || !user.uid || !productId) {
        throw new Error('Invalid user or product ID');
    }
    const docRef = doc(db, `users/${user.uid}`)
    const cart = user.cartItems ?? [];
    await updateDoc(docRef, { cartItems: [...cart, productId] });
}

export const removeProductFromCart = async (user, productId) => {
    if (!user || typeof user !== 'object' || !user.uid || !productId) {
        throw new Error('Invalid user or product ID');
    }
    const docRef = doc(db, `users/${user.uid}`)
    const cart = (user.cartItems ?? []).filter((id) => id != productId);
    await updateDoc(docRef, { cartItems: [...cart] });
}

export const addProductToFavorites = async (user, productId) => {
    const ref = doc(db, `users/${user.uid}`);
    const cart = user.favoritesProducts ?? [];
    cart.push(productId);
    user.favoritesProducts = cart;
    await setDoc(ref, user.toJson(), { merge: true });
}

export const removeProductToFavorites = async (user, productId) => {
    const ref = doc(db, `users/${user.uid}`);
    let favorites = user.favoritesProducts ?? [];
    favorites = favorites.filter((id) => {
        return id != productId;
    })
    user.favoritesProducts = favorites;
    await setDoc(ref, { favoritesProducts: favorites }, { merge: true });
}



export const setUserOrder = async ({
    productId,
    buyerId,
    orderId,
    status,
    productUserId,
    amount,
}) => {
    if (productId === undefined
        || buyerId === undefined
        || orderId === undefined
        || status === undefined
        || amount === undefined
        || productUserId === undefined
    ) {
        throw new Error('Missing Order Details');
    }
    const docRef = doc(db, `users/${buyerId}/orders/${orderId}`)
    await setDoc(docRef, {
        productId,
        buyerId,
        orderId,
        status,
        productUserId,
        amount,
    });
}