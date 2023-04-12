import { Product } from "@/repositories/product_repository/models/products";
import Link from "next/link";
import AddToCartButton from "./addToCartButton";
import BuyNowButton from "./buyNowButton";
import AddToFavButton from "./addToFavoriteButton";
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
        <div className="relative">
          <img className="rounded-xl h-80 w-auto object-cover" src={product.photoList[0] ? product.photoList[0] : "/empty-product-image.png"} />
          <AddToFavButton productId={product.productId} />
          <div className="p-2">
            <div className="flex flex-1 justify-between pt-2 sm:max-w-xl">
              <h1 className="font-semibold text-gray-800 text-md">{product.productName}</h1>
              <div className="flex items-center">
                <svg className="w-4 h-4 text-black fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M11.93 2.201a1 1 0 0 0-1.86 0l-2.11 5.166-5.898.856a1 1 0 0 0-.553 1.705l4.768 4.122L4.532 18.8a1 1 0 0 0 1.458 1.053L12 16.64l5.009 2.213a1 1 0 0 0 1.458-1.053l-1.529-5.61 4.768-4.122a1 1 0 0 0-.552-1.704l-5.898-.857-2.11-5.165z" />
                </svg>
                <span className="text-gray-700 text-sm ml-1 font-medium">4.9</span>
              </div>
            </div>
            <h1 className="text-md text-gray-500">{product.description}</h1>
            <h1 className="font-bold pt-2">₹{product.price} <span className="font-normal">Only/_</span></h1>
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

