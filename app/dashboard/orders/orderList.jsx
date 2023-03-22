'use client'

import ProductCardFromId from '@/components/product_card/ProductCardFromId';
import { useAuth } from '@/contexts/authContext';
import { userOrderListSnapshot } from '@/repositories/user_repository/clientUserRepository';

export default function MyOrders() {
    const { currentUser } = useAuth()
    const { orderList, isLoading, error } = userOrderListSnapshot(currentUser.uid)

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }

    if (!orderList) {
        return <div>No Order</div>
    }

    return (
        <>
            <section className="w-fit mx-auto grid grid-cols-2 lg:grid-cols-3 md:grid-cols-3 justify-items-center justify-center gap-x-6 mt-10 mb-5">
                {orderList.map((e) => {
                    return <div>
                        <ProductCardFromId id={e.productId} />
                        <h1>Order Id : {e.orderId}</h1>
                    </div>
                })}
            </section>
        </>
    );
};

