'use client'

import { useAuth } from "@/contexts/authContext";
import { useProductForm } from "@/contexts/form/productFormContext";
import { getLabelFromImageLink, uploadAndGetImageLink } from "@/repositories/product_repository/clientProductRepository";
import { Product } from "@/repositories/product_repository/models/products";
import { useEffect, useState } from "react";


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
            {JSON.stringify(product.toJson())}
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
                        <label className="text-[#43576c] font-semibold py-2">Product Image</label>
                        <input onChange={(event) => { handleOnImageSelect(event) }} type="file" className="p-3 font-bold bg-[#f6f9fd] border-[1px] rounded-lg hover:border-dotted border-[#d7dbe1] focus:border-[#abadaf] focus:outline-none" />


                        <div className="pt-4 flex">
                            <button type="submit" className="px-3 py-2 w-full hover:bg-blue-600 bg-[#413df7] text-white rounded-lg">{imageUploading ? 'Loading ...' : 'Add'}</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
