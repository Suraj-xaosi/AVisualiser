"use client";

import { useState } from "react";
import Sidebar from "./sidebar";
import Visualiser from "./visualiser";
import AudioInput from "./audioInput";
import ThemeCustomise from "./themeCustomise";

import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setShowAudioInput } from "@/store/slices/showAudioInputSlice";
import { setShowCustomise } from "@/store/slices/showCustomiseSlice";

export default function Home() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const showAudioInput = useAppSelector((state) => state.showAudioInput);
    const showCustomise = useAppSelector((state) => state.showCustomise);
    const theme = useAppSelector((state) => state.theme);
    const dispatch = useAppDispatch();

    const closeAudioInput = () => {
        dispatch(setShowAudioInput(false));
    };
    const closeCustomiseTheme=()=>{
        dispatch(setShowCustomise(false));
    }

    return (
        <div
            className="relative min-h-screen overflow-hidden"
            style={{ background: theme.visualizerBgColor }}
        >
            {/* Visualiser always fullscreen */}
            <main className="w-full h-screen flex items-center justify-center">
                <Visualiser />
            </main>

            {/* AudioInput popup */}
            {showAudioInput && (
                <div
                    className="fixed inset-0 flex items-center justify-center z-50"
                    style={{ background: theme.sidebarBgColor + '99' }}
                >
                    <div className="relative">
                        <button
                            type="button"
                            onClick={closeAudioInput}
                            className="absolute top-2 right-2 text-xl font-bold z-10 rounded-full px-3 py-1 shadow-md hover:scale-110"
                            style={{ background: theme.buttonBgColor, color: theme.textColor }}
                            aria-label="Close"
                        >
                            ×
                        </button>
                        <AudioInput />
                    </div>
                </div>
            )}
            {showCustomise && (
                <div
                    className="fixed inset-0 flex items-center justify-center z-50"
                    style={{ background: theme.sidebarBgColor + '99' }}
                >
                    <div className="relative">
                        <button
                            type="button"
                            onClick={closeCustomiseTheme}
                            className="absolute top-2 right-2 text-xl font-bold z-10 rounded-full px-3 py-1 shadow-md hover:scale-110"
                            style={{ background: theme.buttonBgColor, color: theme.textColor }}
                            aria-label="Close"
                        >
                            ×
                        </button>
                        <ThemeCustomise/>
                    </div>
                </div>
            )}

            {/* Sliding Sidebar */}
            <div
                className={`
                    fixed top-0 right-0 h-full w-80 z-30 shadow-2xl
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
