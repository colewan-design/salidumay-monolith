<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { addToLibrary, removeFromLibrary, isInLibrary, isLiked, toggleLike, getViewCount, formatViews } from '~/services/userdata.js'

const router = useRouter()
const props = defineProps({
  film: { type: Object, required: true },
})

const inLibrary    = ref(false)
const liked        = ref(false)
const views        = ref(0)
const saving       = ref(false)
const likeWorking  = ref(false)
const authToast    = ref(false)

function showAuthToast() {
  authToast.value = true
  setTimeout(() => { authToast.value = false }, 2500)
}

onMounted(() => {
  inLibrary.value = isInLibrary(props.film.id)
  liked.value     = isLiked(props.film.id)
  views.value     = getViewCount(props.film.id)
})

async function toggleLibrary(e) {
  e.stopPropagation()
  if (saving.value) return
  saving.value = true
  if (inLibrary.value) {
    await removeFromLibrary(props.film.id)
    inLibrary.value = false
  } else {
    await addToLibrary({
      id:       props.film.id,
      title:    props.film.title,
      image:    props.film.image,
      genre:    props.film.genreNames?.[0] || props.film.genre || '',
      episodes: null,
      rating:   props.film.rating,
      type:     'film',
    })
    inLibrary.value = true
  }
  saving.value = false
}

async function handleLike(e) {
  e.stopPropagation()
  if (likeWorking.value) return
  likeWorking.value = true
  const result = await toggleLike({
    id:    props.film.id,
    title: props.film.title,
    image: props.film.image,
    type:  'film',
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
    <div v-if="authToast" class="auth-toast">Sign in to like films</div>
  </Teleport>
  <article class="card" @click="router.push(`/film/${film.id}`)">
    <div class="card-img">
      <img :src="film.image" :alt="film.title" loading="lazy" />
      <span class="film-badge">FILM</span>
      <div class="card-overlay">
        <button class="play-btn" aria-label="Watch">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
        </button>
        <div class="action-row">
          <button
            :class="['action-btn', { saved: inLibrary }]"
            :title="inLibrary ? 'Remove from library' : 'Add to library'"
            @click.stop="toggleLibrary"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="15" height="15">
              <path v-if="!inLibrary" d="M12 5v14M5 12h14" stroke-linecap="round"/>
              <path v-else d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <button
            :class="['action-btn', 'heart-btn', { liked }]"
            title="Like"
            @click.stop="handleLike"
          >
            <svg viewBox="0 0 24 24" :fill="liked ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2.2" width="15" height="15">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
    <div class="card-body">
      <h3 class="card-title">{{ film.title }}</h3>
      <div class="meta">
        <span class="year">{{ film.year }}</span>
        <span class="rating">★ {{ film.rating?.toFixed(1) }}</span>
      </div>
      <div v-if="views > 0" class="views">
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
  border-radius: 8px; overflow: hidden;
  background: var(--surface); border: 1px solid var(--border);
  cursor: pointer;
  transition: transform .3s cubic-bezier(.175,.885,.32,1.275), box-shadow .3s;
}
.card:hover {
  transform: translateY(-6px) scale(1.02);
  box-shadow: 0 0 0 1px rgba(255,45,120,.35), 0 8px 40px rgba(255,45,120,.1);
}
.card:hover .card-overlay { opacity: 1; }
.card:hover .card-img img { transform: scale(1.08); }

.card-img { position: relative; padding-top: 150%; overflow: hidden; background: #0d1527; }
.card-img img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transition: transform .4s; }

.film-badge {
  position: absolute; top: 8px; left: 8px;
  background: rgba(255,45,120,.25); color: var(--pink);
  border: 1px solid rgba(255,45,120,.45);
  font-size: .58rem; font-weight: 800; padding: .18rem .4rem;
  border-radius: 4px; z-index: 2; letter-spacing: .08em;
}

.card-overlay {
  position: absolute; inset: 0;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: .6rem;
  opacity: 0; transition: opacity .25s;
  background: linear-gradient(to top, rgba(10,14,26,.9) 0%, transparent 70%);
  z-index: 3;
}

.play-btn {
  width: 44px; height: 44px; border-radius: 50%;
  background: var(--pink); border: none; color: #fff;
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  box-shadow: 0 0 20px rgba(255,45,120,.5);
  transition: transform .2s;
}
.play-btn:hover { transform: scale(1.12); }
.play-btn svg { width: 18px; height: 18px; }

.action-row { display: flex; gap: .4rem; }

.action-btn {
  width: 30px; height: 30px; border-radius: 50%;
  background: rgba(255,255,255,.1); border: 1px solid rgba(255,255,255,.25);
  color: rgba(255,255,255,.8); cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: all .2s;
}
.action-btn:hover { background: rgba(255,255,255,.22); color: #fff; }
.action-btn.saved {
  background: rgba(110,255,110,.15); border-color: rgba(110,255,110,.45); color: #6eff6e;
}
.action-btn.saved:hover { background: rgba(110,255,110,.28); }
.action-btn.heart-btn.liked {
  background: rgba(255,45,120,.2); border-color: rgba(255,45,120,.5); color: var(--pink);
}
.action-btn.heart-btn.liked:hover { background: rgba(255,45,120,.35); }

.card-body { padding: .7rem; }
.card-title {
  font-size: .85rem; font-weight: 700; color: var(--text);
  margin: 0 0 .3rem; line-height: 1.3;
  display: -webkit-box; -webkit-line-clamp: 2;
  -webkit-box-orient: vertical; overflow: hidden;
}
.meta { display: flex; justify-content: space-between; font-size: .72rem; color: var(--text-muted); }
.rating { color: #ffd700; font-weight: 700; }
.views {
  display: flex; align-items: center; gap: .25rem;
  font-size: .65rem; color: var(--text-muted); margin-top: .25rem;
}</style>

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
