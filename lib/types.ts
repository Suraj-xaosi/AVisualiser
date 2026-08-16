
export type TrackSource = "local" | "online";


export type Track = {
  id: string;
  trackName: string;
  artist?: string;
  trackUrl: string; // object URL (local) or CDN URL (online)
  coverUrl?: string;
  source: TrackSource;
  duration?: number;
};
