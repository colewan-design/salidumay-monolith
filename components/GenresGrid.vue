<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const genres = [
  {
    name: 'Action', slug: 'action',
    gradient: 'linear-gradient(135deg,#c0392b,#e74c3c)',
    svg: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10" fill="currentColor"/>',
  },
  {
    name: 'Comedy', slug: 'comedy',
    gradient: 'linear-gradient(135deg,#f39c12,#f1c40f)',
    svg: '<circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/><path d="M8 14s1.5 2 4 2 4-2 4-2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="9" y1="9" x2="9.01" y2="9" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><line x1="15" y1="9" x2="15.01" y2="9" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>',
  },
  {
    name: 'Sci-Fi', slug: 'sci-fi',
    gradient: 'linear-gradient(135deg,#2980b9,#00d4ff)',
    svg: '<path d="M4.5 16.5c-1.5 1.5-1.5 4 0 5.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/><path d="M9 15c0 1 .5 2.5 2 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/><path d="M20 4s-5 0-8 3l-6 6 4 4 6-6c3-3 3-8 3-8z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" fill="none"/><circle cx="15" cy="9" r="1" fill="currentColor"/>',
  },
  {
    name: 'Horror', slug: 'horror',
    gradient: 'linear-gradient(135deg,#1a1a2e,#6c1aff)',
    svg: '<path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>',
  },
  {
    name: 'Romance', slug: 'romance',
    gradient: 'linear-gradient(135deg,#FF2D78,#ff6eb4)',
    svg: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" fill="none"/>',
  },
  {
    name: 'Drama', slug: 'drama',
    gradient: 'linear-gradient(135deg,#16213e,#0f3460)',
    svg: '<rect x="2" y="7" width="20" height="14" rx="2" ry="2" stroke="currentColor" stroke-width="2" fill="none"/><path d="M16 2l-4 5-4-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/><line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" stroke-width="2"/>',
  },
  {
    name: 'Adventure', slug: 'adventure',
    gradient: 'linear-gradient(135deg,#27ae60,#2ecc71)',
    svg: '<circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="currentColor"/>',
  },
  {
    name: 'Animation', slug: 'animation',
    gradient: 'linear-gradient(135deg,#8e44ad,#9b59b6)',
    svg: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" stroke="currentColor" stroke-width="2" stroke-linejoin="round" fill="none"/>',
  },
  {
    name: 'Thriller', slug: 'thriller',
    gradient: 'linear-gradient(135deg,#2c3e50,#e74c3c)',
    svg: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" fill="none"/>',
  },
  {
    name: 'War', slug: 'war',
    gradient: 'linear-gradient(135deg,#4a4a4a,#808080)',
    svg: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" fill="none"/>',
  },
]
</script>

<template>
  <section class="section genres-section">
    <div class="section-header">
      <div class="section-title-wrap">
        <span class="section-tag pink">Browse</span>
        <h2 class="section-title">Explore <span class="accent">Genres</span></h2>
      </div>
    </div>

    <div class="genres-grid">
      <button
        v-for="g in genres" :key="g.name"
        class="genre-tile"
        :style="{ background: g.gradient }"
        @click="router.push(`/films/${g.slug}`)"
      >
        <svg viewBox="0 0 24 24" class="genre-icon" v-html="g.svg"></svg>
        <span class="genre-name">{{ g.name }}</span>
        <div class="genre-shine"></div>
      </button>
    </div>
  </section>
</template>

<style scoped>
.genres-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: .75rem;
}

.genre-tile {
  position: relative;
  overflow: hidden;
  border: none;
  border-radius: 10px;
  padding: 1.4rem 1rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: .5rem;
  transition: transform .25s, box-shadow .25s;
  text-align: center;
}
.genre-tile:hover {
  transform: translateY(-4px) scale(1.03);
  box-shadow: 0 8px 28px rgba(0,0,0,.5);
}
.genre-tile:hover .genre-shine { opacity: 1; }

.genre-icon {
  width: 28px;
  height: 28px;
  color: rgba(255,255,255,.9);
  flex-shrink: 0;
}
.genre-name {
  font-size: .78rem;
  font-weight: 800;
  letter-spacing: .06em;
  text-transform: uppercase;
  color: #fff;
  text-shadow: 0 1px 4px rgba(0,0,0,.5);
}

.genre-shine {
  position: absolute; inset: 0;
  background: linear-gradient(135deg, rgba(255,255,255,.15) 0%, transparent 60%);
  opacity: 0;
  transition: opacity .25s;
  pointer-events: none;
}

@media (max-width: 900px) { .genres-grid { grid-template-columns: repeat(4, 1fr); } }
@media (max-width: 640px) { .genres-grid { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 420px) { .genres-grid { grid-template-columns: repeat(2, 1fr); } }
</style>
