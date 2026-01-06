"use client";

import { useAppDispatch } from "@/store/hooks";
import { addInList } from "@/store/slices/playlistSlice";
import { useState } from "react";

export default function AudioInput() {
  const [trackName,setTrackName]=useState("");
  const [trackUrl,setTrackUrl] =useState("");
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setTrackUrl(url);

  };
  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!trackName.trim() || !trackUrl) return; // Prevent empty submission
    dispatch(addInList({
      trackName: trackName.trim(),
      trackUrl: trackUrl,
      isPlaying: false
    }));
    // Optionally clear fields after submit
    setTrackName("");
    setTrackUrl("");
    // alert user or Optionally close popup: handled by parent
    alert("Audio added successfully!");
  };
  

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 flex flex-col gap-4 w-full max-w-xs mx-auto">
      <h3 className="text-lg font-semibold text-purple-700 mb-2">Add Audio</h3>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Track name</label>
        <input
          type="text"
          value={trackName}
          onChange={(e) => setTrackName(e.target.value)}
          placeholder="Audio name"
          className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none text-purple-700 shadow-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Load audio file</label>
        <input
          type="file"
          placeholder="choose"
          accept="audio/*"
          onChange={handleChange}
          className="w-full bg-purple-100 text-purple-700 px-3 py-2 rounded-lg border border-purple-300 focus:ring-2 focus:ring-purple-400 focus:outline-none shadow-sm"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-purple-500 to-indigo-400 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:from-purple-600 hover:to-indigo-500 transition disabled:opacity-50"
        disabled={!trackName.trim() || !trackUrl}
      >
        Submit
      </button>
    </form>
  );
}
