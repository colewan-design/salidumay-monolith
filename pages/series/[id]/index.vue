<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { getSeriesDetail, TV_EMBED_SOURCES } from '~/services/tvSeries.js'

const route  = useRoute()
const router = useRouter()

const series       = ref(null)
const loading      = ref(true)
const activeSeason = ref(null)
const activeEp     = ref(null)

const sources      = ref([])
const activeSrc    = ref('')
const activeSrcIdx = ref(0)
const isPlaying    = ref(false)
const srcError     = ref(false)
const activeTab    = ref('episodes')

useSeoMeta({
  title: () => series.value ? `${series.value.title} — Salidumay` : 'TV Series — Salidumay',
  description: () => series.value?.overview || 'Watch this series on Salidumay.',
})

const visibleSeasons = computed(() =>
  (series.value?.seasons || []).filter(s => s.season_number > 0)
)

const currentEpisodes = computed(() =>
  activeSeason.value?.episodes || []
)

function selectSeason(season) {
  activeSeason.value = season
  activeEp.value     = null
  isPlaying.value    = false
  sources.value      = []
  activeSrc.value    = ''
}

function playEpisode(ep) {
  activeEp.value     = ep
  srcError.value     = false
  sources.value      = TV_EMBED_SOURCES(series.value.id, activeSeason.value.season_number, ep.episode_number)
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

function stopPlayer() {
  isPlaying.value = false
  activeEp.value  = null
  sources.value   = []
  activeSrc.value = ''
}

async function fetchSeries(id) {
  loading.value    = true
  series.value     = null
  activeSeason.value = null
  activeEp.value   = null
  isPlaying.value  = false

  const data = await getSeriesDetail(id).catch(() => null)
  if (data) {
    series.value = data
    const first = (data.seasons || []).find(s => s.season_number > 0) || data.seasons?.[0] || null
    activeSeason.value = first
  }
  loading.value = false
}

watch(() => route.params.id, id => fetchSeries(id))
onMounted(() => fetchSeries(route.params.id))
</script>

<template>
  <div class="page">

    <!-- Breadcrumb -->
    <div class="breadcrumb">
      <NuxtLink to="/" class="bc-link">Home</NuxtLink>
      <span class="bc-sep">›</span>
      <NuxtLink to="/series" class="bc-link">TV Series</NuxtLink>
      <span class="bc-sep">›</span>
      <span class="bc-current">{{ series?.title || '…' }}</span>
    </div>

    <!-- Backdrop -->
    <div v-if="series?.backdrop" class="backdrop-wrap">
      <img :src="series.backdrop" class="backdrop-img" :alt="series.title" />
      <div class="backdrop-fade"></div>
    </div>

    <div class="layout">
      <!-- Main column -->
      <div class="main-col">

        <!-- Title + meta -->
        <div class="player-header" v-if="series">
          <h1 class="series-title">{{ series.title }}</h1>
          <div class="meta-row">
            <span class="pill">{{ series.year }}</span>
            <span class="pill star">★ {{ typeof series.rating === 'number' ? series.rating.toFixed(1) : series.rating }}</span>
            <span v-if="series.number_of_seasons" class="pill">{{ series.number_of_seasons }} Season{{ series.number_of_seasons !== 1 ? 's' : '' }}</span>
            <span v-if="series.number_of_episodes" class="pill">{{ series.number_of_episodes }} Episodes</span>
            <span v-for="g in (series.genreNames || []).slice(0,3)" :key="g" class="pill genre">{{ g }}</span>
          </div>
        </div>

        <!-- Player -->
        <div class="player-box" :class="{ 'is-playing': isPlaying }">
          <div v-if="loading" class="overlay-center">
            <div class="spin"></div>
          </div>

          <template v-else-if="!isPlaying">
            <img v-if="series?.backdrop" :src="series.backdrop" class="hero-backdrop" :alt="series?.title" />
            <div class="hero-overlay"></div>
            <div class="pre-play-msg">
              <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32" style="color:var(--cyan)"><path d="M8 5v14l11-7z"/></svg>
              <p>Select an episode below to start watching</p>
            </div>
          </template>

          <template v-else>
            <div v-if="srcError" class="overlay-center">
              <p class="err-icon">⚠</p>
              <p>All sources unavailable.</p>
              <button class="back-btn" @click="stopPlayer">Back to episodes</button>
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

            <div class="player-overlay">
              <div class="po-top">
                <div class="po-left">
                  <button class="back-ep-btn" @click.stop="stopPlayer">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="12" height="12"><path d="M19 12H5M12 5l-7 7 7 7" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    Episodes
                  </button>
                  <span v-if="activeEp" class="now-playing">
                    S{{ activeSeason.season_number }}E{{ activeEp.episode_number }} — {{ activeEp.name }}
                  </span>
                </div>
                <div class="src-btns">
                  <button
                    v-for="(src, i) in sources"
                    :key="src.url"
                    :class="['src-btn', { active: activeSrcIdx === i }]"
                    @click.stop="selectSource(src, i)"
                  >
                    <span class="src-dot"></span>S{{ i + 1 }}
                  </button>
                </div>
              </div>
            </div>
          </template>
        </div>

        <!-- Tagline / Overview -->
        <p v-if="series?.tagline" class="tagline">"{{ series.tagline }}"</p>
        <p v-if="series?.overview" class="overview">{{ series.overview }}</p>

        <!-- Seasons + Episodes / Cast tabs -->
        <div v-if="series" class="tabs-wrap">
          <div class="tabs">
            <button :class="['tab', { active: activeTab === 'episodes' }]" @click="activeTab = 'episodes'">
              Episodes
            </button>
            <button :class="['tab', { active: activeTab === 'cast' }]" @click="activeTab = 'cast'">
              Cast <span class="tc">{{ series.cast.length }}</span>
            </button>
            <button v-if="series.similar?.length" :class="['tab', { active: activeTab === 'similar' }]" @click="activeTab = 'similar'">
              Similar <span class="tc">{{ series.similar.length }}</span>
            </button>
          </div>

          <!-- Episodes tab -->
          <div v-if="activeTab === 'episodes'">
            <!-- Season selector -->
            <div v-if="visibleSeasons.length > 1" class="season-tabs">
              <button
                v-for="s in visibleSeasons" :key="s.id ?? s.season_number"
                :class="['season-btn', { active: activeSeason?.season_number === s.season_number }]"
                @click="selectSeason(s)"
              >Season {{ s.season_number }}</button>
            </div>

            <div v-if="!currentEpisodes.length" class="empty-tab">
              <p v-if="!activeSeason">No season selected.</p>
              <p v-else>Episode details not available. Episodes will load after the series is scraped.</p>
            </div>

            <div v-else class="ep-grid">
              <div
                v-for="ep in currentEpisodes" :key="ep.id ?? ep.episode_number"
                :class="['ep-card', { active: activeEp?.episode_number === ep.episode_number && isPlaying }]"
                @click="playEpisode(ep)"
              >
                <div class="ep-still">
                  <img v-if="ep.still_url" :src="ep.still_url" :alt="ep.name" loading="lazy" />
                  <div v-else class="ep-still-ph">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" style="color:rgba(255,255,255,.2)"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                  <div class="ep-play-overlay">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                  <span class="ep-num">E{{ ep.episode_number }}</span>
                  <span v-if="ep.rating" class="ep-rating">★ {{ ep.rating.toFixed(1) }}</span>
                </div>
                <div class="ep-info">
                  <p class="ep-name">{{ ep.name }}</p>
                  <p v-if="ep.runtime" class="ep-meta">{{ ep.runtime }}m</p>
                  <p v-if="ep.overview" class="ep-overview">{{ ep.overview }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Cast tab -->
          <div v-if="activeTab === 'cast'" class="cast-grid">
            <div v-if="!series.cast.length" class="empty-tab">Cast info unavailable.</div>
            <div v-for="c in series.cast" :key="c.id" class="cast-card">
              <div class="cast-img">
                <img v-if="c.image" :src="c.image" :alt="c.name" loading="lazy" />
                <div v-else class="cast-ph">{{ c.name[0] }}</div>
              </div>
              <p class="cast-name">{{ c.name }}</p>
              <p class="cast-char">{{ c.character }}</p>
            </div>
          </div>

          <!-- Similar tab -->
          <div v-if="activeTab === 'similar'" class="related-grid">
            <div
              v-for="s in series.similar" :key="s.id"
              class="rel-card"
              @click="navigateTo(`/series/${s.id}`)"
            >
              <div class="rel-img">
                <img v-if="s.image" :src="s.image" :alt="s.title" loading="lazy" />
                <div v-else class="rel-placeholder">📺</div>
                <div class="rel-play"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></div>
                <span class="rel-rating">★ {{ typeof s.rating === 'number' ? s.rating.toFixed(1) : s.rating }}</span>
              </div>
              <div class="rel-info">
                <h4 class="rel-title">{{ s.title }}</h4>
                <span class="rel-year">{{ s.year }}</span>
              </div>
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
        <template v-else-if="series">
          <div class="poster-wrap">
            <img :src="series.image" :alt="series.title" class="poster" />
            <div class="poster-glow"></div>
          </div>
          <div class="badge-row">
            <span class="badge-cyan">SERIES</span>
            <span v-for="g in (series.genreNames || []).slice(0,2)" :key="g" class="badge-outline">{{ g }}</span>
          </div>
          <h2 class="sb-title">{{ series.title }}</h2>
          <div class="stats">
            <div class="stat">
              <span class="stat-icon star">★</span>
              <div><span class="stat-val">{{ typeof series.rating === 'number' ? series.rating.toFixed(1) : series.rating }}</span><span class="stat-lbl">Rating</span></div>
            </div>
            <div class="stat" v-if="series.year">
              <span class="stat-icon">📅</span>
              <div><span class="stat-val">{{ series.year }}</span><span class="stat-lbl">Year</span></div>
            </div>
            <div class="stat" v-if="series.number_of_seasons">
              <span class="stat-icon">📺</span>
              <div><span class="stat-val">{{ series.number_of_seasons }}</span><span class="stat-lbl">Seasons</span></div>
            </div>
          </div>
          <div class="detail-table">
            <div v-if="series.status" class="dt-row"><span class="dt-key">Status</span><span class="dt-val">{{ series.status }}</span></div>
            <div v-if="series.originalLang" class="dt-row"><span class="dt-key">Language</span><span class="dt-val">{{ series.originalLang.toUpperCase() }}</span></div>
            <div v-if="series.number_of_episodes" class="dt-row"><span class="dt-key">Episodes</span><span class="dt-val">{{ series.number_of_episodes }}</span></div>
            <div v-if="series.voteCount" class="dt-row"><span class="dt-key">Votes</span><span class="dt-val">{{ series.voteCount?.toLocaleString() }}</span></div>
            <div v-if="series.created_by?.length" class="dt-row">
              <span class="dt-key">Created by</span>
              <span class="dt-val">{{ series.created_by.map(c => c.name).join(', ') }}</span>
            </div>
          </div>
          <a
            v-if="series.trailer"
            :href="`https://www.youtube.com/watch?v=${series.trailer}`"
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
.bc-link:hover { color:var(--cyan); }
.bc-sep { color:var(--border); }
.bc-current { color:var(--text); font-weight:600; }

.backdrop-wrap { position:fixed; top:0; left:0; right:0; height:55vh; z-index:0; pointer-events:none; }
.backdrop-img { width:100%; height:100%; object-fit:cover; object-position:top; opacity:.15; }
.backdrop-fade { position:absolute; inset:0; background:linear-gradient(to bottom, transparent 30%, var(--bg) 100%); }

.layout { position:relative; z-index:1; display:grid; grid-template-columns:1fr 300px; gap:1.5rem; max-width:1400px; margin:0 auto; padding:0 2rem 4rem; align-items:start; }

.player-header { margin-bottom:.75rem; }
.series-title { font-family:'Bebas Neue',sans-serif; font-size:clamp(1.6rem,4vw,2.8rem); line-height:1; color:#fff; letter-spacing:.04em; }
.meta-row { display:flex; gap:.4rem; flex-wrap:wrap; margin-top:.5rem; }
.pill { padding:.22rem .6rem; border-radius:4px; font-size:.72rem; font-weight:700; background:var(--surface); border:1px solid var(--border); color:var(--text-muted); }
.pill.star { color:#ffd700; border-color:rgba(255,215,0,.3); background:rgba(255,215,0,.07); }
.pill.genre { color:var(--cyan); border-color:rgba(0,240,255,.3); background:rgba(0,240,255,.07); }

/* Player */
.player-box {
  position: relative; width: 100%; aspect-ratio: 16/9;
  background: #000; border-radius: 10px; overflow: hidden;
  border: 1px solid var(--border);
  box-shadow: 0 0 40px rgba(0,0,0,.6), 0 0 0 1px rgba(0,240,255,.06);
}
.hero-backdrop { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; display:block; }
.hero-overlay  { position:absolute; inset:0; background:rgba(0,0,0,.55); }
.pre-play-msg {
  position:absolute; inset:0; display:flex; flex-direction:column;
  align-items:center; justify-content:center; gap:.75rem;
  color:rgba(255,255,255,.55); font-size:.9rem;
}
.player-iframe { position:absolute; inset:0; width:100%; height:100%; border:none; display:block; background:#000; }

.overlay-center {
  position:absolute; inset:0; display:flex; flex-direction:column;
  align-items:center; justify-content:center; gap:.75rem;
  color:rgba(255,255,255,.55); font-size:.85rem; z-index:6; background:rgba(0,0,0,.5);
}
.err-icon { font-size:1.8rem; }
.back-btn { padding:.4rem 1rem; background:rgba(255,255,255,.1); border:1px solid rgba(255,255,255,.2); border-radius:6px; color:#fff; font-size:.78rem; cursor:pointer; }

/* Player controls overlay */
.player-overlay { position:absolute; inset:0; z-index:10; opacity:0; transition:opacity .22s; pointer-events:none; }
.player-box.is-playing:hover .player-overlay { opacity:1; }
.po-top { display:flex; align-items:center; justify-content:space-between; padding:.55rem .7rem; background:linear-gradient(to bottom, rgba(0,0,0,.85) 0%, transparent 100%); pointer-events:auto; gap:.75rem; }
.po-left { display:flex; align-items:center; gap:.6rem; min-width:0; }
.back-ep-btn { display:flex; align-items:center; gap:.3rem; padding:.22rem .52rem; background:rgba(255,255,255,.1); border:1px solid rgba(255,255,255,.2); border-radius:4px; color:rgba(255,255,255,.8); font-size:.65rem; font-weight:800; letter-spacing:.06em; cursor:pointer; white-space:nowrap; flex-shrink:0; }
.now-playing { font-size:.65rem; color:rgba(255,255,255,.65); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.src-btns { display:flex; gap:.35rem; flex-shrink:0; }
.src-btn { display:flex; align-items:center; gap:.3rem; padding:.22rem .52rem; background:rgba(255,255,255,.1); border:1px solid rgba(255,255,255,.2); border-radius:4px; color:rgba(255,255,255,.8); font-size:.65rem; font-weight:800; letter-spacing:.06em; cursor:pointer; transition:all .15s; }
.src-btn:hover { background:rgba(255,255,255,.2); color:#fff; }
.src-btn.active { background:rgba(0,200,220,.3); border-color:rgba(0,240,255,.5); color:var(--cyan); }
.src-dot { width:5px; height:5px; border-radius:50%; background:currentColor; display:inline-block; }

.tagline { font-style:italic; color:var(--text-muted); margin-top:1.25rem; font-size:.9rem; }
.overview { color:var(--text-muted); font-size:.9rem; line-height:1.8; margin:.75rem 0 1.5rem; }

/* Tabs */
.tabs-wrap { margin-top:.5rem; }
.tabs { display:flex; border-bottom:1px solid var(--border); margin-bottom:1rem; }
.tab { position:relative; padding:.6rem 1.25rem; background:none; border:none; color:var(--text-muted); font-size:.88rem; font-weight:700; cursor:pointer; transition:color .2s; }
.tab::after { content:''; position:absolute; bottom:-1px; left:0; right:0; height:2px; background:linear-gradient(90deg,var(--cyan),#00b8dc); transform:scaleX(0); transition:transform .25s; }
.tab:hover { color:var(--text); }
.tab.active { color:var(--cyan); }
.tab.active::after { transform:scaleX(1); }
.tc { display:inline-block; background:var(--surface); border-radius:20px; padding:.05rem .45rem; font-size:.68rem; margin-left:.4rem; color:var(--text-muted); }
.empty-tab { color:var(--text-muted); font-size:.85rem; padding:1rem 0; }

/* Season selector */
.season-tabs { display:flex; gap:.4rem; flex-wrap:wrap; margin-bottom:1rem; }
.season-btn { padding:.32rem .8rem; border-radius:999px; background:var(--surface); border:1px solid var(--border); color:var(--text-muted); font-size:.78rem; font-weight:700; cursor:pointer; transition:all .2s; }
.season-btn:hover { border-color:var(--cyan-dim); color:var(--cyan); }
.season-btn.active { background:rgba(0,240,255,.12); border-color:var(--cyan); color:var(--cyan); }

/* Episode grid */
.ep-grid { display:flex; flex-direction:column; gap:.6rem; }
.ep-card {
  display:grid; grid-template-columns:160px 1fr; gap:.75rem;
  background:var(--surface); border:1px solid var(--border);
  border-radius:8px; overflow:hidden; cursor:pointer;
  transition:border-color .2s, box-shadow .2s;
}
.ep-card:hover { border-color:var(--cyan-dim); box-shadow:0 0 16px rgba(0,240,255,.08); }
.ep-card.active { border-color:var(--cyan); box-shadow:0 0 20px rgba(0,240,255,.15); }
.ep-still { position:relative; width:160px; aspect-ratio:16/9; background:#0d1527; flex-shrink:0; }
.ep-still img { width:100%; height:100%; object-fit:cover; display:block; }
.ep-still-ph { width:100%; height:100%; display:flex; align-items:center; justify-content:center; }
.ep-play-overlay { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; background:rgba(0,0,0,.5); opacity:0; transition:opacity .2s; color:#fff; }
.ep-card:hover .ep-play-overlay { opacity:1; }
.ep-num { position:absolute; top:5px; left:5px; background:rgba(0,0,0,.75); color:rgba(255,255,255,.8); font-size:.6rem; font-weight:800; padding:.12rem .35rem; border-radius:3px; }
.ep-rating { position:absolute; bottom:5px; right:5px; background:rgba(0,0,0,.75); color:#ffd700; font-size:.6rem; font-weight:800; padding:.12rem .35rem; border-radius:3px; }
.ep-info { padding:.6rem .75rem .6rem 0; display:flex; flex-direction:column; gap:.25rem; min-width:0; }
.ep-name { font-size:.88rem; font-weight:700; color:var(--text); line-height:1.3; }
.ep-meta { font-size:.72rem; color:var(--text-muted); }
.ep-overview { font-size:.78rem; color:var(--text-muted); line-height:1.5; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }

/* Cast */
.cast-grid { display:grid; grid-template-columns:repeat(auto-fill, minmax(90px,1fr)); gap:.75rem; }
.cast-card { text-align:center; }
.cast-img { width:100%; aspect-ratio:1; border-radius:50%; overflow:hidden; background:var(--surface); border:2px solid var(--border); margin-bottom:.4rem; }
.cast-img img { width:100%; height:100%; object-fit:cover; }
.cast-ph { width:100%; height:100%; display:flex; align-items:center; justify-content:center; font-size:1.5rem; font-weight:700; color:var(--text-muted); }
.cast-name { font-size:.72rem; font-weight:700; color:var(--text); line-height:1.3; }
.cast-char { font-size:.65rem; color:var(--text-muted); margin-top:.1rem; }

/* Similar */
.related-grid { display:grid; grid-template-columns:repeat(auto-fill, minmax(120px,1fr)); gap:.75rem; }
.rel-card { cursor:pointer; border-radius:8px; overflow:hidden; transition:transform .25s; }
.rel-card:hover { transform:translateY(-4px); }
.rel-card:hover .rel-play { opacity:1; }
.rel-card:hover .rel-img img { transform:scale(1.06); }
.rel-img { position:relative; width:100%; padding-top:150%; overflow:hidden; background:#0d1527; border-radius:8px; }
.rel-img img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; transition:transform .35s; }
.rel-placeholder { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; font-size:2rem; }
.rel-play { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; opacity:0; background:linear-gradient(to top,rgba(10,14,26,.85) 0%,transparent 60%); transition:opacity .25s; }
.rel-play svg { width:22px; height:22px; color:#fff; }
.rel-rating { position:absolute; bottom:6px; right:6px; background:rgba(0,0,0,.7); color:#ffd700; font-size:.62rem; font-weight:700; padding:.12rem .35rem; border-radius:4px; }
.rel-info { padding:.4rem .1rem 0; }
.rel-title { font-size:.78rem; font-weight:700; color:var(--text); line-height:1.3; display:-webkit-box; -webkit-line-clamp:2; line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; margin:0 0 .15rem; }
.rel-year { font-size:.68rem; color:var(--text-muted); }

/* Sidebar */
.sidebar { position:sticky; top:80px; }
.poster-wrap { position:relative; width:100%; aspect-ratio:2/3; border-radius:10px; overflow:hidden; border:1px solid var(--border); margin-bottom:1rem; }
.poster { width:100%; height:100%; object-fit:cover; }
.poster-glow { position:absolute; inset:0; background:linear-gradient(to top,rgba(10,14,26,.7) 0%,transparent 50%); }
.badge-row { display:flex; gap:.4rem; flex-wrap:wrap; margin-bottom:.75rem; }
.badge-cyan { padding:.22rem .65rem; border-radius:4px; font-size:.68rem; font-weight:800; letter-spacing:.1em; text-transform:uppercase; background:rgba(0,240,255,.15); color:var(--cyan); border:1px solid rgba(0,240,255,.4); box-shadow:0 0 10px rgba(0,240,255,.3); }
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
.dt-row { display:flex; justify-content:space-between; padding:.4rem 0; border-bottom:1px solid rgba(255,255,255,.04); gap:.5rem; }
.dt-key { font-size:.72rem; font-weight:600; color:var(--text-muted); text-transform:uppercase; letter-spacing:.07em; white-space:nowrap; }
.dt-val { font-size:.78rem; font-weight:600; color:var(--text); text-align:right; }
.trailer-btn { display:inline-flex; align-items:center; gap:.4rem; padding:.5rem 1.1rem; background:rgba(0,240,255,.1); border:1px solid rgba(0,240,255,.4); border-radius:6px; color:var(--cyan); font-size:.82rem; font-weight:700; text-decoration:none; transition:all .2s; width:100%; justify-content:center; }
.trailer-btn:hover { background:rgba(0,240,255,.2); }

.spin { width:36px; height:36px; border:3px solid rgba(255,255,255,.1); border-top-color:var(--cyan); border-radius:50%; animation:spin .8s linear infinite; }
@keyframes spin { to { transform:rotate(360deg); } }

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
  .ep-card { grid-template-columns:120px 1fr; }
  .ep-still { width:120px; }
  .cast-grid { grid-template-columns:repeat(auto-fill, minmax(70px,1fr)); }
}
</style>
