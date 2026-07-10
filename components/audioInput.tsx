// components/audioInput.tsx
"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addInList } from "@/store/slices/playlistSlice";
import { setShowAudioInput } from "@/store/slices/showAudioInputSlice";
import { setTrack } from "@/store/slices/playerSlice";
import { saveLocalTrack } from "@/lib/db";
import type { Track } from "@/lib/types";

type PendingTrack = { id: string; trackName: string; file: File; trackUrl: string };

export default function AudioInput() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme);

  const [tracks, setTracks] = useState<PendingTrack[]>([]);
  const [saving, setSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const newTracks = Array.from(files).map((file) => ({
      id: crypto.randomUUID(),
      trackName: file.name,
      file,
      trackUrl: URL.createObjectURL(file),
    }));
    setTracks(newTracks);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (tracks.length === 0) return;
    setSaving(true);

    for (const track of tracks) {
      
      await saveLocalTrack({ id: track.id, trackName: track.trackName, blob: track.file });
      const asTrack: Track = {
        id: track.id,
        trackName: track.trackName,
        trackUrl: track.trackUrl,
        source: "local",
      };
      dispatch(addInList(asTrack));
    }

    const first: Track = {
      id: tracks[0].id,
      trackName: tracks[0].trackName,
      trackUrl: tracks[0].trackUrl,
      source: "local",
    };
    dispatch(setTrack(first));

    setSaving(false);
    setTracks([]);
    dispatch(setShowAudioInput(false));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl shadow-2xl p-8 flex flex-col gap-5 w-full max-w-sm mx-auto border border-purple-200"
      style={{ background: theme.sidebarBgColor + "F2", color: theme.textColor }}
    >
      <h3 className="text-2xl font-bold mb-4" style={{ color: theme.buttonBgColor }}>
        Add Audio
      </h3>

      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: theme.textColor }}>
          Load audio file
        </label>
        <input
          type="file"
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
          {tracks.map((track) => (
            <li
              key={track.id}
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
        className="w-full rounded-lg font-semibold shadow-md transition disabled:opacity-50 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        style={{ background: theme.buttonBgColor, color: theme.textColor }}
        disabled={tracks.length === 0 || saving}
      >
        {saving ? "Saving…" : "Submit"}
      </button>
    </form>
  );
}
