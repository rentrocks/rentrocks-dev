import { getPublicProductList } from '@/repositories/product_repository/productsRepository';
import Link from 'next/link'
import React from "react";
import ProductCard from "./product_card/ProductCard";


export default async function Products() {
  const productListRes = getPublicProductList();
  const [productList] = await Promise.all([productListRes]);

  return (
    <>
      <section className="w-fit mx-auto grid grid-cols-2 lg:grid-cols-4 md:grid-cols-4 justify-items-center justify-center gap-x-3 mt-10 mb-5">
        {productList.map((e) => {
          return <ProductCard key={e.productId} productData={e} />;
        })}
      </section>
    </>
  );
};
