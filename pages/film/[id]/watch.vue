<script setup>
definePageMeta({ layout: 'player' })

import { ref, computed, onMounted, onUnmounted } from 'vue'
import { getFilmDetail, FILM_EMBED_SOURCES } from '~/services/tmdb.js'

const route  = useRoute()
const router = useRouter()

const film         = ref(null)
const loading      = ref(true)
const sources      = ref([])
const activeSrc    = ref('')
const activeSrcIdx = ref(0)
const isPlaying    = ref(false)
const srcError     = ref(false)
const showControls = ref(true)

// Mini player
const isMiniPlayer = ref(false)
const miniMode     = ref('fit')   // 'fit' (320 px wide) | 'full' (500 px wide)
const miniPos      = ref({ x: null, y: null })
const miniRef      = ref(null)
let dragging   = false
let dragOffset = { x: 0, y: 0 }

let controlsTimer = null

function wakeControls() {
  showControls.value = true
  clearTimeout(controlsTimer)
  if (isPlaying.value && !isMiniPlayer.value) {
    controlsTimer = setTimeout(() => { showControls.value = false }, 3000)
  }
}

function selectSource(src, idx) {
  srcError.value     = false
  activeSrc.value    = src.url
  activeSrcIdx.value = idx
  if (!isPlaying.value) isPlaying.value = true
  wakeControls()
}

function onIframeError() {
  const next = activeSrcIdx.value + 1
  if (next < sources.value.length) selectSource(sources.value[next], next)
  else srcError.value = true
}

function startPlay() {
  if (sources.value.length) selectSource(sources.value[0], 0)
  else isPlaying.value = true
  controlsTimer = setTimeout(() => { showControls.value = false }, 3000)
}

function goBack() {
  navigateTo(`/film/${route.params.id}`)
}

function toggleMini() {
  isMiniPlayer.value = !isMiniPlayer.value
  miniPos.value = { x: null, y: null }
  if (!isMiniPlayer.value) {
    controlsTimer = setTimeout(() => { showControls.value = false }, 3000)
  } else {
    showControls.value = true
    clearTimeout(controlsTimer)
  }
}

function startDrag(e) {
  if (e.button !== 0) return
  e.preventDefault()
  dragging = true
  const rect = miniRef.value.getBoundingClientRect()
  dragOffset.x = e.clientX - rect.left
  dragOffset.y = e.clientY - rect.top
  document.addEventListener('mousemove', onDrag)
  document.addEventListener('mouseup', stopDrag)
}

function onDrag(e) {
  if (!dragging || !miniRef.value) return
  const vw = window.innerWidth
  const vh = window.innerHeight
  const el = miniRef.value
  let x = e.clientX - dragOffset.x
  let y = e.clientY - dragOffset.y
  x = Math.max(0, Math.min(vw - el.offsetWidth, x))
  y = Math.max(0, Math.min(vh - el.offsetHeight, y))
  miniPos.value = { x, y }
}

function stopDrag() {
  dragging = false
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
}

const miniPlayerStyle = computed(() => {
  if (miniPos.value.x === null) return {}
  return {
    left:   miniPos.value.x + 'px',
    top:    miniPos.value.y + 'px',
    right:  'auto',
    bottom: 'auto',
  }
})

async function fetchFilm(id) {
  loading.value  = true
  film.value     = null
  sources.value  = []
  const data = await getFilmDetail(id).catch(() => null)
  if (data) {
    film.value    = data
    sources.value = FILM_EMBED_SOURCES(id)
  }
  loading.value = false
}

onMounted(() => fetchFilm(route.params.id))
onUnmounted(() => {
  clearTimeout(controlsTimer)
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
})
</script>

<template>
  <div :class="['watch-page', { 'hide-cursor': isPlaying && !isMiniPlayer && !showControls }]" @mousemove="wakeControls">

    <!-- Loading -->
    <div v-if="loading" class="center-screen">
      <div class="spin"></div>
    </div>

    <template v-else-if="film">
      <!-- Backdrop (pre-play or mini-player mode) -->
      <div v-if="!isPlaying || isMiniPlayer" class="backdrop">
        <img :src="film.backdrop || film.image" class="backdrop-img" :alt="film.title" />
        <div class="backdrop-overlay"></div>
      </div>

      <!-- Mini-mode background info -->
      <Transition name="fade">
        <div v-if="isMiniPlayer" class="mini-bg-info">
          <p class="mini-bg-label">NOW WATCHING</p>
          <p class="mini-bg-title">{{ film.title }}</p>
          <p class="mini-bg-year">{{ film.year }}</p>
        </div>
      </Transition>

      <!-- Top bar -->
      <div :class="['top-bar', { visible: !isPlaying || (showControls && !isMiniPlayer) || isMiniPlayer }]">
        <div class="top-left">
          <svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
          <div class="top-title-group">
            <span class="top-title">{{ film.title }}</span>
            <span class="top-badge">Movie</span>
          </div>
        </div>
        <div class="top-right">
          <button
            v-for="(src, i) in sources"
            :key="src.url"
            :class="['server-btn', { active: activeSrcIdx === i && isPlaying }]"
            @click="selectSource(src, i)"
          >
            <span class="server-dot"></span>
            SERVER {{ i + 1 }}
          </button>

          <!-- Mini-player toggle (only while playing) -->
          <button v-if="isPlaying" :class="['mini-toggle-btn', { active: isMiniPlayer }]" @click="toggleMini" title="Mini player">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="15" height="15">
              <rect x="2" y="13" width="9" height="7" rx="1.5"/>
              <path d="M2 4h20v10H2z" stroke-dasharray="2 1.5" opacity=".4"/>
            </svg>
            MINI
          </button>

          <button class="close-btn" @click="goBack">✕</button>
        </div>
      </div>

      <!-- Stage (full-screen player; hidden while mini player is active) -->
      <div v-show="!isMiniPlayer" class="stage">
        <Transition name="fade">
          <div v-if="!isPlaying" class="pre-play" @click="startPlay">
            <button class="play-circle" aria-label="Play">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </button>
            <p class="pre-title">{{ film.title }}</p>
            <p class="pre-year">{{ film.year }}</p>
          </div>
        </Transition>

        <div v-show="isPlaying" class="player-wrap">
          <div v-if="srcError" class="center-screen">
            <p class="err-icon">⚠</p>
            <p>All sources unavailable.</p>
          </div>
          <iframe
            v-else
            :key="activeSrc"
            :src="activeSrc"
            class="player-iframe"
            allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
            allowfullscreen
            frameborder="0"
            scrolling="no"
            @error="onIframeError"
          ></iframe>
        </div>
      </div>

      <!-- ── Mini Player ── -->
      <Transition name="mini-pop">
        <div
          v-if="isMiniPlayer && isPlaying"
          ref="miniRef"
          :class="['mini-player', `mini-${miniMode}`]"
          :style="miniPlayerStyle"
        >
          <!-- Drag bar -->
          <div class="mp-bar" @mousedown="startDrag">
            <svg class="mp-drag-icon" viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
              <circle cx="9"  cy="5"  r="1.5"/><circle cx="15" cy="5"  r="1.5"/>
              <circle cx="9"  cy="12" r="1.5"/><circle cx="15" cy="12" r="1.5"/>
              <circle cx="9"  cy="19" r="1.5"/><circle cx="15" cy="19" r="1.5"/>
            </svg>
            <span class="mp-title">{{ film.title }}</span>
            <div class="mp-bar-actions">
              <button class="mp-action-btn" @click="toggleMini" title="Restore to full screen">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="13" height="13">
                  <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
                </svg>
              </button>
              <button class="mp-action-btn mp-close" @click="goBack" title="Close">✕</button>
            </div>
          </div>

          <!-- Video area -->
          <div class="mp-video">
            <div v-if="srcError" class="mp-error">⚠ Source unavailable</div>
            <iframe
              v-else
              :key="activeSrc + '-mini'"
              :src="activeSrc"
              class="mp-iframe"
              allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
              allowfullscreen
              frameborder="0"
              scrolling="no"
            ></iframe>
          </div>

          <!-- View-mode controls -->
          <div class="mp-controls">
            <span class="mp-controls-label">View</span>
            <button :class="['mp-view-btn', { active: miniMode === 'fit' }]" @click="miniMode = 'fit'">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <rect x="6" y="7" width="12" height="10" rx="1"/>
              </svg>
              Fit
            </button>
            <button :class="['mp-view-btn', { active: miniMode === 'full' }]" @click="miniMode = 'full'">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="M2 8h20M2 16h20" opacity=".4"/>
              </svg>
              Full
            </button>
          </div>
        </div>
      </Transition>

    </template>

    <!-- Film not found -->
    <div v-else-if="!loading" class="center-screen">
      <p>Film not found.</p>
      <button class="close-btn" @click="goBack">Go back</button>
    </div>

  </div>
</template>

<style scoped>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

.watch-page {
  position: fixed;
  inset: 0;
  background: #000;
  overflow: hidden;
}
.watch-page.hide-cursor { cursor: none; }

/* Backdrop */
.backdrop { position: absolute; inset: 0; z-index: 0; }
.backdrop-img {
  width: 100%; height: 100%;
  object-fit: cover; object-position: center top; display: block;
}
.backdrop-overlay { position: absolute; inset: 0; background: rgba(0,0,0,.6); }

/* Mini-mode background info */
.mini-bg-info {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: .5rem;
  pointer-events: none;
}
.mini-bg-label {
  font-size: .62rem;
  font-weight: 800;
  letter-spacing: .18em;
  color: rgba(255,255,255,.35);
  text-transform: uppercase;
}
.mini-bg-title {
  font-size: 2rem;
  font-weight: 800;
  color: rgba(255,255,255,.55);
  text-align: center;
  max-width: 60vw;
  text-shadow: 0 2px 12px rgba(0,0,0,.7);
}
.mini-bg-year {
  font-size: .88rem;
  color: rgba(255,255,255,.3);
}

/* Top bar */
.top-bar {
  position: absolute;
  top: 0; left: 0; right: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: .85rem 1.25rem;
  background: linear-gradient(to bottom, rgba(0,0,0,.75) 0%, transparent 100%);
  opacity: 0;
  pointer-events: none;
  transition: opacity .35s;
}
.top-bar.visible { opacity: 1; pointer-events: auto; }

.top-left { display: flex; align-items: center; gap: .75rem; }
.menu-icon { width: 1.1rem; height: 1.1rem; color: rgba(255,255,255,.7); flex-shrink: 0; }
.top-title-group { display: flex; align-items: center; gap: .5rem; }
.top-title {
  font-size: .92rem; font-weight: 700; color: #fff;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 40vw;
}
.top-badge {
  font-size: .65rem; font-weight: 800; letter-spacing: .1em; text-transform: uppercase;
  color: rgba(255,255,255,.6); border: 1px solid rgba(255,255,255,.25);
  border-radius: 3px; padding: .1rem .4rem; flex-shrink: 0;
}
.top-right { display: flex; align-items: center; gap: .5rem; }

.server-btn {
  display: flex; align-items: center; gap: .4rem;
  padding: .3rem .75rem;
  background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.18);
  border-radius: 5px; color: rgba(255,255,255,.75);
  font-size: .72rem; font-weight: 800; letter-spacing: .07em;
  cursor: pointer; transition: all .2s;
}
.server-btn:hover { background: rgba(255,255,255,.15); color: #fff; }
.server-btn.active {
  background: rgba(180,140,20,.25); border-color: rgba(220,180,30,.5); color: #ddb830;
}
.server-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: currentColor; display: inline-block;
}

/* Mini-player toggle button */
.mini-toggle-btn {
  display: flex; align-items: center; gap: .4rem;
  padding: .3rem .75rem;
  background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.18);
  border-radius: 5px; color: rgba(255,255,255,.75);
  font-size: .72rem; font-weight: 800; letter-spacing: .07em;
  cursor: pointer; transition: all .2s;
}
.mini-toggle-btn:hover { background: rgba(255,255,255,.15); color: #fff; }
.mini-toggle-btn.active {
  background: rgba(30,140,180,.25); border-color: rgba(40,180,220,.5); color: #38c8e8;
}

.close-btn {
  width: 2rem; height: 2rem;
  display: flex; align-items: center; justify-content: center;
  background: rgba(180,140,20,.25); border: 1px solid rgba(220,180,30,.5);
  border-radius: 5px; color: #ddb830;
  font-size: .85rem; font-weight: 700; cursor: pointer; transition: all .2s;
}
.close-btn:hover { background: rgba(180,140,20,.4); }

/* Stage */
.stage {
  position: absolute;
  inset: 0;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Pre-play */
.pre-play {
  display: flex; flex-direction: column; align-items: center; gap: 1rem;
  cursor: pointer; user-select: none;
}
.pre-play:hover .play-circle { transform: scale(1.08); box-shadow: 0 0 50px rgba(255,255,255,.3); }
.play-circle {
  width: 72px; height: 72px; border-radius: 50%;
  background: rgba(255,255,255,.92); border: none;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: transform .2s, box-shadow .2s;
  box-shadow: 0 0 30px rgba(0,0,0,.5);
}
.play-circle svg { width: 28px; height: 28px; color: #111; margin-left: 3px; }
.pre-title {
  font-size: 1.1rem; font-weight: 700; color: #fff;
  text-align: center; text-shadow: 0 2px 8px rgba(0,0,0,.8); max-width: 60vw;
}
.pre-year { font-size: .82rem; color: rgba(255,255,255,.55); text-align: center; }

/* Full-screen player */
.player-wrap { position: absolute; inset: 0; }
.player-iframe {
  position: absolute; inset: 0; width: 100%; height: 100%;
  display: block; border: none; background: #000;
}

/* ══════════════════════════════════════
   Mini Player
══════════════════════════════════════ */
.mini-player {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 300;
  border-radius: 12px;
  overflow: hidden;
  background: #0a0a0a;
  box-shadow: 0 16px 48px rgba(0,0,0,.9), 0 0 0 1px rgba(255,255,255,.1);
  display: flex;
  flex-direction: column;
  transition: width .22s cubic-bezier(.4,0,.2,1);
  will-change: transform;
}

/* Fit = compact width */
.mini-player.mini-fit  { width: 320px; }
/* Full = wider */
.mini-player.mini-full { width: 500px; }

/* Drag bar */
.mp-bar {
  display: flex;
  align-items: center;
  gap: .45rem;
  padding: .45rem .6rem;
  background: rgba(15,15,15,.95);
  cursor: move;
  user-select: none;
  border-bottom: 1px solid rgba(255,255,255,.07);
  flex-shrink: 0;
}
.mp-drag-icon { color: rgba(255,255,255,.3); flex-shrink: 0; }
.mp-title {
  flex: 1;
  font-size: .72rem;
  font-weight: 700;
  color: rgba(255,255,255,.7);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.mp-bar-actions { display: flex; align-items: center; gap: .25rem; flex-shrink: 0; }
.mp-action-btn {
  width: 1.6rem; height: 1.6rem;
  display: flex; align-items: center; justify-content: center;
  background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.1);
  border-radius: 5px; color: rgba(255,255,255,.6);
  font-size: .75rem; cursor: pointer; transition: all .15s;
}
.mp-action-btn:hover { background: rgba(255,255,255,.14); color: #fff; }
.mp-close:hover { background: rgba(200,40,40,.35); border-color: rgba(200,60,60,.5); color: #f87; }

/* Video area */
.mp-video {
  position: relative;
  aspect-ratio: 16 / 9;
  width: 100%;
  background: #000;
  flex-shrink: 0;
}
.mp-iframe {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  border: none; display: block; background: #000;
}
.mp-error {
  position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: center;
  color: rgba(255,255,255,.45); font-size: .78rem; gap: .4rem;
}

/* View-mode controls */
.mp-controls {
  display: flex;
  align-items: center;
  gap: .5rem;
  padding: .45rem .6rem;
  background: rgba(12,12,12,.97);
  border-top: 1px solid rgba(255,255,255,.07);
  flex-shrink: 0;
}
.mp-controls-label {
  font-size: .6rem;
  font-weight: 800;
  letter-spacing: .12em;
  text-transform: uppercase;
  color: rgba(255,255,255,.25);
  margin-right: .25rem;
}
.mp-view-btn {
  display: flex; align-items: center; gap: .35rem;
  padding: .25rem .65rem;
  background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.1);
  border-radius: 5px; color: rgba(255,255,255,.5);
  font-size: .68rem; font-weight: 700; letter-spacing: .06em;
  cursor: pointer; transition: all .15s;
}
.mp-view-btn:hover { background: rgba(255,255,255,.12); color: rgba(255,255,255,.8); }
.mp-view-btn.active {
  background: rgba(30,140,180,.2); border-color: rgba(40,180,220,.4); color: #38c8e8;
}

/* Center screen (loading / error) */
.center-screen {
  position: fixed; inset: 0;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 1rem; color: rgba(255,255,255,.6); font-size: .88rem; z-index: 6;
}
.player-wrap > .center-screen { position: absolute; background: rgba(0,0,0,.7); }
.err-icon { font-size: 2rem; }

.spin {
  width: 36px; height: 36px;
  border: 3px solid rgba(255,255,255,.12); border-top-color: #fff;
  border-radius: 50%; animation: spin .8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* Transitions */
.fade-enter-active, .fade-leave-active { transition: opacity .3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.mini-pop-enter-active { transition: opacity .25s, transform .25s cubic-bezier(.34,1.56,.64,1); }
.mini-pop-leave-active { transition: opacity .2s, transform .2s ease-in; }
.mini-pop-enter-from  { opacity: 0; transform: scale(.85) translateY(16px); }
.mini-pop-leave-to    { opacity: 0; transform: scale(.9) translateY(8px); }
</style>
