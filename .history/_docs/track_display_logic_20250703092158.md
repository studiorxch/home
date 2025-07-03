**Title:** Track Display Requirements for Music Library

**Purpose:**
To define and document the criteria that determine whether a track appears in the public-facing music library on the StudioRich website.

---

library.yml is the source of truth for all track display and filtering logic on the /library page. Ensure it includes mood, genre, and other frontmatter fields during generation.

### ✅ Requirements for a Track to Appear in the Library
1. **Valid Loop File**
   - Each track must have a valid `.mp3` loop file.
   - Stored in: `/assets/loops/`
   - Naming convention: `slug-loop.mp3`

2. **Cover Image**
   - A track must include a visible album cover to appear in the library.
   - Stored in: `/assets/covers/`
   - Format: `.webp` or `.jpg` preferred
   - Naming convention: Matches the track `slug`
   - This avoids displaying "ghost" or unfinished tracks.

---

### 🔒 Strict Display Mode (Current Setting)
- Tracks missing **either** a loop file or cover are excluded from the library.
- This keeps the visual layout tight and professional.
- Reduces risk of incomplete entries breaking the UI or UX.

---

### 🧰 Future Tools
- **Missing Covers Dashboard**
  - `/debug/covers-missing.html` to list track slugs with loops but no matching covers.
  - Optional filter: show tracks with invalid image paths.

- **Cover Queue Generator**
  - Script to collect track slugs that pass the loop check but are missing a cover.
  - Output: `covers_todo.csv` for visual batch production.

- **Fallback Modes (later)**
  - Dev-only views that optionally display placeholder-style tracks.
  - May include track title + loop player only for internal QA.

---

### 💾 Metadata Source
- `/scripts/generate_library_yml.py` creates `_data/library.yml`
- Output only includes valid tracks meeting both loop + cover criteria.
- Library filtering logic in `library.html` reads from this YAML file.

---

### 💡 Notes
- Filtering not working? Double-check that tracks meet both requirements.
- Want a new track shown? Ensure it has both:
  - `assets/loops/[slug]-loop.mp3`
  - `assets/covers/[slug].webp` or `.jpg`

---

_Keep this doc updated as logic changes or new features (e.g. genre filters, visual modes) are introduced._

