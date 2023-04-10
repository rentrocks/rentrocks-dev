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
      <section className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
                {orderList.map((e) => {
                    return <div>
                        <ProductCardFromId id={e.productId} />
                        {/* <h1>Order Id : {e.orderId}</h1> */}
                    </div>
                })}
            </section>
        </>
    );
};

