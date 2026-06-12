import { ref, mergeProps, unref, useSSRContext } from 'file://C:/salidumay-nuxt/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderStyle, ssrRenderList, ssrRenderAttr, ssrRenderClass } from 'file://C:/salidumay-nuxt/node_modules/vue/server-renderer/index.mjs';
import { u as useAuth } from './useAuth-CsDdxmPs.mjs';
import { _ as _export_sfc, c as useRouter } from './server.mjs';
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
import 'file://C:/salidumay-nuxt/node_modules/vue-router/vue-router.node.mjs';

const _sfc_main = {
  __name: "library",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const { isLoggedIn } = useAuth();
    const library2 = ref([]);
    const loading = ref(true);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page" }, _attrs))} data-v-96f9aa20><div class="library-wrap" data-v-96f9aa20><div class="library-header" data-v-96f9aa20><h1 class="library-title" data-v-96f9aa20>My Library</h1>`);
      if (library2.value.length) {
        _push(`<span class="library-count" data-v-96f9aa20>${ssrInterpolate(library2.value.length)} saved</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (loading.value) {
        _push(`<div class="state-msg" data-v-96f9aa20>Loading\u2026</div>`);
      } else if (!unref(isLoggedIn)) {
        _push(`<div class="empty-state" data-v-96f9aa20><div class="empty-icon" data-v-96f9aa20>\u{1F4DA}</div><p data-v-96f9aa20>Sign in to save anime to your library.</p><button class="cta-btn" data-v-96f9aa20>Sign In</button></div>`);
      } else if (!library2.value.length) {
        _push(`<div class="empty-state" data-v-96f9aa20><div class="empty-icon" data-v-96f9aa20>\u{1F4ED}</div><p data-v-96f9aa20>Your library is empty. Start adding films and anime!</p><div style="${ssrRenderStyle({ "display": "flex", "gap": ".6rem", "justify-content": "center", "flex-wrap": "wrap" })}" data-v-96f9aa20><button class="cta-btn" data-v-96f9aa20>Browse Anime</button><button class="cta-btn" style="${ssrRenderStyle({ "background": "var(--cyan)", "color": "#060e14" })}" data-v-96f9aa20>Browse Films</button></div></div>`);
      } else {
        _push(`<div class="anime-grid" data-v-96f9aa20><!--[-->`);
        ssrRenderList(library2.value, (anime) => {
          _push(`<div class="anime-card" data-v-96f9aa20><div class="card-img" data-v-96f9aa20><img${ssrRenderAttr("src", anime.image)}${ssrRenderAttr("alt", anime.title)} loading="lazy" data-v-96f9aa20><div class="card-play" data-v-96f9aa20><svg viewBox="0 0 24 24" fill="currentColor" data-v-96f9aa20><path d="M8 5v14l11-7z" data-v-96f9aa20></path></svg></div></div><div class="card-info" data-v-96f9aa20><h3 class="card-title" data-v-96f9aa20>${ssrInterpolate(anime.title)}</h3><div class="card-meta" data-v-96f9aa20><span class="${ssrRenderClass(["type-badge", anime.type === "film" ? "type-film" : "type-anime"])}" data-v-96f9aa20>${ssrInterpolate(anime.type === "film" ? "FILM" : "ANIME")}</span>`);
          if (anime.episodes) {
            _push(`<span data-v-96f9aa20>${ssrInterpolate(anime.episodes)} ep</span>`);
          } else {
            _push(`<!---->`);
          }
          if (anime.rating) {
            _push(`<span class="card-rating" data-v-96f9aa20>\u2605 ${ssrInterpolate(anime.rating)}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div><button class="remove-btn" title="Remove from library" data-v-96f9aa20>\u2715</button></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/library.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const library = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-96f9aa20"]]);

export { library as default };
//# sourceMappingURL=library-4GbBY2gO.mjs.map
