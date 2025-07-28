import os
import yaml

INPUT_DIR = "_redirects_old"   # your original redirect folder
OUTPUT_DIR = "_redirects_fixed"

os.makedirs(OUTPUT_DIR, exist_ok=True)

for filename in os.listdir(INPUT_DIR):
    if not filename.endswith(".md"):
        continue

    with open(os.path.join(INPUT_DIR, filename), "r") as f:
        lines = f.readlines()

    # Extract just the front matter between the first two '---'
    if lines[0].strip() != "---":
        print(f"Skipping (no front matter): {filename}")
        continue

    yaml_lines = []
    for line in lines[1:]:
        if line.strip() == "---":
            break
        yaml_lines.append(line)

    yaml_block = "".join(yaml_lines)
    content = yaml.safe_load(yaml_block)


    redirect_from = content.get("permalink", "").strip()
    redirect_to = content.get("redirect_to", "").strip()

    if not redirect_from or not redirect_to:
        print(f"Skipping: {filename}")
        continue

    new_yaml = f"""---
layout: redirect
redirect_from: {redirect_from}
redirect_to: {redirect_to}
---
"""

    with open(os.path.join(OUTPUT_DIR, filename), "w") as f:
        f.write(new_yaml)

print(f"✅ Done. Fixed files written to: {OUTPUT_DIR}")
