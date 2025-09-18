// assets/js/player-lite.js

(function () {
    const $ = (id) => document.getElementById(id);
    // --- selectors (be strict) ---
    const audio = document.getElementById('audio') || document.querySelector('audio');
    const btnPlay = document.getElementById('npPlay');
    const btnLoop = document.getElementById('npLoop');
    const elPl = document.getElementById('npPlaylist');
    const elTrack = document.getElementById('npTrack');

    const iconPlay = document.getElementById('iconPlay');
    const iconPause = document.getElementById('iconPause');

    function updatePlayIcon() {
        if (!iconPlay || !iconPause || !audio) return;
        const playing = !audio.paused && !audio.ended;
        iconPlay.style.display = playing ? 'none' : '';
        iconPause.style.display = playing ? '' : 'none';
    }


    let QUEUE = Array.isArray(window.SRC) ? window.SRC.slice() : [];
    let index = 0;

    // --- helpers ---
    function fmtTitle(t) {
        if (!t) return 'Nothing queued';
        const title = t.title || 'Untitled';
        const artist = t.artist || 'RXCH';
        return `${title} — ${artist}`;
    }

    function updateMetaLabels() {
        if (elPl) elPl.textContent = `Playlist • ${Math.max(QUEUE.length, 0)}`;
        if (elTrack) elTrack.textContent = fmtTitle(QUEUE[index]);
    }

    function updateLoopUI() {
        if (!btnLoop || !audio) return;
        btnLoop.dataset.active = audio.loop ? 'true' : 'false';
        btnLoop.setAttribute('aria-label', audio.loop ? 'Loop on' : 'Loop off');
        btnLoop.title = audio.loop ? 'Loop: On' : 'Loop: Off';
    }

    // --- core ---
    function load(i, autoplay = false) {
        if (!audio || !QUEUE.length) return;
        index = Math.max(0, Math.min(i, QUEUE.length - 1));
        const t = QUEUE[index];

        // honor per-track loop flag if present
        audio.loop = !!(t && t.loop);

        audio.src = t.url;
        audio.preload = 'auto';

        updateMetaLabels();
        updateLoopUI();

        if (autoplay) {
            audio.play().catch(() => {/* gesture required */ });
        }
    }

    function togglePlay() {
        if (!audio || !QUEUE.length) return;
        // first click & no src? ensure something is loaded
        if (!audio.src) { load(index || 0, true); return; }
        if (audio.paused) audio.play().catch(() => { });
        else audio.pause();
    }

    // --- wire up buttons ---
    if (btnPlay) btnPlay.addEventListener('click', togglePlay);

    if (btnLoop) {
        btnLoop.addEventListener('click', () => {
            if (!audio) return;
            audio.loop = !audio.loop;
            updateLoopUI();
        });
    }

    if (audio) {
        audio.addEventListener('play', () => { updateMetaLabels(); updatePlayIcon(); });
        audio.addEventListener('pause', () => { updateMetaLabels(); updatePlayIcon(); });
        audio.addEventListener('ended', () => { updatePlayIcon(); /* existing ended logic */ });
    }

    // --- audio events ---
    if (audio) {
        audio.addEventListener('ended', () => {
            // if you ever bring back next/prev, skip here when not looping
            if (!audio.loop) { /* next(); */ }
        });
        audio.addEventListener('play', updateMetaLabels);
        audio.addEventListener('pause', updateMetaLabels);
        audio.addEventListener('error', () => {
            console.warn('Audio error – skipping', QUEUE[index]);
            // if you restore next(), you could auto-skip here.
        });
    }

    // --- boot ---
    if (QUEUE.length) {
        load(0, false);   // prepare first track (no autoplay)
    } else {
        updateMetaLabels(); // shows “Nothing queued”
        console.warn('Player: window.SRC is empty');
    }

})();
