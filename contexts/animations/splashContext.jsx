'use client';
import { createContext, useContext, useEffect, useState } from 'react';

const SplashContext = createContext();

export function SplashProvider({ children }) {
    const [showSplash, setShowSplash] = useState(false);
    const [showLoaderSplash, setShowLoaderSplash] = useState(false);

    const showSuccess = () => {
        setShowSplash(true);
        const timer = setTimeout(() => {
            setShowSplash(false);
        }, 3500);
        return () => clearTimeout(timer);
    }

    const showLoader = () => {
        setShowLoaderSplash(true);
        const timer = setTimeout(() => {
            setShowLoaderSplash(false);
        }, 3500);
        return () => clearTimeout(timer);
    }

    const setLoader = (show) => {
        setShowLoaderSplash(show);
    }

    return (
        <SplashContext.Provider value={{
            showSuccess,
            showSplash,
            showLoader,
            showLoaderSplash,
            setLoader,
        }}>
            {children}
        </SplashContext.Provider>
    );
}

export const useSplash = () => useContext(SplashContext)