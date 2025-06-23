import os
import yaml

# === PATHS ===
PROJECT_ROOT = os.path.dirname(os.path.abspath(__file__))
COVER_DIR = os.path.join(PROJECT_ROOT, "assets/covers")
LOOP_DIR = os.path.join(PROJECT_ROOT, "assets/loops")
OUTPUT_FILE = os.path.join(PROJECT_ROOT, "_data/library.yml")

# === HELPERS ===
def slugify(filename):
    return os.path.splitext(filename)[0].lower()

def get_files(directory, extensions):
    return set(
        slugify(f)
        for f in os.listdir(directory)
        if os.path.isfile(os.path.join(directory, f)) and f.lower().endswith(extensions)
    )

def strip_loop_suffix(slug):
    return slug[:-5] if slug.endswith("-loop") else slug

# === MAIN ===
def main():
    image_slugs = get_files(COVER_DIR, ('.jpg', '.jpeg', '.png', '.webp'))
    loop_slugs_raw = get_files(LOOP_DIR, ('.mp3', '.wav', '.flac'))

    # Normalize loop slugs by removing "-loop"
    loop_slugs = {strip_loop_suffix(s) for s in loop_slugs_raw}

    # Find intersection
    valid_slugs = sorted(image_slugs & loop_slugs)

    entries = []
    for slug in valid_slugs:
        entries.append({
            'slug': slug,
            'title': slug.replace("-", " ").title(),
            'has_cover': True,
            'has_loop': True
        })

    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        yaml.dump(entries, f, allow_unicode=True, sort_keys=False, default_flow_style=False)

    print(f"✅ Generated {OUTPUT_FILE} with {len(entries)} valid track(s)")

if __name__ == "__main__":
    main()
