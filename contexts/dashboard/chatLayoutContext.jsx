const { createContext, useState, useContext } = require("react");

const ChatLayoutContext = createContext()

export function ChatLayoutProvider({ children }) {
    const [currentChatRoom, setCurrentChatRoom] = useState(null)
    const [order, setOrder] = useState(null)
    const [product, setProduct] = useState(null)
    const [isIamBuyer, setIsIamBuyer] = useState(null)

    return (
        <ChatLayoutContext.Provider value={{ isIamBuyer, setIsIamBuyer, currentChatRoom, setCurrentChatRoom, order, setOrder, product, setProduct, }}>
            {children}
        </ChatLayoutContext.Provider>
    )
}

export const useChatLayout = () => useContext(ChatLayoutContext)