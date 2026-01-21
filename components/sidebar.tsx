"use client";
import {PlayList} from "../store/slices/playlistSlice"
// import AudioInput from "./audioInput";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setShowAudioInput } from "@/store/slices/showAudioInputSlice";
import { setTrack, PlayerState } from "../store/slices/playerSlice";


export default function Sidebar() {
  const playList: PlayList = useAppSelector((p) => p.playList);
  const dispatch = useAppDispatch();

  const play = (track: PlayerState) => {
    if (!track.trackUrl) return;
    dispatch(setTrack({
      trackName: track.trackName,
      trackUrl: track.trackUrl,
      isPlaying: true,
    }));
  };

  const openAudioInput = () => {
    dispatch(setShowAudioInput(true));
  };

  return (
    <aside className="w-60 h-full p-5 bg-gradient-to-b from-[#6F42C1] to-[#8B5CF6] text-white shadow-xl flex flex-col gap-4 flex-1">
      <h3 className="text-xl font-bold mb-2">Audio List</h3>
      <ul className="overflow-y-auto space-y-2">
        {playList.length === 0 && (
          <li className="text-sm text-purple-100">No audio tracks added yet.</li>
        )}
        {playList.map((track, idx) => (
          <li key={idx}>
            <button
              type="button"
              onClick={() => play(track)}
              className="w-full text-left px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition font-medium focus:outline-none focus:ring-2 focus:ring-purple-300"
              disabled={!track.trackUrl}
            >
              {track.trackName || track.trackUrl}
            </button>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={openAudioInput}
        className="p-3 shadow-md rounded-lg mb-3 cursor-pointer transition-all bg-white/5 hover:bg-white/20 border border-white/10 font-semibold"
      >
        Add another audio
      </button>
    </aside>
  );
}

