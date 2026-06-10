import { mergeProps, useSSRContext } from 'file://C:/salidumay-nuxt/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderComponent } from 'file://C:/salidumay-nuxt/node_modules/vue/server-renderer/index.mjs';
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
  __name: "reviews",
  __ssrInlineRender: true,
  setup(__props) {
    const reviews2 = [
      { title: "Frieren: Beyond Journey's End", score: 9.8, author: "animefan_ph", excerpt: "A masterclass in slow, meaningful storytelling. Frieren redefines what a fantasy adventure can be.", genre: "Fantasy", type: "anime" },
      { title: "Demon Slayer: Infinity Castle Arc", score: 9.5, author: "otaku_reviews", excerpt: "The animation quality alone makes this a landmark moment in anime history.", genre: "Action", type: "anime" },
      { title: "Dune: Part Two", score: 9.1, author: "filmcritic22", excerpt: "Villeneuve delivers an epic that feels both intimate and universe-spanning.", genre: "Sci-Fi", type: "film" },
      { title: "Solo Leveling", score: 8.7, author: "levelup_reviews", excerpt: "The power fantasy done right. Visually stunning from start to finish.", genre: "Action", type: "anime" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page" }, _attrs))} data-v-17db8f08><section class="hero" data-v-17db8f08><div class="hero-bg" data-v-17db8f08></div><div class="hero-content" data-v-17db8f08><span class="tag" data-v-17db8f08>Community</span><h1 class="title" data-v-17db8f08>Anime &amp; Film <span class="accent" data-v-17db8f08>Reviews</span></h1><p class="sub" data-v-17db8f08>Honest reviews from real fans.</p></div></section><main class="wrap" data-v-17db8f08><div class="coming-banner" data-v-17db8f08><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-17db8f08><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" data-v-17db8f08></path><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" data-v-17db8f08></path></svg><div data-v-17db8f08><strong data-v-17db8f08>Reviews coming soon</strong><p data-v-17db8f08>User-submitted reviews are on the way. Here&#39;s a preview of the format.</p></div></div><div class="review-list" data-v-17db8f08><!--[-->`);
      ssrRenderList(reviews2, (r) => {
        _push(`<div class="review-card" data-v-17db8f08><div class="review-header" data-v-17db8f08><div data-v-17db8f08><span class="${ssrRenderClass(["type-badge", r.type])}" data-v-17db8f08>${ssrInterpolate(r.type === "film" ? "FILM" : "ANIME")}</span><h3 class="review-title" data-v-17db8f08>${ssrInterpolate(r.title)}</h3><span class="review-genre" data-v-17db8f08>${ssrInterpolate(r.genre)}</span></div><div class="score-ring" data-v-17db8f08><span class="score-val" data-v-17db8f08>${ssrInterpolate(r.score)}</span></div></div><p class="review-excerpt" data-v-17db8f08>&quot;${ssrInterpolate(r.excerpt)}&quot;</p><span class="review-author" data-v-17db8f08>\u2014 ${ssrInterpolate(r.author)}</span></div>`);
      });
      _push(`<!--]--></div><div class="cta" data-v-17db8f08><p data-v-17db8f08>Want to write reviews when the feature launches?</p><a href="/contact" class="cta-btn" data-v-17db8f08>Notify Me \u2192</a></div></main>`);
      _push(ssrRenderComponent(AppFooter, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/reviews.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const reviews = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-17db8f08"]]);

export { reviews as default };
//# sourceMappingURL=reviews-CsQO1AdQ.mjs.map
