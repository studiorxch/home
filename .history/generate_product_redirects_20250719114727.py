import os

# Output folder
output_folder = "_redirects"
os.makedirs(output_folder, exist_ok=True)

# List of old product slugs
slugs = [
    "3001-unisex-short-sleeve-jersey-t-shirt",
    "midnight-prowler-warning-bubble-free-stickers",
    "ny-crown-snapback",
    "nyc-subway-signature-series-n",
    "nyc-subway-signature-series-r",
    "set-of-business-cards",
    "studiorich-geometrix-unisex-track-pants",
    "urban-flip-the-studiorich-reversible-bucket-hat"
]

# Overwrite each redirect file to point to /shop
for slug in slugs:
    filename = f"{slug}.md"
    filepath = os.path.join(output_folder, filename)

    with open(filepath, "w") as f:
        f.write("---\n")
        f.write(f"permalink: /products/{slug}\n")
        f.write("redirect_to: /shop\n")
        f.write("---\n")
    print(f"🔁 Redirected: {filename} → /shop")
