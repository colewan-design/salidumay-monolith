<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { addToLibrary, removeFromLibrary, getLibrary } from '~/services/userdata.js'

const props = defineProps({
  items:     { type: Array,   default: () => [] },
  loading:   { type: Boolean, default: false },
  title:     { type: String,  default: 'Top Movies' },
  accent:    { type: String,  default: 'This Week' },
  tag:       { type: String,  default: 'Films' },
  tagColor:  { type: String,  default: 'pink' },
  icon:      { type: String,  default: '' },
  link:      { type: String,  default: '/films' },
  type:      { type: String,  default: 'film' }, // 'film' | 'anime'
})

const router     = useRouter()
const libraryIds = ref(new Set(getLibrary().map(a => String(a.id))))

function navigate(item) {
  if (props.type === 'film') router.push(`/film/${item.id}`)
  else if (props.type === 'series') router.push(`/series/${item.id}`)
  else router.push(`/watch/${item.id}/ep/1`)
}

async function toggleLibrary(e, item) {
  e.stopPropagation()
  const id = String(item.id)
  if (libraryIds.value.has(id)) {
    await removeFromLibrary(item.id)
    libraryIds.value.delete(id)
  } else {
    await addToLibrary(item, props.type)
    libraryIds.value.add(id)
  }
  libraryIds.value = new Set(libraryIds.value)
}

function bgImage(item) {
  return item.backdrop || item.image || ''
}
</script>

<template>
  <section class="section">
    <div class="section-header">
      <div class="section-title-wrap">
        <span :class="['section-tag', tagColor]">{{ tag }}</span>
        <h2 class="section-title">{{ title }} <span class="accent">{{ accent }}</span></h2>
      </div>
      <router-link :to="link" class="see-all">View All →</router-link>
    </div>

    <!-- Loaded -->
    <div class="ls-scroll" v-if="!loading">
      <div
        v-for="item in items" :key="item.id"
        class="ls-card"
        @click="navigate(item)"
      >
        <div class="ls-img-wrap">
          <img
            v-if="bgImage(item)"
            :src="bgImage(item)"
            :alt="item.title"
            loading="lazy"
            class="ls-img"
          />
          <div v-else class="ls-placeholder">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="32" height="32" opacity=".4">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <line x1="7" y1="4" x2="7" y2="20"/><line x1="17" y1="4" x2="17" y2="20"/>
              <line x1="2" y1="9" x2="7" y2="9"/><line x1="17" y1="9" x2="22" y2="9"/>
              <line x1="2" y1="14" x2="7" y2="14"/><line x1="17" y1="14" x2="22" y2="14"/>
            </svg>
          </div>

          <div class="ls-overlay">
            <div class="ls-play">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </div>
            <button
              :class="['ls-add', { saved: libraryIds.has(String(item.id)) }]"
              @click="toggleLibrary($event, item)"
              :title="libraryIds.has(String(item.id)) ? 'Remove from library' : 'Add to library'"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="13" height="13">
                <path v-if="!libraryIds.has(String(item.id))" d="M12 5v14M5 12h14" stroke-linecap="round"/>
                <path v-else d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>

          <span class="ls-rating">★ {{ typeof item.rating === 'number' ? item.rating.toFixed(1) : item.rating }}</span>
        </div>

        <div class="ls-info">
          <p class="ls-title">{{ item.title }}</p>
          <p class="ls-year">{{ item.year }}</p>
        </div>
      </div>
    </div>

    <!-- Skeleton -->
    <div class="ls-scroll" v-else>
      <div v-for="n in 6" :key="n" class="ls-card ls-skel">
        <div class="skeleton sk-img"></div>
        <div class="skeleton sk-line" style="width:70%;margin-top:.5rem"></div>
        <div class="skeleton sk-line" style="width:40%"></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ls-scroll {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 1rem;
  scrollbar-width: thin;
  scrollbar-color: var(--pink) transparent;
  scroll-snap-type: x mandatory;
}
.ls-scroll::-webkit-scrollbar { height: 4px; }
.ls-scroll::-webkit-scrollbar-track { background: transparent; }
.ls-scroll::-webkit-scrollbar-thumb { background: var(--pink); border-radius: 2px; }

.ls-card {
  flex: 0 0 240px;
  scroll-snap-align: start;
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
  transition: transform .25s, box-shadow .25s;
}
.ls-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0,0,0,.5);
}
.ls-card:hover .ls-overlay { opacity: 1; }
.ls-card:hover .ls-img { transform: scale(1.04); }

.ls-img-wrap {
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 16:9 */
  overflow: hidden;
  background: #0d1527;
  border-radius: 8px;
}
.ls-img {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  object-fit: cover;
  transition: transform .35s;
}
.ls-placeholder {
  position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: center;
  font-size: 2rem; background: #0d1527;
}

.ls-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(10,14,26,.85) 0%, transparent 55%);
  display: flex; align-items: center; justify-content: center; gap: .5rem;
  opacity: 0; transition: opacity .25s;
}
.ls-play {
  width: 40px; height: 40px; border-radius: 50%;
  background: var(--pink); display: flex; align-items: center; justify-content: center;
  box-shadow: 0 0 18px rgba(255,45,120,.55);
}
.ls-play svg { width: 16px; height: 16px; color: #fff; }
.ls-add {
  width: 30px; height: 30px; border-radius: 50%;
  background: rgba(0,240,255,.15); border: 1px solid rgba(0,240,255,.35);
  color: var(--cyan); cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: all .2s;
}
.ls-add:hover { background: rgba(0,240,255,.3); }
.ls-add.saved { background: rgba(110,255,110,.15); border-color: rgba(110,255,110,.4); color: #6eff6e; }

.ls-rating {
  position: absolute; bottom: 7px; right: 7px;
  background: rgba(0,0,0,.72); color: #ffd700;
  font-size: .62rem; font-weight: 700; padding: .15rem .4rem; border-radius: 4px;
}

.ls-info { padding: .45rem .1rem 0; }
.ls-title {
  font-size: .82rem; font-weight: 700; color: var(--text);
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  margin-bottom: .15rem;
}
.ls-year { font-size: .7rem; color: var(--text-muted); }

.skeleton {
  background: linear-gradient(90deg,#1a2240 25%,#222d4d 50%,#1a2240 75%);
  background-size: 200%; animation: shimmer 1.6s infinite; border-radius: 6px;
}
@keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
.sk-img  { padding-top: 56.25%; margin-bottom: .4rem; }
.sk-line { height: 13px; margin-bottom: .3rem; border-radius: 4px; }

@media (max-width: 480px) { .ls-card { flex: 0 0 200px; } }
</style>
