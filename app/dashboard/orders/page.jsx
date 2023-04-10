import { PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Suspense } from "react";
import MyOrders from "./orderList";

export default async function Page() {
    return (
        <div className="p-3">
            <MyOrders />
        </div>
    )
}
