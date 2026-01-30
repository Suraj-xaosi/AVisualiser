

"use client";

import { useAppSelector } from "@/store/hooks";
import { useRef, useEffect, useState } from "react";

export default function Visualiser() {
  const audiourl = useAppSelector((state) => state.player.trackUrl);
  const theme = useAppSelector((state) => state.theme);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const animationRef = useRef<number | null>(null);

  const [showControls, setShowControls] = useState(false);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // show/hide controls
  const revealControls = () => {
    setShowControls(true);
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    hideTimeoutRef.current = setTimeout(() => setShowControls(false), 3000);
  };

  // Sync audio src
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = audiourl || "";
    }
    if (!audiourl && animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  }, [audiourl]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (audioCtxRef.current) audioCtxRef.current.close();
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  // Spacebar control
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

  // Visualizer logic
  const startVisualizer = async () => {
    if (!audioRef.current || !canvasRef.current) return;
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext();
      const source = audioCtxRef.current.createMediaElementSource(audioRef.current);
      analyserRef.current = audioCtxRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
      source.connect(analyserRef.current);
      analyserRef.current.connect(audioCtxRef.current.destination);
      dataArrayRef.current = new Uint8Array(analyserRef.current.frequencyBinCount);
    }
    await audioCtxRef.current.resume();
    audioRef.current.play();
    draw();
  };

  const draw = () => {
    if (!canvasRef.current || !analyserRef.current || !dataArrayRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;
    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;
    //@ts-ignore
    analyserRef.current.getByteFrequencyData(dataArrayRef.current);
    ctx.fillStyle = theme.visualizerBgColor;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    const barWidth = WIDTH / dataArrayRef.current.length;
    let x = 0;
    for (let i = 0; i < dataArrayRef.current.length; i++) {
      const barHeight = dataArrayRef.current[i] * 2.3;
      ctx.fillStyle = theme.visualizerBarColor;
      ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
      x += barWidth;
    }
    animationRef.current = requestAnimationFrame(draw);
  };

  // Fullscreen canvas sizing
  useEffect(() => {
    const resize = () => {
      if (canvasRef.current) {
        //@ts-ignore
        canvasRef.current.width = window.innerWidth;
        //@ts-ignore
        canvasRef.current.height = window.innerHeight;
      }
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // Fullscreen handler
  const handleFullscreen = () => {
    if (canvasRef.current && canvasRef.current.requestFullscreen) {
      canvasRef.current.requestFullscreen();
    }
  };

  return (
    <div
      className="fixed inset-0 z-10"
      style={{ width: "100vw", height: "100vh", background: theme.visualizerBgColor, overflow: "hidden" }}
      onMouseMove={revealControls}
    >
      {/* Visualizer */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ display: "block", width: "100vw", height: "100vh" }}
      />

      {/* Fullscreen button */}
      <button
        onClick={handleFullscreen}
        className="fixed top-4 left-4 z-50 rounded-full p-2 shadow-lg hover:scale-110 transition"
        style={{
          fontSize: 22,
          background: theme.visualizerBgColor + 'CC',
          color: theme.textColor,
          boxShadow: '0 2px 8px 0 #0002',
        }}
        title="Fullscreen visualiser"
        aria-label="Fullscreen visualiser"
      >
        ⛶
      </button>

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
        <div
          className="backdrop-blur-md rounded-2xl px-4 py-2 shadow-2xl "
          style={{
            background: theme.sidebarBgColor + 'CC',
          }}
        >
          <audio
            ref={audioRef}
            controls
            onPlay={startVisualizer}
            className="w-full h-8 opacity-90"
            style={{ accentColor: theme.buttonBgColor, background: theme.listColor, color: theme.listColor, borderRadius: 8 }}
          />
        </div>
      </div>
    </div>
  );
}
