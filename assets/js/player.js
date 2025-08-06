let playlist = [];
let currentTrack = 0;
let loopCounter = 0;

const audio = document.getElementById("audio");
const nowPlaying = document.getElementById("now-playing");

fetch("/_desktop/stranger-vibes-playlist.json")
    .then(response => response.json())
    .then(data => {
        playlist = data.tracks;
        loadTrack(0); // start first track
    });

// Load track and reset loop counter
function loadTrack(index) {
    currentTrack = index;
    loopCounter = 0;
    const track = playlist[index];
    audio.src = track.file;
    nowPlaying.innerHTML = `
    <img src="${track.cover}" alt="${track.title}"
         style="width:80px;height:auto;margin-right:10px;vertical-align:middle;" />
    <span>Now Playing: <a href="${track.link}">${track.title}</a></span>
  `;
    audio.play();
}

// Handle repeats until approx duration reached
audio.addEventListener("ended", () => {
    const track = playlist[currentTrack];

    // if no duration/loop_length metadata, just skip forward
    if (!track.duration || !track.loop_length) {
        nextTrack();
        return;
    }

    loopCounter++;
    const maxRepeats = Math.round(track.duration / track.loop_length);

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
