let playlist = [];
let currentTrack = 0;
let loopCounter = 0;
let maxRepeats = 0;

const audio = document.getElementById("audio");
const nowPlaying = document.getElementById("now-playing");

/**
 * Parse "m:ss" (e.g. "2:27") into seconds
 */
function parseDuration(durationStr) {
    if (!durationStr) return 0;
    const parts = durationStr.split(":").map(Number);
    if (parts.length === 2) {
        return parts[0] * 60 + parts[1];
    } else if (parts.length === 3) {
        return parts[0] * 3600 + parts[1] * 60 + parts[2];
    }
    return 0;
}

// Load playlist JSON
fetch("/desktop/stranger-vibes-playlist.json")
    .then((response) => response.json())
    .then((data) => {
        playlist = data.tracks;
        loadTrack(0); // start first track
    });

function loadTrack(index) {
    currentTrack = index;
    loopCounter = 0;

    const track = playlist[index];
    audio.src = track.file;
    nowPlaying.innerHTML = `
    <img src="${track.cover}" alt="${track.title}"
         style="width:80px;height:auto;margin-right:10px;vertical-align:middle;" />
    <span><img src="/assets/icons/musicnote.svg" alt="Music Note icon" class="icon-sm" />: <a href="${track.link}">${track.title}</a></span>
  `;

    // When metadata loads, calculate repeats
    audio.addEventListener(
        "loadedmetadata",
        () => {
            const loopLength = audio.duration; // seconds
            const fullDuration = parseDuration(track.duration);
            maxRepeats =
                loopLength && fullDuration
                    ? Math.max(1, Math.round(fullDuration / loopLength))
                    : 1;

            console.log(
                `▶️ ${track.title} | Loop length: ${loopLength.toFixed(
                    2
                )}s | Full duration: ${fullDuration}s | Repeats: ${maxRepeats}`
            );

            audio.play();
        },
        { once: true }
    );
}

// Handle loop repeats until duration reached
audio.addEventListener("ended", () => {
    loopCounter++;
    if (loopCounter < maxRepeats) {
        audio.currentTime = 0;
        audio.play();
    } else {
        nextTrack();
    }
});

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
