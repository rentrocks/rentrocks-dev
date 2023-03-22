'use client'
import { useAuth } from '@/contexts/authContext'
import { LinkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import React from 'react'

const signIn = () => {
    const { loginWithGoogleProvider, currentUser } = useAuth()
    return (
        <div>
            <div className="flex w-screen flex-wrap text-slate-800">
                <div className="relative hidden h-screen select-none flex-col justify-center text-center md:flex md:w-1/2">
                    <img className="mx-auto w-11/12 max-w-lg rounded-lg object-cover" src="https://img.freepik.com/free-psd/online-shopping-horizontal-banner-template_23-2148900158.jpg?size=626&ext=jpg&ga=GA1.1.2054790831.1674313480&semt=ais" />
                </div>
                <div className="flex w-full flex-col md:w-1/2">
                    <div className="flex justify-center pt-12 md:justify-start md:pl-12 mx-au">
                        <a href="#" className="text-2xl font-bold text-blue-600 ">RentRocks </a>
                    </div>
                    <div className="my-auto mx-auto flex flex-col justify-center px-6 pt-8 md:justify-start lg:w-[28rem]">
                        <p className="text-center text-3xl font-bold md:text-left md:leading-tight">Create your free account</p>
                        <p className="mt-6 text-center font-medium md:text-left">
                            Already using rentrocks?
                            <Link href="/login" className="whitespace-nowrap font-semibold text-blue-700 ml-2">Login here</Link>
                        </p>
                        {
                            currentUser &&
                            <>{currentUser.displayName}</>
                        }
                        <button onClick={() => { loginWithGoogleProvider() }} className="-2 mt-8 flex items-center justify-center rounded-md border px-4 py-1 outline-none ring-gray-400 ring-offset-2 transition hover:border-transparent hover:bg-black hover:text-white focus:ring-2"><img className="mr-2 h-5" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcIFnSSCcbH_MmKhlhnTBW2tjOyMTcThEUcg&usqp=CAU" alt /> Get started with Google</button>
                        <div className="relative mt-8 flex h-px place-items-center bg-gray-200">
                            <div className="absolute left-1/2 h-6 -translate-x-1/2 bg-white px-4 text-center text-sm text-gray-500">Or use email instead</div>
                        </div>
                        <form className="flex flex-col items-stretch pt-3 md:pt-8">
                            <div className="flex flex-col pt-4">
                                <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                                    <input type="text" id="login-name" className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="Name" />
                                </div>
                            </div>
                            <div className="flex flex-col pt-4">
                                <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                                    <input type="email" id="login-email" className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="Email" />
                                </div>
                            </div>
                            <div className="mb-4 flex flex-col pt-4">
                                <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                                    <input type="password" id="login-password" className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="Password (minimum 8 characters)" />
                                </div>
                            </div>
                            <div className="block">
                                <input className="mr-2 h-5 w-5 appearance-none rounded border border-gray-300 bg-contain bg-no-repeat align-top" type="checkbox" id="chekcbox1" />
                                <label className="inline-block" htmlFor="terms-checkbox">I agree to the <a className="underline" href="#">Terms and Conditions</a></label>
                            </div>
                            <button type="submit" className="mt-6 rounded-lg bg-blue-600 px-4 py-2 text-center text-base font-semibold text-white shadow-md outline-none ring-blue-500 ring-offset-2 transition hover:bg-blue-700 focus:ring-2 md:w-32">Sign in</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default signIn