// app/home/page.tsx
"use client";

import { useEffect } from "react";
import Homepage from "@/components/homePage";
import { setShowCustomise } from "@/store/slices/showCustomiseSlice";
import { useAppDispatch } from "@/store/hooks";
import { THEME_STORAGE_KEY } from "@/store/StoreProvider";

export default function Home() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const hasSavedTheme =
      typeof window !== "undefined" && localStorage.getItem(THEME_STORAGE_KEY);
    if (!hasSavedTheme) {
      dispatch(setShowCustomise(true));
    }
  }, [dispatch]);

  return <Homepage />;
}
