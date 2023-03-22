import Link from 'next/link'
import React from 'react'

const cart = () => {
  return (
    <div>
        <div className="w-full h-full bg-white dark:bg-gray-900 bg-opacity-90  overflow-y-auto overflow-x-hidden fixed sticky-0">
  <div className="w-full absolute z-10 right-0 h-full overflow-x-hidden transform translate-x-0 transition ease-in-out duration-700">
    <div className="flex lg:flex-row flex-col justify-end">
      <div className="w-full lg:px-8 lg:py-14 md:px-6 px-4 md:py-8 py-4 bg-white dark:bg-gray-800 overflow-x-hidden lg:h-screen h-auto overflow-y-scroll mb-4">
        <div className="flex items-center text-gray-500 hover:text-gray-600 dark:text-white cursor-pointer" onclick="checkoutHandler(false)">
          <img className="dark:hidden" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/shopping-cart-1-svg1.svg" alt="previous" />
          <img className="dark:block hidden" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/shopping-cart-1-svg1dark.svg" alt="previous" />
         <Link href="/">
         <p className="text-xl pl-2 leading-none dark:hover:text-gray-200 text-black font-semibold">Back</p>
         </Link>
        </div>
        <div className="md:flex items-strech py-8 md:py-10 lg:py-8 border-t border-gray-50">
          <div className="md:w-4/12 2xl:w-1/4 w-full">
            <img src="https://i.ibb.co/SX762kX/Rectangle-36-1.png" alt="Black Leather Bag" className="h-full object-center object-cover md:block hidden" />
            <img src="https://i.ibb.co/g9xsdCM/Rectangle-37.pngg" alt="Black Leather Bag" className="md:hidden w-full h-full object-center object-cover" />
          </div>
          <div className="md:pl-3 md:w-8/12 2xl:w-3/4 flex flex-col justify-center">
            <p className="text-xs leading-3 text-gray-800 dark:text-white md:pt-0 pt-4">RF293</p>
            <div className="flex items-center justify-between w-full pt-1">
              <p className="text-base font-black leading-none text-gray-800 dark:text-white">North wolf bag</p>
              <select aria-label="Select quantity" className="py-2 px-1 border border-gray-200 mr-6 focus:outline-none dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white">
                <option>01</option>
                <option>02</option>
                <option>03</option>
              </select>
            </div>
            <p className="text-xs leading-3 text-gray-600 dark:text-white pt-2">Height: 10 inches</p>
            <p className="text-xs leading-3 text-gray-600 dark:text-white py-4">Color: Black</p>
            <p className="w-96 text-xs leading-3 text-gray-600 dark:text-white">Composition: 100% calf leather</p>
            <div className="flex items-center justify-between pt-5">
              <div className="flex itemms-center">
                <p className="text-xs leading-3 underline text-gray-800 dark:text-white cursor-pointer">Add to favorites</p>
                <p className="text-xs leading-3 underline text-red-500 pl-5 cursor-pointer">Remove</p>
              </div>
              <p className="text-base font-black leading-none text-gray-800 dark:text-white">$9,000</p>
            </div>
          </div>
        </div>
        <div className="md:flex items-strech py-8 md:py-10 lg:py-8 border-t border-gray-50">
          <div className="md:w-4/12 2xl:w-1/4 w-full">
            <img src="https://i.ibb.co/c6KyDXN/Rectangle-5-1.png" alt="Gray Sneakers" className="h-full object-center object-cover md:block hidden" />
            <img src="https://i.ibb.co/yVSpYqx/Rectangle-6.png" alt="Gray Sneakers" className="md:hidden w-full h-full object-center object-cover" />
          </div>
          <div className="md:pl-3 md:w-8/12 2xl:w-3/4 flex flex-col justify-center">
            <p className="text-xs leading-3 text-gray-800 dark:text-white md:pt-0 pt-4">RF293</p>
            <div className="flex items-center justify-between w-full pt-1">
              <p className="text-base font-black leading-none text-gray-800 dark:text-white">LW sneakers</p>
              <select aria-label="Select quantity" className="py-2 px-1 border border-gray-200 mr-6 focus:outline-none dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white">
                <option>01</option>
                <option>02</option>
                <option>03</option>
              </select>
            </div>
            <p className="text-xs leading-3 text-gray-600 dark:text-white pt-2">Height: 10 inches</p>
            <p className="text-xs leading-3 text-gray-600 dark:text-white py-4">Color: Black</p>
            <p className="w-96 text-xs leading-3 text-gray-600 dark:text-white">Composition: 100% calf leather</p>
            <div className="flex items-center justify-between pt-5">
              <div className="flex itemms-center">
                <p className="text-xs leading-3 underline text-gray-800 dark:text-white cursor-pointer">Add to favorites</p>
                <p className="text-xs leading-3 underline text-red-500 pl-5 cursor-pointer">Remove</p>
              </div>
              <p className="text-base font-black leading-none text-gray-800 dark:text-white">$9,000</p>
            </div>
          </div>
        </div>
        <div className="md:flex items-strech py-8 md:py-10 lg:py-8 border-t border-gray-50">
          <div className="md:w-4/12 2xl:w-1/4 w-full">
            <img src="https://i.ibb.co/6gzWwSq/Rectangle-20-1.png" alt="Black Leather Purse" className="h-full object-center object-cover md:block hidden" />
            <img src="https://i.ibb.co/TTnzMTf/Rectangle-21.png" alt="Black Leather Purse" className="md:hidden w-full h-full object-center object-cover" />
          </div>
          <div className="md:pl-3 md:w-8/12 2xl:w-3/4 flex flex-col justify-center">
            <p className="text-xs leading-3 text-gray-800 dark:text-white md:pt-0 pt-4">RF293</p>
            <div className="flex items-center justify-between w-full">
              <p className="text-base font-black leading-none text-gray-800 dark:text-white">Luxe card holder</p>
              <select aria-label="Select quantity" className="py-2 px-1 border border-gray-200 mr-6 focus:outline-none dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white">
                <option>01</option>
                <option>02</option>
                <option>03</option>
              </select>
            </div>
            <p className="text-xs leading-3 text-gray-600 dark:text-white pt-2">Height: 10 inches</p>
            <p className="text-xs leading-3 text-gray-600 dark:text-white py-4">Color: Black</p>
            <p className="w-96 text-xs leading-3 text-gray-600 dark:text-white">Composition: 100% calf leather</p>
            <div className="flex items-center justify-between pt-5">
              <div className="flex itemms-center">
                <p className="text-xs leading-3 underline text-gray-800 dark:text-white cursor-pointer">Add to favorites</p>
                <p className="text-xs leading-3 underline text-red-500 pl-5 cursor-pointer">Remove</p>
              </div>
              <p className="text-base font-black leading-none text-gray-800 dark:text-white">$9,000</p>
            </div>
          </div>
        </div>
        <div className="md:flex items-strech py-8 md:py-10 lg:py-8 border-t border-gray-50">
          <div className="md:w-4/12 2xl:w-1/4 w-full">
            <img src="https://i.ibb.co/6gzWwSq/Rectangle-20-1.png" alt="Black Leather Purse" className="h-full object-center object-cover md:block hidden" />
            <img src="https://i.ibb.co/TTnzMTf/Rectangle-21.png" alt="Black Leather Purse" className="md:hidden w-full h-full object-center object-cover" />
          </div>
          <div className="md:pl-3 md:w-8/12 2xl:w-3/4 flex flex-col justify-center">
            <p className="text-xs leading-3 text-gray-800 dark:text-white md:pt-0 pt-4">RF293</p>
            <div className="flex items-center justify-between w-full">
              <p className="text-base font-black leading-none text-gray-800 dark:text-white">Luxe card holder</p>
              <select aria-label="Select quantity" className="py-2 px-1 border border-gray-200 mr-6 focus:outline-none dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white">
                <option>01</option>
                <option>02</option>
                <option>03</option>
              </select>
            </div>
            <p className="text-xs leading-3 text-gray-600 dark:text-white pt-2">Height: 10 inches</p>
            <p className="text-xs leading-3 text-gray-600 dark:text-white py-4">Color: Black</p>
            <p className="w-96 text-xs leading-3 text-gray-600 dark:text-white">Composition: 100% calf leather</p>
            <div className="flex items-center justify-between pt-5">
              <div className="flex itemms-center">
                <p className="text-xs leading-3 underline text-gray-800 dark:text-white cursor-pointer">Add to favorites</p>
                <p className="text-xs leading-3 underline text-red-500 pl-5 cursor-pointer">Remove</p>
              </div>
              <p className="text-base font-black leading-none text-gray-800 dark:text-white">$9,000</p>
            </div>
          </div>
        </div>
        <div className="md:flex items-strech py-8 md:py-10 lg:py-8 border-t border-gray-50">
          <div className="md:w-4/12 2xl:w-1/4 w-full">
            <img src="https://i.ibb.co/6gzWwSq/Rectangle-20-1.png" alt="Black Leather Purse" className="h-full object-center object-cover md:block hidden" />
            <img src="https://i.ibb.co/TTnzMTf/Rectangle-21.png" alt="Black Leather Purse" className="md:hidden w-full h-full object-center object-cover" />
          </div>
          <div className="md:pl-3 md:w-8/12 2xl:w-3/4 flex flex-col justify-center">
            <p className="text-xs leading-3 text-gray-800 dark:text-white md:pt-0 pt-4">RF293</p>
            <div className="flex items-center justify-between w-full">
              <p className="text-base font-black leading-none text-gray-800 dark:text-white">Luxe card holder</p>
              <select aria-label="Select quantity" className="py-2 px-1 border border-gray-200 mr-6 focus:outline-none dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white">
                <option>01</option>
                <option>02</option>
                <option>03</option>
              </select>
            </div>
            <p className="text-xs leading-3 text-gray-600 dark:text-white pt-2">Height: 10 inches</p>
            <p className="text-xs leading-3 text-gray-600 dark:text-white py-4">Color: Black</p>
            <p className="w-96 text-xs leading-3 text-gray-600 dark:text-white">Composition: 100% calf leather</p>
            <div className="flex items-center justify-between pt-5">
              <div className="flex itemms-center">
                <p className="text-xs leading-3 underline text-gray-800 dark:text-white cursor-pointer">Add to favorites</p>
                <p className="text-xs leading-3 underline text-red-500 pl-5 cursor-pointer">Remove</p>
              </div>
              <p className="text-base font-black leading-none text-gray-800 dark:text-white">$9,000</p>
            </div>
          </div>
        </div>
      </div>
      {/*Subtotal and Checkout Button Component */}
      <div className="w-full bg-white dark:bg-gray-900 min-h-max mb-36">
        <div className="flex flex-col  lg:px-8 md:px-7 px-4 lg:py-20 md:py-10 py-6 justify-between overflow-y-auto">
          <div>
            <p className="lg:text-4xl text-3xl font-black leading-9 text-gray-800 dark:text-white">Summary</p>
            <div className="flex items-center justify-between pt-16">
              <p className="text-base leading-none text-gray-800 dark:text-white">Subtotal</p>
              <p className="text-base leading-none text-gray-800 dark:text-white">$9,000</p>
            </div>
            <div className="flex items-center justify-between pt-5">
              <p className="text-base leading-none text-gray-800 dark:text-white">Shipping</p>
              <p className="text-base leading-none text-gray-800 dark:text-white">$30</p>
            </div>
            <div className="flex items-center justify-between pt-5">
              <p className="text-base leading-none text-gray-800 dark:text-white">Tax</p>
              <p className="text-base leading-none text-gray-800 dark:text-white">$35</p>
            </div>
          </div>
          <div>
            <div className="flex items-center pb-6 justify-between lg:pt-5 pt-20">
              <p className="text-2xl leading-normal text-gray-800 dark:text-white">Total</p>
              <p className="text-2xl font-bold leading-normal text-right text-gray-800 dark:text-white">$10,240</p>
            </div>
            <button className="text-base leading-none w-full py-5 bg-gray-800 border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white dark:hover:bg-gray-700">Checkout</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default cart