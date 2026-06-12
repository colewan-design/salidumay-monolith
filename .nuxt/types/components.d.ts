
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T> = DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>> & T

type HydrationStrategies = {
  hydrateOnVisible?: IntersectionObserverInit | true
  hydrateOnIdle?: number | true
  hydrateOnInteraction?: keyof HTMLElementEventMap | Array<keyof HTMLElementEventMap> | true
  hydrateOnMediaQuery?: string
  hydrateAfter?: number
  hydrateWhen?: boolean
  hydrateNever?: true
}
type LazyComponent<T> = DefineComponent<HydrationStrategies, {}, {}, {}, {}, {}, {}, { hydrated: () => void }> & T

interface _GlobalComponents {
  AnimeCard: typeof import("../../components/AnimeCard.vue")['default']
  AppFooter: typeof import("../../components/AppFooter.vue")['default']
  AppNavbar: typeof import("../../components/AppNavbar.vue")['default']
  AppTopbar: typeof import("../../components/AppTopbar.vue")['default']
  CommentSection: typeof import("../../components/CommentSection.vue")['default']
  CommunitySection: typeof import("../../components/CommunitySection.vue")['default']
  ContinueWatching: typeof import("../../components/ContinueWatching.vue")['default']
  FeaturedFilms: typeof import("../../components/FeaturedFilms.vue")['default']
  FilmCard: typeof import("../../components/FilmCard.vue")['default']
  GenreExplorer: typeof import("../../components/GenreExplorer.vue")['default']
  GenresGrid: typeof import("../../components/GenresGrid.vue")['default']
  HeroSection: typeof import("../../components/HeroSection.vue")['default']
  LandscapeRow: typeof import("../../components/LandscapeRow.vue")['default']
  QuickFilterChips: typeof import("../../components/QuickFilterChips.vue")['default']
  SeasonalAnime: typeof import("../../components/SeasonalAnime.vue")['default']
  TopAnime: typeof import("../../components/TopAnime.vue")['default']
  TrendingNow: typeof import("../../components/TrendingNow.vue")['default']
  NuxtWelcome: typeof import("../../node_modules/nuxt/dist/app/components/welcome.vue")['default']
  NuxtLayout: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
  NuxtErrorBoundary: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
  ClientOnly: typeof import("../../node_modules/nuxt/dist/app/components/client-only")['default']
  DevOnly: typeof import("../../node_modules/nuxt/dist/app/components/dev-only")['default']
  ServerPlaceholder: typeof import("../../node_modules/nuxt/dist/app/components/server-placeholder")['default']
  NuxtLink: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-link")['default']
  NuxtLoadingIndicator: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
  NuxtTime: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
  NuxtRouteAnnouncer: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
  NuxtImg: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
  NuxtPicture: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
  NuxtPage: typeof import("../../node_modules/nuxt/dist/pages/runtime/page")['default']
  NoScript: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['NoScript']
  Link: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Link']
  Base: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Base']
  Title: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Title']
  Meta: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Meta']
  Style: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Style']
  Head: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Head']
  Html: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Html']
  Body: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Body']
  NuxtIsland: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-island")['default']
  LazyAnimeCard: LazyComponent<typeof import("../../components/AnimeCard.vue")['default']>
  LazyAppFooter: LazyComponent<typeof import("../../components/AppFooter.vue")['default']>
  LazyAppNavbar: LazyComponent<typeof import("../../components/AppNavbar.vue")['default']>
  LazyAppTopbar: LazyComponent<typeof import("../../components/AppTopbar.vue")['default']>
  LazyCommentSection: LazyComponent<typeof import("../../components/CommentSection.vue")['default']>
  LazyCommunitySection: LazyComponent<typeof import("../../components/CommunitySection.vue")['default']>
  LazyContinueWatching: LazyComponent<typeof import("../../components/ContinueWatching.vue")['default']>
  LazyFeaturedFilms: LazyComponent<typeof import("../../components/FeaturedFilms.vue")['default']>
  LazyFilmCard: LazyComponent<typeof import("../../components/FilmCard.vue")['default']>
  LazyGenreExplorer: LazyComponent<typeof import("../../components/GenreExplorer.vue")['default']>
  LazyGenresGrid: LazyComponent<typeof import("../../components/GenresGrid.vue")['default']>
  LazyHeroSection: LazyComponent<typeof import("../../components/HeroSection.vue")['default']>
  LazyLandscapeRow: LazyComponent<typeof import("../../components/LandscapeRow.vue")['default']>
  LazyQuickFilterChips: LazyComponent<typeof import("../../components/QuickFilterChips.vue")['default']>
  LazySeasonalAnime: LazyComponent<typeof import("../../components/SeasonalAnime.vue")['default']>
  LazyTopAnime: LazyComponent<typeof import("../../components/TopAnime.vue")['default']>
  LazyTrendingNow: LazyComponent<typeof import("../../components/TrendingNow.vue")['default']>
  LazyNuxtWelcome: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
  LazyNuxtLayout: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
  LazyNuxtErrorBoundary: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
  LazyClientOnly: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/client-only")['default']>
  LazyDevOnly: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/dev-only")['default']>
  LazyServerPlaceholder: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
  LazyNuxtLink: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
  LazyNuxtLoadingIndicator: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
  LazyNuxtTime: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
  LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
  LazyNuxtImg: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
  LazyNuxtPicture: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
  LazyNuxtPage: LazyComponent<typeof import("../../node_modules/nuxt/dist/pages/runtime/page")['default']>
  LazyNoScript: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
  LazyLink: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Link']>
  LazyBase: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Base']>
  LazyTitle: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Title']>
  LazyMeta: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Meta']>
  LazyStyle: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Style']>
  LazyHead: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Head']>
  LazyHtml: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Html']>
  LazyBody: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Body']>
  LazyNuxtIsland: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
}

declare module 'vue' {
  export interface GlobalComponents extends _GlobalComponents { }
}

export {}
