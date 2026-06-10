import { mergeProps, useSSRContext } from 'file://C:/salidumay-nuxt/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderComponent } from 'file://C:/salidumay-nuxt/node_modules/vue/server-renderer/index.mjs';
import { A as AppFooter } from './AppFooter-DakCUiQ2.mjs';
import { _ as _export_sfc } from './server.mjs';
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
  __name: "recommendations",
  __ssrInlineRender: true,
  setup(__props) {
    const picks = [
      { title: "Vinland Saga", reason: "If you loved Attack on Titan", rating: 9, genre: "Historical" },
      { title: "Mushishi", reason: "If you want something calm and beautiful", rating: 8.7, genre: "Slice of Life" },
      { title: "Hunter x Hunter", reason: "If you like Naruto but want better writing", rating: 9.1, genre: "Adventure" },
      { title: "Mob Psycho 100", reason: "If you enjoyed One Punch Man", rating: 8.9, genre: "Action" },
      { title: "Steins;Gate", reason: "If you love sci-fi and time travel", rating: 9.2, genre: "Sci-Fi" },
      { title: "Made in Abyss", reason: "If you want adventure with real stakes", rating: 8.8, genre: "Adventure" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page" }, _attrs))} data-v-6be34f69><section class="hero" data-v-6be34f69><div class="hero-bg" data-v-6be34f69></div><div class="hero-content" data-v-6be34f69><span class="tag" data-v-6be34f69>Community</span><h1 class="title" data-v-6be34f69>Anime <span class="accent" data-v-6be34f69>Recommendations</span></h1><p class="sub" data-v-6be34f69>Find your next obsession, curated by fans.</p></div></section><main class="wrap" data-v-6be34f69><div class="coming-banner" data-v-6be34f69><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-6be34f69><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" data-v-6be34f69></polygon></svg><div data-v-6be34f69><strong data-v-6be34f69>Personalized recommendations coming soon</strong><p data-v-6be34f69>AI-powered and community-driven picks based on your watch history. For now, enjoy these fan-curated suggestions.</p></div></div><h2 class="section-title" data-v-6be34f69>&quot;If you liked ___, watch ___&quot;</h2><div class="picks-grid" data-v-6be34f69><!--[-->`);
      ssrRenderList(picks, (pick) => {
        _push(`<div class="pick-card" data-v-6be34f69><div class="pick-reason" data-v-6be34f69>${ssrInterpolate(pick.reason)}</div><h3 class="pick-title" data-v-6be34f69>${ssrInterpolate(pick.title)}</h3><div class="pick-meta" data-v-6be34f69><span class="pick-genre" data-v-6be34f69>${ssrInterpolate(pick.genre)}</span><span class="pick-rating" data-v-6be34f69>\u2605 ${ssrInterpolate(pick.rating)}</span></div></div>`);
      });
      _push(`<!--]--></div><div class="cta" data-v-6be34f69><p data-v-6be34f69>Have a great recommendation to share?</p><a href="/contact" class="cta-btn" data-v-6be34f69>Submit a Pick \u2192</a></div></main>`);
      _push(ssrRenderComponent(AppFooter, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/recommendations.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const recommendations = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6be34f69"]]);

export { recommendations as default };
//# sourceMappingURL=recommendations-C16IzsM7.mjs.map
