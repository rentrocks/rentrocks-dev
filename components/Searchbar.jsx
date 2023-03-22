import { MagnifyingGlassCircleIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import React from 'react'

const Searchbar = () => {
  return (
    <div className='px-3'>
      <div className="items-center">
      <div className="w-full px-4  rounded-full bg-[#f5f7f9] flex items-center flex-grow">
        <input className="pl-2 py-2 md:py-2 bg-transparent outline-none w-full" placeholder="Search Product" />
        <MagnifyingGlassIcon className='w-5 h-5 font-bold text-[#726f72]' />
      </div>
    </div>
    </div>
  )
}

export default Searchbar