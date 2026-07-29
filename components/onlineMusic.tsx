"use client";

import { useEffect, useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { fetchManifest } from "@/lib/manifest";
import TrackGrid from "@/components/trackGrid";
import type { Track } from "@/lib/types";

export default function OnlineMusic() {
  const theme = useAppSelector((state) => state.theme);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const result = await fetchManifest();
      if (!cancelled) {
        setTracks(result);
        setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div
      className="rounded-2xl shadow-2xl p-8 w-full max-w-2xl mx-auto border border-purple-200 max-h-[90vh] overflow-y-auto"
      style={{ background: theme.popupBgColor + "F2", color: theme.popupTextColor }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold" style={{ color: theme.popupButtonColor }}>
            Library
          </h1>
        </div>
        {loading ? (
          <p className="opacity-70">Loading the catalog…</p>
        ) : tracks.length === 0 ? (
          <p className="opacity-70">
            No tracks in the catalog yet. Add entries to the CDN manifest to see them here.
          </p>
        ) : (
          <TrackGrid tracks={tracks} />
        )}
      </div>
    </div>
  );
}