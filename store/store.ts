import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./slices/playerSlice";
import playListReducer from "./slices/playlistSlice"
export const createStore = () => {
  return configureStore({
    reducer: {
      player: playerReducer,
      playList: playListReducer

    },
  });
};

export type AppStore = ReturnType<typeof createStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
