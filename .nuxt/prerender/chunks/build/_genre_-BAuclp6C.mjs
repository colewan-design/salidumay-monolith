import { ref, watch, mergeProps, useSSRContext } from 'file://C:/salidumay-nuxt/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderComponent } from 'file://C:/salidumay-nuxt/node_modules/vue/server-renderer/index.mjs';
import { A as AppFooter } from './AppFooter-DakCUiQ2.mjs';
import { b as getByGenre } from './api-CaxJTo2b.mjs';
import { _ as _export_sfc, c as useRouter, b as useRoute } from './server.mjs';
import 'file://C:/salidumay-nuxt/node_modules/vue-router/vue-router.node.mjs';
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
  __name: "[genre]",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const route = useRoute();
    const items = ref([]);
    const genres = ref([]);
    const loading = ref(true);
    const loadingMore = ref(false);
    const page = ref(1);
    const hasNext = ref(false);
    const activeGenre = ref(route.params.genre || "");
    async function load(p = 1) {
      var _a, _b;
      if (!activeGenre.value) return;
      if (p === 1) loading.value = true;
      else loadingMore.value = true;
      const res = await getByGenre(activeGenre.value, p).catch(() => null);
      if (res) {
        items.value = p === 1 ? res.data : [...items.value, ...res.data];
        hasNext.value = (_b = (_a = res.pagination) == null ? void 0 : _a.has_next) != null ? _b : false;
        page.value = p;
      }
      loading.value = false;
      loadingMore.value = false;
    }
    watch(() => route.params.genre, (g) => {
      if (g && g !== activeGenre.value) {
        activeGenre.value = g;
        load(1);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page" }, _attrs))} data-v-5899b753><section class="banner" data-v-5899b753><div class="banner-bg" data-v-5899b753></div><div class="banner-content" data-v-5899b753><span class="tag" data-v-5899b753>Browse</span><h1 class="title" data-v-5899b753>Anime by <span class="accent" data-v-5899b753>Genre</span></h1><p class="sub" data-v-5899b753>${ssrInterpolate(activeGenre.value || "Pick a genre below")}</p></div></section><main class="wrap" data-v-5899b753><div class="genres-bar" data-v-5899b753><!--[-->`);
      ssrRenderList(genres.value, (g) => {
        _push(`<button class="${ssrRenderClass(["genre-chip", { active: activeGenre.value === g }])}" data-v-5899b753>${ssrInterpolate(g)}</button>`);
      });
      _push(`<!--]--></div>`);
      if (!loading.value && items.value.length) {
        _push(`<p class="count" data-v-5899b753>${ssrInterpolate(items.value.length)}${ssrInterpolate(hasNext.value ? "+" : "")} anime in <strong data-v-5899b753>${ssrInterpolate(activeGenre.value)}</strong></p>`);
      } else {
        _push(`<!---->`);
      }
      if (loading.value) {
        _push(`<div class="grid" data-v-5899b753><!--[-->`);
        ssrRenderList(24, (n) => {
          _push(`<div class="skeleton-card" data-v-5899b753><div class="sk-img skeleton" data-v-5899b753></div><div class="sk-line skeleton" data-v-5899b753></div><div class="sk-line2 skeleton" data-v-5899b753></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else if (items.value.length) {
        _push(`<div class="grid" data-v-5899b753><!--[-->`);
        ssrRenderList(items.value, (anime) => {
          _push(`<article class="card" data-v-5899b753><div class="card-img" data-v-5899b753><img${ssrRenderAttr("src", anime.image)}${ssrRenderAttr("alt", anime.title)} loading="lazy" data-v-5899b753>`);
          if (anime.status === "Airing") {
            _push(`<span class="airing-badge" data-v-5899b753>\u25CF AIRING</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="play-overlay" data-v-5899b753><div class="play-btn" data-v-5899b753><svg viewBox="0 0 24 24" fill="currentColor" data-v-5899b753><path d="M8 5v14l11-7z" data-v-5899b753></path></svg></div></div></div><div class="card-body" data-v-5899b753><h3 class="card-title" data-v-5899b753>${ssrInterpolate(anime.title)}</h3><div class="meta" data-v-5899b753><span data-v-5899b753>${ssrInterpolate(anime.episodes)} ep</span><span class="rating" data-v-5899b753>\u2605 ${ssrInterpolate(typeof anime.rating === "number" ? anime.rating.toFixed(1) : anime.rating)}</span></div></div></article>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="empty" data-v-5899b753><p class="empty-icon" data-v-5899b753>\u2298</p><p class="empty-title" data-v-5899b753>No anime found for &quot;${ssrInterpolate(activeGenre.value)}&quot;</p><p class="empty-sub" data-v-5899b753>Try running the scraper with <code data-v-5899b753>--full</code> to get more data</p></div>`);
      }
      if (!loading.value && hasNext.value) {
        _push(`<div class="load-more-wrap" data-v-5899b753><button class="load-more-btn"${ssrIncludeBooleanAttr(loadingMore.value) ? " disabled" : ""} data-v-5899b753>`);
        if (loadingMore.value) {
          _push(`<span class="spin" data-v-5899b753></span>`);
        } else {
          _push(`<span data-v-5899b753>Load More</span>`);
        }
        _push(`</button></div>`);
      } else {
        _push(`<!---->`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/genre/[genre].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _genre_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-5899b753"]]);

export { _genre_ as default };
//# sourceMappingURL=_genre_-BAuclp6C.mjs.map
