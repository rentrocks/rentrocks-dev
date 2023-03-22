'use client'

import { useAuth } from "@/contexts/authContext"
import { getChatRooms } from "@/repositories/user_repository/chatRepository"
import ChatRoomCard from "./chatRoomCard"
export default function ChatSideBar() {
    const { currentUser } = useAuth()
    const {
        chatRoomsIds,
        chatRooms,
        isLoading,
    } = getChatRooms(currentUser.uid)

    if (isLoading) {
        return <div>
            <p>Loading ...</p>
        </div>
    }
    if (!chatRoomsIds) {
        return <div>
            <p>No chat rooms</p>
        </div>
    }

    return <div className="bg-blue-100 h-screen rounded-lg">
        <ul>
            {
                chatRoomsIds.map((id) => {
                    return <li key={id}>
                        <ChatRoomCard chatId={id} />
                    </li>
                })
            }
        </ul>
    </div>

}