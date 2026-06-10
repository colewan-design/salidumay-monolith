import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
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
  __name: "careers",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page" }, _attrs))} data-v-5f194816><section class="hero" data-v-5f194816><div class="hero-bg" data-v-5f194816></div><div class="hero-content" data-v-5f194816><span class="tag" data-v-5f194816>Join the Team</span><h1 class="title" data-v-5f194816>Careers at <span class="accent" data-v-5f194816>Salidumay</span></h1><p class="sub" data-v-5f194816>Help us build the best anime and film platform on the web.</p></div></section><main class="wrap" data-v-5f194816><div class="values-grid" data-v-5f194816><div class="value" data-v-5f194816><span class="value-icon" data-v-5f194816>🎌</span><h3 data-v-5f194816>Passion-driven</h3><p data-v-5f194816>We&#39;re fans first. Everyone here watches anime and cares deeply about the product.</p></div><div class="value" data-v-5f194816><span class="value-icon" data-v-5f194816>🌐</span><h3 data-v-5f194816>Remote-first</h3><p data-v-5f194816>Work from anywhere. We believe great work happens wherever you&#39;re most comfortable.</p></div><div class="value" data-v-5f194816><span class="value-icon" data-v-5f194816>🚀</span><h3 data-v-5f194816>Ship fast</h3><p data-v-5f194816>Small team, big impact. No endless meetings — just building things people love.</p></div></div><div class="no-openings" data-v-5f194816><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-v-5f194816><rect x="2" y="7" width="20" height="14" rx="2" data-v-5f194816></rect><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" data-v-5f194816></path><line x1="12" y1="12" x2="12" y2="16" data-v-5f194816></line><line x1="10" y1="14" x2="14" y2="14" data-v-5f194816></line></svg><h2 data-v-5f194816>No open positions right now</h2><p data-v-5f194816>We&#39;re a small team and hire rarely — but when we do, we look for people who are genuinely obsessed with anime and building great software.</p><p data-v-5f194816>Drop us your details and we&#39;ll reach out if something comes up.</p><a href="/contact" class="notify-btn" data-v-5f194816>Get Notified →</a></div></main>`);
      _push(ssrRenderComponent(AppFooter, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/careers.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const careers = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-5f194816"]]);
export {
  careers as default
};
//# sourceMappingURL=careers-D_zCySsq.js.map
