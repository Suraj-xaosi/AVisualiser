import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { text } from "stream/consumers";

export interface ThemeState {
  visualizerBgColor: string;
  visualizerBarColor: string;
  sidebarBgColor: string;
  textColor: string;
  buttonBgColor: string;
  listColor: string;
  listTextColor: string;
  popupBgColor?: string;
  popupTextColor?: string;
  popupButtonColor?: string;
}

const initialState: ThemeState = {

  visualizerBgColor: "#ff0000", 
  visualizerBarColor: "#000000", 
  sidebarBgColor: "#FF0000", 
  textColor: "#fcfcfd", 
  buttonBgColor: "#000000", 
  listColor: "#000000", 
  listTextColor: "#fcfcfd", 
  popupBgColor: "#FF0000", 
  popupTextColor: "#fcfcfd",
  popupButtonColor: "#000000", 
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Partial<ThemeState>>) => {
      return { ...state, ...action.payload };
    },
    setIndividualColor: (
      state,
      action: PayloadAction<{ key: keyof ThemeState; value: string }>
    ) => {
      state[action.payload.key] = action.payload.value;
    },
    resetTheme: () => initialState,
  },
});

export const { setTheme, setIndividualColor, resetTheme } = themeSlice.actions;
export default themeSlice.reducer;
