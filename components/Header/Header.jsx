'use client'

import { Fragment, useEffect, useState } from 'react'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import { ArrowPathIcon, ArrowRightOnRectangleIcon, Bars3Icon, BellAlertIcon, ChartPieIcon, ChatBubbleLeftEllipsisIcon, CursorArrowRaysIcon, FingerPrintIcon, ShoppingCartIcon, SquaresPlusIcon, UserIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import { useAuth } from '@/contexts/authContext'
import Searchbar from '../Searchbar'
import { useUser } from '@/contexts/userContext'
import NotificationButton from './notificationButton'
import NotificationWidget from '../notifications/notificationWidget'
import { getNotificationCount } from '@/repositories/user_repository/notificationRepository'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Header() {
  const { currentUser } = useAuth()
  const { user } = useUser()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [notificationCount, setNotificationCount] = useState(0)
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


  return (
    <header className="bg-white sticky top-0 z-10">
      {/* Header */}
      <nav className="mx-auto flex items-center justify-between px-6 py-4 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img className="h-8 w-auto" src="/logo.png" alt="" />
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
          <Link href="#" className="text-sm font-bold leading-6 text-gray-900">
            Products
          </Link>
          <Link href="#" className="text-sm font-bold leading-6 text-gray-900">
            Features
          </Link>
          <Link href="#" className="text-sm font-bold leading-6 text-gray-900">
            Marketplace
          </Link>
        </Popover.Group>
        <div className='hidden md:block'>
          <Searchbar />
        </div>
        <div className='hidden lg:flex lg:flex-1 lg:justify-end space-x-8'>
          {currentUser && user && <div>
            <Link href="/dashboard/chat" className="flex gap-2 items-center text-sm font-bold leading-6 text-gray-900">
              <span><ChatBubbleLeftEllipsisIcon className='h-5 w-5 font-bold' /> </span>  Chat <span className="font-bold text-white rounded-full bg-[#5842be] flex items-center justify-center font-mono h-5 w-5">0</span>
            </Link>
          </div>}
          {currentUser && user && <div>
            <Link href="/cart" className="flex gap-2 items-center text-sm font-bold leading-6 text-gray-900">
              <span><ShoppingCartIcon className='h-5 w-5 font-bold' /> </span>  Cart <span className="font-bold text-white rounded-full bg-[#5842be] flex items-center justify-center font-mono h-5 w-5">{user.cartItems.length}</span>
            </Link>
          </div>}
          {currentUser && <div>
            <Link href="/dashboard" className="flex gap-2 items-center text-sm font-bold leading-6 text-gray-900">
              <span><UserIcon className='h-5 w-5 font-bold' /> </span>  Account
            </Link>
          </div>}
          {!currentUser && <div >
            <Link href="/login" className="flex gap-2 items-center text-sm font-bold leading-6 text-gray-900">
              <span><ArrowRightOnRectangleIcon className='h-5 w-5 font-bold' /> </span>  Login
            </Link>
          </div>}
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
                <Disclosure as="div" className="-mx-3">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 hover:bg-gray-50">
                        Product
                        <ChevronDownIcon
                          className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-2 space-y-2">
                        {[...products, ...callsToAction].map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as="a"
                            href={item.href}
                            className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                          >
                            {item.name}
                          </Disclosure.Button>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <Link
                  href="#"
                  className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Features
                </Link>
                <Link
                  href="#"
                  className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Marketplace
                </Link>
                <Link
                  href="#"
                  className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Company
                </Link>
              </div>
              <div className="py-6">
                <Link
                  href="#"
                  className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header >
  )
}
