'use client'
import { useEffect, useState } from "react";
import { collection, doc, getDocs, onSnapshot, query, serverTimestamp, setDoc, Timestamp } from "firebase/firestore";
import { db, storage } from "@/utils/firebaseClient";
import { Product } from "./models/products";
import { ViewedProduct } from "./models/viewedProduct";
import { useAuth } from "@/contexts/authContext";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const productListSnapshot = () => {
    const [data, setData] = useState(null);
    const q = query(collection(db, "public_products"));
    useEffect(() => {
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const products = [];
            querySnapshot.forEach((doc) => {
                products.push(Product.fromJson(doc.data()));
            });
            setData(products);
        });
        return () => unsubscribe();
    }, []);

    return data;
};

export const userProductListSnapshot = (userId) => {
    const [productList, setProductList] = useState(null);
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const q = query(collection(db, `users/${userId}/my_products`));

    useEffect(() => {
        setError(null)
        try {
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const products = [];
                querySnapshot.forEach((doc) => {
                    products.push(Product.fromJson(doc.data()));
                });
                setIsLoading(false)
                setProductList(products);
            });
            return () => unsubscribe();
        } catch (error) {
            setError(error.message)
        }

    }, [userId]);

    return { productList, isLoading, error };
};


export const AddToUserViewdProduct = ({ productId }) => {
    const { isLoading, currentUser } = useAuth()
    const add = async () => {
        if (isLoading || !currentUser) {
            return;
        }
        const newId = doc(collection(db, 'ids')).id;
        const docRef = doc(db, `users/${currentUser.uid}/viewed_products/${newId}`)
        const viewedProduct = new ViewedProduct(
            {
                id: newId,
                timestamp: serverTimestamp(),
                uid: currentUser.uid,
                productId: productId,
            }
        )
        await setDoc(docRef, viewedProduct.toJson());
    }
    useEffect(() => {
        add();
    }, [currentUser, productId]);
}

export const uploadAndGetImageLink = async (userId, image) => {
    if (!image || !userId) {
        alert('Select Image')
        return;
    }
    const storageRef = ref(storage, `images/${userId}/${image.name}_${Timestamp.now().seconds}.jpg`);
    await uploadBytes(storageRef, image);
    const downloadUrl = await getDownloadURL(storageRef)
    return downloadUrl;
}

export const getLabelFromImageLink = async (imageLink) => {
    if (!imageLink) {
        alert("Image Not Found")
        return;
    }
    const localEndpoint = "http://127.0.0.1:5001/rent-rocks/us-central1/getImageLabel";
    const serverEndPoint = "https://us-central1-rent-rocks.cloudfunctions.net/getImageLabel";

    const url = encodeURI(`${serverEndPoint}?imageLink=${imageLink}`);
    const res = await fetch(url, { method: 'POST' });
    const data = await res.json();
    return data;
}
