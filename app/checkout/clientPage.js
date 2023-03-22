'use client'
import { useSplash } from "@/contexts/animations/splashContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { generateNewOrderId, getTxnStatus, getTxnToken } from "@/repositories/user_repository/userOrderRepository";
import { Product } from "@/repositories/product_repository/models/products";
import { getPublicProduct } from "@/repositories/product_repository/productsRepository";
import { useUser } from "@/contexts/userContext";
import { setUserOrder } from "@/repositories/user_repository/userRepository";
import CheckoutOrderSummary from "./orderSummary";
import PaymentDetails from "./paymentDetails";
import CheckoutHeader from "./header";
import PaymentSuccessCard from "./paymentSuccessPage";

export default function CheckOutClientPage({ productInString }) {
    const productObject = JSON.parse(productInString);
    const product = Product.fromJson(productObject)
    const { productId } = product;
    const [isLoading, setIsLoading] = useState(false)
    const { setLoader, showSuccess } = useSplash()
    const router = useRouter()
    const [isSuccess, setIsSuccess] = useState(false)
    const [isFailed, setIsFailed] = useState(false)
    const [error, setError] = useState(null)
    const { user } = useUser()


    const handleOnPayButton = async () => {
        if (!user || product.id === "" || product.price < 1) {
            alert("Somthing is missing")
            return;
        }
        try {
            const amount = product.getTotalPrice().toString();
            const custId = user.uid;
            const email = user.email;
            const firstName = user.displayName;
            const lastName = "-";
            const mobile = user.phoneNumber;
            const orderId = generateNewOrderId()

            setLoader(true)
            const txn = await getTxnToken({
                amount,
                orderId,
                custId,
                email,
                firstName,
                lastName,
                mobile,
            });
            console.log(txn);
            if (!txn) {
                alert("Txn not found")
                setIsLoading(false)
                return;
            }
            var config = {
                root: "",
                flow: "DEFAULT",
                data: {
                    orderId: orderId,
                    token: txn,
                    tokenType: "TXN_TOKEN",
                    amount: amount,
                    userDetail: {
                        mobileNumber: mobile,
                        name: `${firstName} ${lastName}`,
                    }
                },
                merchant: {
                    redirect: false,
                },
                handler: {
                    transactionStatus: async function (data) {
                        console.log("payment status ", data);
                        if (data.STATUS === 'TXN_SUCCESS') {
                            await setUserOrder(
                                {
                                    productId: productId,
                                    buyerId: user.uid,
                                    orderId: data.ORDERID,
                                    status: data.STATUS,
                                    productUserId: product.userId,
                                    amount: amount,
                                }
                            );
                            showSuccess()
                            setIsSuccess(true)
                        }
                        window.Paytm.CheckoutJS.close();
                    },
                    notifyMerchant: function (eventName, data) {
                        console.log("notifyMerchant handler function called");
                        console.log("eventName => ", eventName);
                        console.log("data => ", data);
                    }
                }
            };
            window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
                window.Paytm.CheckoutJS.invoke();
            }).catch(function onError(error) {
                console.log("error => ", error);
            })
            setLoader(false)
        } catch (error) {
            console.log("error => ", error);
            setError(error);
            setIsFailed(true)
        }


    }
    if (!productId) {
        return <>
            <h1>NO PRODUCT</h1>
        </>
    }

    if (isLoading) {
        return (
            <div className="flex flex-col justify-center items-center h-screen">
                <h1></h1>
            </div>)
    }

    if (product.id === "") {
        return <><h1>Cannot Fetch Product with this Id</h1></>
    }

    return (
        <>
            {/* Header for Checkout page */}
            <CheckoutHeader product={product} isPaymentDone={isSuccess} />
            <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
                {/* Order SUmmary */}
                <CheckoutOrderSummary product={product} />
                {/* Payment Details */}
                {!isSuccess &&
                    <PaymentDetails product={product} onClickPayButton={handleOnPayButton} />}
                {isSuccess &&
                    <PaymentSuccessCard product={product} />}
            </div>
        </>
    )
}
