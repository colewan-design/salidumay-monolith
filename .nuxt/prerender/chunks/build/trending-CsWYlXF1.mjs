import { ref, mergeProps, useSSRContext } from 'file://C:/salidumay-nuxt/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderComponent } from 'file://C:/salidumay-nuxt/node_modules/vue/server-renderer/index.mjs';
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
  __name: "trending",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const items = ref([]);
    const loading = ref(true);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page" }, _attrs))} data-v-025ac452><section class="banner" data-v-025ac452><div class="banner-bg" data-v-025ac452></div><div class="banner-content" data-v-025ac452><span class="tag cyan" data-v-025ac452>Live Now</span><h1 class="title gradient-text" data-v-025ac452>Trending <span data-v-025ac452>Anime</span></h1><p class="sub" data-v-025ac452>The hottest anime airing right now</p></div></section><main class="wrap" data-v-025ac452>`);
      if (loading.value) {
        _push(`<div class="grid" data-v-025ac452><!--[-->`);
        ssrRenderList(12, (n) => {
          _push(`<div class="skeleton-card" data-v-025ac452><div class="sk-img skeleton" data-v-025ac452></div><div class="sk-line skeleton" data-v-025ac452></div><div class="sk-line2 skeleton" data-v-025ac452></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="grid" data-v-025ac452><!--[-->`);
        ssrRenderList(items.value, (anime, i) => {
          _push(`<article class="card" data-v-025ac452><div class="card-img" data-v-025ac452><img${ssrRenderAttr("src", anime.image)}${ssrRenderAttr("alt", anime.title)} loading="lazy" data-v-025ac452><span class="rank-badge" data-v-025ac452>#${ssrInterpolate(i + 1)}</span><div class="play-overlay" data-v-025ac452><div class="play-btn" data-v-025ac452><svg viewBox="0 0 24 24" fill="currentColor" data-v-025ac452><path d="M8 5v14l11-7z" data-v-025ac452></path></svg></div></div></div><div class="card-body" data-v-025ac452><span class="genre" data-v-025ac452>${ssrInterpolate(anime.genre)}</span><h3 class="card-title" data-v-025ac452>${ssrInterpolate(anime.title)}</h3><div class="meta" data-v-025ac452><span data-v-025ac452>${ssrInterpolate(anime.episodes)} ep</span><span class="rating" data-v-025ac452>\u2605 ${ssrInterpolate(typeof anime.rating === "number" ? anime.rating.toFixed(1) : anime.rating)}</span></div></div></article>`);
        });
        _push(`<!--]--></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/trending.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const trending = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-025ac452"]]);

export { trending as default };
//# sourceMappingURL=trending-CsWYlXF1.mjs.map
