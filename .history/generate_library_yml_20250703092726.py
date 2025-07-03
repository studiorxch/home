import frontmatter
import yaml
from pathlib import Path

track_md_dir = Path("./_tracks")
covers_dir = Path("./assets/covers")
loops_dir = Path("./assets/loops")
output_yml_path = Path("./_data/library.yml")

track_list = []

for md_file in track_md_dir.glob("*.md"):
    post = frontmatter.load(md_file)
    slug = md_file.stem
    has_cover = (covers_dir / f"{slug}.webp").exists()
    has_loop = (loops_dir / f"{slug}-loop.mp3").exists()

    if has_cover and has_loop:
        track_data = {
            "title": post.get("title", slug.replace("-", " ").title()),
            "slug": slug,
            "has_cover": has_cover,
            "has_loop": has_loop,
            "mood": post.get("mood", []),
            "genre": post.get("genre", []),
            "duration": post.get("duration", None),
        }
        track_list.append(track_data)

with open(output_yml_path, "w") as f:
    yaml.dump(track_list, f, sort_keys=False, allow_unicode=True)
