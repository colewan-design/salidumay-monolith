<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getHistory, removeFromHistory } from '~/services/userdata.js'

const router = useRouter()
const items  = ref([])

onMounted(() => { items.value = getHistory().slice(0, 10) })

function timeAgo(iso) {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1)  return 'Just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24)  return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  return days === 1 ? 'Yesterday' : `${days}d ago`
}

async function dismiss(e, item) {
  e.stopPropagation()
  await removeFromHistory(item.id)
  items.value = items.value.filter(i => String(i.id) !== String(item.id))
}
</script>

<template>
  <section v-if="items.length" class="section cw-section">
    <div class="section-header">
      <div class="section-title-wrap">
        <span class="section-tag cyan">Resume</span>
        <h2 class="section-title">Continue <span class="accent">Watching</span></h2>
      </div>
      <router-link to="/history" class="see-all">View History →</router-link>
    </div>

    <div class="cw-scroll">
      <div
        v-for="item in items" :key="item.id"
        class="cw-card"
        @click="router.push(`/watch/${item.id}/ep/${item.episode}`)"
      >
        <div class="cw-poster">
          <img :src="item.image" :alt="item.title" loading="lazy" />
          <div class="cw-play-overlay">
            <div class="cw-play-btn">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </div>
          </div>
        </div>
        <div class="cw-info">
          <button class="cw-dismiss" @click="dismiss($event, item)" title="Remove from history">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
          <p class="cw-title">{{ item.title }}</p>
          <p class="cw-episode">Episode {{ item.episode }}</p>
          <p class="cw-time">{{ timeAgo(item.watchedAt) }}</p>
          <div class="cw-resume-btn">
            <svg viewBox="0 0 24 24" fill="currentColor" width="10" height="10"><path d="M8 5v14l11-7z"/></svg>
            RESUME
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cw-scroll {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 1rem;
  scrollbar-width: thin;
  scrollbar-color: var(--cyan) transparent;
  scroll-snap-type: x mandatory;
}
.cw-scroll::-webkit-scrollbar { height: 4px; }
.cw-scroll::-webkit-scrollbar-track { background: transparent; }
.cw-scroll::-webkit-scrollbar-thumb { background: var(--cyan); border-radius: 2px; }

.cw-card {
  flex: 0 0 220px;
  scroll-snap-align: start;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  transition: transform .25s, border-color .25s, box-shadow .25s;
}
.cw-card:hover {
  transform: translateY(-4px);
  border-color: rgba(0,240,255,.3);
  box-shadow: 0 8px 30px rgba(0,240,255,.1);
}
.cw-card:hover .cw-play-overlay { opacity: 1; }

.cw-poster {
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 16:9 */
  overflow: hidden;
  background: #0d1527;
}
.cw-poster img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  transition: transform .35s;
}
.cw-card:hover .cw-poster img { transform: scale(1.05); }

.cw-play-overlay {
  position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: center;
  background: rgba(0,0,0,.45);
  opacity: 0;
  transition: opacity .2s;
}
.cw-play-btn {
  width: 44px; height: 44px; border-radius: 50%;
  background: var(--pink);
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 0 20px rgba(255,45,120,.6);
}
.cw-play-btn svg { width: 18px; height: 18px; color: #fff; }

.cw-info {
  position: relative;
  padding: .6rem .75rem .75rem;
}

.cw-dismiss {
  position: absolute; top: .4rem; right: .4rem;
  width: 22px; height: 22px; border-radius: 50%;
  background: rgba(255,255,255,.08);
  border: 1px solid rgba(255,255,255,.12);
  color: var(--text-muted);
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  transition: all .2s;
  opacity: 0;
}
.cw-card:hover .cw-dismiss { opacity: 1; }
.cw-dismiss:hover { background: rgba(255,45,120,.25); border-color: var(--pink); color: var(--pink); }
.cw-dismiss svg { width: 10px; height: 10px; }

.cw-title {
  font-size: .82rem; font-weight: 700; color: var(--text);
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  margin-bottom: .2rem; padding-right: 1.2rem;
}
.cw-episode {
  font-size: .72rem; color: var(--cyan); font-weight: 700;
  letter-spacing: .04em; margin-bottom: .15rem;
}
.cw-time {
  font-size: .65rem; color: var(--text-muted); margin-bottom: .5rem;
}
.cw-resume-btn {
  display: inline-flex; align-items: center; gap: .3rem;
  font-size: .62rem; font-weight: 800; letter-spacing: .1em;
  color: var(--cyan); border: 1px solid rgba(0,240,255,.3);
  padding: .2rem .6rem; border-radius: 3px;
  background: rgba(0,240,255,.07);
}

@media (max-width: 480px) { .cw-card { flex: 0 0 180px; } }
</style>
