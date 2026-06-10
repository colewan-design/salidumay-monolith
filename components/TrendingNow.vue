<script setup>
import AnimeCard from './AnimeCard.vue'
defineProps({
  items:    { type: Array,  default: () => [] },
  loading:  { type: Boolean },
  title:    { type: String, default: 'Trending' },
  accent:   { type: String, default: 'Now' },
  tag:      { type: String, default: 'Trending' },
  tagColor: { type: String, default: 'cyan' },
  link:     { type: String, default: '/trending' },
})
</script>

<template>
  <section id="trending" class="section">
    <div class="section-header">
      <div class="section-title-wrap">
        <span :class="['section-tag', tagColor]">{{ tag }}</span>
        <h2 class="section-title">{{ title }} <span class="accent">{{ accent }}</span></h2>
      </div>
      <router-link :to="link" class="see-all">View All →</router-link>
    </div>

    <div class="scroll-container" v-if="!loading">
      <AnimeCard
        v-for="anime in items"
        :key="anime.id"
        :anime="anime"
        class="scroll-card"
      />
    </div>

    <div class="scroll-container" v-else>
      <div v-for="n in 6" :key="n" class="skeleton-card">
        <div class="skeleton sk-img"></div>
        <div class="skeleton sk-line" style="width:60%; margin-top:.5rem"></div>
        <div class="skeleton sk-line" style="width:80%"></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.scroll-container {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 1rem;
  scrollbar-width: thin;
  scrollbar-color: var(--pink) transparent;
  scroll-snap-type: x mandatory;
}
.scroll-container::-webkit-scrollbar { height: 4px; }
.scroll-container::-webkit-scrollbar-track { background: transparent; }
.scroll-container::-webkit-scrollbar-thumb { background: var(--pink); border-radius: 2px; }
.scroll-card {
  flex: 0 0 180px;
  scroll-snap-align: start;
}
.skeleton-card { flex: 0 0 180px; }
.skeleton { background: linear-gradient(90deg, #1a2240 25%, #222d4d 50%, #1a2240 75%); background-size: 200%; animation: shimmer 1.6s infinite; border-radius: 6px; }
@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
.sk-img  { height: 252px; margin-bottom: 0.4rem; }
.sk-line { height: 14px; margin-bottom: 0.3rem; border-radius: 4px; }

@media (max-width: 480px) { .scroll-card { flex: 0 0 150px; } }
</style>
