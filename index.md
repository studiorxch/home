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

<hr style="border: none; border-top: 1px dotted #222;">

{% include components/feature-grid.html %}

<hr style="border: none; border-top: 1px dotted #222;">
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

<hr style="border: none; border-top: 1px dotted #222;">

<section class="welcome">

<p>Welcome to StudioRich (sometimes written as ‘Studio Rich’) a Brooklyn-based creative lab fusing lo-fi music, experimental visuals, and street-smart storytelling. From Stranger Vibes soundtracks to melting boombox art, we blend nostalgia, kung fu, graffiti, and ambient field recordings into collectible experiences. Explore our music catalog, digital merch drops, and live-streamed vibes — all handcrafted with a rebellious spirit and a touch of humor. StudioRich is where city noise becomes rhythm, and every beat has a backstory.</p>
</section>

<hr style="border: none; border-top: 1px dotted #222;">
{% include components/schedule.html %}
