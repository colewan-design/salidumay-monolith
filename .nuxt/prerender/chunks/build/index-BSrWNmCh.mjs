import { ref, watch, mergeProps, useSSRContext } from 'file://C:/salidumay-nuxt/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderComponent, ssrIncludeBooleanAttr } from 'file://C:/salidumay-nuxt/node_modules/vue/server-renderer/index.mjs';
import { A as AppFooter } from './AppFooter-DakCUiQ2.mjs';
import { F as FilmCard } from './FilmCard-Byk_thX2.mjs';
import { s as searchFilms, a as getFilmsByGenre, b as getNowPlayingFilms, d as getTopRatedFilms, e as getTrendingFilms, c as getPopularFilms } from './tmdb-D41Aoa6c.mjs';
import { _ as _export_sfc, c as useRouter } from './server.mjs';
import { a as useSeoMeta } from './v3-BGyVWe_n.mjs';
import 'file://C:/salidumay-nuxt/node_modules/vue-router/vue-router.node.mjs';
import './userdata-CDN2C6w4.mjs';
import 'file://C:/salidumay-nuxt/node_modules/axios/index.js';
import 'file://C:/salidumay-nuxt/node_modules/ofetch/dist/node.mjs';
import '../_/renderer.mjs';
import 'file://C:/salidumay-nuxt/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file://C:/salidumay-nuxt/node_modules/h3/dist/index.mjs';
import 'file://C:/salidumay-nuxt/node_modules/ufo/dist/index.mjs';
import '../_/nitro.mjs';
import 'file://C:/salidumay-nuxt/node_modules/destr/dist/index.mjs';
import 'file://C:/salidumay-nuxt/node_modules/hookable/dist/index.mjs';
import 'file://C:/salidumay-nuxt/node_modules/node-mock-http/dist/index.mjs';
import 'file://C:/salidumay-nuxt/node_modules/unstorage/dist/index.mjs';
import 'file://C:/salidumay-nuxt/node_modules/unstorage/drivers/fs.mjs';
import 'file:///C:/salidumay-nuxt/node_modules/@nuxt/nitro-server/dist/runtime/utils/cache-driver.js';
import 'file://C:/salidumay-nuxt/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file://C:/salidumay-nuxt/node_modules/ohash/dist/index.mjs';
import 'file://C:/salidumay-nuxt/node_modules/klona/dist/index.mjs';
import 'file://C:/salidumay-nuxt/node_modules/defu/dist/defu.mjs';
import 'file://C:/salidumay-nuxt/node_modules/scule/dist/index.mjs';
import 'file://C:/salidumay-nuxt/node_modules/radix3/dist/index.mjs';
import 'node:fs';
import 'node:url';
import 'file://C:/salidumay-nuxt/node_modules/pathe/dist/index.mjs';
import 'file://C:/salidumay-nuxt/node_modules/unhead/dist/server.mjs';
import 'node:async_hooks';
import 'file://C:/salidumay-nuxt/node_modules/devalue/index.js';
import 'file://C:/salidumay-nuxt/node_modules/unhead/dist/plugins.mjs';
import 'file://C:/salidumay-nuxt/node_modules/unhead/dist/utils.mjs';
import 'file://C:/salidumay-nuxt/node_modules/unctx/dist/index.mjs';

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
      var _a;
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
        totalPages.value = (_a = res.totalPages) != null ? _a : 1;
        page.value = p;
      }
      loading.value = false;
      loadingMore.value = false;
    }
    useSeoMeta({
      title: "Films & Movies \u2014 Salidumay",
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page" }, _attrs))} data-v-569f0399><section class="banner" data-v-569f0399><div class="banner-bg" data-v-569f0399></div><div class="banner-content" data-v-569f0399><span class="tag" data-v-569f0399>Cinema</span><h1 class="title" data-v-569f0399>Films <span class="accent" data-v-569f0399>&amp; Movies</span></h1><p class="sub" data-v-569f0399>Hollywood \xB7 International \xB7 Blockbusters \xB7 Classics</p><div class="search-bar" data-v-569f0399><svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" data-v-569f0399><circle cx="11" cy="11" r="7" data-v-569f0399></circle><path d="m21 21-4.35-4.35" data-v-569f0399></path></svg><input${ssrRenderAttr("value", searchQuery.value)} class="search-input" placeholder="Search movies\u2026" autocomplete="off" data-v-569f0399>`);
      if (searching.value) {
        _push(`<span class="search-spin" data-v-569f0399></span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></section><main class="wrap" data-v-569f0399>`);
      if (!searchQuery.value.trim()) {
        _push(`<div class="tabs-row" data-v-569f0399><div class="tabs" data-v-569f0399><!--[-->`);
        ssrRenderList(tabs, (t) => {
          _push(`<button class="${ssrRenderClass(["tab", { active: activeTab.value === t.key && !activeGenre.value }])}" data-v-569f0399>${ssrInterpolate(t.label)}</button>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (genres.value.length && !searchQuery.value.trim()) {
        _push(`<div class="genre-row" data-v-569f0399><!--[-->`);
        ssrRenderList(genres.value, (g) => {
          _push(`<button class="${ssrRenderClass(["genre-chip", { active: activeGenre.value === g.id }])}" data-v-569f0399>${ssrInterpolate(g.name)}</button>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      if (loading.value) {
        _push(`<div class="grid" data-v-569f0399><!--[-->`);
        ssrRenderList(24, (n) => {
          _push(`<div class="skeleton-card" data-v-569f0399><div class="sk-img skeleton" data-v-569f0399></div><div class="sk-line skeleton" data-v-569f0399></div><div class="sk-line2 skeleton" data-v-569f0399></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else if (items.value.length) {
        _push(`<div class="grid" data-v-569f0399><!--[-->`);
        ssrRenderList(items.value, (film) => {
          _push(ssrRenderComponent(FilmCard, {
            key: film.id,
            film
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="empty" data-v-569f0399><p class="empty-icon" data-v-569f0399>\u{1F3AC}</p><p class="empty-title" data-v-569f0399>No results</p><p class="empty-sub" data-v-569f0399>Try a different search or category</p></div>`);
      }
      if (!loading.value && page.value < totalPages.value) {
        _push(`<div class="load-more-wrap" data-v-569f0399><button class="load-more-btn"${ssrIncludeBooleanAttr(loadingMore.value) ? " disabled" : ""} data-v-569f0399>`);
        if (loadingMore.value) {
          _push(`<span class="spin" data-v-569f0399></span>`);
        } else {
          _push(`<span data-v-569f0399>Load More</span>`);
        }
        _push(`</button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<p class="tmdb-credit" data-v-569f0399> Data provided by <a href="https://www.themoviedb.org" target="_blank" rel="noopener" data-v-569f0399>The Movie Database (TMDB)</a></p></main>`);
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
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-569f0399"]]);

export { index as default };
//# sourceMappingURL=index-BSrWNmCh.mjs.map
