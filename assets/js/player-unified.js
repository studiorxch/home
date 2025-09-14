/* ---- Events ---- */
npPlay && npPlay.addEventListener('click', (e) => { e.preventDefault(); toggle(); });
npPrev && npPrev.addEventListener('click', prev);
npNext && npNext.addEventListener('click', next);

npTrack && npTrack.addEventListener('click', toggle);
npPl && npPl.addEventListener('click', toggle);

document.addEventListener('keydown', (e) => {
    if (!document.body.classList.contains('playground')) return;
    if (e.code === 'Space' && !/input|textarea|select/i.test(e.target.tagName)) {
        e.preventDefault(); toggle();
    }
});

audio.addEventListener('play', render);
audio.addEventListener('pause', render);
audio.addEventListener('ended', next);

if (fab) fab.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); toggle(); });

// Queue drawer
if (qToggle) qToggle.addEventListener('click', () => {
    const open = !qWrap.hasAttribute('hidden');
    if (open) { qWrap.setAttribute('hidden', ''); qToggle.setAttribute('aria-expanded', 'false'); }
    else { qWrap.removeAttribute('hidden'); qToggle.setAttribute('aria-expanded', 'true'); }
});
if (qClose) qClose.addEventListener('click', () => {
    qWrap.setAttribute('hidden', ''); qToggle && qToggle.setAttribute('aria-expanded', 'false');
});

// Caption/overlay play buttons
document.addEventListener('click', (e) => {
    const btn = e.target.closest('.panel-play[data-playlist-ref]');
    if (!btn) return;
    e.preventDefault(); e.stopPropagation();
    const ref = btn.getAttribute('data-playlist-ref');
    if (ref === State.source.ref) toggle();
    else loadPlaylist(ref, { autoplay: true });
});

// Initial load
document.addEventListener('DOMContentLoaded', () => {
    const DEFAULT = (window.SRC && (SRC.default || SRC.DEFAULT)) || '/assets/playlists/default-playlist.json';
    loadPlaylist(DEFAULT, { autoplay: false });
});

// Expose tiny API
window.SRPlay = { loadPlaylist, next, prev, toggle, state: State, playIndex };
