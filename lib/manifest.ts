// lib/manifest.ts
import type { Track } from "./types";

// Set NEXT_PUBLIC_CDN_MANIFEST_URL in .env.local to  manifest.json URL,
// exaple- https://your-cdn.example.com/manifest.json
const MANIFEST_URL = process.env.NEXT_PUBLIC_CDN_MANIFEST_URL ?? "";

export type ManifestEntry = {
  id: string;
  trackName: string;
  artist?: string;
  trackUrl: string;
  coverUrl?: string;
  duration?: number;
};

export async function fetchManifest(): Promise<Track[]> {
  if (!MANIFEST_URL) return [];
  try {
    const res = await fetch(MANIFEST_URL, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const entries: ManifestEntry[] = await res.json();
    return entries.map((entry) => ({ ...entry, source: "online" as const }));
  } catch {
    // Network failure or malformed manifest — fail soft 
    return [];
  }
}
