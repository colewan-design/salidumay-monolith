import { ref, mergeProps, unref, useSSRContext } from 'file://C:/salidumay-nuxt/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderAttr } from 'file://C:/salidumay-nuxt/node_modules/vue/server-renderer/index.mjs';
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
  __name: "history",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const { isLoggedIn } = useAuth();
    const history2 = ref([]);
    const loading = ref(true);
    const confirmClear = ref(false);
    function formatDate(iso) {
      return new Date(iso).toLocaleDateString(void 0, { month: "short", day: "numeric", year: "numeric" });
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page" }, _attrs))} data-v-7fffce85><div class="history-wrap" data-v-7fffce85><div class="history-header" data-v-7fffce85><div class="header-left" data-v-7fffce85><h1 class="history-title" data-v-7fffce85>Watch History</h1>`);
      if (history2.value.length) {
        _push(`<span class="history-count" data-v-7fffce85>${ssrInterpolate(history2.value.length)} anime</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (history2.value.length) {
        _push(`<button class="clear-btn" data-v-7fffce85>Clear All</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (confirmClear.value) {
        _push(`<div class="confirm-bar" data-v-7fffce85><span data-v-7fffce85>Clear all watch history?</span><button class="confirm-yes" data-v-7fffce85>Yes, clear</button><button class="confirm-no" data-v-7fffce85>Cancel</button></div>`);
      } else {
        _push(`<!---->`);
      }
      if (loading.value) {
        _push(`<div class="state-msg" data-v-7fffce85>Loading\u2026</div>`);
      } else if (!unref(isLoggedIn)) {
        _push(`<div class="empty-state" data-v-7fffce85><div class="empty-icon" data-v-7fffce85>\u{1F550}</div><p data-v-7fffce85>Sign in to track your watch history.</p><button class="cta-btn" data-v-7fffce85>Sign In</button></div>`);
      } else if (!history2.value.length) {
        _push(`<div class="empty-state" data-v-7fffce85><div class="empty-icon" data-v-7fffce85>\u{1F4ED}</div><p data-v-7fffce85>No watch history yet. Start watching to track your progress!</p><button class="cta-btn" data-v-7fffce85>Browse Anime</button></div>`);
      } else {
        _push(`<div class="history-list" data-v-7fffce85><!--[-->`);
        ssrRenderList(history2.value, (anime) => {
          _push(`<div class="history-item" data-v-7fffce85><div class="item-img" data-v-7fffce85><img${ssrRenderAttr("src", anime.image)}${ssrRenderAttr("alt", anime.title)} loading="lazy" data-v-7fffce85><div class="item-play" data-v-7fffce85><svg viewBox="0 0 24 24" fill="currentColor" data-v-7fffce85><path d="M8 5v14l11-7z" data-v-7fffce85></path></svg></div></div><div class="item-info" data-v-7fffce85><h3 class="item-title" data-v-7fffce85>${ssrInterpolate(anime.title)}</h3><div class="item-meta" data-v-7fffce85><span class="item-ep" data-v-7fffce85>Episode ${ssrInterpolate(anime.episode)}</span><span class="item-date" data-v-7fffce85>${ssrInterpolate(formatDate(anime.watchedAt))}</span></div>`);
          if (anime.genre) {
            _push(`<span class="item-genre" data-v-7fffce85>${ssrInterpolate(anime.genre)}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><button class="resume-btn" data-v-7fffce85>Resume</button><button class="remove-btn" title="Remove" data-v-7fffce85>\u2715</button></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/history.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const history = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-7fffce85"]]);

export { history as default };
//# sourceMappingURL=history-CV6qD_iz.mjs.map
