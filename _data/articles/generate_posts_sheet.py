# generate_posts_from_sheet.py

import pandas as pd
import os
from slugify import slugify
from datetime import datetime
import gspread
from google.oauth2.service_account import Credentials

# Setup paths and sheet info
POSTS_DIR = "/Users/studio/Sites/studiorich/home/_posts"
SERVICE_ACCOUNT_FILE = "blog-automator-468810-e9ac2ca5c307.json"
SPREADSHEET_NAME = "lofi_articles_sync"

# Google Sheets authentication
scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]
creds = Credentials.from_service_account_file(SERVICE_ACCOUNT_FILE, scopes=scope)
client = gspread.authorize(creds)
sheet = client.open(SPREADSHEET_NAME).sheet1

# Load data
rows = sheet.get_all_records()
df = pd.DataFrame(rows)

count = 0  # ← Add this at the top of your post generation loop

# inside your loop when a post is successfully written:
with open(filepath, "w", encoding="utf-8") as f:
    f.write(post_content)
    print(f"✅ Generated: {filename}")
    count += 1  # ← Increment after each post

# after loop ends
print(f"✅ {count} post(s) generated.")



# Filter for eligible posts
eligible = df[(df['score'] >= 85) & (df['status'].str.lower() != 'published')]

for _, row in eligible.iterrows():
    title = row['title']
    date = row['date']
    description = row.get('snippet') or ""
    tags = row.get('tags', '').split(',') if 'tags' in row else []
    slug = slugify(title)
    filename = f"{date}-{slug}.md"
    filepath = os.path.join(POSTS_DIR, filename)

    # Image logic
    image_path = f"/assets/img/blog/{slug}.webp"

    # Build markdown content
    frontmatter = f"""---
layout: post
title: \"{title}\"
date: {date}
description: \"{description}\"
image: {image_path}
tags:
"""
    for tag in tags:
        frontmatter += f"  - {tag.strip()}\n"
    frontmatter += "unpublished: true\n---\n"

    # Save file
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(frontmatter)

    print(f"✅ Generated: {filename}")

    # Update Google Sheet status to 'published'
    row_index = df.index[df['title'] == title].tolist()[0] + 2  # +2 accounts for header + 0-index
    sheet.update_cell(row_index, df.columns.get_loc("status") + 1, "published")

print(f"✅ {count} post(s) generated.")

