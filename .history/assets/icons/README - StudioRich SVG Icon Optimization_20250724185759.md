npx svgo -f ./Users/studio/Documents/home/assets/icons --config=svgo.config.js



# StudioRich SVG Icon Optimization

This folder contains all custom StudioRich icons in minimal line-art style, exported as white-on-black SVGs. Use this setup to batch-clean, optimize, and unify all icons with consistent formatting and tone.

---

## 🎯 Goal

- Keep files lightweight and clean for blog and inline web use
- Preserve visual structure (`viewBox`, stroke shapes)
- Standardize `fill` color to `#EBEBEB`
- Strip editor metadata, unnecessary attributes, and bloat

---

## 🛠️ Setup & Batch Clean

Requires [Node.js](https://nodejs.org) and [SVGO](https://github.com/svg/svgo)

```bash
npm install -g svgo
```

## optional
npx svgo -f ./icons -o ./optimized-icons --config=svgo.config.js

## folder structure
/icons
  ├── icon-reference.md
  ├── svgo.config.js
  ├── README.md ← you are here
  ├── camera.svg
  ├── tape-loop.svg
  └── ...


For best results, export from Affinity using SVG (digital - small size), crop each icon to visual bounds, then run through this pipeline before publishing.

---

Let me know if you’d like a Figma-friendly version or a `.sh` wrapper script too!