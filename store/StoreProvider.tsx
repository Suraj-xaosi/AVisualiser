// store/StoreProvider.tsx
"use client";

import { useRef, useEffect } from "react";
import { Provider } from "react-redux";
import { AppStore, createStore } from "./store";
import { setTheme } from "./slices/themeSlice";

export const THEME_STORAGE_KEY = "audio-visualiser-theme";

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  // useRef, not module-scope singleton — a module-scope store would leak
  // state across requests/users on the server.
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = createStore();
  }

  useEffect(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved) {
        storeRef.current!.dispatch(setTheme(JSON.parse(saved)));
      }
    } catch {
      
    }

    const unsubscribe = storeRef.current!.subscribe(() => {
      const theme = storeRef.current!.getState().theme;
      try {
        localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(theme));
      } catch {
       
      }
    });

    return unsubscribe;
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
