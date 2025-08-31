// /assets/js/player-playground.js
(function () {
    // Run after DOM is parsed (script is defer, but this is extra-safe)
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }

    function init() {
        const audio = document.getElementById("audio");
        const nowPlaying = document.getElementById("now-playing"); // optional
        const npCover = document.getElementById("np-cover");
        const coverPP = document.querySelector(".cover-pp");
        const progressBar = document.getElementById("progress-bar");

        // If any core element is missing, bail with a clear message.
        if (!audio || !npCover || !coverPP || !progressBar) {
            console.warn(
                "[playground] Missing required elements:",
                { audio: !!audio, npCover: !!npCover, coverPP: !!coverPP, progressBar: !!progressBar }
            );
            return;
        }

        // Playlists (2 icons in the dock)
        const PLAYLISTS = {
            stranger: "/assets/playlist/stranger-vibes-playlist.json",
            releases: "/assets/playlist/peace-token-playlist.json",
        };

        let tracks = [];
        let idx = 0;
        let isPlaying = false;

        // Default: load Stranger Vibes
        loadPlaylist("stranger");

        // Dock icon clicks swap playlists
        document.querySelectorAll(".dock-item[data-playlist]").forEach(btn => {
            btn.addEventListener("click", () => {
                const key = btn.getAttribute("data-playlist");
                loadPlaylist(key);
            });
        });

        function loadPlaylist(key) {
            const url = PLAYLISTS[key];
            if (!url) return;
            fetch(url)
                .then(r => {
                    if (!r.ok) throw new Error(`HTTP ${r.status}`);
                    return r.json();
                })
                .then(json => {
                    // Accept either {tracks:[...]} or [...]
                    tracks = Array.isArray(json) ? json : (json.tracks || []);
                    if (!tracks.length) throw new Error("Empty playlist");
                    idx = 0;
                    loadTrack(idx);
                    play(); // auto-start when user taps an icon
                })
                .catch(err => {
                    console.error("[playground] Playlist load error:", err);
                });
        }

        function loadTrack(i) {
            const t = tracks[i];
            if (!t) return;

            // Expect fields like: { title, file, cover, duration }
            audio.src = t.file;
            if (npCover) {
                npCover.src = t.cover || "";
                npCover.style.display = t.cover ? "block" : "none";
            }
            if (nowPlaying) nowPlaying.textContent = t.title || "Untitled";
            audio.load();
        }

        function play() {
            audio.play().then(() => {
                isPlaying = true;
                coverPP.textContent = "⏸";
                document.body.classList.add("is-playing");
            }).catch(err => {
                console.warn("[playground] Autoplay blocked until user gesture.", err);
            });
        }

        function pause() {
            audio.pause();
            isPlaying = false;
            coverPP.textContent = "▶";
            document.body.classList.remove("is-playing");
        }

        // Toggle from the overlay button on the cover
        coverPP.addEventListener("click", () => (isPlaying ? pause() : play()));

        // Next track when current ends
        audio.addEventListener("ended", () => {
            idx = (idx + 1) % tracks.length;
            loadTrack(idx);
            play();
        });

        // Update bottom progress stripe
        audio.addEventListener("timeupdate", () => {
            if (!audio.duration) return;
            progressBar.style.width = ((audio.currentTime / audio.duration) * 100) + "%";
        });
    }
})();
