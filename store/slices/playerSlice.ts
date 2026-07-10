// store/slices/playerSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Track } from "@/lib/types";

export type PlayerState = {
  id: string | null;
  trackName: string | null;
  trackUrl: string | null;
  artist: string | null;
  coverUrl: string | null;
  source: "local" | "online" | null;
  isPlaying: boolean;
};

export const initialState: PlayerState = {
  id: null,
  trackName: null,
  trackUrl: null,
  artist: null,
  coverUrl: null,
  source: null,
  isPlaying: false,
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setTrack(state, action: PayloadAction<Track>) {
      state.id = action.payload.id;
      state.trackName = action.payload.trackName;
      state.trackUrl = action.payload.trackUrl;
      state.artist = action.payload.artist ?? null;
      state.coverUrl = action.payload.coverUrl ?? null;
      state.source = action.payload.source;
      state.isPlaying = true;
    },
    setPlaying(state, action: PayloadAction<boolean>) {
      state.isPlaying = action.payload;
    },
    clearTrack() {
      return initialState;
    },
  },
});

export const { setTrack, setPlaying, clearTrack } = playerSlice.actions;
export default playerSlice.reducer;
