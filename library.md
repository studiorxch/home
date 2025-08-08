---
layout: default
title: Music Library
permalink: /library/
description: "Browse over 360 StudioRich tracks by mood, genre, and visual aesthetic."
image: /assets/img/hero/music-library-record-room-hero.webp
redirect_from:
  - https://studiorich.shop/tracks/
---

{% include components/hero.html
  image=page.image
  title="Lo-Fi Music Library"
  subtitle="360+ lo-fi tracks for streamers, artists, spa therapy lovers, and chillroom dreamers — all crafted by StudioRich in NYC."
%}

<div class="filter-bar">
  <button data-filter="all" data-type="all" class="active">All</button>

{% assign all_moods = "" | split: "" %}
{% assign all_genres = "" | split: "" %}

{% for track in site.data.library %}
{% assign mood_array = track.mood %}
{% if mood_array == nil or mood_array == blank %}
{% assign mood_array = "" | split: "" %}
{% endif %}
{% assign genre_array = track.genre %}
{% if genre_array == nil or genre_array == blank %}
{% assign genre_array = "" | split: "" %}
{% endif %}
{% assign all_moods = all_moods | concat: mood_array %}
{% assign all_genres = all_genres | concat: genre_array %}
{% endfor %}

{% assign unique_moods = all_moods | uniq | sort %}
{% assign unique_genres = all_genres | uniq | sort %}

  <!-- Moods -->

{% for mood in unique_moods %}
{% unless mood == "nan" %}
<button data-filter="{{ mood | downcase | strip }}" data-type="mood">{{ mood | strip }}</button>
{% endunless %}
{% endfor %}

  <!-- Genres -->

{% for genre in unique_genres %}
{% unless genre == "nan" %}
<button data-filter="{{ genre | downcase | strip }}" data-type="genre">{{ genre | strip }}</button>
{% endunless %}
{% endfor %}

</div>

<section class="track-grid">
  {% for track in site.data.library %}
    {% if track.has_cover and track.has_loop %}
      {% assign mood_array = track.mood %}
      {% if mood_array == nil or mood_array.size < 3 %}
        {% assign mood_array = track.mood_suggested %}
        {% assign filtered_mood = false %}
      {% else %}
        {% assign filtered_mood = true %}
      {% endif %}

      {% assign genre_array = track.genre %}
      {% if genre_array == nil or genre_array == blank %}
        {% assign genre_array = "" | split: "" %}
      {% endif %}

      <a class="track-card {% unless filtered_mood %}no-filter{% endunless %}"
         href="/tracks/{{ track.slug }}/?autoplay=1"
         data-mood="{{ mood_array | join: ' ' | downcase }}"
         data-genre="{{ genre_array | join: ' ' | downcase }}">

        <img src="/assets/img/covers/{{ track.slug }}.webp" alt="{{ track.title }} cover" class="track-cover">
        <div class="track-title">{{ track.title }}</div>
      </a>
    {% endif %}

{% endfor %}

</section>

<script>
  const cards = document.querySelectorAll('.track-card');
  const filterButtons = document.querySelectorAll('[data-filter]');
  let selectedMood = null;
  let selectedGenre = null;

  function updateGenreButtonsForMood(mood) {
    const genreButtons = document.querySelectorAll('button[data-type="genre"]');
    genreButtons.forEach(btn => {
      const genre = btn.dataset.filter;
      const hasMatch = Array.from(cards).some(card => {
        const moods = (card.dataset.mood || '').split(' ');
        const genres = (card.dataset.genre || '').split(' ');
        return moods.includes(mood) && genres.includes(genre);
      });
      btn.classList.toggle('disabled', !hasMatch);
    });
  }

  function updateFilters() {
    filterButtons.forEach(btn => btn.classList.remove('active'));

    if (selectedMood) {
      document.querySelector(`[data-filter="${selectedMood}"][data-type="mood"]`)?.classList.add('active');
    }
    if (selectedGenre) {
      document.querySelector(`[data-filter="${selectedGenre}"][data-type="genre"]`)?.classList.add('active');
    }
    if (!selectedMood && !selectedGenre) {
      document.querySelector(`[data-filter="all"]`)?.classList.add('active');
    }

    cards.forEach(card => {
      const moods = (card.dataset.mood || '').split(' ');
      const genres = (card.dataset.genre || '').split(' ');
      const isNoFilter = card.classList.contains('no-filter');

      const moodMatch = !selectedMood || moods.includes(selectedMood);
      const genreMatch = !selectedGenre || genres.includes(selectedGenre);
      const show = (!selectedMood && !selectedGenre) || (moodMatch && genreMatch && !isNoFilter);

      card.style.display = show ? '' : 'none';
    });

    if (selectedMood) {
      updateGenreButtonsForMood(selectedMood);
    } else {
      document.querySelectorAll('button[data-type="genre"]').forEach(btn => btn.classList.remove('disabled'));
    }
  }

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const type = button.dataset.type;
      const value = button.dataset.filter;

      if (value === 'all') {
        selectedMood = null;
        selectedGenre = null;
      } else if (type === 'mood') {
        selectedMood = (selectedMood === value) ? null : value;
      } else if (type === 'genre') {
        selectedGenre = (selectedGenre === value) ? null : value;
      }

      if (typeof gtag === 'function') {
        gtag('event', 'filter_selected', {
          filter_type: type,
          filter_value: value,
          page_location: window.location.pathname
        });
      }

      updateFilters();
    });
  });

  const params = new URLSearchParams(window.location.search);
  const genreFromURL = params.get('genre');
  if (genreFromURL) selectedGenre = genreFromURL.toLowerCase();
  updateFilters();
</script>
