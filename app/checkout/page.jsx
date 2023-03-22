import { getPublicProduct } from "@/repositories/product_repository/productsRepository"
import CheckOutClientPage from "./clientPage"


export default async function Checkout({ searchParams }) {
    const { productId } = searchParams;
    const productRes = await getPublicProduct(productId)
    return <>
        <CheckOutClientPage productInString={JSON.stringify(productRes)} />
    </>
}
