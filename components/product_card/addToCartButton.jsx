"use client";

import { useUser } from "@/contexts/userContext";
import {
  addProductToCart,
  removeProductFromCart,
} from "@/repositories/user_repository/userRepository";
import { useState } from "react";

export default function AddToCartButton({ productId }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useUser();
  const isAlreadyAdded = user?.cartItems.find((value) => value === productId);

  const handleAddToCart = async () => {
    if (isLoading) {
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      if (isAlreadyAdded) {
        await removeProductFromCart(user, productId);
        setIsAdded(false);
      } else {
        await addProductToCart(user, productId);
        setIsAdded(true);
      }
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };
  return (
    <div>
      <button
        onClick={handleAddToCart}
        className={`px-5 py-2 w-full rounded-full hover:bg-gray-500  text-sm text-white font-semibold  ${isAlreadyAdded || isAdded ? "bg-slate-600 " : "bg-[#5842be]"
          }`}
      >
        {isLoading
          ? isAdded
            ? "Removing ..."
            : "Adding ..."
          : isAdded || isAlreadyAdded
            ? "Added"
            : "Add to cart"}
      </button>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
