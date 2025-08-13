---
layout: default
title: "StudioRich Home - Lo-Fi Music, Art & Stories from Brooklyn"
description: "Explore StudioRich: a Brooklyn-born world of lo-fi music, ambient visuals, field recordings, and creative urban storytelling."
image: /assets/img/hero/studio-rich-homepage-hero.webp
permalink: /
---

{% include components/hero.html
  image=page.image
  title="Tap In.<br>Stay Weird.<br>Broadcast the Vibe.."
%}

# {%- comment -%}

# FEATURE STRIP (no "panels")

# - 1. Latest Bog Feature

# - 2. Music Library Spotlight

# - 3. # Rotating Third Feature

     {%- endcomment -%}

{%- assign recent = site.posts | first -%}
{%- assign library_all = site.data.library -%}

{%- comment -%}

# Pick a library track that actually has a cover if possible.

# Adjust keys to match your CSV/data (image, has_cover, slug, title, mood etc.)

{%- endcomment -%}
{%- assign lib_with_covers = site.data.library | where_exp: "t", "t.image and t.image != ''" -%}
{%- assign random_track = lib_with_covers | shuffle | first -%}

{%- comment -%}

# Daily rotation for the 3rd feature:

# 0 => Live Radio

# 1 => Shop

# 2 => Cat on the Signal

{%- endcomment -%}
{%- assign day_index = site.time | date: "%j" | plus: 0 -%}
{%- assign rot = day_index | modulo: 3 -%}

<section class="feature-strip">

  <!-- 1) Latest Blog Feature -->
  <article class="feature-card feature-blog"
           style="background-image:
             url('{{ recent.image | default: "/assets/img/hero/studio-rich-homepage-hero.webp" }}');">
    <div class="feature-overlay"></div>
    <div class="feature-body">
      <h3 class="eyebrow">Filed Under: Late Night Reads</h3>
      {% if recent %}
        <h2 class="headline"><a href="{{ recent.url }}">{{ recent.title }}</a></h2>
        {% if recent.description %}
          <p class="sub">{{ recent.description }}</p>
        {% endif %}
        <a class="btn" href="{{ recent.url }}">Read the story</a>
      {% else %}
        <h2 class="headline">Latest from the Blog</h2>
        <p class="sub">No posts yet — soon.</p>
      {% endif %}
    </div>
  </article>

  <!-- 2) Music Library Spotlight -->
  <article class="feature-card feature-library"
           style="background-image:
             url('{{ random_track.image | default: "/assets/img/covers/default.webp" }}');">
    <div class="feature-overlay"></div>
    <div class="feature-body">
      <h3 class="eyebrow">From the Library</h3>
      {% if random_track %}
        <h2 class="headline">
          <a href="/tracks/{{ random_track.slug }}/">{{ random_track.title }}</a>
        </h2>
        {% if random_track.mood %}
          <p class="sub">{{ random_track.mood | join: ", " }}</p>
        {% endif %}
        <a class="btn" href="/tracks/{{ random_track.slug }}/">Listen now</a>
      {% else %}
        <h2 class="headline">Dig the Archive</h2>
        <p class="sub">Browse 360+ tracks by mood, genre, and vibe.</p>
        <a class="btn" href="/library">Open Library</a>
      {% endif %}
    </div>
  </article>

  <!-- 3) Rotating Third Feature -->

{%- assign day_index = site.time | date: "%j" | plus: 0 -%}
{%- assign rot = day_index | modulo: 3 -%}

{% case rot %}
{% when 0 %}

  <article class="feature-card feature-live"
           style="background-image: url('/assets/img/hero/live-radio.webp');">
    <div class="feature-overlay"></div>
    <div class="feature-body">
      <h3 class="eyebrow">Live Radio</h3>
      <h2 class="headline"><a href="/live">Lo-Fi Signals, Live</a></h2>
      <p class="sub">Catch visual mixes, late-night loops, and ambient drift.</p>
      <a class="btn" href="/live">Tune in</a>
    </div>
  </article>

{% when 1 %}

  <article class="feature-card feature-shop"
           style="background-image: url('/assets/img/hero/shop-hero.webp');">
    <div class="feature-overlay"></div>
    <div class="feature-body">
      <h3 class="eyebrow">Shop</h3>
      <h2 class="headline"><a href="/shop">Melting Boombox Drops</a></h2>
      <p class="sub">Prints, stickers, digital goodies — vibes you can hold.</p>
      <a class="btn" href="/shop">Browse drops</a>
    </div>
  </article>

{% when 2 %}

  <article class="feature-card feature-cat"
           style="background-image: url('/assets/img/hero/cat-on-the-signal.webp');">
    <div class="feature-overlay"></div>
    <div class="feature-body">
      <h3 class="eyebrow">New Drop</h3>
      <h2 class="headline"><em>Cat on the Signal</em></h2>
      <p class="sub">Pastel glitchscapes + lo-fi bedroom pop.</p>
      <a class="btn" href="https://soundcloud.com/studiorich/cat-on-the-signal?si=12ab981478444d959fab3bb097f01c8e&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing" target="_blank" rel="noopener">Listen on SoundCloud</a>
    </div>
  </article>
{% endcase %}

<h3 style="margin-left: 1em">
<img src="/assets/ui/record.svg" alt="Vinyl Record" class="icon-sm">
Now Spinning: StudioRich Visual Mixes
</h3>

<!-- Stream Banner and Features go here -->

{% include components/youtube-carousel.html video_urls="
https://www.youtube.com/embed/3_U9pLLI6Tk?si=BYnfC3PxRpDiQJ_r,
https://www.youtube.com/embed/u5tCaLsFW-M?si=WmKxX14EHcumI1Tf,
https://www.youtube.com/embed/d_ERqZwROAk?si=94CKxDrn897Bssoi,
https://www.youtube.com/embed/vKIr3HJiAVo?si=tA7LJDEHNItI64PV
" %}

<section class="welcome">
  <div class="welcome">
<p>Welcome to StudioRich (sometimes written as ‘Studio Rich’) a Brooklyn-based creative lab fusing lo-fi music, experimental visuals, and street-smart storytelling. From Stranger Vibes soundtracks to melting boombox art, we blend nostalgia, kung fu, graffiti, and ambient field recordings into collectible experiences. Explore our music catalog, digital merch drops, and live-streamed vibes — all handcrafted with a rebellious spirit and a touch of humor. StudioRich is where city noise becomes rhythm, and every beat has a backstory.</p>
</div></section>
{% include components/schedule.html %}
<!-- Feature Sections -->
<section class="features">
  <!-- Blog Teaser -->
  <div class="feature">
    {% assign recent = site.posts | first %}
    {% if recent %}
    <div class="homepage-blog-preview">
      <h3>Filed Under: Late Night Reads</h3>
      <a href="{{ recent.url }}">
       <!-- <img src="{{ recent.image }}" alt="{{ recent.title }}" style="max-width: 100%; border-radius: 6px;" />-->
        <h3>{{ recent.title }}</h3>
        <p>{{ recent.description }}</p>
      </a>
    </div>
    {% else %}
    <div class="homepage-blog-preview">
      <h2>Latest from the Blog</h2>
      <p>No blog posts available yet. Stay tuned.</p>
    </div>
    {% endif %}
  </div>

  <!-- Music Library -->
  <div class="feature">
    <h3>
      <img src="/assets/ui/musiclibrary.svg" alt="Music library icon" class="icon-sm">
      <a href="/library">Music Library</a>
    </h3>
    <p>Explore our curated archive and search by mood, genre, or visual tone.</p>
  </div>

  <!-- Cat on the Signal -->
  <div class="feature">
    <h3>
      <img src="/assets/ui/gamecontroller.svg" alt="Game controller icon" class="icon-sm">
      <em>Cat on the Signal</em>
    </h3>
    <p>
      Our latest audiovisual drop blends lo-fi bedroom pop with surreal domestic visuals. Think analog fuzz, pastel glitchscapes, and a tabby cat channeling mech-prophet energy.<br>
      <a href="https://soundcloud.com/studiorich/cat-on-the-signal?si=12ab981478444d959fab3bb097f01c8e&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing" target="_blank">Listen on SoundCloud</a>
    </p>
  </div>
</section>
