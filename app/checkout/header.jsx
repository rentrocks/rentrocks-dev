function CheckoutHeader({ product, isPaymentDone }) {
  return (
    <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
      {/* <a href="#" className="text-2xl font-bold text-gray-800">{product.productName}</a> */}
      <h1 className="text-2xl font-bold text-gray-700">Proceed to payment</h1>
      <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
        <div className="relative">
          <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
            <li className="flex items-center space-x-3 text-left sm:space-x-4">
              <a className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700" href="#"
              ><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg></a>
              <span className="font-semibold text-gray-900">Shop</span>
            </li>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            {
              isPaymentDone &&
              <p className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700" href="#">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </p>
            }
            <li className="flex items-center space-x-3 text-left sm:space-x-4">
              {!isPaymentDone && <p className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2">2</p>}
              <span className="font-semibold text-gray-900">Payment</span>
            </li>
            {!isPaymentDone && <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>}
            {
              isPaymentDone &&
              <a className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700" href="#">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </a>
            }
            <li className="flex items-center space-x-3 text-left sm:space-x-4">
              {!isPaymentDone && <p className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white">3</p>}
              <span className="font-semibold text-gray-500">Done</span>
            </li>
          </ul>
        </div>
      </div>
    </div>)
}

export default CheckoutHeader