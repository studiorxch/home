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
git commit -m "playground/shop first view"
git push origin main

---

# Blog Only

git add assets/img/blog \_posts
git commit -m "Blog content commit"
git push -u origin main

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

# Events Only

```

git add assets/img/events _events includes/components
git commit -m "Initial events commt"
git push -u origin main
```

# Playground Only

```
git add _playground assets/img/playground
git commit -m "Playground update"
git push origin main
```
