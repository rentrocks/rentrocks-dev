import { PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Suspense } from "react";
import MyOrders from "./orderList";

export default async function Page() {
    return (
        <div className="p-3">
            <div className="flex justify-between items-center">
                <h1 className="text-[#5842be] text-lg font-bold"># My Order Page</h1>
            </div>
            <MyOrders />
        </div>
    )
}
