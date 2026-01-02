"use client";

import { useDispatch } from "react-redux";
import { setTrack } from "../../store/slices/playerSlice";

export default function AudioUploader() {
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    dispatch(setTrack(url));
  };

  return (
    <input
      type="file"
      accept="audio/*"
      onChange={handleChange}
    />
  );
}
