'use client'

import { useAuth } from "@/contexts/authContext"
import { useChatLayout } from "@/contexts/dashboard/chatLayoutContext"
import { getOrderSnapshot } from "@/repositories/order_repository/clientOrderRepository"
import { getOrder } from "@/repositories/order_repository/orderRepository"
import { getPublicProduct } from "@/repositories/product_repository/productsRepository"
import { getChatRoom } from "@/repositories/user_repository/chatRepository"
import { getRTDBUserDetailsSnapshot } from "@/repositories/user_repository/presenceRepository"
import { useEffect, useState } from "react"

export default function ChatRoomCard({ chatId }) {
    const {
        chatRoom,
        isLoading,
    } = getChatRoom(chatId)


    if (isLoading) {
        return <div>
            <p>Loading ...</p>
        </div>
    }
    if (!chatRoom) {
        return <div>
            <p>Invalid Chat</p>
        </div>
    }

    return (<>
        <div className="p-3">
            <Card productId={chatRoom.productId} chatId={chatId} orderId={chatRoom.orderId} chatRoom={chatRoom} />
        </div>
    </>)

}

function Card({ chatRoom }) {
    const { currentUser } = useAuth()
    const [product, setProduct] = useState(null)
    const [order, setOrder] = useState(null)
    const [isLoading, setLoading] = useState(true)
    const { setIsIamBuyer, currentChatRoom, setCurrentChatRoom, setOrder: setOrderInContext, setProduct: setProductInContext } = useChatLayout()

    const fetchProduct = async () => {
        setLoading(true)
        const data = await getPublicProduct(chatRoom.productId)
        setProduct(data)
        const orderData = await getOrder(chatRoom.orderId)
        setOrder(orderData)
        setLoading(false)
    }
    useEffect(() => {
        fetchProduct();
    }, [chatRoom])

    const isIamBuyer = order ? (order.buyerId === currentUser.uid) : null;
    const isThisIsMyProduct = (product && order) ? order.buyerId === order.productUserId : null;
    const {
        user
    } = getRTDBUserDetailsSnapshot((order && !isThisIsMyProduct) ? (isIamBuyer ? order.productUserId : order.buyerId) : null);


    if (isLoading) {
        return <div>
            <p>Loading...</p>
        </div>
    }
    if (product.isEmpty()) {
        return <div>
            <p>Invalid Product Id</p>
        </div>
    }

    return <button onClick={() => {
        if (!isThisIsMyProduct) {
            setCurrentChatRoom(chatRoom)
            setOrderInContext(order)
            setProductInContext(product)
            setIsIamBuyer(isIamBuyer)
        } else {
            setCurrentChatRoom(null)
            setOrderInContext(null)
            setProductInContext(null)
            setIsIamBuyer(null)
        }
    }}>
        <div className={`flex gap-1 ${chatRoom.chatId === currentChatRoom?.chatId ? "bg-blue-700 text-white" : ''} content-start rounded-md px-3 py-2`}>
            <img className="w-10 h-10 object-cover rounded-full" src={product.photoList[0] ? product.photoList[0] : '/empty-product-image.png'} alt="" />
            <div className="justify-items-start">
                {isThisIsMyProduct && <p>This is My Product</p>}
                <div><h1 className="font-bold">{(isIamBuyer) ? order.productUserName : order.buyerName}</h1></div>
                <div><p>{product.productName}</p></div>
                {!isThisIsMyProduct && <p> {isIamBuyer ? "My Dealer" : "My Customer"}</p>}
                {user && <p>{user.isOnline ? 'online'
                    :
                    `Last Seen ${new Date(user.lastSeen).toLocaleString()}`
                }</p>}
            </div>
        </div>
    </button >
}