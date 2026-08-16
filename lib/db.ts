
import { openDB, DBSchema, IDBPDatabase } from "idb";
import type { Track } from "./types";

interface VisualiserDB extends DBSchema {
  tracks: {
    key: string;
    value: {
      id: string;
      trackName: string;
      artist?: string;
      blob: Blob;
      coverUrl?: string;
      duration?: number;
    };
  };
}

let dbPromise: Promise<IDBPDatabase<VisualiserDB>> | null = null;

function getDB() {
  if (typeof window === "undefined") {
    throw new Error("IndexedDB is only available in the browser");
  }
  if (!dbPromise) {
    dbPromise = openDB<VisualiserDB>("audio-visualiser", 1, {
      upgrade(db) {
        db.createObjectStore("tracks", { keyPath: "id" });
      },
    });
  }
  return dbPromise;
}

export async function saveLocalTrack(track: {
  id: string;
  trackName: string;
  artist?: string;
  blob: Blob;
  duration?: number;
}) {
  const db = await getDB();
  await db.put("tracks", track);
}

export async function getAllLocalTracks(): Promise<Track[]> {
  const db = await getDB();
  const rows = await db.getAll("tracks");
  // Object URLs are regenerated fresh each load — the blob itself is
  // what's persisted, the URL is just a disposable pointer to it.
  return rows.map((row) => ({
    id: row.id,
    trackName: row.trackName,
    artist: row.artist,
    trackUrl: URL.createObjectURL(row.blob),
    source: "local" as const,
    duration: row.duration,
  }));
}

export async function deleteLocalTrack(id: string) {
  const db = await getDB();
  await db.delete("tracks", id);
}

export async function clearLocalTracks() {
  const db = await getDB();
  await db.clear("tracks");
}
