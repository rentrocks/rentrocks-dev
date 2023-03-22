import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function PaymentSuccessCard({ product }) {
    const [isAnimating, setIsAnimating] = useState(true);

    const animationVariants = {
        hidden: {
            opacity: 0,
            y: '100%',
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: 'easeInOut',
            },
        },
    };

    return (
        <div className='w-full p-2'>
            <motion.div
                initial="hidden"
                animate={isAnimating ? 'visible' : 'hidden'}
                variants={animationVariants}
                className="bg-white rounded-lg shadow-md overflow-hidden w-full mx-auto"
            >
                <div className="flex justify-center items-center bg-green-100 py-8">
                    <CheckCircleIcon className="h-12 w-12 text-green-500" />
                </div>
                <div className="p-6">
                    <h2 className="text-lg font-bold mb-2">Order Confirmation</h2>
                    <p className="text-gray-500 text-sm mb-4">
                        Thank you for your order! Your order details are below.
                    </p>
                    <div className="border border-gray-200 rounded-lg p-4 mb-4">
                        <h3 className="text-gray-700 font-semibold mb-2">Order Summary</h3>
                        <ul>
                            <li className="flex justify-between items-center text-gray-600 text-sm">
                                <span>Product Price</span>
                                <span>₹ {product.price}</span>
                            </li>
                            <li className="flex justify-between items-center text-gray-600 text-sm">
                                <span>Txn Tax</span>
                                <span>₹ {product.getTax()}</span>
                            </li>
                        </ul>
                        <div className="flex justify-between items-center mt-4">
                            <h4 className="text-gray-700 font-semibold">Total:</h4>
                            <span className="text-xl text-green-600 font-semibold">₹ {product.getTotalPrice()}</span>
                        </div>
                    </div>
                    {/* <div className="border border-gray-200 rounded-lg p-4 mb-4">
                        <h3 className="text-gray-700 font-semibold mb-2">Billing Address</h3>
                        <p className="text-gray-600 text-sm">
                            John Doe<br />
                            123 Main St.<br />
                            Anytown, USA 12345<br />
                        </p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4 mb-4">
                        <h3 className="text-gray-700 font-semibold mb-2">Shipping Address</h3>
                        <p className="text-gray-600 text-sm">
                            Jane Doe<br />
                            456 Oak St.<br />
                            Anytown, USA 12345<br />
                        </p>
                    </div> */}
                    <Link href={'dashboard/orders'}>
                        <p
                            className="bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600 transition-colors duration-300"

                        >
                            Go To Order Page
                        </p>
                    </Link>
                </div>
            </motion.div>
        </div>
    )
};


