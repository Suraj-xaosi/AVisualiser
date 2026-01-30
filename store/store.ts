import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./slices/playerSlice";
import playListReducer from "./slices/playlistSlice";
import showAudioInputReducer from "./slices/showAudioInputSlice";
import themeReducer from "./slices/themeSlice";
import showCustomiseReducer from "./slices/showCustomiseSlice";
export const createStore = () => {
  return configureStore({
    reducer: {
      player: playerReducer,
      playList: playListReducer,
      showAudioInput: showAudioInputReducer,
      theme: themeReducer,
      showCustomise: showCustomiseReducer,
    },
  });
};

export type AppStore = ReturnType<typeof createStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
