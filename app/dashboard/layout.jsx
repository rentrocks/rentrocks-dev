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
            {/* <div className="hidden md:block p-4 w-60 border-l h-screen space-y-3">
                
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
            </div> */}

<div className="hidden md:block">
<aside className="flex flex-col w-80 h-screen px-4 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
    <div className="flex flex-col items-center mt-6 -mx-2">
        <img className="object-cover w-24 h-24 mx-2 rounded-full"src={user.photoURL} alt="avatar"/>
        <h4 className="mx-2 mt-2 font-medium text-gray-800 dark:text-gray-200">{user.displayName}</h4>
        <p className="mx-2 mt-1 text-sm font-medium text-gray-600 dark:text-gray-400">{user.email}</p>
    </div>

    <div className="flex flex-col justify-between flex-1 mt-6">
        <nav>
            <Link href={'/dashboard'} className={pathname !== '/dashboard' ? `flex items-center px-4 py-2 text-gray-700  rounded-lg` : `flex items-center px-4 py-2 text-gray-700 bg-gray-300 rounded-lg`}>
            <HomeIcon className="w-5 h-5" />
                <span className="mx-4 font-medium">Home</span>
            </Link>

            <Link href={'/dashboard/orders'} className={pathname !== '/dashboard/orders' ? `flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700`:`flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 bg-gray-100`}>
            <ShoppingCartIcon className="w-5 h-5" />
                <span className="mx-4 font-medium">My Orders</span>
            </Link>

            <Link href={'/dashboard/my-products'} className={pathname !== '/dashboard/my-products' ? `flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700`:`flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 bg-gray-100`}>
            <TagIcon className="w-5 h-5" />
                <span className="mx-4 font-medium">My Products</span>
            </Link>

            <Link href={'/dashboard/faqs'} className={pathname !== '/dashboard/faqs' ? `flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700`:`flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 bg-gray-100`}>
            <QuestionMarkCircleIcon className="w-5 h-5" />
                <span className="mx-4 font-medium">F&Qs</span>
            </Link>

            <Link href={'/dashboard/contact-us'} className={pathname !== '/dashboard/contact-us' ? `flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700`:`flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 bg-gray-100`}>
            <ChatBubbleOvalLeftIcon className="w-5 h-5" />
                <span className="mx-4 font-medium">Contact Us</span>
            </Link>

            <button onClick={() => { logout() }} className="flex gap-2 mt-5 items-center px-4 w-full py-2 cursor-pointer rounded-lg hover:bg-red-400 bg-red-500 text-white">
                    <ArrowLeftOnRectangleIcon className="w-6 h-6" />
                    <h1 className="text-[16px] font-semibold">Logout</h1>
                </button>

        </nav>
    </div>
</aside>
</div>

            {/* content page */}
            <div className="bg-[#f9f9f9] w-full">
                {children}
            </div>
        </div>
    </>
}

