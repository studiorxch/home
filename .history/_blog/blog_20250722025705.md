---
layout: default
title: StudioRich Blog
permalink: /blog/
description: "Signal studies, mood dispatches, and lo-fi perspectives from the StudioRich archive."
---

<section class="blog-feed">
  {% for post in site.posts %}
  <article class="blog-card">
    <a class="blog-link" href="{{ post.url }}">
      <div class="blog-thumb">
        <img src="{{ post.image | default: '/assets/img/blog/default.jpg' }}" alt="{{ post.title }}">
      </div>
      <div class="blog-text">
        <h2 class="blog-title">{{ post.title }}</h2>
        <p class="blog-desc">{{ post.description }}</p>
        <p class="blog-meta">
          {{ post.date | date: "%B %d, %Y" }}
          {% if post.tags %} · {{ post.tags | join: ", " }}{% endif %}
        </p>
      </div>
    </a>
  </article>
  {% endfor %}
</section>
