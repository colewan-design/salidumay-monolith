import { ref, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderStyle, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderComponent } from "vue/server-renderer";
import { A as AppFooter } from "./AppFooter-DakCUiQ2.js";
import "./api-CaxJTo2b.js";
import { _ as _export_sfc, c as useRouter } from "../server.mjs";
import "vue-router";
import "axios";
import "C:/salidumay-nuxt/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "C:/salidumay-nuxt/node_modules/hookable/dist/index.mjs";
import "C:/salidumay-nuxt/node_modules/unctx/dist/index.mjs";
import "C:/salidumay-nuxt/node_modules/h3/dist/index.mjs";
import "C:/salidumay-nuxt/node_modules/defu/dist/defu.mjs";
import "C:/salidumay-nuxt/node_modules/ufo/dist/index.mjs";
const _sfc_main = {
  __name: "rankings",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const items = ref([]);
    const loading = ref(true);
    const loadingMore = ref(false);
    ref(1);
    const hasNext = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page" }, _attrs))} data-v-25af119e><section class="banner" data-v-25af119e><div class="banner-bg" data-v-25af119e></div><div class="banner-content" data-v-25af119e><span class="tag" data-v-25af119e>Hall of Fame</span><h1 class="title" data-v-25af119e>Full <span class="accent" data-v-25af119e>Rankings</span></h1><p class="sub" data-v-25af119e>Every anime ranked by popularity</p></div></section><main class="wrap" data-v-25af119e>`);
      if (loading.value) {
        _push(`<div class="rank-list" data-v-25af119e><!--[-->`);
        ssrRenderList(25, (n) => {
          _push(`<div class="rank-item skeleton-item" data-v-25af119e><div class="skeleton rank-num-sk" data-v-25af119e></div><div class="skeleton thumb-sk" data-v-25af119e></div><div class="info-sk" data-v-25af119e><div class="skeleton line-sk" style="${ssrRenderStyle({ "width": "60%" })}" data-v-25af119e></div><div class="skeleton line-sk" style="${ssrRenderStyle({ "width": "35%", "margin-top": ".4rem" })}" data-v-25af119e></div></div><div class="skeleton score-sk" data-v-25af119e></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="rank-list" data-v-25af119e><!--[-->`);
        ssrRenderList(items.value, (anime, i) => {
          _push(`<article class="rank-item" data-v-25af119e><span class="${ssrRenderClass([{ gold: i === 0, silver: i === 1, bronze: i === 2 }, "rank-num"])}" data-v-25af119e>${ssrInterpolate(i < 3 ? ["🥇", "🥈", "🥉"][i] : `#${i + 1}`)}</span><img class="thumb"${ssrRenderAttr("src", anime.image)}${ssrRenderAttr("alt", anime.title)} loading="lazy" data-v-25af119e><div class="info" data-v-25af119e><h3 class="anime-title" data-v-25af119e>${ssrInterpolate(anime.title)}</h3><div class="info-meta" data-v-25af119e><span class="genre-tag" data-v-25af119e>${ssrInterpolate(anime.genre)}</span><span data-v-25af119e>${ssrInterpolate(anime.studio)}</span>`);
          if (anime.year) {
            _push(`<span data-v-25af119e>${ssrInterpolate(anime.year)}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<span data-v-25af119e>${ssrInterpolate(anime.episodes)} ep</span></div></div><div class="score-wrap" data-v-25af119e><span class="score" data-v-25af119e>${ssrInterpolate(typeof anime.rating === "number" ? anime.rating.toFixed(2) : "—")}</span><span class="score-label" data-v-25af119e>Score</span>`);
          if (anime.members) {
            _push(`<span class="members" data-v-25af119e>${ssrInterpolate((anime.members / 1e3).toFixed(0))}K</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></article>`);
        });
        _push(`<!--]--></div>`);
      }
      if (!loading.value && hasNext.value) {
        _push(`<div class="load-more-wrap" data-v-25af119e><button class="load-more-btn"${ssrIncludeBooleanAttr(loadingMore.value) ? " disabled" : ""} data-v-25af119e>`);
        if (loadingMore.value) {
          _push(`<span class="spin" data-v-25af119e></span>`);
        } else {
          _push(`<span data-v-25af119e>Load More</span>`);
        }
        _push(`</button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</main>`);
      _push(ssrRenderComponent(AppFooter, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/rankings.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const rankings = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-25af119e"]]);
export {
  rankings as default
};
//# sourceMappingURL=rankings-B4HJHtCy.js.map
