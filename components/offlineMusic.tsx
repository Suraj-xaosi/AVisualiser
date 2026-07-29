"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addInList, removeFromList } from "@/store/slices/playlistSlice";
import { setTrack } from "@/store/slices/playerSlice";
import { getAllLocalTracks, deleteLocalTrack } from "@/lib/db";
import type { Track } from "@/lib/types";

export default function OfflineMusic() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    setLoading(true);
    const local = await getAllLocalTracks();
    setTracks(local);
    setLoading(false);
  };

  useEffect(() => {
    refresh();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteLocalTrack(id);
    dispatch(removeFromList(id));
    refresh();
  };

  const handlePlay = (track: Track) => {
    dispatch(addInList(track));
    dispatch(setTrack(track));
  };

  return (
    <div
      className="rounded-2xl shadow-2xl p-8 w-full max-w-2xl mx-auto border border-purple-200 max-h-[90vh] overflow-y-auto"
      style={{ background: theme.popupBgColor + "F2", color: theme.popupTextColor }}
    >
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold" style={{ color: theme.popupButtonColor }}>
            Local tracks
          </h1>
        </div>

        {loading ? (
          <p className="opacity-70">Loading your uploaded tracks…</p>
        ) : tracks.length === 0 ? (
          <p className="opacity-70">
            No local tracks yet. Upload audio from the visualiser sidebar and it&apos;ll show up here.
          </p>
        ) : (
          <ul className="space-y-2">
            {tracks.map((track) => (
              <li
                key={track.id}
                className="flex items-center justify-between rounded-lg px-4 py-3"
                style={{ background: theme.listColor, color: theme.listTextColor }}
              >
                <span className="truncate">{track.trackName}</span>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => handlePlay(track)}
                    className="text-xs font-semibold rounded-lg px-3 py-1.5 transition hover:brightness-110 focus:outline-none focus-visible:ring-2"
                    style={{ background: theme.buttonBgColor, color: theme.textColor }}
                  >
                    Play
                  </button>
                  <button
                    onClick={() => handleDelete(track.id)}
                    className="text-xs font-semibold rounded-lg px-3 py-1.5 transition hover:brightness-110 focus:outline-none focus-visible:ring-2"
                    style={{ background: theme.buttonBgColor + "CC", color: theme.textColor }}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}