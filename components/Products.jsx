import { getPublicProductList } from '@/repositories/product_repository/productsRepository';
import Link from 'next/link'
import React from "react";
import ProductCard from "./product_card/ProductCard";


export default async function Products() {
  const productListRes = getPublicProductList();
  const [productList] = await Promise.all([productListRes]);

  return (
    <>
      <section className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
        {productList.map((e) => {
          return <ProductCard key={e.productId} productData={e} />;
        })}
      </section>
    </>
  );
};
