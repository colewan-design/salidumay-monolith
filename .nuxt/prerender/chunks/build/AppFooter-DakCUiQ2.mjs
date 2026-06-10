import { mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'file://C:/salidumay-nuxt/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent } from 'file://C:/salidumay-nuxt/node_modules/vue/server-renderer/index.mjs';
import { RouterLink } from 'file://C:/salidumay-nuxt/node_modules/vue-router/vue-router.node.mjs';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main = {
  __name: "AppFooter",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "footer" }, _attrs))} data-v-5484fafe><div class="footer-inner" data-v-5484fafe><div class="footer-brand" data-v-5484fafe><div class="logo" data-v-5484fafe><span class="logo-kanji" data-v-5484fafe>\u30B5</span></div><p class="footer-tagline" data-v-5484fafe>Salidumay \u2014 a song of hope for every anime fan.</p><div class="socials" data-v-5484fafe><a href="#" class="social" aria-label="Twitter/X" data-v-5484fafe><svg viewBox="0 0 24 24" fill="currentColor" data-v-5484fafe><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" data-v-5484fafe></path></svg></a><a href="#" class="social" aria-label="Discord" data-v-5484fafe><svg viewBox="0 0 24 24" fill="currentColor" data-v-5484fafe><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" data-v-5484fafe></path></svg></a><a href="#" class="social" aria-label="Reddit" data-v-5484fafe><svg viewBox="0 0 24 24" fill="currentColor" data-v-5484fafe><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" data-v-5484fafe></path></svg></a><a href="#" class="social" aria-label="YouTube" data-v-5484fafe><svg viewBox="0 0 24 24" fill="currentColor" data-v-5484fafe><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" data-v-5484fafe></path></svg></a></div></div><div class="footer-links-group" data-v-5484fafe><h4 data-v-5484fafe>Browse</h4><ul data-v-5484fafe><li data-v-5484fafe>`);
      _push(ssrRenderComponent(unref(RouterLink), { to: "/trending" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Trending`);
          } else {
            return [
              createTextVNode("Trending")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li data-v-5484fafe>`);
      _push(ssrRenderComponent(unref(RouterLink), { to: "/seasonal" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Seasonal`);
          } else {
            return [
              createTextVNode("Seasonal")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li data-v-5484fafe>`);
      _push(ssrRenderComponent(unref(RouterLink), { to: "/rankings" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Top Anime`);
          } else {
            return [
              createTextVNode("Top Anime")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li data-v-5484fafe>`);
      _push(ssrRenderComponent(unref(RouterLink), { to: "/genre" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Genres`);
          } else {
            return [
              createTextVNode("Genres")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul></div><div class="footer-links-group" data-v-5484fafe><h4 data-v-5484fafe>Community</h4><ul data-v-5484fafe><li data-v-5484fafe>`);
      _push(ssrRenderComponent(unref(RouterLink), { to: "/forum" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Forum`);
          } else {
            return [
              createTextVNode("Forum")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li data-v-5484fafe>`);
      _push(ssrRenderComponent(unref(RouterLink), { to: "/reviews" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Reviews`);
          } else {
            return [
              createTextVNode("Reviews")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li data-v-5484fafe>`);
      _push(ssrRenderComponent(unref(RouterLink), { to: "/watchlists" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Watch Lists`);
          } else {
            return [
              createTextVNode("Watch Lists")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li data-v-5484fafe>`);
      _push(ssrRenderComponent(unref(RouterLink), { to: "/recommendations" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Recommendations`);
          } else {
            return [
              createTextVNode("Recommendations")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul></div><div class="footer-links-group" data-v-5484fafe><h4 data-v-5484fafe>Company</h4><ul data-v-5484fafe><li data-v-5484fafe>`);
      _push(ssrRenderComponent(unref(RouterLink), { to: "/about" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`About Us`);
          } else {
            return [
              createTextVNode("About Us")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li data-v-5484fafe>`);
      _push(ssrRenderComponent(unref(RouterLink), { to: "/press" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Press Kit`);
          } else {
            return [
              createTextVNode("Press Kit")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li data-v-5484fafe>`);
      _push(ssrRenderComponent(unref(RouterLink), { to: "/careers" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Careers`);
          } else {
            return [
              createTextVNode("Careers")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li data-v-5484fafe>`);
      _push(ssrRenderComponent(unref(RouterLink), { to: "/contact" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Contact`);
          } else {
            return [
              createTextVNode("Contact")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul></div></div><div class="footer-bottom" data-v-5484fafe><span data-v-5484fafe>\xA9 2025 Salidumay. Built for anime fans, by anime fans.</span><div class="legal-links" data-v-5484fafe>`);
      _push(ssrRenderComponent(unref(RouterLink), { to: "/privacy" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Privacy`);
          } else {
            return [
              createTextVNode("Privacy")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(RouterLink), { to: "/terms" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Terms`);
          } else {
            return [
              createTextVNode("Terms")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(RouterLink), { to: "/cookies" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Cookies`);
          } else {
            return [
              createTextVNode("Cookies")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></footer>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppFooter.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const AppFooter = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-5484fafe"]]);

export { AppFooter as A };
//# sourceMappingURL=AppFooter-DakCUiQ2.mjs.map
