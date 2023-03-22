'use client'

import { useAuth } from "@/contexts/authContext";
import { useUser } from "@/contexts/userContext";
import { ArrowLeftOnRectangleIcon, ChatBubbleOvalLeftIcon, HomeIcon, QuestionMarkCircleIcon, ShoppingCartIcon, TagIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from 'next/navigation';

export default function Layout({ children }) {
    const pathname = usePathname();
    const { isLoading, currentUser, logout } = useAuth()
    const { user, isLoading: userIsLoading } = useUser()
    if (isLoading) {
        return <div>Loading...</div>
    }
    if (isLoading || userIsLoading) {
        return <div>Loading...</div>
    }
    if (!currentUser || !user) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Link className="text-gray-600 hover:text-gray-900" href="/login">
                    <span className="sr-only">Login</span>
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-200">
                        <ArrowLeftOnRectangleIcon className="h-6 w-6" aria-hidden="true" />
                    </div>
                </Link>
            </div>
        )
    }
    return <>
        <div className="flex">
            {/* side bar */}
            <div className="hidden md:block p-4 w-60 border-l h-screen space-y-3">
                {/* user information */}
                <div className="flex flex-col items-center justify-center space-x-2">
                    <div className="flex items-center justify-center space-x-2">
                        <img className="rounded-full w-14 h-14 object-cover" src={user.photoURL} alt="profile" />
                    </div>
                    <div className="flex items-center justify-center w-full">
                        <p className="font-bold p-1">{user.displayName}</p>
                    </div>
                    <div className="flex items-center justify-center w-full">
                        <p className="font-thin text-sm font-serif p-1">{user.email}</p>
                    </div>
                </div>
                <Link href={'/dashboard'} className={pathname !== '/dashboard' ? `flex gap-2 items-center px-4 w-full py-2 cursor-pointer text-[#646870] rounded-lg hover:bg-[#5842be] hover:text-white` : `flex gap-2 items-center px-4 w-full py-2 cursor-pointer rounded-lg bg-[#5842be] text-white`}>
                    <HomeIcon className="w-6 h-6" />
                    <h1 className="text-[16px] font-semibold">Home</h1>
                </Link>
                <Link href={'/dashboard/orders'} className={pathname !== '/dashboard/orders' ? `flex gap-2 items-center px-4 w-full py-2 cursor-pointer text-[#646870] rounded-lg hover:bg-[#5842be] hover:text-white` : `flex gap-2 items-center px-4 w-full py-2 cursor-pointer rounded-lg bg-[#5842be] text-white`}>
                    <ShoppingCartIcon className="w-6 h-6" />
                    <h1 className="text-[16px] font-semibold">My Orders</h1>
                </Link>
                <Link href={'/dashboard/my-products'} className={pathname !== '/dashboard/my-products' ? `flex gap-2 items-center px-4 w-full py-2 cursor-pointer text-[#646870] rounded-lg hover:bg-[#5842be] hover:text-white` : `flex gap-2 items-center px-4 w-full py-2 cursor-pointer rounded-lg bg-[#5842be] text-white`}>
                    <TagIcon className="w-6 h-6" />
                    <h1 className="text-[16px] font-semibold">My Products</h1>
                </Link>
                <Link href={'/dashboard/faqs'} className={pathname !== '/dashboard/faqs' ? `flex gap-2 items-center px-4 w-full py-2 cursor-pointer text-[#646870] rounded-lg hover:bg-[#5842be] hover:text-white` : `flex gap-2 items-center px-4 w-full py-2 cursor-pointer rounded-lg bg-[#5842be] text-white`}>
                    <QuestionMarkCircleIcon className="w-6 h-6" />
                    <h1 className="text-[16px] font-semibold">F&Qs</h1>
                </Link>
                <Link href={'/dashboard/contact-us'} className={pathname !== '/dashboard/contact-us' ? `flex gap-2 items-center px-4 w-full py-2 cursor-pointer text-[#646870] rounded-lg hover:bg-[#5842be] hover:text-white` : `flex gap-2 items-center px-4 w-full py-2 cursor-pointer rounded-lg bg-[#5842be] text-white`}>
                    <ChatBubbleOvalLeftIcon className="w-6 h-6" />
                    <h1 className="text-[16px] font-semibold">Contact Us</h1>
                </Link>
                <button onClick={() => { logout() }} className="flex gap-2 items-center px-4 w-full py-2 cursor-pointer text-[#646870] rounded-lg hover:bg-[#5842be] hover:text-white">
                    <ArrowLeftOnRectangleIcon className="w-6 h-6" />
                    <h1 className="text-[16px] font-semibold">Logout</h1>
                </button>
            </div>

            {/* content page */}
            <div className="bg-[#f9f9f9] w-full">
                {children}
            </div>
        </div>
    </>
}

