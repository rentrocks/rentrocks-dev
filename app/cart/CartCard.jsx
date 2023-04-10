import { useAuth } from "@/contexts/authContext";
import { useUser } from "@/contexts/userContext";
import { getPublicProduct } from "@/repositories/product_repository/productsRepository";
import { getCartItems } from "@/repositories/user_repository/clientUserRepository";
import { removeProductFromCart } from "@/repositories/user_repository/userRepository";
import { db } from "@/utils/firebaseClient"
import { useEffect, useState } from "react";



function CartCard({ productId }) {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const { user } = useUser();
    const fetchProduct = async () => {
        setIsLoading(true)
        try {
            const res = await getPublicProduct(productId)
            setData(res)
        } catch (error) {
            console.log(error.message)
        }
        setIsLoading(false)
    }
    useEffect(() => {
        fetchProduct()
    }, [])

    if (isLoading) {
        return <div>Loading...</div>
    }
    return (
        <li key={data.id} className="flex py-6">
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img
                    src={data.photoList[0] ?? ""}
                    alt={data.imageAlt}
                    className="h-full w-full object-cover object-center"
                />
            </div>

            <div className="ml-4 flex flex-1 flex-col">
                <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                            <a href={data.href}>{data.productName}</a>
                        </h3>
                        <p className="ml-4">{data.price}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{data.color}</p>
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                    <p className="text-gray-500">Qty {data.quantity}</p>
                    <h1>
                    {user.uid}

                        {data.productId}
                    </h1>
                    <div className="flex">
                        <button
                            onClick={() => removeProductFromCart(user, data.productId)}
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        </li>)
}

export default CartCard