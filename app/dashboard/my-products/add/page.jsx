'use client'

import { useAuth } from "@/contexts/authContext";
import { useProductForm } from "@/contexts/form/productFormContext";
import { getLabelFromImageLink, uploadAndGetImageLink } from "@/repositories/product_repository/clientProductRepository";
import { Product } from "@/repositories/product_repository/models/products";
import { useEffect, useState } from "react";
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'


export default function Page() {
    const {
        product,
        setProductName,
        setDescription,
        setBrand,
        setPrice,
        setQuantity,
        addPhoto,
        removePhoto,
        setProductVideo,
        setCategories,
        addHighlights,
        removeHighlights,
        addSpecifications,
        removespecifications,
        setAddress,
        setAvailablility,
        setLocation,
        addTags,
        removeTags,
        addphotoLabelsList,
        addphotoLabel,
        removephotoLabel,
        isLoading,
        imageUploading,
        image,
        handleUploadImage,
        handleOnImageSelect,
        clearProduct,
        handleSubmit,
        isReadyForFinalSubmit
    } = useProductForm()

    return (
        <div className="p-2">
            {/* {JSON.stringify(product.toJson())} */}
            <div className="flex justify-evenly gap-2 p-5">
                <form onSubmit={(e) => { handleSubmit(e) }} className="group p-4 space-y-2 rounded-xl bg-white border-1">
                    <div className="border-b-[1.5px] group-hover:border-[#413df7]">
                        <h1 className="py-3 font-bold text-[#243b53] text-lg">Add Product Details</h1>
                    </div>
                    <div className="pb-3"></div>
                    <div className="flex flex-col">
                        <label className="text-[#43576c] font-semibold py-2">Product Name <span className="text-red-500">*</span></label>
                        <input onChange={(v) => { setProductName(v.target.value) }} value={product.productName} type="text" className="p-3 font-bold bg-[#f6f9fd] border-[1px] rounded-lg hover:border-dotted border-[#d7dbe1] focus:border-[#abadaf] focus:outline-none" required />
                    </div>
                    <div className="flex gap-2">
                        <div className="flex flex-col">
                            <label className="text-[#43576c] font-semibold py-2">Price <span className="text-red-500">*</span></label>
                            <input onChange={(v) => { setPrice(v.target.value) }} value={product.price} type="number" className="p-3 font-bold bg-[#f6f9fd] border-[1px] rounded-lg hover:border-dotted border-[#d7dbe1] focus:border-[#abadaf] focus:outline-none" required />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-[#43576c] font-semibold py-2">Quantity <span className="text-red-500">*</span></label>
                            <input onChange={(v) => { setQuantity(v.target.value) }} value={product.quantity} type="number" className="p-3 font-bold bg-[#f6f9fd] border-[1px] rounded-lg hover:border-dotted border-[#d7dbe1] focus:border-[#abadaf] focus:outline-none" required />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-[#43576c] font-semibold py-2">Description <span className="text-red-500">*</span></label>
                        <input onChange={(v) => { setDescription(v.target.value) }} value={product.description} type="text" className="p-3 font-bold bg-[#f6f9fd] border-[1px] rounded-lg hover:border-dotted border-[#d7dbe1] focus:border-[#abadaf] focus:outline-none" required />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-[#43576c] font-semibold py-2">Categories <span className="text-red-500">*</span></label>
                        <div className="flex gap-2">
                            <select onChange={(v) => { setCategories(v.target.value) }} value={product.categories} name="categories" id="categories" className="p-3 font-bold bg-[#f6f9fd] border-[1px] rounded-lg hover:border-dotted border-[#d7dbe1] focus:border-[#abadaf] focus:outline-none" required>
                                {
                                    Product.categoryList.map((category) => {
                                        return (
                                            <option className="p-2" key={category} value={category}>{category}</option>
                                        )
                                    })
                                }
                            </select>

                        </div>

                    </div>
                    <div className="flex flex-col">
                        <label className="text-[#43576c] font-semibold py-2">Add Youtube Video</label>
                        <input onChange={(v) => { setProductVideo(v.target.value) }} value={product.productVideo} type="text" className="p-3 font-bold bg-[#f6f9fd] border-[1px] rounded-lg hover:border-dotted border-[#d7dbe1] focus:border-[#abadaf] focus:outline-none" />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-[#43576c] font-semibold py-2">Address <span className="text-red-500">*</span></label>
                        <input onChange={(v) => { setAddress(v.target.value) }} value={product.address} type="text" className="p-3 font-bold bg-[#f6f9fd] border-[1px] rounded-lg hover:border-dotted border-[#d7dbe1] focus:border-[#abadaf] focus:outline-none" required />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-[#43576c] font-semibold py-2">Pin Location [PENDING]</label>
                        <input type="text" className="p-3 font-bold bg-[#f6f9fd] border-[1px] rounded-lg hover:border-dotted border-[#d7dbe1] focus:border-[#abadaf] focus:outline-none" />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-[#43576c] font-semibold py-2">Highlights [PENDING]</label>
                        <div className="flex gap-2">
                            <input type="text" className="flex-1 p-3 font-bold bg-[#f6f9fd] border-[1px] rounded-lg hover:border-dotted border-[#d7dbe1] focus:border-[#abadaf] focus:outline-none" />
                            <button type="button" className="px-3 py-2 hover:bg-blue-600 bg-[#413df7] text-white rounded-lg">Add</button>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-[#43576c] font-semibold py-2">Specifications [PENDING]</label>
                        <div className="flex gap-2">
                            <input type="text" className="flex-1 p-3 font-bold bg-[#f6f9fd] border-[1px] rounded-lg hover:border-dotted border-[#d7dbe1] focus:border-[#abadaf] focus:outline-none" />
                            <button type="button" onClick={(e) => { }} className="px-3 py-2 hover:bg-blue-600 bg-[#413df7] text-white rounded-lg">Add</button>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-[#43576c] font-semibold py-2">Tags [PENDING]</label>
                        <div className="flex gap-2">
                            <input type="text" className="flex-1 p-3 font-bold bg-[#f6f9fd] border-[1px] rounded-lg hover:border-dotted border-[#d7dbe1] focus:border-[#abadaf] focus:outline-none" />
                            <button type="button" onClick={(e) => { }} className="px-3 py-2 hover:bg-blue-600 bg-[#413df7] text-white rounded-lg">Add</button>
                        </div>
                    </div>
                    {!isLoading && <div className="pt-4 flex">
                        <button type="submit" className="px-3 py-2 w-full hover:bg-blue-600 bg-[#413df7] text-white rounded-lg">Submit</button>
                    </div>}
                    {isLoading && <div className="pt-4 flex">
                        <div className="px-3 py-2 w-full hover:bg-blue-600 bg-[#413df7] text-white rounded-lg">Loading ...</div>
                    </div>}
                </form>

                <form onSubmit={(e) => { handleSubmit(e) }}>
                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                            <h1 className="py-3 font-bold text-[#243b53] text-lg">Add Product Details</h1>
                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-4">
                                    <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                        Username
                                    </label>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                            <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">workcation.com/</span>
                                            <input
                                                type="text"
                                                name="username"
                                                id="username"
                                                autoComplete="username"
                                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                placeholder="janesmith"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-full">
                                    <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                        About
                                    </label>
                                    <div className="mt-2">
                                        <textarea
                                            id="about"
                                            name="about"
                                            rows={3}
                                            className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                                            defaultValue={''}
                                        />
                                    </div>
                                    <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
                                </div>
                            </div>
                        </div>
                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>
                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                        First name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="first-name"
                                            id="first-name"
                                            autoComplete="given-name"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-3">
                                    <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                        Last name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="last-name"
                                            id="last-name"
                                            autoComplete="family-name"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-4">
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                        Email address
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-3">
                                    <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                        Country
                                    </label>
                                    <div className="mt-2">
                                        <select
                                            id="country"
                                            name="country"
                                            autoComplete="country-name"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                        >
                                            <option>United States</option>
                                            <option>Canada</option>
                                            <option>Mexico</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-span-full">
                                    <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                                        Street address
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="street-address"
                                            id="street-address"
                                            autoComplete="street-address"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-2 sm:col-start-1">
                                    <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                        City
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="city"
                                            id="city"
                                            autoComplete="address-level2"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                                        State / Province
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="region"
                                            id="region"
                                            autoComplete="address-level1"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                                        ZIP / Postal code
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="postal-code"
                                            id="postal-code"
                                            autoComplete="postal-code"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Save
                        </button>
                    </div>
                </form>

                {/* image updload form */}
                <form onSubmit={(e) => { handleUploadImage(e) }} className="w-[40%] group space-y-2 justify-start gap-3 p-4 rounded-xl bg-white border-1">
                    <div className="border-b-[1.5px] group-hover:border-[#413df7]">
                        <h1 className="py-3 font-bold text-[#243b53] text-lg">Add Product Images</h1>
                    </div>
                    <ul>
                        {product.photoList.map(src => (
                            <li className="py-2" key={src}>
                                <img className="rounded-lg w-full" src={src} alt="" />
                            </li>
                        ))}
                    </ul>
                    <label className="text-[#43576c] font-semibold py-2">Photo Labels</label>
                    <ul className="flex flex-wrap gap-2">
                        {product.photoLabels.map(label => (
                            <li className="py-1 px-4 bg-blue-100 rounded-full " key={label.mid}>{label.description}</li>
                        ))}
                    </ul>
                    <div className="flex  flex-col space-y-2">
                        {/* <input onChange={(event) => { handleOnImageSelect(event) }} type="file" className="p-3 font-bold bg-[#f6f9fd] border-[1px] rounded-lg hover:border-dotted border-[#d7dbe1] focus:border-[#abadaf] focus:outline-none" /> */}
                        <div className="col-span-full">
                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                <div className="text-center">
                                    <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                        <label
                                            htmlFor="file-upload"
                                            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                        >
                                            <span>Upload a file</span>
                                            <input onChange={(event) => { handleOnImageSelect(event) }} id="file-upload" name="file-upload" type="file" className="sr-only" />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                </div>
                            </div>
                        </div>
                        <div className="pt-4 flex">
                            <button type="submit" className="px-3 py-2 w-full hover:bg-blue-600 bg-[#413df7] text-white rounded-lg">{imageUploading ? 'Loading ...' : 'Add'}</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
