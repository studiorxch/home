import os

# Output folder for new redirects
output_folder = "_redirects"
os.makedirs(output_folder, exist_ok=True)

# Product-level redirects: add any more as needed
product_paths = {
    "ny-crown-snapback": "/shop/ny-crown-snapback",
    "nyc-subway-signature-series-r": "/shop/nyc-subway-signature-series-r",
    "urban-flip-the-studiorich-reversible-bucket-hat": "/shop/urban-flip-the-studiorich-reversible-bucket-hat"
}

# Create .md redirect files if they don’t already exist
for slug, target in product_paths.items():
    filename = f"{slug}.md"
    filepath = os.path.join(output_folder, filename)

    if not os.path.exists(filepath):
        with open(filepath, "w") as f:
            f.write("---\n")
            f.write(f"permalink: /products/{slug}\n")
            f.write(f"redirect_to: {target}\n")
            f.write("---\n")
        print(f"✅ Created: {filename}")
    else:
        print(f"⚠️ Skipped (already exists): {filename}")
