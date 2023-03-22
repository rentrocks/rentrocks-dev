import { Product } from "@/repositories/product_repository/models/products";
import { getPublicProduct } from "@/repositories/product_repository/productsRepository";
import { Suspense, useEffect, useId, useState } from "react";
import ProductCard from "./ProductCard";

export default function ProductCardFromId({ id }) {
    const [product, setProduct] = useState(Product.empty);
    const [loading, setLoading] = useState(true);
    // get product method
    const getProductData = async () => {
        const data = await getPublicProduct(id);
        setLoading(true);
        setProduct(data)
        setLoading(false);
    }
    useEffect(() => {
        getProductData();
    }, [id])

    if (loading) {
        return <div>Loading...</div>
    }

    return (<>
        <ProductCard productData={product} />
    </>)
}