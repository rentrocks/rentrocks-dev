import { Product } from "@/repositories/product_repository/models/products";
import { getPublicProductList } from "@/repositories/product_repository/productsRepository";
import Link from "next/link";
import ProductCard from "../product_card/ProductCard";

export default async function ProductPage({ productData }) {
    const product = Product.getCopyProduct(productData)
    const productListRes = getPublicProductList();
    const [productList] = await Promise.all([productListRes]);


    return (
        <>
            <section className="text-gray-600 body-font overflow-hidden">
                <div className="container px-5 py-4 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap pb-2">
                        <img
                            alt="ecommerce"
                            className="lg:w-1/2 w-full lg:h-96 mt-8 h-64 object-cover object-center rounded"
                            src={product?.photoList[0] ? product?.photoList[0] : "/empty-product-image.png"}
                        />
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h1 className="text-gray-900 text-3xl title-font mb-2 font-semibold">{product.productName}</h1>
                            <p className="text-sm  text-gray-500  font-semibold mb-2">{product.description}</p>
                            <div className="flex mb-4">
                                <span className="flex items-center">
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <span className="text-gray-600 ml-3">({`${product.getAvgRating()}`})</span>
                                </span>
                            </div>
                            <hr className="mb-3" />
                            <h1 className="text-gray-900 text-xl title-font mb-1 font-bold">$5000.00 or 99.99/month</h1>
                            <p className="leading-relaxed text-xs font-semibold text-gray-500">Fam locavore kickstarter distillery.</p>
                            {/* <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                                <div className="flex">
                                    <span className="mr-3 text-gray-700 font-semibold">Choose a Color</span>
                                    <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
                                    <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
                                    <button className="border-2 border-gray-300 ml-1 bg-indigo-500 rounded-full w-6 h-6 focus:outline-none"></button>
                                </div>
                                <div className="flex ml-6 items-center">
                                    <span className="mr-3">Size</span>
                                    <div className="relative">
                                        <select className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10">
                                            <option>SM</option>
                                            <option>M</option>
                                            <option>L</option>
                                            <option>XL</option>
                                        </select>
                                        <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                                                <path d="M6 9l6 6 6-6"></path>
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </div> */}
                            <div className="py-4">
                                {/* <div className="flex items-center space-x-6 mb-5">
                                    <div className="items-center">
                                        <button className="flex items-center px-6 py-3 rounded-full bg-gray-100 text-gray-600 space-x-6">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M10 0a1 1 0 011 1v8h8a1 1 0 110 2h-8v8a1 1 0 11-2 0v-8H1a1 1 0 110-2h8V1a1 1 0 011-1z" />
                                            </svg>
                                            <span className="text-sm font-medium">1</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M1 10a1 1 0 011-1h16a1 1 0 110 2H2a1 1 0 01-1-1zM10 0a1 1 0 011 1v18a1 1 0 11-2 0V1a1 1 0 011-1z" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="font-semibold text-gray-500">
                                        Only <span className="text-orange-500">12 items</span> left! Dont miss it.
                                    </div>
                                </div> */}

                                <div className="flex space-x-4">
                                    {/* <!-- component --> */}
                                    <button role="button" className="bg-green-800 text-white hover:bg-white hover:text-green-800 text-sm px-8 py-2 md:px-10 md:py-2 border rounded-full">
                                        Add To Cart
                                    </button>
                                    <Link href={`/checkout?productId=${product.productId}`}>
                                        <p role="button" className="bg-white hover:bg-green-800 text-green-800 hover:text-white  text-sm px-8 py-2 md:px-10 md:py-2 border rounded-full">
                                            Buy Now
                                        </p>
                                    </Link>

                                </div>
                                <div className="pt-4">
                                    <div className="flex items-center border border-gray-300 max-w-sm space-x-4 p-3">
                                        <div>
                                            <img className="w-8 h-8" src="https://toppng.com/uploads/preview/cartoon-cars-clip-art-orange-car-115630024247ielv4rvc7.png" />
                                        </div>
                                        <div>
                                            <h3 className="text-md font-bold">Free Delivery</h3>
                                            <p className="text-sm underline underline-offset-3 text-gray-500 font-semibold">Enter your postal code for delivery.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center border border-gray-300 max-w-sm space-x-4 p-3">
                                        <div>
                                            <img className="w-8 h-8" src="https://toppng.com/uploads/preview/cartoon-cars-clip-art-orange-car-115630024247ielv4rvc7.png" />
                                        </div>
                                        <div>
                                            <h3 className="text-md font-bold">Free Delivery</h3>
                                            <p className="text-sm underline underline-offset-3 text-gray-500 font-semibold">Enter your postal code for delivery.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h1 className="text-lg font-bold leading-6 text-gray-600 capitalize relative pb-4">SIMILAR PRODUCTS</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Todo Now */}
                        {productList.map((e) => {
                            return <ProductCard key={e.productId} productData={e} />;
                        })}
                    </div>
                </div>
            </section>
        </>
    );
}