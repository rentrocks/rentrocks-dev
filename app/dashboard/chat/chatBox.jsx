'use client'

import { useAuth } from "@/contexts/authContext"
import { useChatLayout } from "@/contexts/dashboard/chatLayoutContext"
import { getChatRoomMessage, sendMessage } from "@/repositories/user_repository/chatRepository"
import { useState } from "react"

export default function ChatBox({ chatId }) {
    const { messages, isLoading } = getChatRoomMessage(chatId)
    const [message, setMessage] = useState("")
    const [isSending, setIsSending] = useState(false)
    const { currentUser } = useAuth()
    const { currentChatRoom } = useChatLayout()

    const handleSubmit = async () => {
        if (message === "" || isSending) {
            return;
        }
        setMessage("")
        console.log('send message');
        setIsSending(true)
        try {
            await sendMessage(currentChatRoom.chatId, message, currentUser.uid);
        } catch (error) {
            alert(error.message)
        }
        setIsSending(false)
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!messages) {
        return <div>No messages</div>
    }

    return (
        <div className="flex flex-col justify-end">
            <div className="flex flex-col justify-end space-y-1">
                {messages.map(message => (
                    <MessageCard key={message.messageId} message={message} />
                ))}
            </div>
            <div className="flex justify-end fixed bottom-0 p-2">
                {/* send message with button  */}
                <div className="flex items-center justify-center gap-2">
                    <input onChange={(e) => { setMessage(e.target.value) }} value={message} type='text' className="flex-1 border shadow p-2 rounded-full outline-1" />
                    <div className="flex items-center justify-center gap-2">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={() => { handleSubmit() }}
                        >
                            {isSending ? "Sending..." : "Send"}
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )

}


function MessageCard({ message }) {
    const { currentUser } = useAuth()
    const isMe = currentUser.uid === message.uid;
    if (message.uid === 'superAdmin') {
        return <div className="flex justify-center">
            <p className="text-white bg-gray-600 text-sm px-2 py-1 rounded-full">{message.message}</p>
        </div>
    }
    return <div className="w-full p-1">
        <div className={`${isMe ? "justify-end" : ""} flex`}>
            <h1 className={`rounded-tl-full rounded-tr-full p-3 text-sm ${isMe ? `bg-blue-600 text-white rounded-bl-full`  : `text-gray-700 bg-slate-200 rounded-br-full`}`}>{message.message}</h1>
        </div>
    </div>
}