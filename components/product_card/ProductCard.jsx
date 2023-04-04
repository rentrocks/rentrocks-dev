import { Product } from "@/repositories/product_repository/models/products";
import Link from "next/link";
import AddToCartButton from "./addToCartButton";
import BuyNowButton from "./buyNowButton";
export default function ProductCard({ productData }) {
  const product = Product.getCopyProduct(productData)
  return (

    <div>
      {/* <Link href={`/${product.productId}`}>
        <div className="relative max-w-full h-64 rounded-md">
        <img
  alt="content"
  className="object-cover h-52 sm:h-full md:h-full lg:h-full xl:h-full w-full rounded-md"
  src={product.photoList[0] ? product.photoList[0] : "/empty-product-image.png"}
/>

        </div>
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-medium text-gray-900 pt-3">
              {product.productName}
            </h2>
            <p className="text-sm font-semibold text-gray-500">
              {product.description}
            </p>
          </div>
          <div className="pt-3 font-semibold">₹ {product.price}</div>
        </div>
        <div className="pt-2 flex items-center">
          <svg
            width="20"
            height="20"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon
              points="50,10 65,40 95,40 70,60 80,90 50,75 20,90 30,60 5,40 35,40"
              style={{ fill: "green", stroke: "green", strokeWidth: 1 }}
            />
          </svg>
          <svg
            width="20"
            height="20"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon
              points="50,10 65,40 95,40 70,60 80,90 50,75 20,90 30,60 5,40 35,40"
              style={{ fill: "green", stroke: "green", strokeWidth: 1 }}
            />
          </svg>
          <svg
            width="20"
            height="20"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon
              points="50,10 65,40 95,40 70,60 80,90 50,75 20,90 30,60 5,40 35,40"
              style={{ fill: "green", stroke: "green", strokeWidth: 1 }}
            />
          </svg>
          <svg
            width="20"
            height="20"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon
              points="50,10 65,40 95,40 70,60 80,90 50,75 20,90 30,60 5,40 35,40"
              style={{ fill: "green", stroke: "green", strokeWidth: 1 }}
            />
          </svg>
          <svg
            width="20"
            height="20"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon
              points="50,10 65,40 95,40 70,60 80,90 50,75 20,90 30,60 5,40 35,40"
              style={{ fill: "green", stroke: "green", strokeWidth: 1 }}
            />
          </svg>
          <div>
            <p className="text-sm font-semibold text-gray-500 pl-5">
              4.5 star rating
            </p>
          </div>
        </div>
      </Link> */}
    <Link href={`/${product.productId}`}>
  <div class="relative">
    <img class="rounded-xl h-80 w-auto object-cover" src={product.photoList[0] ? product.photoList[0] : "/empty-product-image.png"} />
    <button class="absolute top-0 right-0 m-2 p-2 bg-transparent rounded-full">
    <svg class="w-8 h-8 border rounded-full p-1 text-pink-500 border-black fill-current hover:text-white hover:bg-pink-500  transition duration-300" viewBox="0 0 24 24">
  <path d="M12 21.35L10.55 20.03C4.69 14.17 2 11.29 2 7.5C2 4.42 4.42 2 7.5 2C9.05 2 10.5 2.66 11.74 3.65C12.94 2.67 14.45 2 16 2C19.08 2 21.5 4.42 21.5 7.5C21.5 11.29 18.81 14.17 12.95 20.04L12 21.35Z" />
</svg>

</button>

    <div class="p-2">
      <div class="flex flex-1 justify-between pt-2 sm:max-w-xl">
        <h1 class="font-semibold text-gray-800 text-md">{product.productName}</h1>
        <div class="flex items-center">
          <svg class="w-4 h-4 text-black fill-current" viewBox="0 0 24 24">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.93 2.201a1 1 0 0 0-1.86 0l-2.11 5.166-5.898.856a1 1 0 0 0-.553 1.705l4.768 4.122L4.532 18.8a1 1 0 0 0 1.458 1.053L12 16.64l5.009 2.213a1 1 0 0 0 1.458-1.053l-1.529-5.61 4.768-4.122a1 1 0 0 0-.552-1.704l-5.898-.857-2.11-5.165z"/>
          </svg>
          <span class="text-gray-700 text-sm ml-1 font-medium">4.9</span>
        </div>
      </div>
      <h1 class="text-md text-gray-500">{product.description}</h1>
      <h1 class="font-bold pt-2">₹{product.price} <span class="font-normal">Only/_</span></h1>
    </div>
  </div>
</Link>

      {product.isAvailable && <div className="pt-3 w-full flex  flex-row justify-between">
        <AddToCartButton productId={product.productId} />
        <div className="md:px-1 py-1"></div>
        <BuyNowButton productId={product.productId} />
      </div>}
      {!product.isAvailable && <div className="pt-3 w-full flex flex-col md:flex-row justify-between">
        <p className="text-sm font-medium pt-2 text-pink-600">Currently Not Availble</p>
      </div>}
    </div>
  );
};

