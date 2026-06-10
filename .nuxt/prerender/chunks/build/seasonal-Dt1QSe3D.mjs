import { ref, mergeProps, unref, useSSRContext } from 'file://C:/salidumay-nuxt/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderComponent } from 'file://C:/salidumay-nuxt/node_modules/vue/server-renderer/index.mjs';
import { A as AppFooter } from './AppFooter-DakCUiQ2.mjs';
import { _ as _export_sfc, c as useRouter } from './server.mjs';
import 'file://C:/salidumay-nuxt/node_modules/vue-router/vue-router.node.mjs';
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
  __name: "seasonal",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const items = ref([]);
    const loading = ref(true);
    const now = /* @__PURE__ */ new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const season = month <= 3 ? "Winter" : month <= 6 ? "Spring" : month <= 9 ? "Summer" : "Fall";
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page" }, _attrs))} data-v-aec27de6><section class="banner" data-v-aec27de6><div class="banner-bg" data-v-aec27de6></div><div class="banner-content" data-v-aec27de6><span class="tag pink" data-v-aec27de6>Now Airing</span><h1 class="title" data-v-aec27de6>${ssrInterpolate(unref(season))} <span class="accent" data-v-aec27de6>${ssrInterpolate(unref(year))}</span></h1><p class="sub" data-v-aec27de6>All anime airing this season</p></div></section><main class="wrap" data-v-aec27de6>`);
      if (loading.value) {
        _push(`<div class="grid" data-v-aec27de6><!--[-->`);
        ssrRenderList(16, (n) => {
          _push(`<div class="skeleton-card" data-v-aec27de6><div class="sk-img skeleton" data-v-aec27de6></div><div class="sk-line skeleton" data-v-aec27de6></div><div class="sk-line2 skeleton" data-v-aec27de6></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else if (items.value.length) {
        _push(`<div class="grid" data-v-aec27de6><!--[-->`);
        ssrRenderList(items.value, (anime) => {
          _push(`<article class="card" data-v-aec27de6><div class="card-img" data-v-aec27de6><img${ssrRenderAttr("src", anime.image)}${ssrRenderAttr("alt", anime.title)} loading="lazy" data-v-aec27de6>`);
          if (anime.status === "Airing") {
            _push(`<span class="airing-badge" data-v-aec27de6>\u25CF AIRING</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="play-overlay" data-v-aec27de6><div class="play-btn" data-v-aec27de6><svg viewBox="0 0 24 24" fill="currentColor" data-v-aec27de6><path d="M8 5v14l11-7z" data-v-aec27de6></path></svg></div></div></div><div class="card-body" data-v-aec27de6><span class="genre" data-v-aec27de6>${ssrInterpolate(anime.genre)}</span><h3 class="card-title" data-v-aec27de6>${ssrInterpolate(anime.title)}</h3><div class="meta" data-v-aec27de6><span data-v-aec27de6>${ssrInterpolate(anime.episodes)} ep</span><span class="rating" data-v-aec27de6>\u2605 ${ssrInterpolate(typeof anime.rating === "number" ? anime.rating.toFixed(1) : anime.rating)}</span></div></div></article>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="empty" data-v-aec27de6><p class="empty-icon" data-v-aec27de6>\u{1F338}</p><p class="empty-title" data-v-aec27de6>No seasonal anime found</p><p class="empty-sub" data-v-aec27de6>Try running the scraper to populate data</p></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/seasonal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const seasonal = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-aec27de6"]]);

export { seasonal as default };
//# sourceMappingURL=seasonal-Dt1QSe3D.mjs.map
