---
layout: default
title: StudioRich | Lo-Fi Radio Chill Beats
description: "Stream lo-fi chill beats 24/7 from StudioRich – live music therapy, cozy visuals, and relaxed vibes direct from Twitch."
permalink: /live/
image: /assets/img/covers/live-stream.webp
---

  <div class="live-layout">
    <div class="video-container">
      <iframe
        src="https://player.twitch.tv/?channel=studiorich&parent=studiorich.shop"
        allowfullscreen
        frameborder="0"
      >
      </iframe>
    </div>

    <div class="chat-container" id="chatBox">
      <iframe
        src="https://www.twitch.tv/embed/studiorich/chat?parent=studiorich.shop&darkpopout"
        frameborder="0"
      >
      </iframe>
    </div>

  </div>

<button id="toggleChat">🗨️ Hide Chat</button>

  <script>
    document.addEventListener("DOMContentLoaded", function () {
      const toggleBtn = document.getElementById('toggleChat');
      const chatBox = document.getElementById('chatBox');

      toggleBtn.addEventListener('click', () => {
        if (chatBox.style.display === 'none') {
          chatBox.style.display = 'block';
          toggleBtn.textContent = '🗨️ Hide Chat';
        } else {
          chatBox.style.display = 'none';
          toggleBtn.textContent = '🗨️ Show Chat';
        }
      });
    });
  </script>

  <style>
    .live-layout {
      display: flex;
      flex-wrap: wrap;
      max-width: 100%;
      margin: 2rem auto;
      background: #000;
    }
    .video-container {
      flex: 2;
      min-width: 60%;
    }
    .video-container iframe {
      width: 100%;
      height: 600px;
      border-radius: 6px;
    }
    .chat-container {
      flex: 1;
      min-width: 300px;
      max-width: 400px;
      height: 600px;
      padding-left: 1rem;
    }
    .chat-container iframe {
      width: 100%;
      height: 100%;
      border-radius: 6px;
    }
    #toggleChat {
      margin: 1rem auto;
      display: block;
      background: #222;
      color: white;
      padding: 0.5rem 1rem;
      border: none;
      cursor: pointer;
    }
  </style>

  <div class="offline-message" style="text-align:center; color:#ccc; max-width:800px; margin:0 auto;">
    <h1 style="color:white;"><img src="/assets/ui/radio.svg" alt="Radio icon" class="icon-sm"> StudioRich Radio is Offline</h1>
    <p>We stream live every Monday to Thursday from 8–10PM EST.</p>
    <p>
      Catch Stranger Vibes, lo-fi chill, and ambient hip hop here or on
      <a href="https://twitch.tv/studiorich" target="_blank" style="color:#fff; text-decoration:underline;">Twitch</a>.
    </p>
  </div>
