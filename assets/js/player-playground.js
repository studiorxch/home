/* player-playground.js — minimal dock player for two playlists */

(() => {
    // DOM
    const ppBtn = document.getElementById('ppBtn');
    const progressBar = document.getElementById('progress-bar');
    const plStranger = document.getElementById('pl-stranger');
    const plReleases = document.getElementById('pl-releases');

    // Create/ensure audio element
    let audio = document.getElementById('audio');
    if (!audio) {
        audio = document.createElement('audio');
        audio.id = 'audio';
        audio.preload = 'auto';
        audio.style.display = 'none';
        document.body.appendChild(audio);
    }

    // Playlists (adjust paths as needed)
    const PLAYLIST_SOURCES = {
        stranger: '/assets/playlist/stranger-vibes-playlist.json',
        releases: '/assets/playlist/peace-token-playlist.json',
    };

    let currentPL = 'stranger';
    let tracks = [];
    let index = 0;
    let isReady = false;

    // Helpers
    function setActiveIcon(which) {
        [plStranger, plReleases].forEach(btn => btn.classList.remove('is-active'));
        if (which === 'stranger') plStranger.classList.add('is-active');
        if (which === 'releases') plReleases.classList.add('is-active');
    }

    function setPP(isPlaying) {
        ppBtn.textContent = isPlaying ? '⏸' : '▶';
    }

    async function loadPlaylist(which) {
        currentPL = which;
        setActiveIcon(which);

        try {
            const res = await fetch(PLAYLIST_SOURCES[which], { cache: 'no-store' });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            // Accepts either array of tracks or { tracks: [...] }
            tracks = Array.isArray(data) ? data : (data.tracks || []);
            if (!tracks.length) throw new Error('Empty playlist');
            index = 0;
            await loadTrack(index);
            isReady = true;
        } catch (err) {
            console.error('Playlist load error:', err);
            isReady = false;
        }
    }

    async function loadTrack(i) {
        const t = tracks[i];
        if (!t) return;
        audio.src = t.url || t.src || '';
        audio.currentTime = 0;
    }

    async function playCurrent() {
        if (!isReady) return;
        try {
            await audio.play();
            setPP(true);
        } catch (e) {
            console.error('Play error:', e);
            setPP(false);
        }
    }

    function pauseCurrent() {
        audio.pause();
        setPP(false);
    }

    function nextTrack() {
        if (!tracks.length) return;
        index = (index + 1) % tracks.length;
        loadTrack(index).then(playCurrent);
    }

    // Events
    ppBtn?.addEventListener('click', () => {
        if (!isReady) return;
        if (audio.paused) playCurrent(); else pauseCurrent();
    });

    plStranger?.addEventListener('click', async () => {
        await loadPlaylist('stranger');
        playCurrent();
    });

    plReleases?.addEventListener('click', async () => {
        await loadPlaylist('releases');
        playCurrent();
    });

    // Progress bar
    audio.addEventListener('timeupdate', () => {
        if (!audio.duration || !Number.isFinite(audio.duration)) return;
        const pct = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = `${pct}%`;
    });
    audio.addEventListener('ended', nextTrack);

    // Init: preload Stranger by default
    loadPlaylist('stranger').then(() => {
        setPP(false);
    });

    /* --------- Large edge hot zones for navigation --------- */
    const rail = document.getElementById('rail');
    let idx = 0;
    const slides = Array.from(rail.querySelectorAll('.slide'));
    function go(i) {
        idx = (i + slides.length) % slides.length;
        slides[idx].scrollIntoView({ behavior: 'smooth', inline: 'center' });
    }

    // Create the hot zones if not present
    if (!document.querySelector('.hot-left')) {
        const leftHot = Object.assign(document.createElement('div'), { className: 'hot hot-left' });
        const rightHot = Object.assign(document.createElement('div'), { className: 'hot hot-right' });
        document.body.append(leftHot, rightHot);
        leftHot.addEventListener('click', () => go(idx - 1));
        rightHot.addEventListener('click', () => go(idx + 1));
    }

    // Keep idx synced while scrolling
    function onScroll() {
        const x = rail.scrollLeft, w = rail.clientWidth;
        let best = Infinity, nearest = 0;
        slides.forEach((s, i) => {
            const d = Math.abs((s.offsetLeft - x) / w);
            if (d < best) { best = d; nearest = i; }
        });
        idx = nearest;
    }
    rail.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
})();
