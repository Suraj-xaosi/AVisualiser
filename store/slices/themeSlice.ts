// store/slices/themeSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ThemeState {
  visualizerBgColor: string;
  visualizerBarColor: string;
  sidebarBgColor: string;
  textColor: string;
  buttonBgColor: string;
  listColor: string;
  listTextColor: string;
  popupBgColor: string;
  popupTextColor: string;
  popupButtonColor: string;
 
}

// Replaces the old #ff0000 dev-scaffolding defaults with a real theme.
export const defaultTheme: ThemeState = {
  visualizerBgColor: "#121E3A",
  visualizerBarColor: "#8B5CF6",
  sidebarBgColor: "#172543",
  textColor: "#EDF2FF",
  buttonBgColor: "#7C5CF6",
  listColor: "#1C2B45",
  listTextColor: "#EDF2FF",
  popupBgColor: "#1B2B44",
  popupTextColor: "#EDF2FF",
  popupButtonColor: "#8B5CF6",
  
};

const themeSlice = createSlice({
  name: "theme",
  initialState: defaultTheme,
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
    resetTheme: () => defaultTheme,
  },
});

export const { setTheme, setIndividualColor, resetTheme } = themeSlice.actions;
export default themeSlice.reducer;
