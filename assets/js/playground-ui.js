//playground-ui.js (temp)


const rail = document.getElementById("rail");
const slides = Array.from(rail.querySelectorAll(".slide"));
const dots = document.getElementById("dots");
const counterEl = document.getElementById("counter");
const pill = counterEl?.querySelector(".pill");
const edgeL = document.getElementById("edge-left");
const edgeR = document.getElementById("edge-right");

function makeDots() {
    dots.innerHTML = "";
    slides.forEach((_, i) => {
        const b = document.createElement("button");
        b.className = "dot";
        b.setAttribute("role", "tab");
        b.addEventListener("click", () => go(i));
        dots.appendChild(b);
    });
}
makeDots();

addEventListener("mousemove", (e) => {
    const band = 80;
    edgeL.classList.toggle("show", e.clientX < band);
    edgeR.classList.toggle("show", innerWidth - e.clientX < band);
});
edgeL
    .querySelector("button")
    .addEventListener("click", () => go(idx - 1));
edgeR
    .querySelector("button")
    .addEventListener("click", () => go(idx + 1));

rail.addEventListener(
    "wheel",
    (e) => {
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
            rail.scrollLeft += e.deltaY;
            e.preventDefault();
        }
    },
    { passive: false }
);

let isDown = false,
    startX = 0,
    startScroll = 0,
    lastX = 0,
    lastT = 0,
    vel = 0;
const px = (e) => (e.touches ? e.touches[0].clientX : e.clientX);
const now = () => performance.now();
const friction = 0.95;

function pointerDown(e) {
    isDown = true;
    rail.classList.add("dragging");
    startX = px(e);
    startScroll = rail.scrollLeft;
    lastX = startX;
    lastT = now();
    vel = 0;
}
function pointerMove(e) {
    if (!isDown) return;
    const x = px(e),
        t = now();
    rail.scrollLeft = startScroll - (x - startX);
    vel = ((lastX - x) / (t - lastT)) * 16;
    lastX = x;
    lastT = t;
}
function pointerUp() {
    if (!isDown) return;
    isDown = false;
    rail.classList.remove("dragging");
    (function fling(v) {
        if (Math.abs(v) < 0.1) return;
        rail.scrollLeft += v;
        v *= friction;
        requestAnimationFrame(() => fling(v));
    })(vel * 14);
}

rail.addEventListener("pointerdown", pointerDown);
addEventListener("pointermove", pointerMove);
addEventListener("pointerup", pointerUp);

rail.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") go(idx + 1);
    if (e.key === "ArrowLeft") go(idx - 1);
});

let idx = 0;
const prefersReduced = matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

function updateUI(i) {
    if (pill) pill.textContent = `${i + 1} / ${slides.length}`;
    slides.forEach((s, n) => s.classList.toggle("is-active", n === i));
    [...dots.children].forEach((d, n) =>
        d.setAttribute("aria-current", n === i ? "true" : "false")
    );
}

function positionActive() {
    const active = document.querySelector(".slide.is-active");
    if (active) positionTagsForSlide(active);
}

function go(i) {
    idx = (i + slides.length) % slides.length;
    slides[idx].scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", inline: "center" });
    updateUI(idx);
    requestAnimationFrame(() => requestAnimationFrame(() => {
        const active = document.querySelector('.slide.is-active');
        if (active && window.PlaygroundTags) window.PlaygroundTags.update();
    }));
}


function onScroll() {
    const x = rail.scrollLeft,
        w = rail.clientWidth;
    let best = Infinity,
        nearest = 0;
    slides.forEach((s, i) => {
        const d = Math.abs((s.offsetLeft - x) / w);
        if (d < best) {
            best = d;
            nearest = i;
        }
    });
    if (nearest !== idx) {
        idx = nearest;
        updateUI(idx);
    }
}
rail.addEventListener("scroll", onScroll, { passive: true });
addEventListener("resize", onScroll);

// Counter: auto-hide
setTimeout(() => counterEl.classList.add("is-hidden"), 3500);
["scroll", "keydown", "pointerdown", "touchstart"].forEach((evt) =>
    rail.addEventListener(evt, () => counterEl.classList.add("is-hidden"), {
        once: true,
        passive: true,
    })
);

function parseObjectPosition(str) {
    // 'center', 'center-bottom', 'left top', etc -> [0..1, 0..1]
    // defaults to center if missing
    if (!str) return [0.5, 0.5];
    const map = { left: 0, center: 0.5, right: 1, top: 0, bottom: 1 };
    const parts = String(str).replace("-", " ").split(/\s+/);
    if (parts.length === 1) parts.push("center");
    const [hx, vy] = parts;
    return [map[hx] ?? 0.5, map[vy] ?? 0.5];
}

function positionTagsForSlide(slide) {
    const img = slide.querySelector(".media");
    const tagsC = slide.querySelector(".tags");
    if (!img || !tagsC) return;

    const frameRect = img.getBoundingClientRect(); // same as .frame since img fills it
    const cw = frameRect.width,
        ch = frameRect.height;

    // Natural size (fallback to current if not loaded yet)
    const nw = img.naturalWidth || cw;
    const nh = img.naturalHeight || ch;

    // object-fit: cover math
    const scale = Math.max(cw / nw, ch / nh);
    const dw = nw * scale; // displayed image width
    const dh = nh * scale; // displayed image height

    // account for object-position (e.g., center-bottom)
    const [ox, oy] = parseObjectPosition(
        getComputedStyle(img).objectPosition || slide.dataset.pos
    );
    const offsetLeft = (cw - dw) * ox;
    const offsetTop = (ch - dh) * oy;

    tagsC.querySelectorAll(".tag").forEach((tag) => {
        const x = parseFloat(tag.dataset.x); // 0..1
        const y = parseFloat(tag.dataset.y); // 0..1
        const left = offsetLeft + x * dw;
        const top = offsetTop + y * dh;
        tag.style.left = `${left}px`;
        tag.style.top = `${top}px`;
    });
}

// Set up once per slide, then react to resizes
const ro = new ResizeObserver((entries) => {
    for (const entry of entries) {
        const slide = entry.target.closest(".slide") || entry.target;
        positionTagsForSlide(slide);
    }
});

document.querySelectorAll(".slide").forEach((slide) => {
    const img = slide.querySelector(".media");
    if (!img) return;

    // Reposition when the image finishes loading
    if (img.complete) positionTagsForSlide(slide);
    else
        img.addEventListener("load", () => positionTagsForSlide(slide), {
            once: true,
        });

    // Reposition on slide/container resize
    ro.observe(slide);

    // (Optional) also update when you change slides
    slide.addEventListener("transitionend", () =>
        positionTagsForSlide(slide)
    );
});

function parseObjectPosition(str) {
    if (!str) return [0.5, 0.5];
    const s = String(str).replace("-", " ");
    const map = { left: 0, center: 0.5, right: 1, top: 0, bottom: 1 };
    const parts = s.trim().split(/\s+/);
    if (parts.length === 1) parts.push("50%");
    const toNum = (v) =>
        v.endsWith("%")
            ? Math.min(1, Math.max(0, parseFloat(v) / 100))
            : map[v] ?? 0.5;
    return [toNum(parts[0]), toNum(parts[1])];
}





// If your carousel changes size via JS, call this after layout changes:
addEventListener("resize", () => {
    document.querySelectorAll(".slide").forEach(positionTagsForSlide);
});

rail.addEventListener("scroll", () => { onScroll(); positionActive(); }, { passive: true });
addEventListener('resize', () => {
    document.querySelectorAll('.slide').forEach(positionTagsForSlide);
});

updateUI(0);
requestAnimationFrame(onScroll);
