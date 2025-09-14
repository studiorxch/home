---
layout: code
title: "Snippets"
---

bundle exec jekyll clean
bundle exec jekyll build
bundle exec jekyll serve --drafts --future

---

bundle exec jekyll serve --drafts --future

---

# ALL

git add .
git commit -m "playground update"
git push origin main

---

# Blog Only

```
git add assets/img/blog _posts
git commit -m "Blog content commit"
git push -u origin main
```

# Music Track Only

```
git add _tracks/ assets/loops assets/img/covers _data/library.yml
git commit -m "New track: add md, loop, cover, library update"
git push origin main

```

## specific

```
git add _tracks/tensil.md \
       assets/loops/tensil-loop.mp3 \
       assets/img/covers/tensil.webp \
       _data/library.yml
git commit -m "Tensil: track, cover, loop, blog post"
git push origin main

```

# Playground Only

```
git add _playground assets/img/playground
git commit -m "Playground update"
git push origin main
```

E toggles edit mode (drag & double-click to add pins).

⌘E / Ctrl+E now copies a ready-to-paste YAML block like this:



#README

Use one consistent shape per tag. New fields:
-type: "track" | "product" | "station"
-ref: for track tags, either a playlist JSON or a single track file
-icon: optional override ("star" | "shirt" | "info")


tags:
  # ⭐ Trackstar – collect this capsule/playlist
  - type: track
    x: 39
    y: 39
    label: "Add City Hall Capsule"
    ref: /assets/playlists/brooklyn-bridge-city-hall.json  # playlist JSON (or a single .mp3)
    icon: star

  # 👕 Product – opens product link
  - type: product
    x: 62
    y: 58
    label: "New York Gritty Classic Tee"
    href: https://www.redbubble.com/i/t-shirt/New-York-Gritty-by-studioRich/173353266.QUQES
    icon: shirt

  # ℹ️ Station/Info – opens left chamber (optional)
  - type: station
    x: 15
    y: 80
    label: "About this station"
    icon: info


# ORIGINAL COLORS
.mta-bullet{ display:inline-grid; place-items:center; width:1.5rem; height:1.5rem; border-radius:50%; font: 700 .9rem/1 Inter, Arial, sans-serif; color:#fff; text-align:center; box-shadow: 0 0 0 2px rgba(0,0,0,.25); } .line-4, .line-5, .line-6 { background:#00933C; } .line-j, .line-z { background:#996633; } .line-a, .line-c, .line-e { background:#0039A6; } .line-b, .line-d, .line-f, .line-m { background:#FF6319; } .line-n, .line-q, .line-r, .line-w { background:#FCCC0A; color:#222; } .line-1, .line-2, .line-3 { background:#EE352E; } .line-7 { background:#B933AD; } .line-g { background:#6CBE45; } .line-l { background:#A7A9AC; color:#222; } .line-s { background:#808183; color:#222; }