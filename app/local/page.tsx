// app/local/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAppDispatch } from "@/store/hooks";
import { addInList, removeFromList } from "@/store/slices/playlistSlice";
import { setTrack } from "@/store/slices/playerSlice";
import { getAllLocalTracks, deleteLocalTrack } from "@/lib/db";
import type { Track } from "@/lib/types";

export default function LocalPage() {
  const dispatch = useAppDispatch();
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
    <div className="min-h-screen bg-neutral-950 text-neutral-100 px-6 py-10">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Local tracks</h1>
          <Link
            href="/home"
            className="text-sm underline opacity-80 hover:opacity-100 focus:outline-none focus-visible:ring-2 rounded"
          >
            Back to visualiser
          </Link>
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
                className="flex items-center justify-between rounded-lg bg-neutral-900 px-4 py-3"
              >
                <span className="truncate">{track.trackName}</span>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => handlePlay(track)}
                    className="text-xs font-semibold rounded-lg px-3 py-1.5 bg-violet-500 hover:bg-violet-400 transition focus:outline-none focus-visible:ring-2"
                  >
                    Play
                  </button>
                  <button
                    onClick={() => handleDelete(track.id)}
                    className="text-xs font-semibold rounded-lg px-3 py-1.5 bg-red-500/80 hover:bg-red-500 transition focus:outline-none focus-visible:ring-2"
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
