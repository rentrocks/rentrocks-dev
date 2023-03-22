import { useAuth } from "@/contexts/authContext";

export function AddProduct() {
    const { user, isLoading } = useAuth()
    return <>
        <form>
            <h1>Add Product this is my speed sahi chal raha hell0 i am  </h1>
        </form>
    </>
}