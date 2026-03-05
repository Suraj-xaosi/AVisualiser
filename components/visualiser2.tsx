"use client";

import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { useRef, useEffect, useState } from "react";

export default function Visualiser() {

  const audiourl = useAppSelector((state) => state.player.trackUrl);
  const playList = useAppSelector((state) => state.playList);
  const theme = useAppSelector((state) => state.theme);

  const dispatch = useAppDispatch();

  const { setTrack } = require("@/store/slices/playerSlice");

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const animationRef = useRef<number | null>(null);

  const [showControls, setShowControls] = useState(false);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);


  const revealControls = () => {
    setShowControls(true);
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    hideTimeoutRef.current = setTimeout(() => setShowControls(false), 3000);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = audiourl || "";
    }
    if (!audiourl && animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      return;
    }
    const playNext = async () => {
      try {
        await startVisualizer();
      } catch (err) {
        console.warn("Autoplay blocked:", err);
      }
    };
    playNext();
  }, [audiourl]);

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) audioCtxRef.current.close();
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, []);

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

  const startVisualizer = async () => {
    if (!audioRef.current || !canvasRef.current) return;
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext();
      const source = audioCtxRef.current.createMediaElementSource(audioRef.current);
      analyserRef.current = audioCtxRef.current.createAnalyser();
      analyserRef.current.fftSize = 128;
      source.connect(analyserRef.current);
      analyserRef.current.connect(audioCtxRef.current.destination);
      dataArrayRef.current = new Uint8Array(analyserRef.current.frequencyBinCount);
    }
    await audioCtxRef.current.resume();
    audioRef.current.play();
    draw();
  };

  const handleAudioEnded = () => {
    const idx = playList.findIndex(
      (t) => t.trackUrl === audiourl && t.trackUrl !== null
    );
    for (let i = idx + 1; i < playList.length; i++) {
      if (playList[i].trackUrl) {
        dispatch(setTrack({
          trackName: playList[i].trackName,
          trackUrl: playList[i].trackUrl,
          isPlaying: true,
        }));
        return;
      }
    }
  };

  const draw = () => {
    if (!canvasRef.current || !analyserRef.current || !dataArrayRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;
    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;
    //@ts-ignore
    analyserRef.current.getByteFrequencyData(dataArrayRef.current);

    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.fillStyle = theme.visualizerBgColor;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    const totalBars = dataArrayRef.current.length;
    const gap = 2;
    const barWidth = (WIDTH - gap * (totalBars - 1)) / totalBars;
    const radius = Math.max(3, barWidth * 1);

    for (let i = 0; i < totalBars; i++) {
      const barHeight = dataArrayRef.current[i] * 2.3;
      const x = i * (barWidth + gap);
      const y = HEIGHT - barHeight;
      const w = barWidth;
      const h = barHeight;

      if (h < 1) continue;

      // Parse bar color for shading
      const baseColor = theme.visualizerBarColor;

      // Rounded rect path (top corners only)
      const r = Math.min(radius, w / 2, h / 2);
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h);
      ctx.lineTo(x, y + h);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();

      // Main fill
      ctx.fillStyle = baseColor;
      ctx.fill();

       //Left face shadow — gives 3D depth illusion
      const shadowGrad = ctx.createLinearGradient(x, 0, x + w * 0.4, 0);
      shadowGrad.addColorStop(0, "rgba(0,0,0,0.1)");
      shadowGrad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = shadowGrad;
      ctx.fill();
    }

    animationRef.current = requestAnimationFrame(draw);
  };

  useEffect(() => {
    if (analyserRef.current && canvasRef.current && dataArrayRef.current && animationRef.current) {
      draw();
    }
  }, [theme.visualizerBgColor, theme.visualizerBarColor]);

  useEffect(() => {
    const resize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <div
      className="fixed inset-0 z-10"
      style={{ width: "100vw", height: "100vh", background: theme.visualizerBgColor, overflow: "hidden" }}
      onMouseMove={revealControls}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ display: "block", width: "100vw", height: "100vh" }}
      />

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
          className="backdrop-blur-md rounded-2xl px-4 py-2 shadow-2xl"
          style={{
            background: theme.sidebarBgColor + 'CC',
          }}
        >
          <audio
            ref={audioRef}
            controls
            onPlay={startVisualizer}
            onEnded={handleAudioEnded}
            className="w-full h-8 opacity-90"
            style={{ accentColor: theme.buttonBgColor, background: theme.listColor, color: theme.listColor, borderRadius: 8 }}
          />
        </div>
      </div>
    </div>
  );
}