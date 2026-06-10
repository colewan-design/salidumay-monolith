<script setup>
import { ref, computed, onMounted } from 'vue'
import HeroSection      from '~/components/HeroSection.vue'
import ContinueWatching from '~/components/ContinueWatching.vue'
import QuickFilterChips from '~/components/QuickFilterChips.vue'
import TrendingNow      from '~/components/TrendingNow.vue'
import SeasonalAnime    from '~/components/SeasonalAnime.vue'
import LandscapeRow     from '~/components/LandscapeRow.vue'
import GenresGrid       from '~/components/GenresGrid.vue'
import AppFooter        from '~/components/AppFooter.vue'

import { getTrending, getSeasonal } from '~/services/api.js'
import { getPopularFilms, getUpcomingFilms } from '~/services/tmdb.js'
import { getPopularSeries } from '~/services/tvSeries.js'
import { getHistory } from '~/services/userdata.js'

const featured  = ref([])
const trending  = ref([])
const seasonal  = ref([])
const popular   = ref([])
const upcoming  = ref([])
const tvSeries  = ref([])
const activeFilter = ref('all')

const loading = ref({ hero: true, trending: true, seasonal: true, popular: true, upcoming: true, tv: true })

// "Because You Watched" — filter trending by the genre of the last watched item
const lastWatched     = ref(null)
const becauseYouWatched = computed(() => {
  if (!lastWatched.value || !trending.value.length) return []
  return trending.value
    .filter(a => a.genre === lastWatched.value.genre && String(a.id) !== String(lastWatched.value.id))
    .slice(0, 12)
})

// Section visibility driven by filter chip
const showAnime  = computed(() => ['all', 'anime', 'subbed', 'dubbed', 'trending', 'new'].includes(activeFilter.value))
const showFilms  = computed(() => ['all', 'movies'].includes(activeFilter.value))
const showTV     = computed(() => ['all', 'movies'].includes(activeFilter.value))

async function fetchAll() {
  const [t, s] = await Promise.allSettled([getTrending(), getSeasonal()])

  if (t.status === 'fulfilled') {
    trending.value = t.value.data
    featured.value = t.value.data.filter(a => a.synopsis && a.image).slice(0, 6)
  }
  loading.value.hero = loading.value.trending = false

  if (s.status === 'fulfilled') seasonal.value = s.value.data
  loading.value.seasonal = false

  const history = getHistory()
  if (history.length) lastWatched.value = history[0]

  const [pop, up, tv] = await Promise.allSettled([
    getPopularFilms(1),
    getUpcomingFilms(1),
    getPopularSeries(1),
  ])
  if (pop.status === 'fulfilled') popular.value  = pop.value.data?.slice(0, 20) ?? []
  if (up.status  === 'fulfilled') upcoming.value = up.value.data?.slice(0, 20)  ?? []
  if (tv.status  === 'fulfilled') tvSeries.value = tv.value.data?.slice(0, 20)  ?? []
  loading.value.popular  = false
  loading.value.upcoming = false
  loading.value.tv       = false
}

function initScrollReveal() {
  const io = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target) }
    }),
    { threshold: 0.06 }
  )
  document.querySelectorAll('.section').forEach(el => io.observe(el))
}

useSeoMeta({
  title: 'Salidumay — Anime & Film Streaming',
  description: 'Discover trending anime, seasonal picks, top-rated films and more on Salidumay.',
})

onMounted(async () => {
  await fetchAll()
  initScrollReveal()
})
</script>

<template>
  <div class="page">
    <HeroSection :items="featured" :loading="loading.hero" />

    <main class="main-content">

      <!-- Continue Watching (auto-hides when empty) -->
      <ContinueWatching />

      <!-- Quick filter chips -->
      <QuickFilterChips @filter="activeFilter = $event" />

      <!-- Trending Now -->
      <TrendingNow
        v-show="showAnime"
        :items="trending"
        :loading="loading.trending"
      />

      <!-- Top Movies This Week -->
      <LandscapeRow
        v-show="showFilms"
        :items="popular"
        :loading="loading.popular"
        title="Top Movies"
        accent="This Week"
        tag="Films"
        tagColor="pink"
        link="/films/popular"
      />

      <!-- Popular TV Series -->
      <LandscapeRow
        v-show="showTV"
        :items="tvSeries"
        :loading="loading.tv"
        title="Popular"
        accent="TV Series"
        tag="Series"
        tagColor="cyan"
        link="/series"
        type="series"
      />

      <!-- Seasonal Anime -->
      <SeasonalAnime
        v-show="showAnime"
        :items="seasonal"
        :loading="loading.seasonal"
      />

      <!-- Because You Watched -->
      <TrendingNow
        v-if="showAnime && becauseYouWatched.length"
        :items="becauseYouWatched"
        :loading="false"
        title="Because You Watched"
        :accent="lastWatched?.title ?? ''"
        tag="Recommended"
        tagColor="cyan"
        link="/trending"
      />

      <!-- Upcoming Releases -->
      <LandscapeRow
        v-show="showFilms"
        :items="upcoming"
        :loading="loading.upcoming"
        title="Upcoming"
        accent="Releases"
        tag="Coming Soon"
        tagColor="cyan"
        link="/films/coming-soon"
      />

      <!-- Genres Grid -->
      <GenresGrid v-show="showFilms || activeFilter === 'all'" />

    </main>

    <AppFooter />
  </div>
</template>

<style scoped>
.page { min-height: 100vh; }
.main-content {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
}
@media (max-width: 900px) {
  .main-content { padding: 0 1rem; }
}
</style>
