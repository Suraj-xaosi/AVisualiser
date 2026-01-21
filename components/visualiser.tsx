
"use client";

import { useAppSelector } from "@/store/hooks";
import { useRef, useEffect, useState } from "react";

export default function AudioVisualizer() {
  const audiourl = useAppSelector((state) => state.player.trackUrl);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const animationRef = useRef<number | null>(null);

  const [showControls, setShowControls] = useState(false);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  /* -------------------- helpers -------------------- */

  const revealControls = () => {
    setShowControls(true);

    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }

    hideTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  /* -------------------- sync audio src -------------------- */

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = audiourl || "";
    }

    if (!audiourl && animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  }, [audiourl]);

  /* -------------------- cleanup -------------------- */

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);

  /* -------------------- spacebar control -------------------- */

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        revealControls();

        if (!audioRef.current) return;

        if (audioRef.current.paused) {
          startVisualizer();
        } else {
          audioRef.current.pause();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  /* -------------------- visualizer -------------------- */

  const startVisualizer = async () => {
    if (!audioRef.current || !canvasRef.current) return;

    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext();

      const source =
        audioCtxRef.current.createMediaElementSource(audioRef.current);

      analyserRef.current = audioCtxRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;

      source.connect(analyserRef.current);
      analyserRef.current.connect(audioCtxRef.current.destination);

      dataArrayRef.current = new Uint8Array(
        analyserRef.current.frequencyBinCount
      );
    }

    await audioCtxRef.current.resume();
    audioRef.current.play();
    draw();
  };

  const draw = () => {
    if (!canvasRef.current || !analyserRef.current || !dataArrayRef.current)
      return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;
    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;
    //@ts-ignore
    analyserRef.current.getByteFrequencyData(dataArrayRef.current);

    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    const barWidth = WIDTH / dataArrayRef.current.length;
    let x = 0;

    for (let i = 0; i < dataArrayRef.current.length; i++) {
      const barHeight = dataArrayRef.current[i];
      ctx.fillStyle = `rgb(${barHeight + 80}, 60, 120)`;
      ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
      x += barWidth;
    }

    animationRef.current = requestAnimationFrame(draw);
  };

  /* -------------------- render -------------------- */

  return (
    <div
      className="fixed inset-0 z-10 bg-gradient-to-br from-purple-50 to-indigo-100"
      style={{ width: "100vw", height: "100vh" }}
      onMouseMove={revealControls}
    >
      {/* Visualizer */}
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        className="w-full h-full"
      />

      {/* Floating audio controls */}
      <div
        className={`
          fixed bottom-4 left-1/2 -translate-x-1/2
          w-[95vw]
          transition-all duration-500 ease-out
          ${
            showControls
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4 pointer-events-none"
          }
        `}
        style={{ zIndex: 50 }}
      >
        <div className="
          backdrop-blur-md bg-black/40
          rounded-2xl px-4 py-2
          shadow-2xl
        ">
          <audio
            ref={audioRef}
            controls
            onPlay={startVisualizer}
            className="
              w-full h-8
              opacity-90
              accent-purple-400
            "
          />
        </div>
      </div>
    </div>
  );
}
