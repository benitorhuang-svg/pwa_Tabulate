import { songs } from "./data/songs";
import type { Song } from "./types/song";
import { ScoreRenderer } from "./core/ScoreRenderer";
import { AudioController } from "./core/AudioController";
import "./assets/styles/main.css";

const initApp = (): void => {
  const scoreRenderer = new ScoreRenderer();
  const audioController = new AudioController();

  // DOM Elements
  const select = document.getElementById("song-select") as HTMLSelectElement;
  const metaBpm = document.getElementById("meta-bpm");
  const metaKey = document.getElementById("meta-key");
  const playerStatus = document.getElementById("player-status");
  const btnPlayPause = document.getElementById("btn-play-pause");
  const btnRestart = document.getElementById("btn-restart");
  const btnSpeedUp = document.getElementById("btn-speed-up");
  const btnSpeedDown = document.getElementById("btn-speed-down");
  const playIcon = document.getElementById("play-icon");
  const pauseIcon = document.getElementById("pause-icon");
  const progressBar = document.getElementById("progress-bar");
  const progressContainer = document.getElementById("progress-container");
  const currentTimeLabel = document.getElementById("current-time");
  const playerSongTitle = document.getElementById("player-song-title");
  const playerSongArtist = document.getElementById("player-song-artist");

  if (
    !select ||
    !metaBpm ||
    !metaKey ||
    !playerStatus ||
    !btnPlayPause ||
    !btnRestart ||
    !btnSpeedUp ||
    !btnSpeedDown ||
    !playIcon ||
    !pauseIcon ||
    !progressBar ||
    !progressContainer ||
    !currentTimeLabel ||
    !playerSongTitle ||
    !playerSongArtist
  )
    return;

  let isEngineInitialized = false;
  let currentWarp = 1.0;
  let baseBpm = 160;

  const updateBpmUI = () => {
    if (metaBpm) {
      const adjustedBpm = Math.round(baseBpm * currentWarp);
      metaBpm.innerText = `${adjustedBpm} BPM`;
    }
  };

  const updateUIForStatus = () => {
    const status = audioController.getStatus();
    if (status === "playing") {
      playIcon.classList.add("hidden");
      pauseIcon.classList.remove("hidden");
    } else {
      playIcon.classList.remove("hidden");
      pauseIcon.classList.add("hidden");
    }
    playerStatus.innerText =
      status === "off" ? "INITIALIZING" : status.toUpperCase();
  };

  const startEngine = async () => {
    if (isEngineInitialized) return;
    const visualObj = scoreRenderer.getVisualObj();
    if (!visualObj) return;

    try {
      playerStatus.innerText = "LOADING...";
      await audioController.init(visualObj, "#audio-player", (event) => {
        if (!event) {
          scoreRenderer.clearHighlights();
          return;
        }
        scoreRenderer.clearHighlights();

        // Safely extract elements from abcjs timing event
        const ev = event as { elements: HTMLElement[][] };
        if (ev.elements) {
          ev.elements.forEach((line) => {
            line.forEach((el) => el.classList.add("abcjs-highlight"));
          });
        }
      });
      isEngineInitialized = true;
      updateUIForStatus();
    } catch (e) {
      console.error(e);
      playerStatus.innerText = "FAIL";
    }
  };

  // Listen for playback updates from AudioController custom events
  window.addEventListener("playback-update", (e: Event) => {
    const ev = (e as CustomEvent).detail;
    const progress = ev.progress * 100;
    progressBar.style.width = `${progress}%`;

    // Update simple time (approximation)
    const current = Math.floor(ev.progress * 60); // Fake seconds for demo
    currentTimeLabel.innerText = `00:${current.toString().padStart(2, "0")}`;

    updateUIForStatus();
  });

  // Populate Select Options
  songs.forEach((song: Song) => {
    const option = document.createElement("option");
    option.value = song.id;
    option.textContent = `${song.title} • ${song.artist}`;
    select.appendChild(option);
  });

  const loadSong = async (songId: string) => {
    const song = songs.find((s: Song) => s.id === songId) || songs[0];
    scoreRenderer.render(song.notation);

    if (playerSongTitle) playerSongTitle.innerText = song.title;
    if (playerSongArtist) playerSongArtist.innerText = song.artist;

    const bpmMatch = song.notation.match(/Q:1\/4=(\d+)/);
    const keyMatch = song.notation.match(/K:(\w+)/);
    baseBpm = bpmMatch ? parseInt(bpmMatch[1]) : 120;
    updateBpmUI();
    metaKey.innerText = keyMatch ? `${keyMatch[1]} KEY` : "UNKNOWN";

    const metaBpmTop = document.getElementById("meta-bpm-top");
    const metaKeyTop = document.getElementById("meta-key-top");

    if (metaBpmTop)
      metaBpmTop.innerText = `${bpmMatch ? bpmMatch[1] : "120"} BPM`;
    if (metaKeyTop)
      metaKeyTop.innerText = keyMatch ? `${keyMatch[1]} KEY` : "UNKNOWN";

    const vObj = scoreRenderer.getVisualObj();
    if (isEngineInitialized && vObj) {
      await audioController.init(vObj, "#audio-player", () => {});
      updateUIForStatus();
    }
  };

  select.addEventListener("change", (e: Event) => {
    loadSong((e.target as HTMLSelectElement).value);
    startEngine();
  });

  btnPlayPause.addEventListener("click", async () => {
    if (!isEngineInitialized) {
      await startEngine();
    }
    audioController.toggle();
    updateUIForStatus();
  });

  btnRestart.addEventListener("click", () => {
    audioController.restart();
    updateUIForStatus();
  });

  btnSpeedUp.addEventListener("click", () => {
    currentWarp = Math.min(currentWarp + 0.05, 2.0);
    audioController.setSpeed(currentWarp);
    updateBpmUI();
  });

  btnSpeedDown.addEventListener("click", () => {
    currentWarp = Math.max(currentWarp - 0.05, 0.5);
    audioController.setSpeed(currentWarp);
    updateBpmUI();
  });

  progressContainer.addEventListener("click", (e: MouseEvent) => {
    if (!isEngineInitialized) return;
    const rect = progressContainer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = x / rect.width;
    audioController.seek(percent);
  });

  document.addEventListener("click", startEngine, { once: true });
  loadSong(songs[0].id);
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}
