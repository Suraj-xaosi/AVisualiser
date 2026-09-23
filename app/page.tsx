"use client";
import { useRouter } from "next/navigation";

// Deterministic bar heights (percent) so server and client render the same thing
const BARS = Array.from({ length: 56 }, (_, i) => {
  const wave = Math.abs(Math.sin(i * 0.42) * Math.cos(i * 0.13));
  const detail = Math.abs(Math.sin(i * 1.7)) * 0.25;
  return Math.round(12 + (wave + detail) * 78);
});

export default function WelcomePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen w-full bg-[#EAEFF2] text-[#0F1B26] flex items-center">
      <div className="mx-auto w-full max-w-3xl px-6 py-16">
        {/* The one memorable element: a static waveform */}
        <div
          className="flex items-end gap-[3px] h-32 sm:h-40 mb-12"
          aria-hidden="true"
        >
          {BARS.map((h, i) => (
            <span
              key={i}
              style={{ height: `${h}%` }}
              className={`flex-1 rounded-[1px] ${
                i >= 20 && i <= 27 ? "bg-[#1F4FD8]" : "bg-[#0F1B26]"
              }`}
            />
          ))}
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-4">
          Audio Visualiser
        </h1>
        <p className="text-lg sm:text-xl text-[#3B4A57] max-w-md mb-8 leading-relaxed">
          Drop in a song and watch it move.
        </p>

        <ul className="space-y-2 text-base sm:text-lg text-[#3B4A57] mb-10">
          <li>Drag and drop any audio file</li>
          <li>Visuals that follow the music in real time</li>
        </ul>

        <button
          onClick={() => router.push("/home")}
          className="px-7 py-3.5 text-lg font-semibold rounded-md bg-[#1F4FD8] text-white hover:bg-[#1A43B8] active:bg-[#163A9F] transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-[#1F4FD8]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#EAEFF2]"
        >
          Open the visualiser
        </button>
      </div>
    </main>
  );
}