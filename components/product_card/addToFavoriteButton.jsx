"use client";

import { useUser } from "@/contexts/userContext";
import {
    addProductToCart,
    addProductToFavorites,
    removeProductFromCart,
    removeProductToFavorites,
} from "@/repositories/user_repository/userRepository";
import { HeartIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

export default function AddToFavButton({ productId }) {
    const [isLoading, setIsLoading] = useState(false);
    const [isAdded, setIsAdded] = useState(false);
    const [error, setError] = useState(null);
    const { user } = useUser();

    const isAlreadyAdded = user?.favoritesProducts.find((value) => value === productId);

    useEffect(() => {
        setIsAdded(isAlreadyAdded)
    }, [productId])
    const handleAddToFav = async () => {
        if (isLoading) {
            return;
        }
        setError(null);
        setIsLoading(true);
        try {
            if (isAlreadyAdded) {
                await removeProductToFavorites(user, productId);
                setIsAdded(false);
            } else {
                await addProductToFavorites(user, productId);
                setIsAdded(true);
            }
        } catch (error) {
            setError(error.message);
        }
        setIsLoading(false);
    };
    return (
        <div>
            <button onClick={handleAddToFav}
                className="absolute top-0 right-0 m-2 p-2 bg-transparent rounded-full">

                {isLoading
                    ? isAdded

                    : isAdded || isAlreadyAdded
                        ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 21.35L3.5 13C2.01913 11.5191 1.12468 9.75334 1.00004 7.93799C0.875392 6.12265 1.52295 4.32829 2.73223 2.93934C3.94151 1.55039 5.59236 0.664221 7.37501 0.400002C9.15766 0.135784 10.9863 0.509298 12.5 1.5C14.0137 0.509298 15.8423 0.135784 17.625 0.400002C19.4076 0.664221 21.0585 1.55039 22.2678 2.93934C23.477 4.32829 24.1246 6.12265 24.0001 7.93799C23.8754 9.75334 22.9809 11.5191 21.5 13L13 21.35L12.5 21.8L12 21.35Z" fill="#FF0000" />
                        </svg> : <HeartIcon className="w-8 h-8" />

                }
            </button>
            {/* <button
                className={`px-5 py-2 w-full rounded-full hover:bg-pink-700  text-sm text-white font-semibold  ${isAlreadyAdded || isAdded ? "bg-pink-500 " : "bg-pink-600"
                    }`}
            >
                {isLoading
                    ? isAdded
                        ? "Removing ..."
                        : "Adding ..."
                    : isAdded || isAlreadyAdded
                        ? "Added"
                        : "Add to Cart"}
            </button> */}
            {error && <p className="text-sm font-medium pt-2 text-pink-600">{error}</p>}
        </div>
    );
}
