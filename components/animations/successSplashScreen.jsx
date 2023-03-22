'use client'
import { useSplash } from '@/contexts/animations/splashContext';
import { useSpring, animated } from 'react-spring';

export default function SuccessSplash() {

    const { showSplash } = useSplash()

    const rippleAnimation = useSpring({
        from: {
            opacity: 0.5,
            transform: 'scale(0)',
        },
        to: {
            opacity: 0,
            transform: 'scale(2)',
        },
        config: {
            duration: 2000,
        },
    });

    return (
        showSplash && (
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50">
                <div
                    className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center"
                    style={{ backgroundColor: '#F6F7F8', zIndex: 1 }}
                >
                    <div className="mb-6">
                        <svg
                            className="w-20 h-20 text-blue-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-bold mb-2">Product Added!</h2>
                    <p className="text-gray-600 text-lg mb-4">
                        Your product has been successfully added.
                    </p>
                    <animated.div
                        className="w-40 h-40 rounded-full bg-teal-200"
                        style={{
                            ...rippleAnimation,
                            position: 'absolute',
                            zIndex: 2,
                        }}
                    />
                </div>
            </div>
        )
    );
};
