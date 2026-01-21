"use client";

import { useAppDispatch } from "@/store/hooks";
import { addInList } from "@/store/slices/playlistSlice";
import { useState } from "react";

export default function AudioInput() {
  const [tracks, setTracks] = useState<{ trackName: string; trackUrl: string }[]>([]);
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const newTracks = Array.from(files).map(file => ({
      trackName: file.name,
      trackUrl: URL.createObjectURL(file)
    }));
    setTracks(newTracks);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (tracks.length === 0) return;
    tracks.map(track =>
      dispatch(addInList({
        trackName: track.trackName,
        trackUrl: track.trackUrl,
        isPlaying: false
      }))
    );
    alert("Audio files added successfully!");
    setTracks([]);
  };
  

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 flex flex-col gap-4 w-full max-w-xs mx-auto">
      <h3 className="text-lg font-semibold text-purple-700 mb-2">Add Audio</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Load audio file</label>
        <input
          type="file"
          placeholder="choose"
          accept="audio/*"
          multiple
          onChange={handleChange}
          className="w-full bg-purple-100 text-purple-700 px-3 py-2 rounded-lg border border-purple-300 focus:ring-2 focus:ring-purple-400 focus:outline-none shadow-sm"
        />
      </div>
      {tracks.length > 0 && (
        <ul className="mb-2">
          {tracks.map((track, idx) => (
            <li key={idx} className="w-full bg-purple-100 text-purple-700 px-3 py-2 rounded-lg border border-purple-300 focus:ring-2 focus:ring-purple-400 focus:outline-none shadow-sm">{track.trackName}</li>
          ))}
        </ul>
      )}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-purple-500 to-indigo-400 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:from-purple-600 hover:to-indigo-500 transition disabled:opacity-50"
        disabled={tracks.length === 0}
      >
        Submit
      </button>
    </form>
  );
}

     
