// assets/js/player-lite.js

(function () {
    const $ = (id) => document.getElementById(id);

    // assume $ = id selector helper
    const audio = document.getElementById('audio');   // safer than $('audio')
    const btnPlay = document.getElementById('npPlay');
    const btnLoop = document.getElementById('npLoop');
    const elPl = document.getElementById('npPlaylist');
    const elTrack = document.getElementById('npTrack');

    if (btnLoop && audio) {
        btnLoop.addEventListener('click', () => {
            audio.loop = !audio.loop;
            btnLoop.dataset.active = audio.loop ? "true" : "false";
        });
    }


    let QUEUE = Array.isArray(window.SRC) ? window.SRC.slice() : [];
    let index = 0;

    function fmtTitle(t) {
        if (!t) return 'Nothing queued';
        const title = t.title || 'Untitled';
        const artist = t.artist || 'StudioRich';
        return `${title} — ${artist}`;
    }

    function updateLabels() {
        if (elPl) elPl.textContent = `Playlist • ${Math.max(QUEUE.length, 0)}`;
        if (elTrack) elTrack.textContent = fmtTitle(QUEUE[index]);
    }

    function updateLoopUI() {
        const on = !!audio.loop;
        btnLoop?.setAttribute('aria-label', on ? 'Loop on' : 'Loop off');
        btnLoop?.setAttribute('title', on ? 'Loop: On' : 'Loop: Off');
        btnLoop?.classList.toggle('is-on', on);
    }

    function load(i, autoplay = false) {
        if (!audio || !QUEUE.length) return;
        index = Math.max(0, Math.min(i, QUEUE.length - 1));
        const t = QUEUE[index];

        // per-track loop preference (optional)
        audio.loop = !!t.loop;

        audio.src = t.url;
        audio.preload = 'auto';

        updateLabels();
        updateLoopUI();

        if (autoplay) {
            audio.play().catch(() => {/* waits for user gesture */ });
        }
    }

    function toggle() {
        if (!audio || !QUEUE.length) return;
        if (audio.paused) audio.play().catch(() => { });
        else audio.pause();
    }

    // Events
    btnPlay?.addEventListener('click', toggle);
    btnLoop?.addEventListener('click', () => { audio.loop = !audio.loop; updateLoopUI(); });

    audio?.addEventListener('ended', () => { /* loop handled by element; do nothing */ });
    audio?.addEventListener('play', updateLabels);
    audio?.addEventListener('pause', updateLabels);
    audio?.addEventListener('error', () => {
        console.warn('Audio error – bad source?', QUEUE[index]);
    });

    // Boot
    if (!QUEUE.length) {
        console.warn('Player: window.SRC is empty');
        updateLabels(); updateLoopUI();
    } else {
        load(0, false);
    }

    // Tiny API
    window.Player = {
        setQueue(list, startAt = 0) {
            QUEUE = (list || []).filter(Boolean);
            index = Math.max(0, Math.min(startAt, Math.max(0, QUEUE.length - 1)));
            load(index, false);
        },
        toggle,
        current: () => QUEUE[index],
        length: () => QUEUE.length
    };
})();
