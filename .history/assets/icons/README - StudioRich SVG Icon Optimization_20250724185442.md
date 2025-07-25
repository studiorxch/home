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


#optional
npx svgo -f ./icons -o ./optimized-icons --config=svgo.config.js
