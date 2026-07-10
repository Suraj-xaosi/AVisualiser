// components/sidebar.tsx
"use client";

import Link from "next/link";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setShowAudioInput } from "@/store/slices/showAudioInputSlice";
import { setTrack } from "@/store/slices/playerSlice";
import { setShowCustomise } from "@/store/slices/showCustomiseSlice";
import type { Track } from "@/lib/types";

export default function Sidebar() {
  const playList = useAppSelector((p) => p.playList);
  const theme = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();

  const play = (track: Track) => {
    if (!track.trackUrl) return;
    dispatch(setTrack(track));
  };

  const openAudioInput = () => dispatch(setShowAudioInput(true));
  const openCustomizeTheme = () => dispatch(setShowCustomise(true));

  return (
    <aside
      className="w-full sm:w-80 h-full p-4 shadow-xl flex flex-col gap-4"
      style={{ background: theme.sidebarBgColor, color: theme.textColor }}
    >
      <h3 className="text-2xl font-bold mb-2">Audio List</h3>
      <ul className="overflow-y-auto scrollbar-hide space-y-2 flex-1">
        {playList.length === 0 && (
          <li
            className="text-sm opacity-80"
            style={{ color: theme.listTextColor, background: theme.listColor, borderRadius: 8, padding: 8 }}
          >
            No audio tracks added yet.
          </li>
        )}

        {playList.map((track) => (
          <li key={track.id}>
            <button
              type="button"
              onClick={() => play(track)}
              className="w-full text-left px-3 py-2 rounded-lg transition font-medium focus:outline-none focus-visible:ring-2 shadow-sm"
              style={{ background: theme.listColor, color: theme.listTextColor }}
            >
              {track.trackName}
              {track.source === "online" && (
                <span className="ml-2 text-[10px] uppercase tracking-wide opacity-60">online</span>
              )}
            </button>
          </li>
        ))}
      </ul>

      <div className="flex flex-col gap-2">
        <Link
          href="/library"
          className="text-center p-2 rounded-lg font-semibold text-sm hover:scale-105 transition focus:outline-none focus-visible:ring-2"
          style={{ background: theme.listColor, color: theme.listTextColor }}
        >
          Browse library
        </Link>
        <Link
          href="/local"
          className="text-center p-2 rounded-lg font-semibold text-sm hover:scale-105 transition focus:outline-none focus-visible:ring-2"
          style={{ background: theme.listColor, color: theme.listTextColor }}
        >
          Manage local tracks
        </Link>
      </div>

      <button
        type="button"
        onClick={openAudioInput}
        className="p-3 shadow-md rounded-lg cursor-pointer transition-all font-semibold hover:scale-105 focus:outline-none focus-visible:ring-2"
        style={{ background: theme.buttonBgColor, color: theme.textColor, border: "none" }}
      >
        Add another audio
      </button>

      <button
        type="button"
        onClick={openCustomizeTheme}
        className="p-3 shadow-md rounded-lg cursor-pointer transition-all font-semibold hover:scale-105 focus:outline-none focus-visible:ring-2"
        style={{ background: theme.buttonBgColor, color: theme.textColor, border: "none" }}
      >
        Customize Theme
      </button>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </aside>
  );
}
