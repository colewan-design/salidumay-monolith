<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { addToLibrary, removeFromLibrary, isInLibrary, isLiked, toggleLike, getViewCount, formatViews } from '~/services/userdata.js'

const router = useRouter()
const props = defineProps({
  anime:   { type: Object,  required: true },
  variant: { type: String,  default: 'default' },
})

const inLibrary   = ref(false)
const liked       = ref(false)
const views       = ref(0)
const saving      = ref(false)
const likeWorking = ref(false)
const authToast   = ref(false)

function showAuthToast() {
  authToast.value = true
  setTimeout(() => { authToast.value = false }, 2500)
}

onMounted(() => {
  inLibrary.value = isInLibrary(props.anime.id)
  liked.value     = isLiked(props.anime.id)
  views.value     = getViewCount(props.anime.id)
})

function watchAnime() {
  router.push(`/watch/${props.anime.id}/ep/1`)
}

async function toggleLibrary(e) {
  e.stopPropagation()
  if (saving.value) return
  saving.value = true
  if (inLibrary.value) {
    await removeFromLibrary(props.anime.id)
    inLibrary.value = false
  } else {
    await addToLibrary(props.anime)
    inLibrary.value = true
  }
  saving.value = false
}

async function handleLike(e) {
  e.stopPropagation()
  if (likeWorking.value) return
  likeWorking.value = true
  const result = await toggleLike({
    id:    props.anime.id,
    title: props.anime.title,
    image: props.anime.image,
    type:  'anime',
  })
  likeWorking.value = false
  if (result.unauthenticated) {
    showAuthToast()
    return
  }
  liked.value = result.liked
}
</script>

<template>
  <Teleport to="body">
    <div v-if="authToast" class="auth-toast">Sign in to like anime</div>
  </Teleport>
  <article class="card" :class="variant">
    <div class="card-img-wrap">
      <img :src="anime.image" :alt="anime.title" loading="lazy" />
      <div class="card-glitch-overlay"></div>

      <!-- Badges -->
      <span v-if="anime.new"    class="img-badge badge-new">NEW</span>
      <span v-if="anime.status" class="img-badge" :class="anime.status === 'Airing' ? 'badge-airing' : 'badge-done'">
        {{ anime.status === 'Airing' ? '● AIRING' : '✓ DONE' }}
      </span>

      <div class="card-hover-info">
        <button class="play-btn" aria-label="Watch" @click.stop="watchAnime">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
        </button>
        <button
          :class="['add-btn', { saved: inLibrary }]"
          :aria-label="inLibrary ? 'Remove from library' : 'Add to library'"
          :title="inLibrary ? 'Remove from library' : 'Add to library'"
          @click.stop="toggleLibrary"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="16" height="16">
            <path v-if="!inLibrary" d="M12 5v14M5 12h14" stroke-linecap="round"/>
            <path v-else d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <button
          :class="['add-btn', 'heart-btn', { liked }]"
          title="Like"
          @click.stop="handleLike"
        >
          <svg viewBox="0 0 24 24" :fill="liked ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2.2" width="15" height="15">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>

    <div class="card-body">
      <span class="card-genre">{{ anime.genre }}</span>
      <h3 class="card-title">{{ anime.title }}</h3>
      <div class="card-meta">
        <span class="card-eps">{{ anime.episodes != null ? anime.episodes + ' ep' : (anime.status === 'Airing' ? 'Ongoing' : '? ep') }}</span>
        <span class="card-rating">★ {{ anime.rating }}</span>
      </div>
      <div v-if="views > 0" class="card-views">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="11" height="11">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
        {{ formatViews(views) }}
      </div>
    </div>
  </article>
</template>

<style scoped>
.card {
  border-radius: 8px;
  overflow: hidden;
  background: var(--surface);
  border: 1px solid var(--border);
  cursor: pointer;
  transition: transform 0.3s cubic-bezier(.175,.885,.32,1.275), box-shadow 0.3s;
  position: relative;
}
.card:hover {
  transform: translateY(-6px) scale(1.02);
  box-shadow: 0 0 0 1px var(--cyan-dim), 0 8px 40px rgba(0,240,255,0.18), 0 0 60px rgba(0,240,255,0.08);
}
.card:hover .card-glitch-overlay { opacity: 1; }
.card:hover .card-hover-info { opacity: 1; }

.card-img-wrap {
  position: relative;
  padding-top: 140%;
  overflow: hidden;
  background: #0d1527;
}
.card-img-wrap img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s;
}
.card:hover .card-img-wrap img { transform: scale(1.08); }

/* Glitch effect on hover */
.card-glitch-overlay {
  position: absolute;
  inset: 0;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;
  background: linear-gradient(135deg, rgba(0,240,255,0.06) 0%, transparent 60%, rgba(255,45,120,0.06) 100%);
  animation: glitch-flicker 0.15s step-end infinite;
}
@keyframes glitch-flicker {
  0%,100% { clip-path: inset(0 0 95% 0); transform: translateX(0); }
  20%      { clip-path: inset(40% 0 50% 0); transform: translateX(-2px); }
  40%      { clip-path: inset(70% 0 20% 0); transform: translateX(2px); }
  60%      { clip-path: inset(20% 0 70% 0); transform: translateX(-1px); }
  80%      { clip-path: inset(55% 0 35% 0); transform: translateX(1px); }
}

.img-badge {
  position: absolute;
  top: 8px; left: 8px;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.08em;
}
.badge-new    { background: var(--pink); color: #fff; box-shadow: 0 0 8px rgba(255,45,120,0.5); }
.badge-airing { background: rgba(0,240,255,0.15); color: var(--cyan); border: 1px solid var(--cyan-dim); }
.badge-done   { background: rgba(100,255,100,0.12); color: #6eff6e; border: 1px solid rgba(100,255,100,0.3); }

.card-hover-info {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  opacity: 0;
  transition: opacity 0.25s;
  background: linear-gradient(to top, rgba(10,14,26,0.85) 0%, transparent 100%);
}
.play-btn {
  width: 44px; height: 44px;
  border-radius: 50%;
  background: var(--pink);
  border: none;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 20px rgba(255,45,120,0.6);
  transition: transform 0.2s;
}
.play-btn:hover { transform: scale(1.15); }
.play-btn svg { width: 18px; height: 18px; }
.add-btn {
  width: 36px; height: 36px;
  border-radius: 50%;
  background: rgba(0,240,255,0.15);
  border: 1px solid var(--cyan-dim);
  color: var(--cyan);
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.2s;
}
.add-btn:hover { background: rgba(0,240,255,0.3); }
.add-btn.saved {
  background: rgba(110,255,110,0.15);
  border-color: rgba(110,255,110,0.4);
  color: #6eff6e;
}
.add-btn.saved:hover { background: rgba(110,255,110,0.28); }
.add-btn.heart-btn.liked {
  background: rgba(255,45,120,0.2);
  border-color: rgba(255,45,120,0.5);
  color: var(--pink);
}
.add-btn.heart-btn.liked:hover { background: rgba(255,45,120,0.35); }

.card-body { padding: 0.75rem; }
.card-genre {
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--pink);
}
.card-title {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--text);
  margin: 0.25rem 0 0.5rem;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.card-meta { display: flex; justify-content: space-between; align-items: center; }
.card-eps   { font-size: 0.75rem; color: var(--text-muted); }
.card-rating { font-size: 0.78rem; color: #ffd700; font-weight: 700; }
.card-views { display: flex; align-items: center; gap: .25rem; font-size: .65rem; color: var(--text-muted); margin-top: .25rem; }</style>

<style>
.auth-toast {
  position: fixed; bottom: 1.5rem; left: 50%; transform: translateX(-50%);
  background: rgba(20,28,50,.95); border: 1px solid rgba(255,45,120,.45);
  color: var(--pink); font-size: .82rem; font-weight: 700;
  padding: .6rem 1.4rem; border-radius: 8px; z-index: 9999;
  pointer-events: none; white-space: nowrap;
  animation: toast-in .2s ease;
}
@keyframes toast-in { from { opacity:0; transform: translateX(-50%) translateY(8px); } to { opacity:1; transform: translateX(-50%) translateY(0); } }
</style>
