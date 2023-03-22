'use client'

import Link from "next/link";
export default function BuyNowButton({ productId}) {
  return (
    <div>
      <Link href={`checkout?productId=${productId}`}>
        <button className="w-full px-5 py-2 rounded-full hover:bg-gray-500  text-sm text-white font-semibold bg-slate-600">
          Buy Now
        </button>
      </Link>
    </div>
  );
}
