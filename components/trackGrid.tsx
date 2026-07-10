// components/trackGrid.tsx
"use client";

import Image from "next/image";
import { useAppDispatch } from "@/store/hooks";
import { addInList } from "@/store/slices/playlistSlice";
import { setTrack } from "@/store/slices/playerSlice";
import type { Track } from "@/lib/types";

export default function TrackGrid({ tracks }: { tracks: Track[] }) {
  const dispatch = useAppDispatch();

  const addToPlaylist = (track: Track) => dispatch(addInList(track));

  const playNow = (track: Track) => {
    dispatch(addInList(track));
    dispatch(setTrack(track));
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {tracks.map((track) => (
        <div
          key={track.id}
          className="rounded-xl bg-neutral-900 p-3 flex flex-col gap-2 focus-within:ring-2 focus-within:ring-violet-400"
        >
          <div className="aspect-square w-full rounded-lg overflow-hidden bg-neutral-800 relative">
            {track.coverUrl ? (
              <Image
                src={track.coverUrl}
                alt={`Cover art for ${track.trackName}`}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-3xl" aria-hidden="true">
                🎵
              </div>
            )}
          </div>
          <div>
            <p className="font-semibold text-sm truncate">{track.trackName}</p>
            {track.artist && <p className="text-xs opacity-60 truncate">{track.artist}</p>}
          </div>
          <div className="flex gap-2 mt-auto">
            <button
              onClick={() => playNow(track)}
              className="flex-1 text-xs font-semibold rounded-lg py-2 bg-violet-500 hover:bg-violet-400 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
            >
              add to playlist 
            </button>
            <button
              onClick={() => addToPlaylist(track)}
              className="flex-1 text-xs font-semibold rounded-lg py-2 bg-neutral-800 hover:bg-neutral-700 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
            >
              Add to queue
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
