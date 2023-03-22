import { rtdb } from "@/utils/firebaseClient"
import { child, onChildAdded, onChildChanged, onChildRemoved, onValue, push, ref, serverTimestamp, set, update } from "firebase/database"
import { useEffect, useState } from "react"

export const getChatRooms = (uid) => {
    const [chatRoomsIds, setChatRoomsIds] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const userChatIdRef = ref(rtdb, `user_chatIds/${uid}`)
    useEffect(() => {
        setIsLoading(true)
        const unsubscribe = onValue(userChatIdRef, (snapshot) => {
            setChatRoomsIds(Object.keys(snapshot?.val()))
            setIsLoading(false)
        })
        return () => unsubscribe();
    }, [uid])

    return {
        chatRoomsIds,
        isLoading,
    }

}

export const getChatRoom = (chatId) => {
    const [chatRoom, setChatRooms] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const chatRoomsRef = ref(rtdb, `chat_rooms/${chatId}`)
    useEffect(() => {
        setIsLoading(true)
        const unsub = onValue(chatRoomsRef, (snapshot) => {
            setChatRooms(snapshot?.val())
            setIsLoading(false)
        })
        return () => unsub()
    }, [chatId])

    return {
        chatRoom,
        isLoading,
    }
}

export const getChatRoomMetaData = (chatId) => {
    const [chatRoomsMetaData, setChatRoomsMetaData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const chatRoomMetaDataRef = ref(rtdb, `chat_metadata/${chatId}`)
    useEffect(() => {
        setIsLoading(true)
        const unsub = onValue(chatRoomMetaDataRef, (snapshot) => {
            setChatRoomsMetaData(Object.keys(snapshot?.val()))
            setIsLoading(false)
        })
        return () => unsub()
    }, [chatId])

    return {
        chatRoomsMetaData,
        isLoading,
    }
}

export const getChatRoomMessage = (chatId) => {
    const [messages, setMessages] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const chatRoomsRef = ref(rtdb, `messages/${chatId}`)
    useEffect(() => {
        setIsLoading(true)
        const unsub = onValue(chatRoomsRef, (snapshot) => {
            setMessages(Object.values(snapshot?.val()))
            setIsLoading(false)
        })
        return () => unsub()
    }, [chatId])

    return {
        messages,
        isLoading,
    }
}


export const sendMessage = async (chatId, message, uid) => {
    if (chatId === undefined || message === undefined || message === undefined) {
        alert('You must specify')
        return;
    }
    const newMessageId = `messageId${push(child(ref(rtdb), 'id')).key}`;
    const messageRef = ref(rtdb, `messages/${chatId}/${newMessageId}`)
    const data = {
        messageId: newMessageId,
        message: message,
        timestamp: serverTimestamp(),
        uid: uid,

    }
    await update(messageRef, data)
}