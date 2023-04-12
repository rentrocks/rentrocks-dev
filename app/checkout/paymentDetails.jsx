function PaymentDetails({ product, onClickPayButton }) {
    return (
        <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
            <p className="text-xl font-medium">Payment Details</p>
            <p className="text-gray-500 font-semibold text-base">Complete your order by providing your payment details.</p>
            <div className="">
                <label className="mt-4 mb-2 block text-sm font-medium">Email</label>
                <div className="relative">
                    <input type="text" id="email" name="email" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="your.email@gmail.com" />
                    <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                    </div>
                </div>
                <label className="mt-4 mb-2 block text-sm font-medium">Phone Number</label>
                <div className="flex flex-col sm:flex-row">
                    <div className="relative flex-shrink-0 sm:w-full">
                        <input type="number" id="phone-number" name="phone-number" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Phone Number" />
                        <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                            {/* <img className="h-4 w-4 object-contain" src="https://flagpack.xyz/_nuxt/4c829b6c0131de7162790d2f897a90fd.svg" alt="" /> */}
                            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M0 0h24v24H0z" fill="none" />
                                <path d="M16.5 21h-9c-.827 0-1.5-.673-1.5-1.5v-15c0-.827.673-1.5 1.5-1.5h9c.827 0 1.5.673 1.5 1.5v15c0 .827-.673 1.5-1.5 1.5zm-4.5-2h3v-1h-3v1zm2.5-16h-5v13h5V3z" />
                            </svg>


                        </div>
                    </div>
                    {/* <select type="text" name="billing-state" className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500">
                        <option value="State">State</option>
                    </select> */}
                    {/* <input type="text" name="billing-zip" className="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="ZIP" /> */}
                </div>
                <label className="mt-4 mb-2 block text-sm font-medium">Billing Address</label>
                <div className="flex flex-col sm:flex-row">
                    <div className="relative flex-shrink-0 sm:w-full">
                        <input type="text" id="billing-address" name="billing-address" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Street Address" />
                        <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                            {/* <img className="h-4 w-4 object-contain" src="https://flagpack.xyz/_nuxt/4c829b6c0131de7162790d2f897a90fd.svg" alt="" /> */}
                            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path d="M12 2c-4.97 0-9 4.03-9 9 0 5.25 8.18 12.35 8.5 12.68a1.002 1.002 0 0 0 1.41 0C12.82 23.35 21 16.25 21 11c0-4.97-4.03-9-9-9zm0 14.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z" />
                                <path d="M0 0h24v24H0z" fill="none" />
                            </svg>

                        </div>
                    </div>
                    {/* <select type="text" name="billing-state" className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500">
                        <option value="State">State</option>
                    </select> */}
                    {/* <input type="text" name="billing-zip" className="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="ZIP" /> */}
                </div>

                <div className="mt-6 border-t border-b py-2">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">Subtotal</p>
                        <p className="font-semibold text-gray-900">₹ {product.price}</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">Shipping</p>
                        <p className="font-semibold text-gray-900">₹ {product.getTax()}</p>
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-between">
                    <p className="text-xl font-medium text-gray-900">Total</p>
                    <p className="text-2xl font-semibold text-gray-900">₹ {product.getTotalPrice()}</p>
                </div>
            </div>
            <button onClick={onClickPayButton} className="mt-4 mb-8 w-full rounded-md bg-pink-600 px-6 py-3 font-medium text-white  hover:bg-black hover:text-white text-lg">Place Order</button>
        </div>)
}

export default PaymentDetails