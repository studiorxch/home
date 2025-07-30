---
layout: desktop
title: Coming Soon
permalink: /coming-soon/
meta_title: StudioRich – Coming Soon
meta_description: This track or product isn’t live yet, but it’s coming soon. In the meantime, check out our latest releases.
image: /assets/wallpapers/default.webp
noindex: true
---

<link rel="stylesheet" href="/assets/css/desktop.css" />

<div id="menu-bar">
  <div class="menu-left">
    <img src="/assets/icons/logo-mini.svg" alt="StudioRich Logo" class="menu-logo" />
    StudioRich OS
  </div>
  <div class="menu-right">
    <span id="current-date"></span>
    ·
    <span id="clock"></span>
  </div>
</div>

<div id="desktop">

  <!-- Static Icon: Music Folder -->
  <div class="icon">
    <img src="/assets/icons/folder-music.webp" alt="Music Folder">
    <span>Music</span>
  </div>

  <!-- Static Icon: Zines Folder -->
  <div class="icon">
    <img src="/assets/icons/folder-zine.webp" alt="Zines Folder">
    <span>Zines</span>
  </div>

<div class="desktop-player">
  <h2>Now Playing</h2>
  <p id="now-playing">Loading playlist...</p>

  <div id="player-controls">
    <button onclick="prevTrack()">⏮️ Prev</button>
    <button onclick="togglePlay()">▶️ Play / ⏸️ Pause</button>
    <button onclick="nextTrack()">⏭️ Next</button>
  </div>

<audio id="audio" preload="auto" controls></audio>

</div>

{% include desktop-dock.html %}

<script>
  // Quick bootstrap playlist (replace with M3U parser later)
  const playlist = [
    { title: "Missing Frame", file: "/assets/loops/skatepark-ruins-loop.mp3" },
    { title: "Night Signals", file: "/assets/loops/static-memory-loop.mp3" },
    { title: "Glitch Garden", file: "/assets/loops/backwards-bloom-loop.mp3" }
  ];

  let currentTrack = 0;
  const audio = document.getElementById("audio");
  const nowPlaying = document.getElementById("now-playing");

  function loadTrack(index) {
    currentTrack = index;
    audio.src = playlist[index].file;
    nowPlaying.textContent = "Now Playing: " + playlist[index].title;
    audio.play();
  }

  function togglePlay() {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  }

  function nextTrack() {
    loadTrack((currentTrack + 1) % playlist.length);
  }

  function prevTrack() {
    loadTrack((currentTrack - 1 + playlist.length) % playlist.length);
  }

  audio.addEventListener("ended", nextTrack);

  // Load first track
  loadTrack(0);
</script>

</div>

<div class="window visible" id="window-comingsoon">
  <div class="window-header"><img src="/assets/icons/cursor.svg" alt="Cursor icon" style="width: 1em; vertical-align: middle; margin: 0;" /> Track Incoming…</div>
  <div class="window-body">
    <p>This track or product isn’t live yet, but it’s in the works and coming soon.</p>

    <ul style="margin-top: 1rem;">
      <li><a href="/library/"><img src="/assets/icons/headphones.svg" alt="Headphones icon" style="width: 1em; vertical-align: middle; margin: 0;" />  Explore all tracks</a></li>
      <li><a href="/links/"><img src="/assets/icons/drop.svg" alt="Drop icon" style="width: 1em; vertical-align: middle; margin: 0;" />  Check out our latest drops</a></li>
      <li><a href="/blog/"><img src="/assets/icons/disco-ball.svg" alt="Disco Ball icon" style="width: 1em; vertical-align: middle; margin: 0;" />  Catch up on the blog</a></li>
    </ul>

  </div>
</div>
