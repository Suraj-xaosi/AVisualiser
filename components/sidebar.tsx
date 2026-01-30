"use client";

import { PlayList } from "../store/slices/playlistSlice";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setShowAudioInput } from "@/store/slices/showAudioInputSlice";
import { setTrack, PlayerState } from "../store/slices/playerSlice";
import { setShowCustomise } from "@/store/slices/showCustomiseSlice";



export default function Sidebar() {
  const playList: PlayList = useAppSelector((p) => p.playList);
  const theme = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();

  const play = (track: PlayerState) => {
    if (!track.trackUrl) return;
    dispatch(setTrack({
      trackName: track.trackName,
      trackUrl: track.trackUrl,
      isPlaying: true,
    }));
  };

  const openAudioInput = () => {
    dispatch(setShowAudioInput(true));
  };
  const openCustomizeTheme = () => {
    dispatch(setShowCustomise(true));
  };

  return (
    <aside
      className="w-60 h-full p-5 shadow-xl flex flex-col gap-4 flex-1 "
      style={{
        background: theme.sidebarBgColor,
        color: theme.textColor,
        
      }}
    >
      <h3 className="text-2xl font-bold mb-2" style={{ color: theme.textColor }}>Audio List</h3>
      <ul className="overflow-y-auto space-y-2">
        {playList.length === 0 && (
          <li className="text-sm opacity-80" style={{ color: theme.listTextColor, background: theme.listColor, borderRadius: 8, padding: 8 }}>No audio tracks added yet.</li>
        )}
        
        {playList.filter(track => track.trackUrl).map((track, idx) => (
          <li key={idx}>
            <button
              type="button"
              onClick={() => play(track)}
              className="w-full text-left px-3 py-2 rounded-lg transition font-medium focus:outline-none focus:ring-2 shadow-sm"
              style={{
                background: theme.listColor,
                color: theme.listTextColor,
                border: `2px solid ${theme.buttonBgColor}30`,
                boxShadow: '0 1px 4px 0 #0001',
                opacity: 1,
              }}
              // No need to disable, since all have trackUrl
            >
              {track.trackName || track.trackUrl}
            </button>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={openAudioInput}
        className="p-3 shadow-md rounded-lg mb-3 cursor-pointer transition-all font-semibold hover:scale-105"
        style={{
          background: theme.buttonBgColor,
          color: theme.textColor,
          border: 'none',
        }}
      >
        Add another audio
      </button>

      <button
        type="button"
        onClick={openCustomizeTheme}
        className="p-3 shadow-md rounded-lg cursor-pointer transition-all font-semibold hover:scale-105"
        style={{
          background: theme.buttonBgColor,
          color: theme.textColor,
          border: 'none',
        }}
      >
        Customize Theme
      </button>
    </aside>
  );
}

