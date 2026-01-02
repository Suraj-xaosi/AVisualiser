import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type PlayerState = {
  currentTrackUrl: string | null;
  isPlaying: boolean;
};

export const initialState: PlayerState = {
  currentTrackUrl: null,
  isPlaying: false,
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setTrack(state, action: PayloadAction<string>) {
      state.currentTrackUrl = action.payload;
    },
    setPlaying(state, action: PayloadAction<boolean>) {
      state.isPlaying = action.payload;
    },
  },
});

export const { setTrack, setPlaying } = playerSlice.actions;
export default playerSlice.reducer;
