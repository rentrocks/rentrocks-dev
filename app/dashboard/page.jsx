'use client'

import { useAuth } from "@/contexts/authContext";
export default function Dashboard() {
    const { currentUser, logout } = useAuth()
    return <>
        <>HOme Page-{currentUser.email}</>
    </>
}

