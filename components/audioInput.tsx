"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addInList } from "@/store/slices/playlistSlice";
import { setShowAudioInput } from "@/store/slices/showAudioInputSlice";
import { setTrack } from "@/store/slices/playerSlice";
import { useState } from "react";

export default function AudioInput() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme);
  
  // local state 
  const [tracks, setTracks] = useState<{ trackName: string; trackUrl: string }[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const newTracks = Array.from(files).map(file => ({
      trackName: file.name,
      trackUrl: URL.createObjectURL(file)
    }));
    setTracks(newTracks);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (tracks.length === 0) return;
    // Add each track to playlist
    tracks.forEach(track =>
      dispatch(addInList({
        trackName: track.trackName,
        trackUrl: track.trackUrl,
        isPlaying: false
      }))
    );
    // Set first track as current and playing
    dispatch(setTrack({
      trackName: tracks[0].trackName,
      trackUrl: tracks[0].trackUrl,
      isPlaying: true
    }));
    alert("Audio files added successfully!");
    setTracks([]);
    dispatch(setShowAudioInput(false));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl shadow-2xl p-8 flex flex-col gap-5 w-full max-w-sm mx-auto border border-purple-200"
      style={{ background: theme.sidebarBgColor + 'F2', color: theme.textColor }}
    >
      <h3 className="text-2xl font-bold mb-4" style={{ color: theme.buttonBgColor }}>Add Audio</h3>

      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: theme.textColor }}>
          Load audio file
        </label>
        <input
          type="file"
          placeholder="choose"
          accept="audio/*"
          multiple
          onChange={handleChange}
          className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:outline-none shadow-sm"
          style={{
            background: theme.buttonBgColor,
            color: theme.listTextColor,
            borderColor: theme.buttonBgColor,
            borderWidth: 2,
          }}
        />
      </div>
      {tracks.length > 0 && (
        <ul className="mb-2 space-y-2">
          {tracks.map((track, idx) => (
            <li
              key={idx}
              className="w-full px-3 py-2 rounded-lg border shadow-sm"
              style={{
                background: theme.listColor,
                color: theme.listTextColor,
                borderColor: theme.buttonBgColor,
                borderWidth: 2,
              }}
            >
              {track.trackName}
            </li>
          ))}
        </ul>
      )}
      <button
        type="submit"
        className="w-full rounded-lg font-semibold shadow-md transition disabled:opacity-50 hover:scale-105"
        style={{
          background: theme.buttonBgColor,
          color: theme.textColor,
        }}
        disabled={tracks.length === 0}
      >
        Submit
      </button>
    </form>
  );
}

     
