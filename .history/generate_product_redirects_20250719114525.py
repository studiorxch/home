import os

# Output folder
output_folder = "_redirects"
os.makedirs(output_folder, exist_ok=True)

# Full redirect mapping
redirect_map = {
    "3001-unisex-short-sleeve-jersey-t-shirt": "/shop/3001-unisex-short-sleeve-jersey-t-shirt",
    "midnight-prowler-warning-bubble-free-stickers": "/shop/midnight-prowler-warning-bubble-free-stickers",
    "ny-crown-snapback": "/shop/ny-crown-snapback",
    "nyc-subway-signature-series-n": "/shop/nyc-subway-signature-series-n",
    "nyc-subway-signature-series-r": "/shop/nyc-subway-signature-series-r",
    "set-of-business-cards": "/shop/set-of-business-cards",
    "studiorich-geometrix-unisex-track-pants": "/shop/studiorich-geometrix-unisex-track-pants",
    "urban-flip-the-studiorich-reversible-bucket-hat": "/shop/urban-flip-the-studiorich-reversible-bucket-hat"
}

# Generate or overwrite all .md files
for slug, target in redirect_map.items():
    filename = f"{slug}.md"
    filepath = os.path.join(output_folder, filename)

    with open(filepath, "w") as f:
        f.write("---\n")
        f.write(f"permalink: /products/{slug}\n")
        f.write(f"redirect_to: {target}\n")
        f.write("---\n")
    print(f"🔁 Overwritten: {filename}")
