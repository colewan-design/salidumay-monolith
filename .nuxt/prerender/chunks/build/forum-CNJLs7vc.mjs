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
  __name: "forum",
  __ssrInlineRender: true,
  setup(__props) {
    const threads = [
      { title: "What anime are you watching this season?", replies: 142, views: "3.2k", tag: "Discussion", hot: true },
      { title: "Best anime openings of all time \u2014 rank them", replies: 87, views: "1.8k", tag: "Top Lists", hot: true },
      { title: "Hidden gems you'd recommend to anyone", replies: 64, views: "940", tag: "Recommendations" },
      { title: "Attack on Titan finale \u2014 your thoughts", replies: 211, views: "5.1k", tag: "Spoilers" },
      { title: "Underrated isekai that deserve more attention", replies: 39, views: "620", tag: "Isekai" },
      { title: "Which streaming service has the best anime library?", replies: 55, views: "1.1k", tag: "Discussion" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page" }, _attrs))} data-v-e551b0aa><section class="hero" data-v-e551b0aa><div class="hero-bg" data-v-e551b0aa></div><div class="hero-content" data-v-e551b0aa><span class="tag" data-v-e551b0aa>Community</span><h1 class="title" data-v-e551b0aa>Anime <span class="accent" data-v-e551b0aa>Forum</span></h1><p class="sub" data-v-e551b0aa>Discuss, debate, and discover with fellow fans.</p></div></section><main class="wrap" data-v-e551b0aa><div class="coming-banner" data-v-e551b0aa><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-e551b0aa><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" data-v-e551b0aa></path></svg><div data-v-e551b0aa><strong data-v-e551b0aa>Forum coming soon</strong><p data-v-e551b0aa>Full forum functionality is in development. Here&#39;s a preview of what&#39;s coming.</p></div></div><div class="threads" data-v-e551b0aa><!--[-->`);
      ssrRenderList(threads, (thread) => {
        _push(`<div class="thread" data-v-e551b0aa><div class="thread-main" data-v-e551b0aa><span class="${ssrRenderClass(["thread-tag", thread.tag === "Spoilers" ? "red" : thread.tag === "Top Lists" ? "purple" : ""])}" data-v-e551b0aa>${ssrInterpolate(thread.tag)}</span><h3 class="thread-title" data-v-e551b0aa>${ssrInterpolate(thread.title)}</h3></div><div class="thread-meta" data-v-e551b0aa>`);
        if (thread.hot) {
          _push(`<span class="hot-badge" data-v-e551b0aa>\u{1F525} Hot</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<span data-v-e551b0aa>${ssrInterpolate(thread.replies)} replies</span><span data-v-e551b0aa>${ssrInterpolate(thread.views)} views</span></div></div>`);
      });
      _push(`<!--]--></div><div class="cta" data-v-e551b0aa><p data-v-e551b0aa>Want to be notified when the forum launches?</p><a href="/contact" class="cta-btn" data-v-e551b0aa>Notify Me \u2192</a></div></main>`);
      _push(ssrRenderComponent(AppFooter, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/forum.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const forum = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e551b0aa"]]);

export { forum as default };
//# sourceMappingURL=forum-CNJLs7vc.mjs.map
