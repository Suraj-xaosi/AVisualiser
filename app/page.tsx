"use client";
import { useRouter } from "next/navigation";

export default function WelcomePage() {
  const router = useRouter();

  const handleStart = () => {
    router.push("/home");
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-fuchsia-700 via-indigo-700 to-blue-600">
      <div className="text-center mb-10">
        <div className="text-7xl mb-2 animate-bounce">🎧</div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-3 drop-shadow-lg">Welcome to Audio Visualiser</h1>
        <p className="text-lg sm:text-xl text-pink-200 mb-4 font-medium">
          See your music come alive.
          
        </p>
        <ul className="list-none p-0 my-4 text-blue-100 text-base sm:text-lg space-y-1">
          <li>• <span className="text-yellow-300">Simple audio drops</span></li>
          <li>• <span className="text-green-300">satisfying visuals</span></li>
        </ul>
      </div>
      <button
        onClick={handleStart}
        className="px-8 py-4 text-xl font-bold rounded-lg shadow-lg bg-gradient-to-r from-pink-400 via-fuchsia-500 to-indigo-500 text-white hover:scale-105 hover:from-yellow-400 hover:to-pink-500 transition-all duration-200 mb-8 focus:outline-none focus:ring-4 focus:ring-pink-300"
        aria-label="Start using Audio Visualiser"
      >
        Start
      </button>
      <div className="text-blue-100 text-sm mt-2">
        Made for music lovers, by music lover.
      </div>
    </div>
  );
}