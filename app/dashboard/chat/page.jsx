'use client'

import { useChatLayout } from "@/contexts/dashboard/chatLayoutContext"
import ChatBox from "./chatBox"

export default function ChatPage() {
    const { currentChatRoom, order, product, isIamBuyer } = useChatLayout()
    if (!currentChatRoom) {
        return <>
            <h1>Select Chat To Start</h1>
        </>
    }
    return <>
        <div className="space-y-2">
            <div className="bg-blue-100 p-2 rounded-xl">
                <p>{isIamBuyer ? order.productUserName : order.buyerName}</p>
                <p>{isIamBuyer ? order.productUserEmail : order.buyerEmail}</p>
                <p>Product : {product.productName} - {order.orderId}</p>
            </div>
            <ChatBox chatId={currentChatRoom.chatId} />
        </div>
    </>
}