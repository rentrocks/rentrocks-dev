import { createContext, useContext, useState } from "react";

const CartSideBarContext = createContext()

export default function CartSideBarProvider({ children }) {
    const [isOpen, setIsOpen] = useState(false)
    return <CartSideBarContext.Provider value={{ isOpen, setIsOpen }}>
        {children}
    </CartSideBarContext.Provider>
}

export const useCartSidebar = () => useContext(CartSideBarContext)