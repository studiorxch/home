// Minimal resilient player (no drawers, no dependencies)
// Expects a global window.SRC = [{title, artist, url, cover?}, ...]
(function () {
    const audio = document.getElementById('audio');
    const btnPlay = document.getElementById('npPlay');
    const btnPrev = document.getElementById('npPrev');
    const btnNext = document.getElementById('npNext');
    const elList = document.getElementById('npPlaylist');
    const elTrack = document.getElementById('npTrack');

    // 1) Fallback if window.SRC didn’t populate
    const FALLBACK = [
        // Replace these three with ANY known-good MP3s on prod
        { title: "Signal Test A", artist: "StudioRich", url: "/assets/audio/playtracks/echoes-under-the-arches-s01.mp3" },
        { title: "Signal Test B", artist: "StudioRich", url: "/assets/audio/playtracks/straight-to-canvas-s01.mp3" },
        { title: "Signal Test C", artist: "StudioRich", url: "/assets/audio/playtracks/t-shirt-in-transit-s01.mp3" }
    ];
    let QUEUE = Array.isArray(window.SRC) && window.SRC.length ? window.SRC.slice() : FALLBACK;
    let i = 0;

    function label() {
        elList.textContent = `Playlist • ${QUEUE.length} tracks`;
        const cur = QUEUE[i];
        elTrack.textContent = cur ? `${cur.title || 'Untitled'} — ${cur.artist || 'StudioRich'}` : 'Nothing queued';
        btnPrev.disabled = i <= 0;
        btnNext.disabled = i >= QUEUE.length - 1;
        btnPlay.disabled = !QUEUE.length;
    }

    function load(n, auto = true) {
        if (!QUEUE.length) return;
        i = Math.max(0, Math.min(n, QUEUE.length - 1));
        audio.src = QUEUE[i].url;
        audio.load();
        label();
        if (auto) audio.play().catch(() => { });
    }

    function prev() {
        if (!QUEUE.length) return;
        if (audio.currentTime > 3) { audio.currentTime = 0; return; }
        if (i > 0) load(i - 1, true);
    }
    function next() {
        if (!QUEUE.length) return;
        if (i < QUEUE.length - 1) load(i + 1, true);
    }
    function toggle() {
        if (!QUEUE.length) return;
        if (audio.paused) audio.play().catch(() => { }); else audio.pause();
    }

    // Wire up
    btnPrev?.addEventListener('click', prev);
    btnNext?.addEventListener('click', next);
    btnPlay?.addEventListener('click', toggle);
    audio.addEventListener('ended', next);

    // Keyboard (space/←/→) – ignore if typing
    document.addEventListener('keydown', e => {
        if (/input|textarea|select/i.test(e.target.tagName)) return;
        if (e.code === 'Space') { e.preventDefault(); toggle(); }
        if (e.code === 'ArrowLeft') prev();
        if (e.code === 'ArrowRight') next();
    });

    // Boot
    label();
    if (QUEUE.length) load(0, false);

    // Expose a tiny API (optional)
    window.PlayerLite = {
        setQueue(list, start = 0) { QUEUE = (list || []).slice(); load(start, false); },
        next, prev, toggle,
    };
})();
