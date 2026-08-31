# 🎧 Audio Visualiser

A web app that turns your music into moving, colorful visuals. Play a song and watch animated bars dance to the beat in real time.

Live demo: https://avisualiser.onrender.com/

## What it does

- **Play your own audio** — upload songs from your device. They are saved in your browser (offline storage), so they stay there even after you close the tab.
- **Play online tracks** — the app can also load a list of songs from an online source (a manifest file) and play them directly.
- **Real-time visuals** — using the Web Audio API, the app reads the sound as it plays and draws animated bars on the screen that move with the music.
- **Custom themes** — change colors of the bars, background, buttons, and more. Several ready-made color presets are included.
- **Adjustable detail** — switch between a low or high number of bars in the visualiser.
- **Playlist** — add multiple songs to a queue and move to the next one automatically when a song ends.

## How it works (simple version)

1. You add a song (from your device or the online list).
2. The app sends the audio through the browser's Web Audio API.
3. It measures the sound frequencies many times per second.
4. Those numbers are drawn as bars on a canvas, so the bars grow and shrink with the beat.

## Tech used

- **Next.js** — the web framework
- **React** — builds the interface
- **Redux Toolkit** — keeps track of the current song, playlist, and theme
- **IndexedDB (via `idb`)** — stores your uploaded songs in the browser
- **Tailwind CSS** — styling
- **Web Audio API + Canvas** — the actual visualiser

## Running it locally

```bash
npm install
npm run build
npm run start:standalone
```

> Note: `npm run dev` may not behave perfectly. For the best experience, use the build + standalone start above.

## Docker

A `Dockerfile` is included, so the app can also be built and run as a container.


![alt text](<Screenshot 2026-08-22 140752.png>)
![alt text](<Screenshot 2026-08-22 140815.png>)
![alt text](<Screenshot 2026-08-22 140933.png>)
![alt text](<Screenshot 2026-08-22 140836.png>)