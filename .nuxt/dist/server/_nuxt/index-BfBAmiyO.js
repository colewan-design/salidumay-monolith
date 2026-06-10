import { ref, watch, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderComponent } from "vue/server-renderer";
import { A as AppFooter } from "./AppFooter-DakCUiQ2.js";
import { s as searchFilms, a as getFilmsByGenre, b as getNowPlayingFilms, d as getTopRatedFilms, e as getTrendingFilms, c as getPopularFilms } from "./tmdb-D41Aoa6c.js";
import { _ as _export_sfc, c as useRouter } from "../server.mjs";
import { a as useSeoMeta } from "./v3-BGyVWe_n.js";
import "vue-router";
import "axios";
import "C:/salidumay-nuxt/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "C:/salidumay-nuxt/node_modules/hookable/dist/index.mjs";
import "C:/salidumay-nuxt/node_modules/unctx/dist/index.mjs";
import "C:/salidumay-nuxt/node_modules/h3/dist/index.mjs";
import "C:/salidumay-nuxt/node_modules/defu/dist/defu.mjs";
import "C:/salidumay-nuxt/node_modules/ufo/dist/index.mjs";
import "C:/salidumay-nuxt/node_modules/@unhead/vue/dist/index.mjs";
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const items = ref([]);
    const loading = ref(true);
    const loadingMore = ref(false);
    const page = ref(1);
    const totalPages = ref(1);
    const activeTab = ref("popular");
    const genres = ref([]);
    const activeGenre = ref(null);
    const searchQuery = ref("");
    const searching = ref(false);
    let searchTimer = null;
    const tabs = [
      { key: "popular", label: "Popular" },
      { key: "trending", label: "Trending" },
      { key: "top_rated", label: "Top Rated" },
      { key: "now_playing", label: "Now Playing" }
    ];
    const fetchers = {
      popular: getPopularFilms,
      trending: getTrendingFilms,
      top_rated: getTopRatedFilms,
      now_playing: getNowPlayingFilms
    };
    async function load(p = 1) {
      if (p === 1) loading.value = true;
      else loadingMore.value = true;
      let res;
      if (searchQuery.value.trim().length >= 2) {
        res = await searchFilms(searchQuery.value.trim(), p).catch(() => null);
      } else if (activeGenre.value) {
        res = await getFilmsByGenre(activeGenre.value, p).catch(() => null);
      } else {
        res = await fetchers[activeTab.value](p).catch(() => null);
      }
      if (res) {
        items.value = p === 1 ? res.data : [...items.value, ...res.data];
        totalPages.value = res.totalPages ?? 1;
        page.value = p;
      }
      loading.value = false;
      loadingMore.value = false;
    }
    useSeoMeta({
      title: "Films & Movies — Salidumay",
      description: "Discover popular, trending and top-rated films on Salidumay."
    });
    watch(searchQuery, (q) => {
      clearTimeout(searchTimer);
      if (q.trim().length >= 2) {
        searching.value = true;
        searchTimer = setTimeout(() => {
          load(1);
          searching.value = false;
        }, 450);
      } else if (q.trim().length === 0) {
        load(1);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page" }, _attrs))} data-v-b50a006a><section class="banner" data-v-b50a006a><div class="banner-bg" data-v-b50a006a></div><div class="banner-content" data-v-b50a006a><span class="tag" data-v-b50a006a>Cinema</span><h1 class="title" data-v-b50a006a>Films <span class="accent" data-v-b50a006a>&amp; Movies</span></h1><p class="sub" data-v-b50a006a>Hollywood · International · Blockbusters · Classics</p><div class="search-bar" data-v-b50a006a><svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" data-v-b50a006a><circle cx="11" cy="11" r="7" data-v-b50a006a></circle><path d="m21 21-4.35-4.35" data-v-b50a006a></path></svg><input${ssrRenderAttr("value", searchQuery.value)} class="search-input" placeholder="Search movies…" autocomplete="off" data-v-b50a006a>`);
      if (searching.value) {
        _push(`<span class="search-spin" data-v-b50a006a></span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></section><main class="wrap" data-v-b50a006a>`);
      if (!searchQuery.value.trim()) {
        _push(`<div class="tabs-row" data-v-b50a006a><div class="tabs" data-v-b50a006a><!--[-->`);
        ssrRenderList(tabs, (t) => {
          _push(`<button class="${ssrRenderClass(["tab", { active: activeTab.value === t.key && !activeGenre.value }])}" data-v-b50a006a>${ssrInterpolate(t.label)}</button>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (genres.value.length && !searchQuery.value.trim()) {
        _push(`<div class="genre-row" data-v-b50a006a><!--[-->`);
        ssrRenderList(genres.value, (g) => {
          _push(`<button class="${ssrRenderClass(["genre-chip", { active: activeGenre.value === g.id }])}" data-v-b50a006a>${ssrInterpolate(g.name)}</button>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      if (loading.value) {
        _push(`<div class="grid" data-v-b50a006a><!--[-->`);
        ssrRenderList(24, (n) => {
          _push(`<div class="skeleton-card" data-v-b50a006a><div class="sk-img skeleton" data-v-b50a006a></div><div class="sk-line skeleton" data-v-b50a006a></div><div class="sk-line2 skeleton" data-v-b50a006a></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else if (items.value.length) {
        _push(`<div class="grid" data-v-b50a006a><!--[-->`);
        ssrRenderList(items.value, (film) => {
          _push(`<article class="card" data-v-b50a006a><div class="card-img" data-v-b50a006a><img${ssrRenderAttr("src", film.image)}${ssrRenderAttr("alt", film.title)} loading="lazy" data-v-b50a006a><span class="film-badge" data-v-b50a006a>FILM</span><div class="play-overlay" data-v-b50a006a><div class="play-btn" data-v-b50a006a><svg viewBox="0 0 24 24" fill="currentColor" data-v-b50a006a><path d="M8 5v14l11-7z" data-v-b50a006a></path></svg></div></div></div><div class="card-body" data-v-b50a006a><h3 class="card-title" data-v-b50a006a>${ssrInterpolate(film.title)}</h3><div class="meta" data-v-b50a006a><span class="year" data-v-b50a006a>${ssrInterpolate(film.year)}</span><span class="rating" data-v-b50a006a>★ ${ssrInterpolate(film.rating.toFixed(1))}</span></div></div></article>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="empty" data-v-b50a006a><p class="empty-icon" data-v-b50a006a>🎬</p><p class="empty-title" data-v-b50a006a>No results</p><p class="empty-sub" data-v-b50a006a>Try a different search or category</p></div>`);
      }
      if (!loading.value && page.value < totalPages.value) {
        _push(`<div class="load-more-wrap" data-v-b50a006a><button class="load-more-btn"${ssrIncludeBooleanAttr(loadingMore.value) ? " disabled" : ""} data-v-b50a006a>`);
        if (loadingMore.value) {
          _push(`<span class="spin" data-v-b50a006a></span>`);
        } else {
          _push(`<span data-v-b50a006a>Load More</span>`);
        }
        _push(`</button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<p class="tmdb-credit" data-v-b50a006a> Data provided by <a href="https://www.themoviedb.org" target="_blank" rel="noopener" data-v-b50a006a>The Movie Database (TMDB)</a></p></main>`);
      _push(ssrRenderComponent(AppFooter, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/films/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b50a006a"]]);
export {
  index as default
};
//# sourceMappingURL=index-BfBAmiyO.js.map
