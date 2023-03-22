import { AddToUserViewdProduct } from "@/repositories/product_repository/clientProductRepository";

export default function Layout({ children, params }) {
    return <>
        <AddToUserViewdProduct productId={params.productId} />
        {children}
    </>
}