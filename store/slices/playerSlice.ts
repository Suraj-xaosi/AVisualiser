import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type PlayerState = {
  trackName:string|null;
  trackUrl: string | null;
  isPlaying: boolean;
};

export const initialState: PlayerState = {
  trackName:null,
  trackUrl: null,
  isPlaying: false,
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setTrack(state, action: PayloadAction<PlayerState>) {
      state.trackUrl = action.payload.trackUrl;
      state.trackName=action.payload.trackName;
      state.isPlaying=true;
    },
    setPlaying(state, action: PayloadAction<boolean>) {
      state.isPlaying = action.payload;
    },
  },
});

export const { setTrack, setPlaying } = playerSlice.actions;
export default playerSlice.reducer;
