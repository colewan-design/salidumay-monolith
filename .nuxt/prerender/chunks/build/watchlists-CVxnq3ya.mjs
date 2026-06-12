import { _ as __nuxt_component_0 } from './nuxt-link-BPQThyuX.mjs';
import { mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'file://C:/salidumay-nuxt/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent } from 'file://C:/salidumay-nuxt/node_modules/vue/server-renderer/index.mjs';
import { A as AppFooter } from './AppFooter-DakCUiQ2.mjs';
import { u as useAuth } from './useAuth-CsDdxmPs.mjs';
import { _ as _export_sfc } from './server.mjs';
import 'file://C:/salidumay-nuxt/node_modules/ufo/dist/index.mjs';
import 'file://C:/salidumay-nuxt/node_modules/vue-router/vue-router.node.mjs';
import 'file://C:/salidumay-nuxt/node_modules/axios/index.js';
import 'file://C:/salidumay-nuxt/node_modules/ofetch/dist/node.mjs';
import '../_/renderer.mjs';
import 'file://C:/salidumay-nuxt/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file://C:/salidumay-nuxt/node_modules/h3/dist/index.mjs';
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
  __name: "watchlists",
  __ssrInlineRender: true,
  setup(__props) {
    const { isLoggedIn } = useAuth();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page" }, _attrs))} data-v-7cc63c93><section class="hero" data-v-7cc63c93><div class="hero-bg" data-v-7cc63c93></div><div class="hero-content" data-v-7cc63c93><span class="tag" data-v-7cc63c93>Community</span><h1 class="title" data-v-7cc63c93>Watch <span class="accent" data-v-7cc63c93>Lists</span></h1><p class="sub" data-v-7cc63c93>Curated anime &amp; film lists from the community.</p></div></section><main class="wrap" data-v-7cc63c93><div class="coming-banner" data-v-7cc63c93><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-7cc63c93><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" data-v-7cc63c93></path></svg><div data-v-7cc63c93><strong data-v-7cc63c93>Public watch lists coming soon</strong><p data-v-7cc63c93>Share your anime and film lists with the community. In the meantime, use your personal Library to save titles.</p></div></div><div class="preview-lists" data-v-7cc63c93><div class="list-card" data-v-7cc63c93><div class="list-header" data-v-7cc63c93><div class="list-avatar" data-v-7cc63c93>M</div><div data-v-7cc63c93><span class="list-name" data-v-7cc63c93>Must-watch before you die</span><span class="list-author" data-v-7cc63c93>by mikasa_fan</span></div><span class="list-count" data-v-7cc63c93>24 titles</span></div><div class="list-tags" data-v-7cc63c93><span data-v-7cc63c93>Action</span><span data-v-7cc63c93>Drama</span><span data-v-7cc63c93>Classic</span></div></div><div class="list-card" data-v-7cc63c93><div class="list-header" data-v-7cc63c93><div class="list-avatar" data-v-7cc63c93>S</div><div data-v-7cc63c93><span class="list-name" data-v-7cc63c93>Best anime for newcomers</span><span class="list-author" data-v-7cc63c93>by senpai_guide</span></div><span class="list-count" data-v-7cc63c93>12 titles</span></div><div class="list-tags" data-v-7cc63c93><span data-v-7cc63c93>Beginner</span><span data-v-7cc63c93>Popular</span></div></div><div class="list-card" data-v-7cc63c93><div class="list-header" data-v-7cc63c93><div class="list-avatar" data-v-7cc63c93>R</div><div data-v-7cc63c93><span class="list-name" data-v-7cc63c93>Cry your eyes out \u2014 sad anime</span><span class="list-author" data-v-7cc63c93>by realhuman_tears</span></div><span class="list-count" data-v-7cc63c93>18 titles</span></div><div class="list-tags" data-v-7cc63c93><span data-v-7cc63c93>Drama</span><span data-v-7cc63c93>Romance</span></div></div></div><div class="cta-split" data-v-7cc63c93>`);
      if (unref(isLoggedIn)) {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/library",
          class: "cta-btn primary"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Go to My Library \u2192 `);
            } else {
              return [
                createTextVNode(" Go to My Library \u2192 ")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/register",
          class: "cta-btn primary"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Create Account`);
            } else {
              return [
                createTextVNode("Create Account")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/login",
          class: "cta-btn"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Sign In`);
            } else {
              return [
                createTextVNode("Sign In")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<!--]-->`);
      }
      _push(`</div></main>`);
      _push(ssrRenderComponent(AppFooter, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/watchlists.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const watchlists = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-7cc63c93"]]);

export { watchlists as default };
//# sourceMappingURL=watchlists-CVxnq3ya.mjs.map
