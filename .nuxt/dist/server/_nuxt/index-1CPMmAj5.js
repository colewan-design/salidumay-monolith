import { ref, watch, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderComponent } from "vue/server-renderer";
import { A as AppFooter } from "./AppFooter-DakCUiQ2.js";
import { s as searchSeries, b as getSeriesByGenre, g as getAiringTodaySeries, d as getTopRatedSeries, e as getTrendingSeries, a as getPopularSeries } from "./tvSeries-7207TLND.js";
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
      { key: "airing_today", label: "Airing Today" }
    ];
    const fetchers = {
      popular: getPopularSeries,
      trending: getTrendingSeries,
      top_rated: getTopRatedSeries,
      airing_today: getAiringTodaySeries
    };
    async function load(p = 1) {
      if (p === 1) loading.value = true;
      else loadingMore.value = true;
      let res;
      if (searchQuery.value.trim().length >= 2) {
        res = await searchSeries(searchQuery.value.trim(), p).catch(() => null);
      } else if (activeGenre.value) {
        res = await getSeriesByGenre(activeGenre.value, p).catch(() => null);
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
      title: "TV Series — Salidumay",
      description: "Discover popular, trending and top-rated TV series on Salidumay."
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page" }, _attrs))} data-v-06debb10><section class="banner" data-v-06debb10><div class="banner-bg" data-v-06debb10></div><div class="banner-content" data-v-06debb10><span class="tag" data-v-06debb10>Television</span><h1 class="title" data-v-06debb10>TV <span class="accent" data-v-06debb10>Series</span></h1><p class="sub" data-v-06debb10>Drama · Thriller · Sci-Fi · Fantasy · Comedy</p><div class="search-bar" data-v-06debb10><svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" data-v-06debb10><circle cx="11" cy="11" r="7" data-v-06debb10></circle><path d="m21 21-4.35-4.35" data-v-06debb10></path></svg><input${ssrRenderAttr("value", searchQuery.value)} class="search-input" placeholder="Search series…" autocomplete="off" data-v-06debb10>`);
      if (searching.value) {
        _push(`<span class="search-spin" data-v-06debb10></span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></section><main class="wrap" data-v-06debb10>`);
      if (!searchQuery.value.trim()) {
        _push(`<div class="tabs-row" data-v-06debb10><div class="tabs" data-v-06debb10><!--[-->`);
        ssrRenderList(tabs, (t) => {
          _push(`<button class="${ssrRenderClass(["tab", { active: activeTab.value === t.key && !activeGenre.value }])}" data-v-06debb10>${ssrInterpolate(t.label)}</button>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (genres.value.length && !searchQuery.value.trim()) {
        _push(`<div class="genre-row" data-v-06debb10><!--[-->`);
        ssrRenderList(genres.value, (g) => {
          _push(`<button class="${ssrRenderClass(["genre-chip", { active: activeGenre.value === g.id }])}" data-v-06debb10>${ssrInterpolate(g.name)}</button>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      if (loading.value) {
        _push(`<div class="grid" data-v-06debb10><!--[-->`);
        ssrRenderList(24, (n) => {
          _push(`<div class="skeleton-card" data-v-06debb10><div class="sk-img skeleton" data-v-06debb10></div><div class="sk-line skeleton" data-v-06debb10></div><div class="sk-line2 skeleton" data-v-06debb10></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else if (items.value.length) {
        _push(`<div class="grid" data-v-06debb10><!--[-->`);
        ssrRenderList(items.value, (s) => {
          _push(`<article class="card" data-v-06debb10><div class="card-img" data-v-06debb10><img${ssrRenderAttr("src", s.image)}${ssrRenderAttr("alt", s.title)} loading="lazy" data-v-06debb10><span class="series-badge" data-v-06debb10>SERIES</span>`);
          if (s.number_of_seasons) {
            _push(`<div class="seasons-badge" data-v-06debb10>${ssrInterpolate(s.number_of_seasons)}S</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="play-overlay" data-v-06debb10><div class="play-btn" data-v-06debb10><svg viewBox="0 0 24 24" fill="currentColor" data-v-06debb10><path d="M8 5v14l11-7z" data-v-06debb10></path></svg></div></div></div><div class="card-body" data-v-06debb10><h3 class="card-title" data-v-06debb10>${ssrInterpolate(s.title)}</h3><div class="meta" data-v-06debb10><span class="year" data-v-06debb10>${ssrInterpolate(s.year)}</span><span class="rating" data-v-06debb10>★ ${ssrInterpolate(typeof s.rating === "number" ? s.rating.toFixed(1) : s.rating)}</span></div></div></article>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="empty" data-v-06debb10><p class="empty-icon" data-v-06debb10>📺</p><p class="empty-title" data-v-06debb10>No results</p><p class="empty-sub" data-v-06debb10>Try a different search or category</p></div>`);
      }
      if (!loading.value && page.value < totalPages.value) {
        _push(`<div class="load-more-wrap" data-v-06debb10><button class="load-more-btn"${ssrIncludeBooleanAttr(loadingMore.value) ? " disabled" : ""} data-v-06debb10>`);
        if (loadingMore.value) {
          _push(`<span class="spin" data-v-06debb10></span>`);
        } else {
          _push(`<span data-v-06debb10>Load More</span>`);
        }
        _push(`</button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<p class="tmdb-credit" data-v-06debb10> Data provided by <a href="https://www.themoviedb.org" target="_blank" rel="noopener" data-v-06debb10>The Movie Database (TMDB)</a></p></main>`);
      _push(ssrRenderComponent(AppFooter, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/series/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-06debb10"]]);
export {
  index as default
};
//# sourceMappingURL=index-1CPMmAj5.js.map
