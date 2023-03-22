import ProductPage from "@/components/product_page/page";
import { getPublicProduct } from "@/repositories/product_repository/productsRepository";

export default async function productPage({ params }) {
    const { productId } = params;
    const [product] = await Promise.all([getPublicProduct(productId)])
    return <>
        <ProductPage productData={product} />
    </>
}