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
  __name: "press",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page" }, _attrs))} data-v-bd54c0a6><section class="hero" data-v-bd54c0a6><div class="hero-bg" data-v-bd54c0a6></div><div class="hero-content" data-v-bd54c0a6><span class="tag" data-v-bd54c0a6>Media</span><h1 class="title" data-v-bd54c0a6>Press <span class="accent" data-v-bd54c0a6>Kit</span></h1><p class="sub" data-v-bd54c0a6>Resources for journalists, bloggers, and content creators.</p></div></section><main class="wrap" data-v-bd54c0a6><div class="section" data-v-bd54c0a6><h2 class="section-title" data-v-bd54c0a6>About Salidumay</h2><p class="body-text" data-v-bd54c0a6>Salidumay is a free anime and film discovery platform serving fans worldwide. We provide a unified browsing experience for trending anime, seasonal charts, top rankings, and mainstream cinema — all backed by community-driven content.</p><p class="body-text" data-v-bd54c0a6>The platform is built with Vue 3 and Laravel, powered by data from TMDB and anime databases, and designed to be fast, clean, and accessible on any device.</p></div><div class="stats-row" data-v-bd54c0a6><div class="stat" data-v-bd54c0a6><span class="stat-num" data-v-bd54c0a6>13,000+</span><span class="stat-label" data-v-bd54c0a6>Films in Library</span></div><div class="stat" data-v-bd54c0a6><span class="stat-num" data-v-bd54c0a6>Free</span><span class="stat-label" data-v-bd54c0a6>Always</span></div><div class="stat" data-v-bd54c0a6><span class="stat-num" data-v-bd54c0a6>2025</span><span class="stat-label" data-v-bd54c0a6>Founded</span></div></div><div class="section" data-v-bd54c0a6><h2 class="section-title" data-v-bd54c0a6>Brand Assets</h2><p class="body-text" data-v-bd54c0a6>Use these assets when writing about or featuring Salidumay. Please do not modify the logo or use it in a misleading context.</p><div class="assets-grid" data-v-bd54c0a6><div class="asset-card" data-v-bd54c0a6><div class="asset-preview logo-preview" data-v-bd54c0a6><span class="logo-kanji" data-v-bd54c0a6>サ</span><span class="logo-name" data-v-bd54c0a6>Salidumay</span></div><div class="asset-meta" data-v-bd54c0a6><span class="asset-name" data-v-bd54c0a6>Primary Logo</span><span class="asset-format" data-v-bd54c0a6>SVG / PNG</span></div></div><div class="asset-card" data-v-bd54c0a6><div class="asset-preview icon-preview" data-v-bd54c0a6><span class="logo-kanji" data-v-bd54c0a6>サ</span></div><div class="asset-meta" data-v-bd54c0a6><span class="asset-name" data-v-bd54c0a6>Icon Mark</span><span class="asset-format" data-v-bd54c0a6>SVG / PNG</span></div></div></div></div><div class="section" data-v-bd54c0a6><h2 class="section-title" data-v-bd54c0a6>Press Contact</h2><p class="body-text" data-v-bd54c0a6>For press inquiries, interview requests, or partnership opportunities:</p><a href="/contact" class="contact-link" data-v-bd54c0a6>press@salidumay.com →</a></div></main>`);
      _push(ssrRenderComponent(AppFooter, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/press.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const press = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-bd54c0a6"]]);
export {
  press as default
};
//# sourceMappingURL=press-Dr2TKz2l.js.map
