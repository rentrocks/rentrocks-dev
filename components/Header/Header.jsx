'use client'

import { Fragment, useEffect, useState } from 'react'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import { ArrowPathIcon, ArrowRightOnRectangleIcon, Bars3Icon, BellAlertIcon, ChartPieIcon, ChatBubbleLeftEllipsisIcon, CursorArrowRaysIcon, FingerPrintIcon, ChatBubbleOvalLeftIcon, SquaresPlusIcon, UserIcon, XMarkIcon, HomeIcon, QuestionMarkCircleIcon, ShoppingCartIcon, TagIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useAuth } from '@/contexts/authContext'
// import Searchbar from '../Searchbar'
import { useUser } from '@/contexts/userContext'
// import NotificationButton from './notificationButton'
import NotificationWidget from '../notifications/notificationWidget'
import { getNotificationCount } from '@/repositories/user_repository/notificationRepository'
import React from 'react';
// import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { usePathname } from 'next/navigation'
import Cart from '@/app/cart/page'

const products = [
  {
    id: 1,
    name: 'Throwback Hip Bag',
    href: '#',
    color: 'Salmon',
    price: '$90.00',
    quantity: 1,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
    imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
  },
  {
    id: 2,
    name: 'Medium Stuff Satchel',
    href: '#',
    color: 'Blue',
    price: '$32.00',
    quantity: 1,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
    imageAlt:
      'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
  },
  // More products...
]


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-40%',
    transform: 'translate(-50%, -50%)',
    backgroundImage: "linear-gradient( 174.2deg,  rgba(255,244,228,1) 7.1%, rgba(240,246,238,1) 67.4% )"
  },
};



// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('body');


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Header() {
  // const { currentUser } = useAuth()
  const pathname = usePathname();
  const { loginWithGoogleProvider, currentUser } = useAuth()
  const { user } = useUser()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [notificationCount, setNotificationCount] = useState(0)
  const [open, setOpen] = useState(false)

  const getCountData = async () => {
    if (!currentUser) {
      return;
    }
    const count = await getNotificationCount(currentUser.uid)
    setNotificationCount(count)
  }
  useEffect(() => {
    getCountData()
  }, [currentUser])


  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }



  return (
    <header className="bg-white sticky top-0 z-10">
      {/* Header */}
      <nav className="mx-auto flex items-center justify-between px-6 py-4 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img className="h-16 w-16" src="/mainlogo.png" alt="" />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <Link href="#" className="text-sm font-bold leading-6 text-gray-600 capitalize relative">
            PRODUCTS
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-pink-500 transform scale-x-0 transition-transform origin-left"></span>
          </Link>
          <Link href="#" className="text-sm font-bold leading-6 text-gray-600 capitalize relative">
            FEATURES
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-pink-500 transform scale-x-0 transition-transform origin-left"></span>
          </Link>
          <Link href="#" className="text-sm font-bold leading-6 text-gray-600 capitalize relative">
            MARKETPLACE
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-pink-500 transform scale-x-0 transition-transform origin-left"></span>
          </Link>

        </Popover.Group>
        {/* <div className='hidden md:block'>
          <Searchbar />
        </div> */}
        <div className='hidden lg:flex lg:flex-1 lg:justify-end space-x-8'>
          {currentUser && user && <div>
            <Link href="/dashboard/chat" className="flex gap-2 items-center text-sm font-bold leading-6 text-gray-900">
              <span><ChatBubbleLeftEllipsisIcon className='h-5 w-5 font-bold' /> </span>  Chat <span className="font-bold text-white rounded-full bg-[#5842be] flex items-center justify-center font-mono h-5 w-5">0</span>
            </Link>
          </div>}
          {currentUser && user && <div>
            <button onClick={() => setOpen(true)} className="flex gap-2 items-center text-sm font-bold leading-6 text-gray-900">
              <span><ShoppingCartIcon className='h-5 w-5 font-bold' /> </span>  Cart <span className="font-bold text-white rounded-full bg-[#5842be] flex items-center justify-center font-mono h-5 w-5">{user.cartItems.length}</span>
            </button>
          </div>}
          {currentUser && <div>
            <Link href="/dashboard" className="flex gap-2 items-center text-sm font-bold leading-6 text-gray-900">
              <span><UserIcon className='h-5 w-5 font-bold' /> </span>  Account
            </Link>
          </div>}
          {!currentUser && <div >
            <button onClick={openModal} className="flex gap-2 items-center text-sm font-bold leading-6 text-gray-600">
              <span><ArrowRightOnRectangleIcon className='h-5 w-5 font-bold' /> </span>  LOGIN
            </button>
          </div>}
          <div>
            <Modal
              isOpen={modalIsOpen}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Example Modal"
            >
              <div className="my-auto mx-auto flex flex-col justify-center px-6 pt-8 md:justify-start lg:w-[28rem]">
                <p className="text-center text-3xl font-bold md:text-left md:leading-tight">Welcome to RentRocks</p>
                <p className="mt-6 text-center font-medium md:text-left">
                  Already using rentrocks?
                  <Link href="/login" className="whitespace-nowrap font-semibold text-blue-700 ml-2">Login here</Link>
                </p>
                {
                  currentUser &&
                  <>{currentUser.displayName}</>
                }
                <button onClick={() => { closeModal(); loginWithGoogleProvider(); }} className="-2 mt-8 flex items-center justify-center rounded-md border px-4 py-2 outline-none ring-gray-400 ring-offset-2 transition hover:border-transparent bg-black text-white hover:bg-white hover:text-gray-700 hover:border-black focus:ring-2"><img className="mr-2 h-5" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcIFnSSCcbH_MmKhlhnTBW2tjOyMTcThEUcg&usqp=CAU" alt /> Get started with Google</button>
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
            </Modal>
          </div>
          {currentUser &&
            <Popover className="relative">
              <Popover.Button className="flex items-center gap-x-1 text-sm font-bold leading-6 text-gray-900 outline-none">
                <BellAlertIcon className="h-5 w-5 flex-none" />
                <span className="font-bold text-white rounded-full bg-[#5842be] flex items-center justify-center font-mono h-5 w-5">
                  {notificationCount}
                </span>
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute -right-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                  <NotificationWidget />
                </Popover.Panel>
              </Transition>
            </Popover>
          }
        </div>
      </nav>
      {/* SideBar */}
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://zishop.vercel.app/_next/image?url=%2Fimages%2Flogo.png&w=256&q=75"
                alt=""
              />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Link
                  onClick={() => setMobileMenuOpen(false)}
                  href={'/dashboard'} className={pathname !== '/dashboard' ? `flex gap-2 items-center px-4 w-full py-2 cursor-pointer text-[#646870] rounded-lg hover:bg-[#5842be] hover:text-white` : `flex gap-2 items-center px-4 w-full py-2 cursor-pointer rounded-lg bg-[#5842be] text-white`}>
                  <HomeIcon className="w-6 h-6" />
                  <h1 className="text-[16px] font-semibold">Home</h1>
                </Link>
                <Link
                  onClick={() => setMobileMenuOpen(false)}
                  href={'/dashboard/orders'} className={pathname !== '/dashboard/orders' ? `flex gap-2 items-center px-4 w-full py-2 cursor-pointer text-[#646870] rounded-lg hover:bg-[#5842be] hover:text-white` : `flex gap-2 items-center px-4 w-full py-2 cursor-pointer rounded-lg bg-[#5842be] text-white`}>
                  <ShoppingCartIcon className="w-6 h-6" />
                  <h1 className="text-[16px] font-semibold">My Orders</h1>
                </Link>
                <Link
                  onClick={() => setMobileMenuOpen(false)}
                  href={'/dashboard/my-products'} className={pathname !== '/dashboard/my-products' ? `flex gap-2 items-center px-4 w-full py-2 cursor-pointer text-[#646870] rounded-lg hover:bg-[#5842be] hover:text-white` : `flex gap-2 items-center px-4 w-full py-2 cursor-pointer rounded-lg bg-[#5842be] text-white`}>
                  <TagIcon className="w-6 h-6" />
                  <h1 className="text-[16px] font-semibold">My Products</h1>
                </Link>
                <Link
                  onClick={() => setMobileMenuOpen(false)}
                  href={'/dashboard/faqs'} className={pathname !== '/dashboard/faqs' ? `flex gap-2 items-center px-4 w-full py-2 cursor-pointer text-[#646870] rounded-lg hover:bg-[#5842be] hover:text-white` : `flex gap-2 items-center px-4 w-full py-2 cursor-pointer rounded-lg bg-[#5842be] text-white`}>
                  <QuestionMarkCircleIcon className="w-6 h-6" />
                  <h1 className="text-[16px] font-semibold">F&Qs</h1>
                </Link>
                <Link
                  onClick={() => setMobileMenuOpen(false)}
                  href={'/dashboard/contact-us'} className={pathname !== '/dashboard/contact-us' ? `flex gap-2 items-center px-4 w-full py-2 cursor-pointer text-[#646870] rounded-lg hover:bg-[#5842be] hover:text-white` : `flex gap-2 items-center px-4 w-full py-2 cursor-pointer rounded-lg bg-[#5842be] text-white`}>
                  <ChatBubbleOvalLeftIcon className="w-6 h-6" />
                  <h1 className="text-[16px] font-semibold">Contact Us</h1>
                </Link>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>

      {/* Cart */}
      <Cart open={open} setOpen={setIsOpen}/>
    </header >
  )
}
