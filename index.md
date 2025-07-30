---
layout: default
title: "StudioRich Home - Lo-Fi Music, Art & Stories from Brooklyn"
description: "Explore StudioRich: a Brooklyn-born world of lo-fi music, ambient visuals, field recordings, and creative urban storytelling."
image: /assets/img/hero.webp
permalink: /
---

{% include components/hero.html image="/assets/img/hero.webp" title="Tap In.<br>Stay Weird.<br>Broadcast the Vibe.." %}

<h3 style="margin-left: 2em">
<img src="/assets/icons/record.svg" alt="Vinyl Record" class="icon-sm">
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
      <img src="/assets/icons/musiclibrary.svg" alt="Music library icon" class="icon-sm">
      <a href="/library">Music Library</a>
    </h3>
    <p>Explore our curated archive and search by mood, genre, or visual tone.</p>
  </div>

  <!-- Cat on the Signal -->
  <div class="feature">
    <h3>
      <img src="/assets/icons/gamecontroller.svg" alt="Game controller icon" class="icon-sm">
      <em>Cat on the Signal</em>
    </h3>
    <p>
      Our latest audiovisual drop blends lo-fi bedroom pop with surreal domestic visuals. Think analog fuzz, pastel glitchscapes, and a tabby cat channeling mech-prophet energy.<br>
      <a href="https://soundcloud.com/studiorich/cat-on-the-signal?si=12ab981478444d959fab3bb097f01c8e&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing" target="_blank">Listen on SoundCloud</a>
    </p>
  </div>
</section>
