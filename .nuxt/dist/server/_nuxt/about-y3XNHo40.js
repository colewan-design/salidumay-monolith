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
  __name: "about",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page" }, _attrs))} data-v-2f20ebc5><section class="hero" data-v-2f20ebc5><div class="hero-bg" data-v-2f20ebc5></div><div class="hero-content" data-v-2f20ebc5><span class="tag" data-v-2f20ebc5>Our Story</span><h1 class="title" data-v-2f20ebc5>About <span class="accent" data-v-2f20ebc5>Salidumay</span></h1><p class="sub" data-v-2f20ebc5>A song of hope for every anime fan.</p></div></section><main class="wrap" data-v-2f20ebc5><div class="section" data-v-2f20ebc5><h2 class="section-title" data-v-2f20ebc5>What is Salidumay?</h2><p class="body-text" data-v-2f20ebc5>Salidumay is an anime and film discovery platform built for fans who are tired of hunting across a dozen sites. We bring together trending anime, seasonal picks, top rankings, community reviews, and film discovery — all in one place, with a clean experience that gets out of your way.</p><p class="body-text" data-v-2f20ebc5>The name comes from a traditional Filipino folk song — a hopeful melody passed down through generations. For us, it represents the universal language of storytelling that anime and film speak across every culture.</p></div><div class="cards" data-v-2f20ebc5><div class="card" data-v-2f20ebc5><div class="card-icon" data-v-2f20ebc5>🎌</div><h3 data-v-2f20ebc5>Built for Fans</h3><p data-v-2f20ebc5>Every feature is designed around how anime fans actually watch — tracking episodes, exploring genres, finding hidden gems.</p></div><div class="card" data-v-2f20ebc5><div class="card-icon" data-v-2f20ebc5>🎬</div><h3 data-v-2f20ebc5>Anime &amp; Film</h3><p data-v-2f20ebc5>We cover both anime and mainstream cinema. Whether it&#39;s the latest seasonal or a classic Hollywood blockbuster, you&#39;ll find it here.</p></div><div class="card" data-v-2f20ebc5><div class="card-icon" data-v-2f20ebc5>🌏</div><h3 data-v-2f20ebc5>Community First</h3><p data-v-2f20ebc5>Reviews, watch lists, and recommendations from real fans — not algorithms trying to sell you something.</p></div></div><div class="section" data-v-2f20ebc5><h2 class="section-title" data-v-2f20ebc5>Our Mission</h2><p class="body-text" data-v-2f20ebc5>We believe great storytelling deserves a great home. Our mission is to make anime and film discovery effortless — helping you spend less time searching and more time watching.</p></div><div class="section" data-v-2f20ebc5><h2 class="section-title" data-v-2f20ebc5>Built With</h2><div class="tech-row" data-v-2f20ebc5><span class="tech-badge" data-v-2f20ebc5>Vue 3</span><span class="tech-badge" data-v-2f20ebc5>Laravel</span><span class="tech-badge" data-v-2f20ebc5>TMDB</span><span class="tech-badge" data-v-2f20ebc5>Consumet</span><span class="tech-badge" data-v-2f20ebc5>HLS.js</span></div></div></main>`);
      _push(ssrRenderComponent(AppFooter, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/about.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const about = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2f20ebc5"]]);
export {
  about as default
};
//# sourceMappingURL=about-y3XNHo40.js.map
