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
  // Vibrant, high-saturation, blue/yellow-based palette (no black)
  visualizerBgColor: "#0000FF", // very light blue for background
  visualizerBarColor: "#FFD600", // vibrant yellow for bars
  sidebarBgColor: "#8B5CF6", // strong blue for sidebar
  textColor: "#fcfcfd", // deep blue for text
  buttonBgColor: "#FFD600", // vivid blue for buttons
  listColor: "#FFD600", // soft yellow for list backgrounds
  listTextColor: "#fcfcfd", // bold blue for list text
  popupBgColor: "#8B5CF6", // medium blue for popups
  popupTextColor: "#fcfcfd", // clean blue for popup text
  popupButtonColor: "#FFD600", // bright yellow for popup buttons
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
