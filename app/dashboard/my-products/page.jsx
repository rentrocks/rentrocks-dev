import { PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import MyProducts from "./productList";

export default function Page() {
    return (
        <div className="p-3">
            <div className="flex justify-between items-center">
                <h1 className="text-[#5842be] text-lg font-bold"># My Product Page</h1>
                <Link href={'/dashboard/my-products/add'}>
                    <div>
                        <button className="flex items-center bg-[#5842be] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
                            <span><PlusIcon className="h-7 w-7 pr-1" /> </span> Add Product
                        </button>
                    </div>
                </Link>
            </div>
            <MyProducts />
        </div>
    )
}
