<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  items:   { type: Array,   default: () => [] },
  loading: { type: Boolean, default: true },
})

const router      = useRouter()
const current     = ref(0)
const visible     = ref(true)
const expanded    = ref(false)
const showTrailer = ref(false)
let timer = null

const active = computed(() => props.items[current.value] || null)

function goTo(i) {
  if (i === current.value) return
  expanded.value = false
  showTrailer.value = false
  fade(() => { current.value = i })
  resetTimer()
}

function fade(cb) {
  visible.value = false
  setTimeout(() => { cb(); visible.value = true }, 500)
}

function resetTimer() {
  clearInterval(timer)
  if (props.items.length < 2) return
  timer = setInterval(() => {
    fade(() => { current.value = (current.value + 1) % props.items.length })
  }, 7000)
}

watch(() => props.items, (v) => { if (v.length) resetTimer() }, { immediate: true })
onUnmounted(() => clearInterval(timer))

function watchNow()    { if (active.value) router.push(`/watch/${active.value.id}/ep/1`) }
function viewDetails() { if (active.value) router.push(`/watch/${active.value.id}/ep/1`) }
function openTrailer() { if (active.value?.trailerUrl) showTrailer.value = true }
</script>

<template>
  <section class="hero">

    <!-- Background images (one per item, crossfade) -->
    <div class="hero-bg-wrap">
      <div
        v-for="(item, i) in items"
        :key="item.id"
        class="hero-bg"
        :class="{ active: i === current }"
        :style="`background-image: url('${item.backdrop || item.image}')`"
      ></div>
      <!-- Overlays -->
      <div class="overlay-left"></div>
      <div class="overlay-bottom"></div>
      <div class="overlay-full"></div>
    </div>

    <!-- Skeleton -->
    <div v-if="loading" class="hero-content">
      <div class="skeleton sk-tag"></div>
      <div class="skeleton sk-title"></div>
      <div class="skeleton sk-title2"></div>
      <div class="skeleton sk-synopsis"></div>
      <div class="skeleton sk-meta"></div>
      <div class="sk-btns">
        <div class="skeleton sk-btn"></div>
        <div class="skeleton sk-btn"></div>
      </div>
    </div>

    <!-- Content -->
    <Transition name="hero-fade">
      <div class="hero-content" v-if="!loading && active && visible" :key="active.id">

        <div class="hero-top-badges">
          <span class="genre-tag">{{ active.genre }}</span>
          <span v-if="active.rating" class="rating-pill">
            <svg viewBox="0 0 24 24" fill="currentColor" width="11" height="11"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            {{ typeof active.rating === 'number' ? active.rating.toFixed(1) : active.rating }}
          </span>
        </div>

        <h1 class="hero-title">{{ active.title }}</h1>

        <div class="synopsis-wrap">
          <p class="hero-synopsis" :class="{ expanded }">{{ active.synopsis }}</p>
          <button v-if="active.synopsis?.length > 160" class="synopsis-more" @click="expanded = !expanded">
            {{ expanded ? 'See less ↑' : 'See more ↓' }}
          </button>
        </div>

        <!-- Metadata row -->
        <div class="meta-row">
          <div class="meta-item">
            <span class="meta-label">FORMAT</span>
            <span class="meta-value">TV</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">RELEASED</span>
            <span class="meta-value">{{ active.year || '—' }}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">EPISODES</span>
            <span class="meta-value">{{ active.episodes || '—' }}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">STATUS</span>
            <span class="meta-value" :class="active.status === 'Airing' ? 'status-airing' : 'status-done'">
              {{ active.status === 'Airing' ? 'ONGOING' : 'FINISHED' }}
            </span>
          </div>
          <div v-if="active.studio" class="meta-item">
            <span class="meta-label">STUDIO</span>
            <span class="meta-value">{{ active.studio }}</span>
          </div>
        </div>

        <!-- Actions -->
        <div class="hero-actions">
          <button class="btn-watch" @click="watchNow">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            WATCH NOW
          </button>
          <button v-if="active.trailerUrl" class="btn-trailer" @click="openTrailer">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
            TRAILER
          </button>
          <button class="btn-details" @click="viewDetails">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            DETAILS
          </button>
        </div>

      </div>
    </Transition>

    <!-- Trailer modal -->
    <Teleport to="body">
      <Transition name="modal-fade">
        <div v-if="showTrailer && active?.trailerUrl" class="trailer-modal" @click.self="showTrailer = false">
          <div class="trailer-box">
            <button class="trailer-close" @click="showTrailer = false">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6 6 18M6 6l12 12"/></svg>
            </button>
            <iframe
              :src="active.trailerUrl + '&autoplay=1'"
              class="trailer-iframe"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Carousel dots -->
    <div class="carousel-dots" v-if="!loading && items.length > 1">
      <button
        v-for="(_, i) in items"
        :key="i"
        :class="['dot', { active: i === current }]"
        @click="goTo(i)"
        :aria-label="`Slide ${i + 1}`"
      ></button>
    </div>

    <!-- Scroll hint -->
    <div class="scroll-hint" aria-hidden="true">
      <span class="scroll-text">SCROLL</span>
      <div class="scroll-line"></div>
    </div>

  </section>
</template>

<style scoped>
.hero {
  position: relative;
  height: 100vh;
  min-height: 640px;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
}

/* ── Background ── */
.hero-bg-wrap { position: absolute; inset: 0; }

.hero-bg {
  position: absolute; inset: 0;
  background-size: cover;
  background-position: center right;
  opacity: 0;
  transition: opacity 1s ease;
}
.hero-bg.active {
  opacity: 1;
  animation: ken-burns 12s ease-in-out forwards;
}
@keyframes ken-burns {
  from { transform: scale(1);    background-position: center 40%; }
  to   { transform: scale(1.07); background-position: center 50%; }
}

.overlay-left {
  position: absolute; inset: 0;
  background: linear-gradient(to right, rgba(6,8,18,0.97) 30%, rgba(6,8,18,0.7) 55%, transparent 80%);
  z-index: 1;
}
.overlay-bottom {
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(6,8,18,1) 0%, transparent 40%);
  z-index: 1;
}
.overlay-full {
  position: absolute; inset: 0;
  background: rgba(6,8,18,0.25);
  z-index: 1;
}

/* ── Content ── */
.hero-content {
  position: relative;
  z-index: 10;
  padding: 0 5vw 5rem;
  max-width: 700px;
  width: 100%;
}

.hero-top-badges {
  display: flex;
  align-items: center;
  gap: .6rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}
.genre-tag {
  display: inline-block;
  font-size: .7rem;
  font-weight: 800;
  letter-spacing: .2em;
  text-transform: uppercase;
  color: var(--pink);
  border: 1px solid var(--pink);
  padding: .2rem .7rem;
  border-radius: 3px;
}
.rating-pill {
  display: inline-flex;
  align-items: center;
  gap: .28rem;
  background: rgba(255, 215, 0, .15);
  border: 1px solid rgba(255, 215, 0, .4);
  color: #ffd700;
  font-size: .72rem;
  font-weight: 800;
  letter-spacing: .08em;
  padding: .2rem .6rem;
  border-radius: 3px;
}

.hero-title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(3rem, 7vw, 6.5rem);
  line-height: .95;
  letter-spacing: .05em;
  color: #fff;
  text-transform: uppercase;
  margin: 0 0 1.25rem;
  text-shadow: 0 2px 40px rgba(0,0,0,.8);
}

.synopsis-wrap { margin-bottom: 1.75rem; max-width: 480px; }
.hero-synopsis {
  font-size: .9rem;
  color: rgba(255,255,255,.65);
  line-height: 1.75;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: all .3s;
}
.hero-synopsis.expanded { -webkit-line-clamp: unset; overflow: visible; }
.synopsis-more {
  background: none; border: none;
  color: var(--cyan); font-size: .78rem; font-weight: 700;
  cursor: pointer; padding: .35rem 0 0; display: block;
  transition: color .2s;
}
.synopsis-more:hover { color: #fff; }

/* ── Metadata row ── */
.meta-row {
  display: flex;
  align-items: center;
  gap: 0;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: .5rem;
}
.meta-item {
  display: flex;
  flex-direction: column;
  padding: 0 1.25rem 0 0;
  border-left: 2px solid var(--pink);
  padding-left: .75rem;
}
.meta-label {
  font-size: .58rem;
  font-weight: 800;
  letter-spacing: .15em;
  color: var(--pink);
  text-transform: uppercase;
  margin-bottom: .2rem;
}
.meta-value {
  font-size: .88rem;
  font-weight: 700;
  color: #fff;
  letter-spacing: .05em;
}
.status-airing { color: #6eff6e; }
.status-done   { color: rgba(255,255,255,.7); }
.meta-divider  { display: none; }

/* ── Actions ── */
.hero-actions { display: flex; gap: .85rem; flex-wrap: wrap; }

.btn-watch, .btn-trailer, .btn-details {
  display: flex; align-items: center; gap: .5rem;
  padding: .75rem 1.75rem;
  font-size: .82rem; font-weight: 800;
  letter-spacing: .1em; text-transform: uppercase;
  border-radius: 4px; cursor: pointer;
  border: none; transition: all .25s;
}
.btn-watch svg, .btn-trailer svg, .btn-details svg { width: 1rem; height: 1rem; flex-shrink: 0; }

.btn-watch {
  background: #c0392b;
  color: #fff;
  box-shadow: 0 0 24px rgba(192,57,43,.5);
}
.btn-watch:hover { background: #e74c3c; box-shadow: 0 0 36px rgba(231,76,60,.7); transform: translateY(-2px); }

.btn-trailer {
  background: rgba(0, 240, 255, .1);
  color: var(--cyan);
  border: 1px solid rgba(0, 240, 255, .35);
  backdrop-filter: blur(8px);
}
.btn-trailer:hover { background: rgba(0, 240, 255, .2); border-color: var(--cyan); transform: translateY(-2px); }

.btn-details {
  background: rgba(255,255,255,.08);
  color: rgba(255,255,255,.85);
  border: 1px solid rgba(255,255,255,.25);
  backdrop-filter: blur(8px);
}
.btn-details:hover { background: rgba(255,255,255,.16); border-color: rgba(255,255,255,.5); }

/* ── Trailer modal ── */
.trailer-modal {
  position: fixed; inset: 0;
  background: rgba(0,0,0,.85);
  backdrop-filter: blur(6px);
  display: flex; align-items: center; justify-content: center;
  z-index: 9999;
}
.trailer-box {
  position: relative;
  width: min(860px, 94vw);
  aspect-ratio: 16/9;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 80px rgba(0,0,0,.9);
}
.trailer-iframe { width: 100%; height: 100%; border: none; }
.trailer-close {
  position: absolute; top: .6rem; right: .6rem;
  width: 34px; height: 34px; border-radius: 50%;
  background: rgba(0,0,0,.7); border: 1px solid rgba(255,255,255,.2);
  color: #fff; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  z-index: 10; transition: background .2s;
}
.trailer-close:hover { background: rgba(255,45,120,.6); }
.trailer-close svg { width: 16px; height: 16px; }
.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity .25s; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }

/* ── Carousel dots ── */
.carousel-dots {
  position: absolute;
  bottom: 2rem;
  right: 5vw;
  display: flex;
  gap: .5rem;
  z-index: 10;
}
.dot {
  width: 28px; height: 3px;
  border-radius: 2px;
  border: none; cursor: pointer;
  background: rgba(255,255,255,.25);
  transition: all .3s;
  padding: 0;
}
.dot.active { width: 48px; background: #c0392b; }
.dot:hover:not(.active) { background: rgba(255,255,255,.5); }

/* ── Scroll hint ── */
.scroll-hint {
  position: absolute;
  right: 2rem; bottom: 6rem;
  display: flex; flex-direction: column;
  align-items: center; gap: .5rem;
  z-index: 10;
}
.scroll-text {
  font-size: .55rem; font-weight: 800;
  letter-spacing: .25em; color: rgba(255,255,255,.3);
  writing-mode: vertical-rl;
  text-transform: uppercase;
}
.scroll-line {
  width: 1px; height: 48px;
  background: linear-gradient(to bottom, rgba(255,255,255,.3), transparent);
  animation: scroll-pulse 2s ease-in-out infinite;
}
@keyframes scroll-pulse {
  0%,100% { opacity: .4; transform: scaleY(1); }
  50%      { opacity: 1; transform: scaleY(1.15); }
}

/* ── Fade transition ── */
.hero-fade-enter-active { transition: opacity .5s ease, transform .5s ease; }
.hero-fade-leave-active { transition: opacity .4s ease, transform .4s ease; position: absolute; }
.hero-fade-enter-from   { opacity: 0; transform: translateY(16px); }
.hero-fade-leave-to     { opacity: 0; transform: translateY(-8px); }

/* ── Skeleton ── */
.skeleton { background: linear-gradient(90deg,rgba(255,255,255,.05) 25%,rgba(255,255,255,.1) 50%,rgba(255,255,255,.05) 75%); background-size:200%; animation:shimmer 1.6s infinite; border-radius:4px; }
@keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
.sk-tag     { width: 80px; height: 22px; margin-bottom: 1rem; }
.sk-title   { width: 80%; height: 72px; margin-bottom: .4rem; }
.sk-title2  { width: 55%; height: 72px; margin-bottom: 1.25rem; }
.sk-synopsis{ width: 90%; height: 52px; margin-bottom: 1.75rem; }
.sk-meta    { width: 70%; height: 40px; margin-bottom: 2rem; }
.sk-btns    { display: flex; gap: .85rem; }
.sk-btn     { width: 130px; height: 44px; }

@media (max-width: 768px) {
  .hero { align-items: flex-end; }
  .hero-content { padding: 0 1.5rem 5rem; }
  .carousel-dots { right: 1.5rem; bottom: 1.5rem; }
  .scroll-hint { display: none; }
  .overlay-left { background: linear-gradient(to right, rgba(6,8,18,0.95) 0%, rgba(6,8,18,0.6) 70%, transparent 100%); }
}
</style>
