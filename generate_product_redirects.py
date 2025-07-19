import os
from urllib.parse import urlparse

output_folder = "_redirects"
os.makedirs(output_folder, exist_ok=True)

# Map static pages
dest_map = {
    "links": "/links",
    "about-us": "/about", "origin": "/about", "contact": "/about",
    "coming-soon": "/lofi", "tag-your-friend": "/lofi", "comments": "/lofi",
    "schedule": "/library", "lo-fi-sundays": "/library"
}
# policy paths group
policy_paths = ["help", "pages/customer-service", "pages/returns", "pages/shipping-policy", "refund-policy", "terms", "policies/privacy-policy"]

# Helper to classify
def classify(path_parts):
    if path_parts[0] == "products" or path_parts[0] in ("collections", "shop", "cdn") or path_parts[0].endswith("cart") or path_parts[0] in ("account", "services"):
        return "/shop"
    if path_parts[0] == "pages" and path_parts[1] in dest_map:
        return dest_map[path_parts[1]]
    if path_parts[0] == "pages" and "/".join(path_parts[1:]) in dest_map:
        return dest_map["/".join(path_parts[1:])]
    if path_parts[0] == "blogs":
        return "/library"
    if path_parts[0] in dest_map:
        return dest_map[path_parts[0]]
    if any(path_parts[0].startswith(policy) for policy in policy_paths):
        return "/about"
    return None

seen = {}
with open("legacy_urls.txt") as f:
    for line in f:
        path = urlparse(line.strip()).path.lstrip("/")
        parts = path.split("/")
        target = classify(parts)
        if target:
            seen[path] = target

# Write files
for path, target in seen.items():
    mdname = path.replace("/", "__") + ".md"
    with open(os.path.join(output_folder, mdname), "w") as f:
        f.write("---\n")
        f.write(f"permalink: /{path}\n")
        f.write(f"redirect_to: {target}\n")
        f.write("---\n")
