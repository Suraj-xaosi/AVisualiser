"use client"
import { useState } from "react";
import Sidebar from "./sidebar";
import Visualiser from "./visualiser";

export default function Home() {
    const [sidebarOpen, setSidebar] = useState(false);

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex">
            {/* Sidebar */}
            <div
                className={`transition-all duration-300 h-full z-20 ${sidebarOpen ? "w-60" : "w-0"}`}
                style={{ minHeight: "100vh" }}
            >
                {sidebarOpen && (
                    <div className="relative shadow-2xl h-full">
                        <Sidebar />
                        <button
                            onClick={() => setSidebar(false)}
                            className="absolute bottom-14 -right-4 bg-white text-[#6F42C1] px-2 py-1 rounded-lg text-xs font-semibold shadow-md border border-purple-200"
                            aria-label="Close sidebar"
                        >
                            ❮
                        </button>
                    </div>
                )}
            </div>

            {/* Sidebar open button */}
            {!sidebarOpen && (
                <button
                    onClick={() => setSidebar(true)}
                    className="absolute bottom-14 left-4 bg-white text-[#6F42C1] px-2 py-1 rounded-lg text-sm font-semibold shadow-md border border-purple-200 z-30"
                    aria-label="Open sidebar"
                >
                    ❯
                </button>
            )}

            {/* Main content */}
            <main className="flex-1 flex items-center justify-center">
                <Visualiser />
            </main>
        </div>
    );
}