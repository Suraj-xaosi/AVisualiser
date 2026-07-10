// store/slices/playlistSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Track } from "@/lib/types";

export type PlayList = Track[];

// IndexedDB (local) and the CDN manifest (online) on load.
export const initialState: PlayList = [];

export const playListSlice = createSlice({
  name: "playList",
  initialState,
  reducers: {
    addInList(state, action: PayloadAction<Track>) {
      if (state.some((t) => t.id === action.payload.id)) return;
      state.push(action.payload);
    },
    addManyInList(state, action: PayloadAction<Track[]>) {
      const existingIds = new Set(state.map((t) => t.id));
      for (const track of action.payload) {
        if (!existingIds.has(track.id)) state.push(track);
      }
    },
    removeFromList(state, action: PayloadAction<string>) {
      return state.filter((t) => t.id !== action.payload);
    },
    setPlayList(_state, action: PayloadAction<Track[]>) {
      return action.payload;
    },
    reorderList(state, action: PayloadAction<{ from: number; to: number }>) {
      const { from, to } = action.payload;
      if (from < 0 || from >= state.length || to < 0 || to >= state.length) return;
      const [moved] = state.splice(from, 1);
      state.splice(to, 0, moved);
    },
  },
});

export const { addInList, addManyInList, removeFromList, setPlayList, reorderList } =
  playListSlice.actions;
export default playListSlice.reducer;
