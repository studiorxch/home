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
git commit -m "new re-direct"
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



```
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome \
--remote-debugging-port=9222 \
--user-data-dir=/tmp/chrome-dev
```