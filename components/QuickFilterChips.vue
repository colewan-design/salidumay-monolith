<script setup>
import { ref } from 'vue'

const emit = defineEmits(['filter'])

const active = ref('all')

function select(id) {
  active.value = id
  emit('filter', id)
}
</script>

<template>
  <div class="chips-wrap">
    <div class="chips-scroll">

      <button :class="['chip', { active: active === 'all' }]" @click="select('all')">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13">
          <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
          <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
        </svg>
        All
      </button>

      <button :class="['chip', { active: active === 'anime' }]" @click="select('anime')">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13">
          <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
        </svg>
        Anime
      </button>

      <button :class="['chip', { active: active === 'movies' }]" @click="select('movies')">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13">
          <rect x="2" y="4" width="20" height="16" rx="2"/>
          <line x1="7" y1="4" x2="7" y2="20"/><line x1="17" y1="4" x2="17" y2="20"/>
          <line x1="2" y1="9" x2="7" y2="9"/><line x1="17" y1="9" x2="22" y2="9"/>
          <line x1="2" y1="14" x2="7" y2="14"/><line x1="17" y1="14" x2="22" y2="14"/>
        </svg>
        Movies
      </button>

      <button :class="['chip', { active: active === 'dubbed' }]" @click="select('dubbed')">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
        </svg>
        Dubbed
      </button>

      <button :class="['chip', { active: active === 'subbed' }]" @click="select('subbed')">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13">
          <rect x="2" y="4" width="20" height="16" rx="2"/>
          <line x1="6" y1="14" x2="12" y2="14"/><line x1="6" y1="18" x2="18" y2="18"/>
        </svg>
        Subbed
      </button>

      <button :class="['chip', { active: active === 'trending' }]" @click="select('trending')">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13">
          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
          <polyline points="16 7 22 7 22 13"/>
        </svg>
        Trending
      </button>

      <button :class="['chip', { active: active === 'new' }]" @click="select('new')">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
        </svg>
        New
      </button>

    </div>
  </div>
</template>

<style scoped>
.chips-wrap {
  padding: 1rem 0 .5rem;
  overflow: hidden;
}
.chips-scroll {
  display: flex;
  gap: .5rem;
  overflow-x: auto;
  padding-bottom: .25rem;
  scrollbar-width: none;
}
.chips-scroll::-webkit-scrollbar { display: none; }

.chip {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: .35rem;
  padding: .38rem .9rem;
  border-radius: 100px;
  font-size: .76rem;
  font-weight: 700;
  letter-spacing: .04em;
  cursor: pointer;
  transition: all .2s;
  background: rgba(255,255,255,.05);
  border: 1px solid rgba(255,255,255,.1);
  color: var(--text-muted);
  white-space: nowrap;
}
.chip:hover {
  background: rgba(255,255,255,.1);
  border-color: rgba(255,255,255,.25);
  color: var(--text);
}
.chip.active {
  background: rgba(0,240,255,.12);
  border-color: rgba(0,240,255,.5);
  color: var(--cyan);
  box-shadow: 0 0 12px rgba(0,240,255,.15);
}
.chip svg { flex-shrink: 0; }
</style>
