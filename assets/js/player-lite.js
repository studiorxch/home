// assets/js/player-lite.js
(function () {
    const $ = (id) => document.getElementById(id);

    // Elements
    const audio = $('audio') || $('audio#audio') || document.getElementById('audio');
    const btnPlay = $('npPlay');
    const btnLoop = $('npLoop');
    const elPlaylist = $('npPlaylist');
    const elTrack = $('npTrack');

    // State
    let QUEUE = Array.isArray(window.SRC) ? window.SRC.slice() : [];
    let index = 0;

    // --- UI helpers
    function fmtTitle(t) {
        if (!t) return 'Nothing queued';
        const title = t.title || 'Untitled';
        const artist = t.artist || 'StudioRich';
        return `${title} — ${artist}`;
    }

    function updatePlayEnabled() {
        if (btnPlay) btnPlay.disabled = QUEUE.length === 0;
    }

    function updateMetaLabels() {
        if (elPlaylist) elPlaylist.textContent = `Playlist • ${QUEUE.length || '—'}`;
        if (elTrack) elTrack.textContent = fmtTitle(QUEUE[index]);
    }

    function updateLoopUI() {
        if (!btnLoop || !audio) return;
        btnLoop.dataset.active = audio.loop ? 'true' : 'false';
        btnLoop.setAttribute('aria-label', audio.loop ? 'Loop on' : 'Loop off');
        btnLoop.title = audio.loop ? 'Loop: On' : 'Loop: Off';
    }

    // --- Core
    function load(i, autoplay = false) {
        if (!audio || !QUEUE.length) return;
        index = Math.max(0, Math.min(i, QUEUE.length - 1));
        const t = QUEUE[index];

        // Do NOT override loop here; respect the user's toggle.
        // If you want track-suggested loop as a default, uncomment:
        // if (btnLoop && btnLoop.dataset.userSet !== 'true') audio.loop = !!t.loop;

        audio.src = t.url;
        audio.preload = 'auto';

        updatePlayEnabled();
        updateMetaLabels();

        if (autoplay) {
            audio.play().catch(() => {
                // user gesture may be required; UI stays paused
            });
        }
    }

    function toggle() {
        if (!audio || !QUEUE.length) return;
        if (audio.paused) {
            audio.play().catch(() => { });
        } else {
            audio.pause();
        }
    }

    // --- Events
    btnPlay?.addEventListener('click', toggle);

    btnLoop?.addEventListener('click', () => {
        audio.loop = !audio.loop;
        // mark that the user explicitly set loop (optional)
        if (btnLoop) btnLoop.dataset.userSet = 'true';
        updateLoopUI();
    });

    if (audio) {
        audio.addEventListener('ended', () => {
            // If not looping, just stop at end (no next/prev anymore)
            if (!audio.loop) {
                // ensure the play icon/label looks paused
                // (no icon swap logic here; add if you want visual change)
            }
        });
        audio.addEventListener('play', updateMetaLabels);
        audio.addEventListener('pause', updateMetaLabels);
        audio.addEventListener('error', () => {
            console.warn('Audio error – bad source?', QUEUE[index]);
            // stay put; no auto-skip since there’s no next button
        });
    }

    // Space bar = play/pause (outside inputs)
    document.addEventListener('keydown', (e) => {
        if (e.target && /input|textarea|select/i.test(e.target.tagName)) return;
        if (e.code === 'Space') { e.preventDefault(); toggle(); }
    });

    // --- Boot
    if (!QUEUE.length) {
        updatePlayEnabled();
        updateMetaLabels(); // shows "Nothing queued"
        console.warn('Player: window.SRC is empty');
    } else {
        load(0, false);
    }

    updateLoopUI();

    // Minimal API for later
    window.Player = {
        setQueue(list, startAt = 0) {
            QUEUE = (list || []).filter(Boolean);
            index = Math.max(0, Math.min(startAt, Math.max(0, QUEUE.length - 1)));
            load(index, false);
        },
        toggle,
        current: () => QUEUE[index],
        length: () => QUEUE.length,
    };
})();
