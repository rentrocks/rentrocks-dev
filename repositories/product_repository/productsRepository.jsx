import { collection, doc, getDoc, getDocs, query, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { db } from "@/utils/firebaseClient";
import { Product } from "./models/products";
import { RatedProduct } from "./models/ratedProduct";
import { ReviewProduct } from "./models/reviewProduct";


export const getPublicProductList = async () => {
    const q = query(collection(db, "public_products"));
    const res = await getDocs(q);
    const products = [];
    res.docs.forEach((doc) => {
        products.push(Product.fromJson(doc.data()));
    });
    return products;
};

export const getPublicProduct = async (productId) => {
    const docRef = doc(db, `public_products/${productId}`);
    const product = await getDoc(docRef);
    return Product.fromJson(product.data());
};

/// ? USER PRODUCT --------------------------------

export const setUserProduct = async ({ product, userId }) => {
    const newProductId = doc(collection(db, 'ids')).id;
    const docRef = doc(db, `users/${userId}/my_products/${newProductId}`)
    product.withNewId(newProductId);
    await setDoc(docRef, product.toJson());
}
export const setUserProductAvailability = async ({ productId, userId, isAvailable }) => {
    const docRef = doc(db, `users/${userId}/my_products/${productId}`)
    await updateDoc(docRef, { isAvailable: isAvailable });
}

export const userProductList = async (userId) => {
    const q = query(collection(db, `users/${userId}/my_products`));
    const res = await getDocs(q);
    const products = [];
    res.docs.forEach((doc) => {
        products.push(Product.fromJson(doc.data()));
    });
    return products;
};

export const getUserProduct = async (userId, productId) => {
    const docRef = doc(db, `users/${userId}/my_products/${productId}`);
    const product = await getDoc(docRef);
    return Product.fromJson(product.data());
};

export const rateProduct = async (userId, productId, rating) => {
    const docRef = doc(db, `users/${userId}/rated_products/${productId}`);
    const ratedProduct = RatedProduct(
        {
            productId: productId,
            rating: rating,
            timestamp: Timestamp.now(),
            userId: userId,
        }
    )
    await setDoc(docRef, ratedProduct.toJson());
};

export const reviewProduct = async (userId, productId, review) => {
    const docRef = doc(db, `users/${userId}/rated_products/${productId}`);
    const reveiewProduct = ReviewProduct(
        {
            id: doc(collection(db, 'ids')).id,
            productId: productId,
            review: review,
            timestamp: Timestamp.now(),
            userId: userId,
        }
    )
    await setDoc(docRef, reveiewProduct.toJson(), { merge: true });
};
