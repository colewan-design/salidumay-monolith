<script setup>
import { ref, onMounted, watch } from 'vue'
import { getFilmDetail, FILM_EMBED_SOURCES } from '~/services/tmdb.js'
import {
  addToLibrary, removeFromLibrary, isInLibrary,
  isLiked, toggleLike,
  incrementViewCount, getViewCount, formatViews,
} from '~/services/userdata.js'

const route  = useRoute()
const router = useRouter()

const film        = ref(null)
const loading     = ref(true)
const activeTab   = ref('related')

const sources      = ref([])
const activeSrc    = ref('')
const activeSrcIdx = ref(0)
const isPlaying    = ref(false)
const srcError     = ref(false)

const inLibrary   = ref(false)
const liked       = ref(false)
const likesCount  = ref(0)
const views       = ref(0)
const saving      = ref(false)
const likeWorking = ref(false)
const authToast   = ref(false)

function showAuthToast() {
  authToast.value = true
  setTimeout(() => { authToast.value = false }, 2500)
}

async function toggleLibrary() {
  if (saving.value || !film.value) return
  saving.value = true
  if (inLibrary.value) {
    await removeFromLibrary(film.value.id)
    inLibrary.value = false
  } else {
    await addToLibrary({
      id:       film.value.id,
      title:    film.value.title,
      image:    film.value.image,
      genre:    film.value.genreNames?.[0] || '',
      episodes: null,
      rating:   film.value.rating,
      type:     'film',
    })
    inLibrary.value = true
  }
  saving.value = false
}

async function handleLike() {
  if (!film.value || likeWorking.value) return
  likeWorking.value = true
  const result = await toggleLike({
    id:    film.value.id,
    title: film.value.title,
    image: film.value.image,
    type:  'film',
  })
  likeWorking.value = false
  if (result.unauthenticated) {
    showAuthToast()
    return
  }
  liked.value      = result.liked
  likesCount.value = result.count
}

useSeoMeta({
  title: () => film.value ? `${film.value.title} — Salidumay` : 'Film — Salidumay',
  description: () => film.value?.overview || 'Watch this film on Salidumay.',
})

function startPlay() {
  if (!sources.value.length) return
  activeSrc.value    = sources.value[0].url
  activeSrcIdx.value = 0
  isPlaying.value    = true
}

function selectSource(src, idx) {
  srcError.value     = false
  activeSrc.value    = src.url
  activeSrcIdx.value = idx
}

function onIframeError() {
  const next = activeSrcIdx.value + 1
  if (next < sources.value.length) selectSource(sources.value[next], next)
  else srcError.value = true
}

function openFullScreen() {
  navigateTo(`/film/${route.params.id}/watch`)
}

async function fetchFilm(id) {
  loading.value   = true
  film.value      = null
  isPlaying.value = false
  sources.value   = []
  activeSrc.value = ''

  const data = await getFilmDetail(id).catch(() => null)
  if (data) {
    film.value      = data
    sources.value   = FILM_EMBED_SOURCES(id)
    inLibrary.value = isInLibrary(id)
    // Prefer server state; fall back to localStorage if API didn't return it
    liked.value      = data.user_liked ?? isLiked(id)
    likesCount.value = data.likes ?? 0
    views.value      = data.views ?? getViewCount(id)
    // Record this visit (unique-IP; server ignores duplicates)
    incrementViewCount(id, 'film').then(n => { views.value = n })
  }
  loading.value = false
}

watch(() => route.params.id, (id) => fetchFilm(id))
onMounted(() => fetchFilm(route.params.id))
</script>

<template>
  <div class="page">

    <!-- Breadcrumb -->
    <div class="breadcrumb">
      <NuxtLink to="/" class="bc-link">Home</NuxtLink>
      <span class="bc-sep">›</span>
      <NuxtLink to="/films" class="bc-link">Films</NuxtLink>
      <span class="bc-sep">›</span>
      <span class="bc-current">{{ film?.title || '…' }}</span>
    </div>

    <!-- Backdrop -->
    <div v-if="film?.backdrop" class="backdrop-wrap">
      <img :src="film.backdrop" class="backdrop-img" :alt="film.title" />
      <div class="backdrop-fade"></div>
    </div>

    <div class="layout">
      <!-- Left: player + info -->
      <div class="player-col">

        <!-- Player header -->
        <div class="player-header" v-if="film">
          <div class="player-header-top">
            <h1 class="film-title">{{ film.title }}</h1>
          </div>
          <div class="film-meta-row">
            <span class="pill">{{ film.year }}</span>
            <span class="pill star">★ {{ film.rating.toFixed(1) }}</span>
            <span v-if="film.runtime" class="pill">{{ Math.floor(film.runtime / 60) }}h {{ film.runtime % 60 }}m</span>
            <span v-for="g in film.genreNames.slice(0,3)" :key="g" class="pill genre">{{ g }}</span>
          </div>
        </div>

        <!-- ── Play Hero / Inline Player ── -->
        <div
          :class="['play-hero', { 'is-playing': isPlaying }]"
          @click="!isPlaying && !loading && film ? startPlay() : null"
        >
          <!-- Loading state -->
          <div v-if="loading" class="overlay-center">
            <div class="spin"></div>
          </div>

          <!-- Pre-play: backdrop + play button -->
          <template v-else-if="!isPlaying && film">
            <img v-if="film.backdrop" :src="film.backdrop" class="hero-backdrop" :alt="film.title" />
            <div class="hero-overlay"></div>
            <button class="hero-play-btn" aria-label="Watch now">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </button>
          </template>

          <!-- Playing: iframe -->
          <template v-else-if="isPlaying">
            <div v-if="srcError" class="overlay-center">
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

            <!-- Hover controls overlay -->
            <div class="player-overlay">
              <div class="po-top">
                <div class="src-btns">
                  <button
                    v-for="(src, i) in sources"
                    :key="src.url"
                    :class="['src-btn', { active: activeSrcIdx === i }]"
                    @click.stop="selectSource(src, i)"
                  >
                    <span class="src-dot"></span>
                    S{{ i + 1 }}
                  </button>
                </div>
                <button class="fullscreen-btn" @click.stop="openFullScreen" title="Open full screen">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="13" height="13">
                    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
                  </svg>
                  Full Screen
                </button>
              </div>
            </div>
          </template>
        </div>

        <!-- Tagline -->
        <p v-if="film?.tagline" class="tagline">"{{ film.tagline }}"</p>

        <!-- Overview -->
        <p v-if="film?.overview" class="overview">{{ film.overview }}</p>

        <!-- Tabs: Related / Cast -->
        <div v-if="film" class="tabs-wrap">
          <div class="tabs">
            <button :class="['tab', { active: activeTab === 'related' }]" @click="activeTab = 'related'">
              Related <span class="tc">{{ film.similar.length }}</span>
            </button>
            <button :class="['tab', { active: activeTab === 'cast' }]" @click="activeTab = 'cast'">
              Cast <span class="tc">{{ film.cast.length }}</span>
            </button>
          </div>

          <!-- Related films grid -->
          <div v-if="activeTab === 'related'" class="related-grid">
            <div v-if="!film.similar.length" class="empty-tab">No related films found.</div>
            <div
              v-for="m in film.similar" :key="m.id"
              class="rel-card"
              @click="navigateTo(`/film/${m.id}`)"
            >
              <div class="rel-img">
                <img v-if="m.image" :src="m.image" :alt="m.title" loading="lazy" />
                <div v-else class="rel-placeholder">🎬</div>
                <div class="rel-play"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></div>
                <span class="rel-rating">★ {{ m.rating.toFixed(1) }}</span>
              </div>
              <div class="rel-info">
                <h4 class="rel-title">{{ m.title }}</h4>
                <span class="rel-year">{{ m.year }}</span>
              </div>
            </div>
          </div>

          <!-- Cast grid -->
          <div v-if="activeTab === 'cast'" class="cast-grid">
            <div v-if="!film.cast.length" class="empty-tab">Cast info unavailable.</div>
            <div v-for="c in film.cast" :key="c.id" class="cast-card">
              <div class="cast-img">
                <img v-if="c.image" :src="c.image" :alt="c.name" loading="lazy" />
                <div v-else class="cast-ph">{{ c.name[0] }}</div>
              </div>
              <p class="cast-name">{{ c.name }}</p>
              <p class="cast-char">{{ c.character }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <aside class="sidebar">
        <template v-if="loading">
          <div class="sk-poster skeleton"></div>
          <div class="sk-title skeleton"></div>
          <div class="sk-line skeleton"></div>
        </template>
        <template v-else-if="film">
          <div class="poster-wrap">
            <img :src="film.image" :alt="film.title" class="poster" />
            <div class="poster-glow"></div>
          </div>
          <div class="badge-row">
            <span class="badge-pink">FILM</span>
            <span v-for="g in film.genreNames.slice(0,2)" :key="g" class="badge-outline">{{ g }}</span>
          </div>
          <h2 class="sb-title">{{ film.title }}</h2>
          <div class="stats">
            <div class="stat">
              <span class="stat-icon star">★</span>
              <div><span class="stat-val">{{ film.rating.toFixed(1) }}</span><span class="stat-lbl">Rating</span></div>
            </div>
            <div class="stat" v-if="film.year">
              <span class="stat-icon">📅</span>
              <div><span class="stat-val">{{ film.year }}</span><span class="stat-lbl">Year</span></div>
            </div>
            <div class="stat" v-if="film.runtime">
              <span class="stat-icon">⏱</span>
              <div><span class="stat-val">{{ Math.floor(film.runtime/60) }}h {{ film.runtime%60 }}m</span><span class="stat-lbl">Runtime</span></div>
            </div>
            <div class="stat" v-if="views > 0">
              <span class="stat-icon">👁</span>
              <div><span class="stat-val">{{ formatViews(views) }}</span><span class="stat-lbl">Views</span></div>
            </div>
          </div>

          <!-- Action buttons -->
          <div class="action-btns">
            <button :class="['lib-btn', { saved: inLibrary }]" :disabled="saving" @click="toggleLibrary">
              <svg viewBox="0 0 24 24" :fill="inLibrary ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2" width="16" height="16">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              {{ inLibrary ? 'In Library' : 'Add to Library' }}
            </button>
            <button :class="['heart-btn', { liked }]" :disabled="likeWorking" @click="handleLike" :title="liked ? 'Unlike' : 'Like'">
              <svg viewBox="0 0 24 24" :fill="liked ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2.2" width="16" height="16">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span v-if="likesCount > 0" class="likes-count">{{ likesCount }}</span>
            </button>
          </div>
          <Teleport to="body">
            <div v-if="authToast" class="auth-toast-detail">Sign in to like this film</div>
          </Teleport>
          <div class="detail-table">
            <div v-if="film.status" class="dt-row"><span class="dt-key">Status</span><span class="dt-val">{{ film.status }}</span></div>
            <div v-if="film.director" class="dt-row"><span class="dt-key">Director</span><span class="dt-val">{{ film.director }}</span></div>
            <div v-if="film.originalLang" class="dt-row"><span class="dt-key">Language</span><span class="dt-val">{{ film.originalLang.toUpperCase() }}</span></div>
            <div v-if="film.voteCount" class="dt-row"><span class="dt-key">Votes</span><span class="dt-val">{{ film.voteCount.toLocaleString() }}</span></div>
          </div>
          <a
            v-if="film.trailer"
            :href="`https://www.youtube.com/watch?v=${film.trailer}`"
            target="_blank" rel="noopener"
            class="trailer-btn"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M8 5v14l11-7z"/></svg>
            Watch Trailer
          </a>
        </template>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.page { min-height: 100vh; background: var(--bg); }

.breadcrumb { display:flex; align-items:center; gap:.4rem; padding:1.5rem 2rem .5rem; max-width:1400px; margin:0 auto; font-size:.78rem; color:var(--text-muted); position:relative; z-index:2; }
.bc-link { color:var(--text-muted); text-decoration:none; transition:color .2s; }
.bc-link:hover { color:var(--pink); }
.bc-sep { color:var(--border); }
.bc-current { color:var(--text); font-weight:600; }

/* Backdrop */
.backdrop-wrap { position:fixed; top:0; left:0; right:0; height:55vh; z-index:0; pointer-events:none; }
.backdrop-img { width:100%; height:100%; object-fit:cover; object-position:top; opacity:.18; }
.backdrop-fade { position:absolute; inset:0; background:linear-gradient(to bottom, transparent 30%, var(--bg) 100%); }

.layout { position:relative; z-index:1; display:grid; grid-template-columns:1fr 300px; gap:1.5rem; max-width:1400px; margin:0 auto; padding:0 2rem 4rem; align-items:start; }

/* Player header */
.player-header { margin-bottom:.75rem; }
.player-header-top { display:flex; align-items:flex-start; justify-content:space-between; gap:1rem; margin-bottom:.5rem; }
.film-title { font-family:'Bebas Neue',sans-serif; font-size:clamp(1.6rem,4vw,2.8rem); line-height:1; color:#fff; letter-spacing:.04em; }
.film-meta-row { display:flex; gap:.4rem; flex-wrap:wrap; }
.pill { padding:.22rem .6rem; border-radius:4px; font-size:.72rem; font-weight:700; background:var(--surface); border:1px solid var(--border); color:var(--text-muted); }
.pill.star { color:#ffd700; border-color:rgba(255,215,0,.3); background:rgba(255,215,0,.07); }
.pill.genre { color:var(--pink); border-color:rgba(255,45,120,.3); background:rgba(255,45,120,.07); }

/* ── Play Hero / Inline Player ── */
.play-hero {
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  background: #000;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid var(--border);
  box-shadow: 0 0 40px rgba(0,0,0,.6), 0 0 0 1px rgba(255,45,120,.06);
  cursor: pointer;
}
.play-hero.is-playing { cursor: default; }
.play-hero:not(.is-playing):hover .hero-play-btn {
  transform: scale(1.1);
  box-shadow: 0 0 50px rgba(255,255,255,.25);
}

.hero-backdrop { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:center top; display:block; }
.hero-overlay  { position:absolute; inset:0; background:rgba(0,0,0,.45); }
.hero-play-btn {
  position: absolute; inset: 0; margin: auto;
  width: 68px; height: 68px;
  border-radius: 50%; background: rgba(255,255,255,.9); border: none;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: transform .2s, box-shadow .2s;
  box-shadow: 0 0 30px rgba(0,0,0,.5);
}
.hero-play-btn svg { width:26px; height:26px; color:#111; margin-left:3px; }

/* Iframe fills the hero box */
.player-iframe {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  border: none; display: block; background: #000;
}

/* Hover controls overlay */
.player-overlay {
  position: absolute; inset: 0;
  z-index: 10;
  opacity: 0;
  transition: opacity .22s;
  pointer-events: none; /* never block clicks through to the iframe */
}
.play-hero.is-playing:hover .player-overlay {
  opacity: 1;
}

.po-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: .55rem .7rem;
  background: linear-gradient(to bottom, rgba(0,0,0,.82) 0%, transparent 100%);
  pointer-events: auto; /* only the buttons capture clicks */
}

.src-btns { display: flex; gap: .35rem; }
.src-btn {
  display: flex; align-items: center; gap: .3rem;
  padding: .22rem .52rem;
  background: rgba(255,255,255,.1); border: 1px solid rgba(255,255,255,.2);
  border-radius: 4px; color: rgba(255,255,255,.8);
  font-size: .65rem; font-weight: 800; letter-spacing: .06em;
  cursor: pointer; transition: all .15s;
}
.src-btn:hover { background: rgba(255,255,255,.2); color: #fff; }
.src-btn.active {
  background: rgba(180,140,20,.3); border-color: rgba(220,180,30,.5); color: #ddb830;
}
.src-dot {
  width: 5px; height: 5px; border-radius: 50%;
  background: currentColor; display: inline-block;
}

.fullscreen-btn {
  display: flex; align-items: center; gap: .35rem;
  padding: .25rem .6rem;
  background: rgba(255,255,255,.1); border: 1px solid rgba(255,255,255,.2);
  border-radius: 4px; color: rgba(255,255,255,.8);
  font-size: .65rem; font-weight: 800; letter-spacing: .06em;
  cursor: pointer; transition: all .15s;
}
.fullscreen-btn:hover { background: rgba(255,255,255,.2); color: #fff; }

/* Error / loading overlay */
.overlay-center {
  position: absolute; inset: 0;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: .75rem; color: rgba(255,255,255,.55); font-size: .85rem; z-index: 6;
  background: rgba(0,0,0,.5);
}
.err-icon { font-size: 1.8rem; }
.spin { width:36px; height:36px; border:3px solid rgba(255,255,255,.1); border-top-color:var(--pink); border-radius:50%; animation:spin .8s linear infinite; }
@keyframes spin { to { transform:rotate(360deg); } }

.tagline { font-style:italic; color:var(--text-muted); margin-top:1.25rem; font-size:.9rem; }
.overview { color:var(--text-muted); font-size:.9rem; line-height:1.8; margin:.75rem 0 1.5rem; }

/* Tabs */
.tabs-wrap { margin-top:.5rem; }
.tabs { display:flex; border-bottom:1px solid var(--border); margin-bottom:1rem; }
.tab { position:relative; padding:.6rem 1.25rem; background:none; border:none; color:var(--text-muted); font-size:.88rem; font-weight:700; cursor:pointer; transition:color .2s; }
.tab::after { content:''; position:absolute; bottom:-1px; left:0; right:0; height:2px; background:linear-gradient(90deg,var(--pink),#ff6fa8); transform:scaleX(0); transition:transform .25s; }
.tab:hover { color:var(--text); }
.tab.active { color:var(--pink); }
.tab.active::after { transform:scaleX(1); }
.tc { display:inline-block; background:var(--surface); border-radius:20px; padding:.05rem .45rem; font-size:.68rem; margin-left:.4rem; color:var(--text-muted); }
.empty-tab { color:var(--text-muted); font-size:.85rem; padding:1rem 0; }

/* Related */
.related-grid { display:grid; grid-template-columns:repeat(auto-fill, minmax(120px,1fr)); gap:.75rem; }
.rel-card { cursor:pointer; border-radius:8px; overflow:hidden; transition:transform .25s; }
.rel-card:hover { transform:translateY(-4px); }
.rel-card:hover .rel-play { opacity:1; }
.rel-card:hover .rel-img img { transform:scale(1.06); }
.rel-img { position:relative; width:100%; padding-top:150%; overflow:hidden; background:#0d1527; border-radius:8px; }
.rel-img img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; transition:transform .35s; }
.rel-placeholder { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; font-size:2rem; }
.rel-play { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; opacity:0; background:linear-gradient(to top,rgba(10,14,26,.85) 0%,transparent 60%); transition:opacity .25s; }
.rel-play svg { width:22px; height:22px; color:#fff; filter:drop-shadow(0 0 6px rgba(0,0,0,.8)); }
.rel-rating { position:absolute; bottom:6px; right:6px; background:rgba(0,0,0,.7); color:#ffd700; font-size:.62rem; font-weight:700; padding:.12rem .35rem; border-radius:4px; }
.rel-info { padding:.4rem .1rem 0; }
.rel-title { font-size:.78rem; font-weight:700; color:var(--text); line-height:1.3; display:-webkit-box; -webkit-line-clamp:2; line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; margin:0 0 .15rem; }
.rel-year { font-size:.68rem; color:var(--text-muted); }

/* Cast */
.cast-grid { display:grid; grid-template-columns:repeat(auto-fill, minmax(90px,1fr)); gap:.75rem; }
.cast-card { text-align:center; }
.cast-img { width:100%; aspect-ratio:1; border-radius:50%; overflow:hidden; background:var(--surface); border:2px solid var(--border); margin-bottom:.4rem; }
.cast-img img { width:100%; height:100%; object-fit:cover; }
.cast-ph { width:100%; height:100%; display:flex; align-items:center; justify-content:center; font-size:1.5rem; font-weight:700; color:var(--text-muted); background:var(--surface); }
.cast-name { font-size:.72rem; font-weight:700; color:var(--text); line-height:1.3; }
.cast-char { font-size:.65rem; color:var(--text-muted); margin-top:.1rem; }

/* Sidebar */
.sidebar { position:sticky; top:80px; }
.poster-wrap { position:relative; width:100%; aspect-ratio:2/3; border-radius:10px; overflow:hidden; border:1px solid var(--border); margin-bottom:1rem; }
.poster { width:100%; height:100%; object-fit:cover; }
.poster-glow { position:absolute; inset:0; background:linear-gradient(to top,rgba(10,14,26,.7) 0%,transparent 50%); }
.badge-row { display:flex; gap:.4rem; flex-wrap:wrap; margin-bottom:.75rem; }
.badge-pink { padding:.22rem .65rem; border-radius:4px; font-size:.68rem; font-weight:800; letter-spacing:.1em; text-transform:uppercase; background:var(--pink); color:#fff; box-shadow:0 0 10px rgba(255,45,120,.5); }
.badge-outline { padding:.22rem .65rem; border-radius:4px; font-size:.68rem; font-weight:800; letter-spacing:.1em; text-transform:uppercase; border:1px solid var(--cyan-dim); color:var(--cyan); background:rgba(0,240,255,.07); }
.sb-title { font-family:'Bebas Neue',sans-serif; font-size:clamp(1.3rem,3vw,1.8rem); line-height:1; letter-spacing:.04em; color:#fff; margin-bottom:1rem; }
.stats { display:flex; gap:1rem; margin-bottom:1rem; flex-wrap:wrap; }
.stat { display:flex; align-items:center; gap:.4rem; }
.stat-icon { color:var(--cyan); font-size:.8rem; }
.stat-icon.star { color:#ffd700; }
.stat div { display:flex; flex-direction:column; }
.stat-val { font-size:.88rem; font-weight:800; color:var(--text); line-height:1.2; }
.stat-lbl { font-size:.62rem; color:var(--text-muted); text-transform:uppercase; letter-spacing:.08em; }
.detail-table { border-top:1px solid var(--border); padding-top:1rem; margin-bottom:1rem; }
.dt-row { display:flex; justify-content:space-between; padding:.4rem 0; border-bottom:1px solid rgba(255,255,255,.04); }
.dt-key { font-size:.72rem; font-weight:600; color:var(--text-muted); text-transform:uppercase; letter-spacing:.07em; }
.dt-val { font-size:.78rem; font-weight:600; color:var(--text); text-align:right; }
.trailer-btn { display:inline-flex; align-items:center; gap:.4rem; padding:.5rem 1.1rem; background:rgba(255,45,120,.1); border:1px solid rgba(255,45,120,.4); border-radius:6px; color:var(--pink); font-size:.82rem; font-weight:700; text-decoration:none; transition:all .2s; width:100%; justify-content:center; }
.trailer-btn:hover { background:rgba(255,45,120,.2); }

.action-btns { display:flex; gap:.5rem; margin-bottom:1rem; }
.lib-btn {
  flex:1; display:inline-flex; align-items:center; justify-content:center; gap:.4rem;
  padding:.5rem .8rem; background:rgba(0,240,255,.08); border:1px solid rgba(0,240,255,.3);
  border-radius:6px; color:var(--cyan); font-size:.78rem; font-weight:700;
  cursor:pointer; transition:all .2s;
}
.lib-btn:hover { background:rgba(0,240,255,.18); }
.lib-btn.saved { background:rgba(110,255,110,.1); border-color:rgba(110,255,110,.4); color:#6eff6e; }
.lib-btn.saved:hover { background:rgba(110,255,110,.2); }
.lib-btn:disabled { opacity:.6; cursor:default; }
.heart-btn {
  width:40px; height:40px; border-radius:6px; flex-shrink:0;
  background:rgba(255,45,120,.08); border:1px solid rgba(255,45,120,.3);
  color:var(--pink); cursor:pointer;
  display:flex; align-items:center; justify-content:center;
  transition:all .2s;
}
.heart-btn:hover { background:rgba(255,45,120,.2); }
.heart-btn.liked { background:rgba(255,45,120,.2); border-color:rgba(255,45,120,.6); }
.heart-btn.liked:hover { background:rgba(255,45,120,.35); }
.heart-btn:disabled { opacity:.6; cursor:default; }
.likes-count { font-size:.72rem; font-weight:700; }

.auth-toast-detail {
  position:fixed; bottom:1.5rem; left:50%; transform:translateX(-50%);
  background:rgba(20,28,50,.95); border:1px solid rgba(255,45,120,.45);
  color:var(--pink); font-size:.82rem; font-weight:700;
  padding:.6rem 1.4rem; border-radius:8px; z-index:9999;
  pointer-events:none; white-space:nowrap;
  animation:toast-slide .2s ease;
}
@keyframes toast-slide { from{opacity:0;transform:translateX(-50%) translateY(8px)} to{opacity:1;transform:translateX(-50%) translateY(0)} }

/* Skeletons */
.sk-poster { width:100%; aspect-ratio:2/3; border-radius:10px; }
.sk-title  { height:24px; width:80%; margin:1rem 0 .5rem; border-radius:4px; }
.sk-line   { height:14px; width:100%; margin-bottom:.5rem; border-radius:4px; }
.skeleton  { background:linear-gradient(90deg,#1a2240 25%,#222d4d 50%,#1a2240 75%); background-size:200%; animation:shimmer 1.6s infinite; }
@keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }

@media (max-width:1024px) {
  .layout { grid-template-columns:1fr; padding:0 1rem 3rem; }
  .sidebar { position:static; display:grid; grid-template-columns:160px 1fr; gap:1rem; align-items:start; }
  .poster-wrap { margin-bottom:0; }
  .detail-table { grid-column:1/-1; }
}
@media (max-width:640px) {
  .breadcrumb { padding:1rem 1rem .5rem; }
  .sidebar { grid-template-columns:1fr; }
  .cast-grid { grid-template-columns:repeat(auto-fill, minmax(70px,1fr)); }
}
</style>
