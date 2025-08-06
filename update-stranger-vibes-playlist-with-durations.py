import os
import json
import yaml
from mutagen import File as MutagenFile

# --- CONFIG ---
PLAYLIST_FILE = "_desktop/stranger-vibes-playlist.json"
LIBRARY_FILE = "_data/library.yml"
LOOP_ROOT = "assets/loops"  # adjust to match your project structure
OUTPUT_FILE = "_desktop/stranger-vibes-playlist-enriched.json"
# ---------------

# Load library.yml
with open(LIBRARY_FILE, "r") as f:
    library = yaml.safe_load(f)

# Build lookup by slug and title
library_lookup = {}
for entry in library:
    slug = entry.get("slug")
    if slug:
        library_lookup[slug] = entry
    library_lookup[entry["title"].lower()] = entry

# Load playlist
with open(PLAYLIST_FILE, "r") as f:
    playlist = json.load(f)

enriched_tracks = []

for track in playlist["tracks"]:
    enriched = track.copy()

    # Extract slug from link (e.g. /tracks/skatepark-ruins/ -> skatepark-ruins)
    slug_guess = track["link"].strip("/").split("/")[-1]
    lib_entry = library_lookup.get(slug_guess) or library_lookup.get(track["title"].lower())

    # Add full track duration (if available in library.yml)
    if lib_entry and "duration" in lib_entry:
        enriched["duration"] = lib_entry["duration"]

    # Add loop file length using mutagen
    loop_path = os.path.join(LOOP_ROOT, os.path.basename(track["file"]))
    if os.path.exists(loop_path):
        try:
            audio = MutagenFile(loop_path)
            if audio and audio.info:
                enriched["loop_length"] = round(audio.info.length, 2)  # seconds
        except Exception as e:
            print(f"⚠️ Could not read {loop_path}: {e}")

    enriched_tracks.append(enriched)

# Build enriched playlist
enriched_playlist = playlist.copy()
enriched_playlist["tracks"] = enriched_tracks

# Save output
with open(OUTPUT_FILE, "w") as f:
    json.dump(enriched_playlist, f, indent=2)

print(f"✅ Enriched playlist written to {OUTPUT_FILE}")
