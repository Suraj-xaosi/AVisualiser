// store/slices/showOnlineMusic.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: boolean = false;

export const showOnlineMusic = createSlice({
  name: "showOnlineMusic",
  initialState,
  reducers: {
    setShowOnlineMusic(_state, action: PayloadAction<boolean>) {
      return action.payload;
    },
  },
});

export const { setShowOnlineMusic } = showOnlineMusic.actions;
export default showOnlineMusic.reducer;
