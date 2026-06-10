import { ref, computed, watch, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderComponent } from "vue/server-renderer";
import { A as AppFooter } from "./AppFooter-DakCUiQ2.js";
import { s as searchAnime } from "./api-CaxJTo2b.js";
import { _ as _export_sfc, c as useRouter, b as useRoute } from "../server.mjs";
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
    useRoute();
    const allAnime = ref([]);
    const baseAnime = ref([]);
    const genres = ref([]);
    const loading = ref(true);
    const searchQuery = ref("");
    const activeGenre = ref("All");
    const activeStatus = ref("All");
    const activeSort = ref("rating");
    const statuses = ["All", "Airing", "Done"];
    const sorts = [
      { value: "rating", label: "Top Rated" },
      { value: "newest", label: "Newest" },
      { value: "popular", label: "Most Popular" },
      { value: "title", label: "A–Z" }
    ];
    const filtered = computed(() => {
      let list = [...allAnime.value];
      if (activeGenre.value !== "All")
        list = list.filter((a) => a.genre === activeGenre.value);
      if (activeStatus.value !== "All")
        list = list.filter((a) => a.status === activeStatus.value);
      if (activeSort.value === "rating") list.sort((a, b) => b.rating - a.rating);
      if (activeSort.value === "newest") list.sort((a, b) => (b.year || 0) - (a.year || 0));
      if (activeSort.value === "popular") list.sort((a, b) => (b.members || 0) - (a.members || 0));
      if (activeSort.value === "title") list.sort((a, b) => a.title.localeCompare(b.title));
      return list;
    });
    let searchTimer = null;
    watch(searchQuery, (q) => {
      clearTimeout(searchTimer);
      const trimmed = q.trim();
      if (trimmed.length >= 2) {
        loading.value = true;
        searchTimer = setTimeout(async () => {
          const res = await searchAnime(trimmed).catch(() => null);
          if (res) allAnime.value = res.data;
          loading.value = false;
        }, 400);
      } else {
        if (!trimmed) allAnime.value = baseAnime.value;
      }
    });
    useSeoMeta({
      title: "Watch Anime — Salidumay",
      description: "Stream thousands of anime episodes in HD — dubbed and subbed."
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page" }, _attrs))} data-v-fe1202a4><section class="watch-banner" data-v-fe1202a4><div class="banner-bg" data-v-fe1202a4></div><div class="scanlines" data-v-fe1202a4></div><div class="banner-content" data-v-fe1202a4><p class="banner-tag" data-v-fe1202a4>ANIMEX LIBRARY</p><h1 class="banner-title gradient-text" data-v-fe1202a4>Watch Anime</h1><p class="banner-sub" data-v-fe1202a4>Stream thousands of episodes in HD — dubbed &amp; subbed</p><div class="search-container" data-v-fe1202a4><div class="search-bar" data-v-fe1202a4><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" data-v-fe1202a4><circle cx="11" cy="11" r="7" data-v-fe1202a4></circle><path d="m21 21-4.35-4.35" data-v-fe1202a4></path></svg><input${ssrRenderAttr("value", searchQuery.value)} class="search-input" placeholder="Search by title or genre…" autocomplete="off" data-v-fe1202a4>`);
      if (searchQuery.value) {
        _push(`<button class="search-clear" data-v-fe1202a4>✕</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></section><div class="filters-bar" data-v-fe1202a4><div class="filters-inner" data-v-fe1202a4><div class="filter-group" data-v-fe1202a4><span class="filter-label" data-v-fe1202a4>Genre</span><div class="chips" data-v-fe1202a4><!--[-->`);
      ssrRenderList(genres.value, (g) => {
        _push(`<button class="${ssrRenderClass(["chip", { active: activeGenre.value === g }])}" data-v-fe1202a4>${ssrInterpolate(g)}</button>`);
      });
      _push(`<!--]--></div></div><div class="filter-row" data-v-fe1202a4><div class="filter-group" data-v-fe1202a4><span class="filter-label" data-v-fe1202a4>Status</span><div class="chips" data-v-fe1202a4><!--[-->`);
      ssrRenderList(statuses, (s) => {
        _push(`<button class="${ssrRenderClass(["chip", { active: activeStatus.value === s }])}" data-v-fe1202a4>${ssrInterpolate(s)}</button>`);
      });
      _push(`<!--]--></div></div><div class="filter-group sort-group" data-v-fe1202a4><span class="filter-label" data-v-fe1202a4>Sort</span><select class="sort-select" data-v-fe1202a4><!--[-->`);
      ssrRenderList(sorts, (s) => {
        _push(`<option${ssrRenderAttr("value", s.value)} data-v-fe1202a4${ssrIncludeBooleanAttr(Array.isArray(activeSort.value) ? ssrLooseContain(activeSort.value, s.value) : ssrLooseEqual(activeSort.value, s.value)) ? " selected" : ""}>${ssrInterpolate(s.label)}</option>`);
      });
      _push(`<!--]--></select></div></div></div></div><main class="catalog-wrap" data-v-fe1202a4>`);
      if (!loading.value) {
        _push(`<div class="results-meta" data-v-fe1202a4><span class="results-count" data-v-fe1202a4>${ssrInterpolate(filtered.value.length)} anime</span>`);
        if (activeGenre.value !== "All" || activeStatus.value !== "All" || searchQuery.value) {
          _push(`<button class="clear-filters" data-v-fe1202a4> Clear filters </button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (loading.value) {
        _push(`<div class="anime-grid" data-v-fe1202a4><!--[-->`);
        ssrRenderList(18, (n) => {
          _push(`<div class="card-skeleton" data-v-fe1202a4><div class="sk-img skeleton" data-v-fe1202a4></div><div class="sk-text skeleton" data-v-fe1202a4></div><div class="sk-text2 skeleton" data-v-fe1202a4></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else if (filtered.value.length) {
        _push(`<div class="anime-grid" data-v-fe1202a4><!--[-->`);
        ssrRenderList(filtered.value, (anime) => {
          _push(`<article class="w-card" data-v-fe1202a4><div class="w-card-img" data-v-fe1202a4><img${ssrRenderAttr("src", anime.image)}${ssrRenderAttr("alt", anime.title)} loading="lazy" data-v-fe1202a4><div class="glitch-overlay" data-v-fe1202a4></div>`);
          if (anime.new) {
            _push(`<span class="badge-new" data-v-fe1202a4>NEW</span>`);
          } else {
            _push(`<!---->`);
          }
          if (anime.status) {
            _push(`<span class="${ssrRenderClass(["badge-status", anime.status === "Airing" ? "airing" : "done"])}" data-v-fe1202a4>${ssrInterpolate(anime.status === "Airing" ? "● AIRING" : "✓ DONE")}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="play-overlay" data-v-fe1202a4><div class="play-circle" data-v-fe1202a4><svg viewBox="0 0 24 24" fill="currentColor" data-v-fe1202a4><path d="M8 5v14l11-7z" data-v-fe1202a4></path></svg></div></div></div><div class="w-card-body" data-v-fe1202a4><span class="w-genre" data-v-fe1202a4>${ssrInterpolate(anime.genre)}</span><h3 class="w-title" data-v-fe1202a4>${ssrInterpolate(anime.title)}</h3><div class="w-meta" data-v-fe1202a4><span class="w-eps" data-v-fe1202a4>${ssrInterpolate(anime.episodes)} ep</span><span class="w-rating" data-v-fe1202a4>★ ${ssrInterpolate(typeof anime.rating === "number" ? anime.rating.toFixed(1) : anime.rating)}</span></div></div></article>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="empty-state" data-v-fe1202a4><div class="empty-icon" data-v-fe1202a4>⊘</div><p class="empty-title" data-v-fe1202a4>No anime found</p><p class="empty-sub" data-v-fe1202a4>Try adjusting your filters or search query</p><button class="btn-reset" data-v-fe1202a4>Reset Filters</button></div>`);
      }
      _push(`</main>`);
      _push(ssrRenderComponent(AppFooter, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/watch/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-fe1202a4"]]);
export {
  index as default
};
//# sourceMappingURL=index-DlTrGXu6.js.map
