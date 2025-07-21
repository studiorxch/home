---
layout: default
title: StudioRich Blog
permalink: /blog/
description: "Signal studies, lo-fi moods, visual digests, and more from the StudioRich underground."
image: /assets/img/blog/default-blog-hero.jpg
---

{% for post in site.posts %}
  <div class="blog-post-preview">
    <h2><a href="{{ post.url }}">{{ post.title }}</a></h2>
    <p>{{ post.description }}</p>
    <p><em>{{ post.date | date: "%B %d, %Y" }}</em></p>
  </div>
{% endfor %}
