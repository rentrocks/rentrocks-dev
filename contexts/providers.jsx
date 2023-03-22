'use client';

import { SplashProvider } from "./animations/splashContext";
import { AuthProvider } from "./authContext";
import { ChatLayoutProvider } from "./dashboard/chatLayoutContext";
import { ProductFormProvider } from "./form/productFormContext";
import { UserProvider } from "./userContext";


export function Providers({ children }) {
    return (
        <SplashProvider>
            <AuthProvider>
                <UserProvider>
                    <ProductFormProvider>
                        <ChatLayoutProvider>
                            {children}
                        </ChatLayoutProvider>
                    </ProductFormProvider>
                </UserProvider>
            </AuthProvider>
        </SplashProvider>
    );
}