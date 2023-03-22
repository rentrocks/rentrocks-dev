import ChatSideBar from "./chatSideBar";

export default function ChatLayout({ children }) {
    return <>
        <div className="flex gap-2">
            {/* sidebar */}
            <ChatSideBar />
            {/* main */}
            <main className="flex-1 overflow-y-auto">
                {children}
            </main>
        </div>
    </>
}