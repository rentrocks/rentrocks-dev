import { Product } from "@/repositories/product_repository/models/products";
import Link from "next/link";
import AddToCartButton from "./addToCartButton";
import BuyNowButton from "./buyNowButton";
export default function ProductCard({ productData }) {
  const product = Product.getCopyProduct(productData)
  return (

    <div className="p-4 sm:mb-0 mb-6">
      <Link href={`/${product.productId}`}>
        <div className="relative max-w-full h-64 rounded-md">
          <img
            alt="content"
            className="object-cover h-full w-full rounded-md"
            src={
              product.photoList[0]
                ? product.photoList[0]
                : "/empty-product-image.png"
            }
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
      </Link>
      {product.isAvailable && <div className="pt-3 w-full flex flex-col md:flex-row justify-between">
        <AddToCartButton productId={product.productId} />
        <div className="md:px-1 py-1"></div>
        <BuyNowButton productId={product.productId} />
      </div>}
      {!product.isAvailable && <div className="pt-3 w-full flex flex-col md:flex-row justify-between">
        <p className="text-sm text-red-600">Currently Not Availble</p>
      </div>}
    </div>
  );
};

