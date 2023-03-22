'use client'

import { useAuth } from "@/contexts/authContext";
import { deleteOldNotification, getNotification, getOldNotification, markNotificationAsRead } from "@/repositories/user_repository/notificationRepository";
import { useState } from "react";
export default function NotificationWidget() {
    const [seeOldNotifications, setSeeOldNotifications] = useState(false)
    const { notificationList, isLoading } = getNotification()
    if (isLoading) {
        return <div>Loading...</div>
    }
    if (notificationList.length === 0) {
        return <>
            <p>No Notification</p>
        </>
    }
    return <>
        <div className="p-2">
            <div className="p-3">
                <h3 className="font-bold text-red-600 p-2 rounded-lg bg-red-100">
                    Notifications
                </h3>
            </div>
            {notificationList.map((notification) => {
                return (
                    <NotificationCard key={notification.id} isOldNotification={false} notification={notification} />
                )
            })}
            {!seeOldNotifications && <div className="p-3">
                <button onClick={() => { setSeeOldNotifications(true) }}>
                    See old Notifications
                </button>
            </div>}
            {seeOldNotifications && <div>
                <OldNotificationWidget />
            </div>}
        </div>
    </>
}
export function OldNotificationWidget() {
    const { notificationList, isLoading } = getOldNotification()
    if (isLoading) {
        return <div>Loading...</div>
    }
    if (notificationList.length === 0) {
        return <>
            <p>No Notification</p>
        </>
    }
    return <>
        <div className="p-2">
            {notificationList.map((notification) => {
                return (
                    <NotificationCard key={notification.id} isOldNotification={true} notification={notification} />
                )
            })}
        </div>
    </>
}


function NotificationCard({ notification, isOldNotification }) {
    const { currentUser } = useAuth()
    return <>
        <div className="p-3 cursor-pointer">
            <p className="font-bold text-sm">{notification.title}</p>
            <p className="text-sm">{notification.body}</p>
            <button onClick={() => {
                if (isOldNotification) {
                    deleteOldNotification({
                        notification: notification,
                        uid: currentUser.uid,
                    })
                } else {
                    markNotificationAsRead({
                        notification: notification,
                        uid: currentUser.uid,
                    })
                }

            }} className="text-blue-700 underline">{isOldNotification ? "Delete" : "mark as read"}</button>
        </div>
    </>
}