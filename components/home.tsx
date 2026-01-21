"use client";

import { useState } from "react";
import Sidebar from "./sidebar";
import Visualiser from "./visualiser";
import AudioInput from "./audioInput";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setShowAudioInput } from "@/store/slices/showAudioInputSlice";

export default function Home() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const showAudioInput = useAppSelector((state) => state.showAudioInput);
    const dispatch = useAppDispatch();

    const closeAudioInput = () => {
        dispatch(setShowAudioInput(false));
    };

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 overflow-hidden">
            {/* Visualiser always fullscreen */}
            <main className="w-full h-screen flex items-center justify-center">
                <Visualiser />
            </main>

            {/* AudioInput popup */}
            {showAudioInput && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="relative">
                        <button
                            type="button"
                            onClick={closeAudioInput}
                            className="absolute top-2 right-2 text-gray-500 hover:text-purple-600 text-xl font-bold z-10"
                            aria-label="Close"
                        >
                            X
                        </button>
                        <AudioInput />
                    </div>
                </div>
            )}

            {/* Sliding Sidebar */}
            <div
                className={`
                    fixed top-0 right-0 h-full w-60 z-30 bg-white shadow-2xl
                    transform transition-transform duration-300 ease-in-out
                    ${sidebarOpen ? "translate-x-0" : "translate-x-full"}
                `}
                onMouseLeave={() => setSidebarOpen(false)}
            >
                <Sidebar />
            </div>

            {/* Right edge trigger */}
            {!sidebarOpen && (
                <div
                    className="fixed top-0 right-0 h-full w-4 z-20 cursor-pointer"
                    onMouseEnter={() => setSidebarOpen(true)}
                    onDoubleClick={() => setSidebarOpen(true)}
                    aria-label="Open sidebar"
                />
            )}
        </div>
    );
}
