"use client";

import { useRef } from "react";

export default function AudioVisualizer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const animationRef = useRef<number | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !audioRef.current) return;

    const url = URL.createObjectURL(file);
    audioRef.current.src = url;
  };

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
    if (
      !canvasRef.current ||
      !analyserRef.current ||
      !dataArrayRef.current
    )
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

  return (
    <div style={{ padding: 20 }}>
      <input
        type="file"
        accept="audio/*"
        onChange={handleFileChange}
      />

      <br />

      <audio ref={audioRef} controls />

      <br />

      <canvas ref={canvasRef} width={600} height={300} />

      <br />

      <button onClick={startVisualizer}>Start Visualizer</button>
    </div>
  );
}
