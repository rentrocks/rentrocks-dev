'use client'

import ProductCard from '@/components/product_card/ProductCard';
import { useAuth } from '@/contexts/authContext';
import { userProductListSnapshot } from '@/repositories/product_repository/clientProductRepository';
import Link from 'next/link'
import MyProductCard from './myProductCard';
export default function MyProducts() {
    const { currentUser } = useAuth()
    const { productList, isLoading, error } = userProductListSnapshot(currentUser.uid)

    if (isLoading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>Error: {error.message}</div>
    }
    if (!productList) {
        return <div>No products</div>
    }
    return (
        <>
            <section className="w-fit mx-auto grid grid-cols-2 lg:grid-cols-3 md:grid-cols-3 justify-items-center justify-center gap-x-6 mt-10 mb-5">
                {productList.map((e) => {
                    return <MyProductCard key={e.productId} productData={e} />;
                })}
            </section>
            <div className="mx-auto text-center">
                <Link
                    className="py-3 px-8 md:px-12 mx-auto text-sm md:text-base bg-blue-400 rounded-xl shadow-lg font-semibold text-black"
                    href="/"
                >
                    See All New Products
                </Link>
            </div>
        </>
    );
};

