// components/homePage.tsx
"use client";

import { useState } from "react";
import Sidebar from "./sidebar";
import Visualiser2 from "./visualiser2";
import AudioInput from "./audioInput";
import ThemeCustomise from "./themeCustomise";

import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setShowAudioInput } from "@/store/slices/showAudioInputSlice";
import { setShowCustomise } from "@/store/slices/showCustomiseSlice";

export default function Homepage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const showAudioInput = useAppSelector((state) => state.showAudioInput);
  const showCustomise = useAppSelector((state) => state.showCustomise);
  const theme = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();

  const closeAudioInput = () => dispatch(setShowAudioInput(false));
  const closeCustomiseTheme = () => dispatch(setShowCustomise(false));

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ background: theme.visualizerBgColor }}>
      <button
        onClick={toggleFullscreen}
        className="fixed top-4 left-4 z-50 rounded-full p-2 shadow-lg hover:scale-110 transition focus:outline-none focus-visible:ring-2"
        style={{ fontSize: 22, background: theme.visualizerBgColor + "CC", color: theme.textColor }}
        aria-label="Toggle fullscreen"
      >
        <span aria-hidden="true">⛶</span>
      </button>

      {/* Mobile-only sidebar toggle — the desktop hover-edge trigger below doesn't work on touch devices */}
      <button
        onClick={() => setSidebarOpen((v) => !v)}
        className="sm:hidden fixed top-4 right-4 z-50 rounded-full p-2 shadow-lg focus:outline-none focus-visible:ring-2"
        style={{ background: theme.visualizerBgColor + "CC", color: theme.textColor }}
        aria-label={sidebarOpen ? "Close playlist" : "Open playlist"}
      >
        <span aria-hidden="true">{sidebarOpen ? "✕" : "☰"}</span>
      </button>

      <main className="w-full h-screen flex items-center justify-center">
        <Visualiser2 />
      </main>

      {showAudioInput && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 px-4"
          style={{ background: theme.sidebarBgColor + "99" }}
        >
          <div className="relative w-full max-w-sm">
            <button
              type="button"
              onClick={closeAudioInput}
              className="absolute top-2 right-2 text-xl font-bold z-10 rounded-full px-3 py-1 shadow-md hover:scale-110 focus:outline-none focus-visible:ring-2"
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
          className="fixed inset-0 flex items-center justify-center z-50 px-4"
          style={{ background: theme.sidebarBgColor + "99" }}
        >
          <div className="relative w-full max-w-2xl">
            <button
              type="button"
              onClick={closeCustomiseTheme}
              className="absolute top-2 right-2 text-xl font-bold z-10 rounded-full px-3 py-1 shadow-md hover:scale-110 focus:outline-none focus-visible:ring-2"
              style={{ background: theme.buttonBgColor, color: theme.textColor }}
              aria-label="Close"
            >
              ×
            </button>
            <ThemeCustomise />
          </div>
        </div>
      )}

      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-80 z-30 shadow-2xl transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onMouseLeave={() => setSidebarOpen(false)}
      >
        <Sidebar />
      </div>

      {!sidebarOpen && (
        <div
          className="hidden sm:block fixed top-0 right-0 h-full w-4 z-20 cursor-pointer"
          onMouseEnter={() => setSidebarOpen(true)}
          onDoubleClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar"
        />
      )}
    </div>
  );
}
