---
layout: blog
kicker: 2025
title: StudioRich Blog
subtitle: Project fifty-five dash one
permalink: /blog/
description: "Explore lo-fi articles, thoughts, and release commentary by StudioRich."
---
{% assign subtitles = site.blog_subtitles %}
{% if subtitles and subtitles.size > 0 %}
  {% assign index = site.time | date: "%j" | plus: 0 | modulo: subtitles.size %}
  {% assign chosen_subtitle = subtitles[index] %}
  <p>DEBUG chosen_subtitle: {{ chosen_subtitle }}</p>
{% else %}
  <p>DEBUG: No subtitles defined</p>
{% endif %}

