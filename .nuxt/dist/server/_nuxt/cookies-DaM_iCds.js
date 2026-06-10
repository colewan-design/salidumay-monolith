import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrRenderComponent } from "vue/server-renderer";
import { A as AppFooter } from "./AppFooter-DakCUiQ2.js";
import { _ as _export_sfc } from "../server.mjs";
import "vue-router";
import "C:/salidumay-nuxt/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "C:/salidumay-nuxt/node_modules/hookable/dist/index.mjs";
import "C:/salidumay-nuxt/node_modules/unctx/dist/index.mjs";
import "C:/salidumay-nuxt/node_modules/h3/dist/index.mjs";
import "C:/salidumay-nuxt/node_modules/defu/dist/defu.mjs";
import "C:/salidumay-nuxt/node_modules/ufo/dist/index.mjs";
const _sfc_main = {
  __name: "cookies",
  __ssrInlineRender: true,
  setup(__props) {
    const cookies2 = [
      { name: "session", purpose: "Keeps you logged in across page loads", duration: "Session", essential: true },
      { name: "auth_token", purpose: "Authenticates your requests to our API", duration: "7 days", essential: true },
      { name: "theme_pref", purpose: "Remembers your display preferences", duration: "1 year", essential: false }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page" }, _attrs))} data-v-7d8d1c7a><section class="hero" data-v-7d8d1c7a><div class="hero-bg" data-v-7d8d1c7a></div><div class="hero-content" data-v-7d8d1c7a><span class="tag" data-v-7d8d1c7a>Legal</span><h1 class="title" data-v-7d8d1c7a>Cookie <span class="accent" data-v-7d8d1c7a>Policy</span></h1><p class="sub" data-v-7d8d1c7a>Last updated: May 2025</p></div></section><main class="wrap" data-v-7d8d1c7a><div class="doc" data-v-7d8d1c7a><section class="doc-section" data-v-7d8d1c7a><h2 data-v-7d8d1c7a>What are cookies?</h2><p data-v-7d8d1c7a>Cookies are small text files stored on your device by your browser. They allow websites to remember information about your visit, like whether you&#39;re logged in.</p></section><section class="doc-section" data-v-7d8d1c7a><h2 data-v-7d8d1c7a>Cookies we use</h2><p data-v-7d8d1c7a>We use only essential cookies required for the platform to function. We do <strong data-v-7d8d1c7a>not</strong> use advertising cookies, analytics tracking cookies, or any third-party marketing cookies.</p><div class="cookie-table" data-v-7d8d1c7a><div class="table-head" data-v-7d8d1c7a><span data-v-7d8d1c7a>Cookie</span><span data-v-7d8d1c7a>Purpose</span><span data-v-7d8d1c7a>Duration</span><span data-v-7d8d1c7a>Type</span></div><!--[-->`);
      ssrRenderList(cookies2, (c) => {
        _push(`<div class="table-row" data-v-7d8d1c7a><span class="cookie-name" data-v-7d8d1c7a>${ssrInterpolate(c.name)}</span><span data-v-7d8d1c7a>${ssrInterpolate(c.purpose)}</span><span data-v-7d8d1c7a>${ssrInterpolate(c.duration)}</span><span class="${ssrRenderClass(["cookie-type", c.essential ? "essential" : "optional"])}" data-v-7d8d1c7a>${ssrInterpolate(c.essential ? "Essential" : "Optional")}</span></div>`);
      });
      _push(`<!--]--></div></section><section class="doc-section" data-v-7d8d1c7a><h2 data-v-7d8d1c7a>Third-party cookies</h2><p data-v-7d8d1c7a>Embedded video players from third-party providers (VidSrc, 2Embed, etc.) may set their own cookies when you play a video. These are outside our control — refer to each provider&#39;s cookie policy for details.</p></section><section class="doc-section" data-v-7d8d1c7a><h2 data-v-7d8d1c7a>Managing cookies</h2><p data-v-7d8d1c7a>You can control or delete cookies through your browser settings. Disabling essential cookies will prevent you from staying logged in. No other functionality will be affected.</p></section><section class="doc-section" data-v-7d8d1c7a><h2 data-v-7d8d1c7a>Contact</h2><p data-v-7d8d1c7a>Questions? <a href="/contact" data-v-7d8d1c7a>Contact us</a>.</p></section></div></main>`);
      _push(ssrRenderComponent(AppFooter, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/cookies.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const cookies = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-7d8d1c7a"]]);
export {
  cookies as default
};
//# sourceMappingURL=cookies-DaM_iCds.js.map
