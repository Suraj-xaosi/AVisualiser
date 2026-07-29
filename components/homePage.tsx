// components/homePage.tsx
"use client";

import { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import Visualiser2 from "./visualiser2";
import AudioInput from "./audioInput";
import ThemeCustomise from "./themeCustomise";
import OnlineMusic from "./onlineMusic";
import OfflineMusic from "./offlineMusic";

import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setShowAudioInput } from "@/store/slices/showAudioInputSlice";
import { setShowCustomise } from "@/store/slices/showCustomiseSlice";
import { setShowOfflineMusic } from "@/store/slices/showOfflineMusicSlice";
import { setShowOnlineMusic } from "@/store/slices/showOnlineMusicSlice";

export default function Homepage() {
  const dispatch = useAppDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const showAudioInput = useAppSelector((state) => state.showAudioInput);
  const showCustomise = useAppSelector((state) => state.showCustomise);
  const showOnlineMusic = useAppSelector((state) => state.showOnlineMusic);
  const showOfflineMusic = useAppSelector((state) => state.showOfflineMusic);
  const theme = useAppSelector((state) => state.theme);

  const closeAudioInput = () => dispatch(setShowAudioInput(false));
  const closeCustomiseTheme = () => dispatch(setShowCustomise(false));
  const closeOfflineMusic = () => dispatch(setShowOfflineMusic(false));
  const closeOnlineMusic = () => dispatch(setShowOnlineMusic(false));

  // Only one of these four popups should ever be open at once — whichever
  // flips to true closes the other three, so they can never stack.
  useEffect(() => {
    if (showAudioInput) {
      dispatch(setShowCustomise(false));
      dispatch(setShowOnlineMusic(false));
      dispatch(setShowOfflineMusic(false));
    }
  }, [showAudioInput, dispatch]);

  useEffect(() => {
    if (showCustomise) {
      dispatch(setShowAudioInput(false));
      dispatch(setShowOnlineMusic(false));
      dispatch(setShowOfflineMusic(false));
    }
  }, [showCustomise, dispatch]);

  useEffect(() => {
    if (showOnlineMusic) {
      dispatch(setShowAudioInput(false));
      dispatch(setShowCustomise(false));
      dispatch(setShowOfflineMusic(false));
    }
  }, [showOnlineMusic, dispatch]);

  useEffect(() => {
    if (showOfflineMusic) {
      dispatch(setShowAudioInput(false));
      dispatch(setShowCustomise(false));
      dispatch(setShowOnlineMusic(false));
    }
  }, [showOfflineMusic, dispatch]);

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ background: theme.visualizerBgColor }}>
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

      {showOnlineMusic && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 px-4"
          style={{ background: theme.sidebarBgColor + "99" }}
        >
          <div className="relative w-full max-w-2xl">
            <button
              type="button"
              onClick={closeOnlineMusic}
              className="absolute top-2 right-2 text-xl font-bold z-10 rounded-full px-3 py-1 shadow-md hover:scale-110 focus:outline-none focus-visible:ring-2"
              style={{ background: theme.buttonBgColor, color: theme.textColor }}
              aria-label="Close"
            >
              ×
            </button>
            <OnlineMusic />
          </div>
        </div>
      )}

      {showOfflineMusic && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 px-4"
          style={{ background: theme.sidebarBgColor + "99" }}
        >
          <div className="relative w-full max-w-2xl">
            <button
              type="button"
              onClick={closeOfflineMusic}
              className="absolute top-2 right-2 text-xl font-bold z-10 rounded-full px-3 py-1 shadow-md hover:scale-110 focus:outline-none focus-visible:ring-2"
              style={{ background: theme.buttonBgColor, color: theme.textColor }}
              aria-label="Close"
            >
              ×
            </button>
            <OfflineMusic />
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