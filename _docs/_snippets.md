## 📌 Notes

---
bundle exec jekyll clean
bundle exec jekyll build
bundle exec jekyll serve

-----

---

bundle exec jekyll serve --future


---




git add . 
git commit -m "underscore filename update"
git push origin main



### 📌 How to Rebuild and Push sitemap.xml Correctly (7-6-25)
# 1. Clean and build in production mode:
bundle exec jekyll clean
JEKYLL_ENV=product
# 2. Force add sitemap.xml from _site:
git add -f _site/sitemap.xml
git commit -m "Update sitemap.xml for Google"
git push


## Display Environment (Production or Development)
  <p>Build mode: {{ jekyll.environment }}</p>






# Maintenance Mac Filesystem

## Convert underscores to hyphens in directory

for f in *_*; do
  mv "$f" "${f//_/-}"
done
