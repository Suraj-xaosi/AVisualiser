
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: string= "low";

export const barCount = createSlice({
  name: "barCount",
  initialState,
  reducers: {
    setBarCount(_state, action: PayloadAction<string>) {
      return action.payload;
    },
  },
});

export const { setBarCount } = barCount.actions;
export default barCount.reducer;
