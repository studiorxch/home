import os
import shutil
import yaml

# === CONFIG ===
tracks_dir = "_tracks"
unreleased_dir = os.path.join(tracks_dir, "unreleased")
library_file = "_data/library.yml"

# === Ensure unreleased folder exists ===
os.makedirs(unreleased_dir, exist_ok=True)

# === Load released slugs from library.yml ===
with open(library_file, "r") as f:
    library = yaml.safe_load(f)

released_slugs = {track["slug"] for track in library if "slug" in track}

# === Move unreleased files ===
moved = []
for filename in os.listdir(tracks_dir):
    if not filename.endswith(".md"):
        continue
    slug = filename.replace(".md", "")
    if slug not in released_slugs:
        src = os.path.join(tracks_dir, filename)
        dst = os.path.join(unreleased_dir, filename)
        shutil.move(src, dst)
        moved.append(filename)

# === Output summary ===
print(f"Moved {len(moved)} unreleased track files to '{unreleased_dir}'")
if moved:
    print("Example moved:", moved[:5])
