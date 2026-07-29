// store/slices/showOfflineMusic.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: boolean = false;

export const showOfflineMusic = createSlice({
  name: "showOfflineMusic",
  initialState,
  reducers: {
    setShowOfflineMusic(_state, action: PayloadAction<boolean>) {
      return action.payload;
    },
  },
});

export const { setShowOfflineMusic } = showOfflineMusic.actions;
export default showOfflineMusic.reducer;
