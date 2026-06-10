import { ref, computed, mergeProps, watch, resolveComponent, withCtx, createTextVNode, unref, useSSRContext } from 'file://C:/salidumay-nuxt/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrRenderStyle, ssrInterpolate, ssrRenderTeleport, ssrRenderAttr } from 'file://C:/salidumay-nuxt/node_modules/vue/server-renderer/index.mjs';
import { useRouter } from 'file://C:/salidumay-nuxt/node_modules/vue-router/vue-router.node.mjs';
import { _ as _export_sfc } from './server.mjs';
import { g as getLibrary } from './userdata-CGpZM_-a.mjs';
import { A as AppFooter } from './AppFooter-DakCUiQ2.mjs';
import { a as useSeoMeta } from './v3-BGyVWe_n.mjs';
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
import 'file://C:/salidumay-nuxt/node_modules/axios/index.js';

const intervalError = "[nuxt] `setInterval` should not be used on the server. Consider wrapping it with an `onNuxtReady`, `onBeforeMount` or `onMounted` lifecycle hook, or ensure you only call it in the browser by checking `false`.";
const setInterval = (() => {
  console.error(intervalError);
});
const _sfc_main$8 = {
  __name: "HeroSection",
  __ssrInlineRender: true,
  props: {
    items: { type: Array, default: () => [] },
    loading: { type: Boolean, default: true }
  },
  setup(__props) {
    const props = __props;
    useRouter();
    const current = ref(0);
    const visible = ref(true);
    const expanded = ref(false);
    const showTrailer = ref(false);
    let timer = null;
    const active = computed(() => props.items[current.value] || null);
    function resetTimer() {
      clearInterval(timer);
      if (props.items.length < 2) return;
      timer = setInterval();
    }
    watch(() => props.items, (v) => {
      if (v.length) resetTimer();
    }, { immediate: true });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "hero" }, _attrs))} data-v-f2e69ef2><div class="hero-bg-wrap" data-v-f2e69ef2><!--[-->`);
      ssrRenderList(__props.items, (item, i) => {
        _push(`<div class="${ssrRenderClass([{ active: i === current.value }, "hero-bg"])}" style="${ssrRenderStyle(`background-image: url('${item.backdrop || item.image}')`)}" data-v-f2e69ef2></div>`);
      });
      _push(`<!--]--><div class="overlay-left" data-v-f2e69ef2></div><div class="overlay-bottom" data-v-f2e69ef2></div><div class="overlay-full" data-v-f2e69ef2></div></div>`);
      if (__props.loading) {
        _push(`<div class="hero-content" data-v-f2e69ef2><div class="skeleton sk-tag" data-v-f2e69ef2></div><div class="skeleton sk-title" data-v-f2e69ef2></div><div class="skeleton sk-title2" data-v-f2e69ef2></div><div class="skeleton sk-synopsis" data-v-f2e69ef2></div><div class="skeleton sk-meta" data-v-f2e69ef2></div><div class="sk-btns" data-v-f2e69ef2><div class="skeleton sk-btn" data-v-f2e69ef2></div><div class="skeleton sk-btn" data-v-f2e69ef2></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!__props.loading && active.value && visible.value) {
        _push(`<div class="hero-content" data-v-f2e69ef2><div class="hero-top-badges" data-v-f2e69ef2><span class="genre-tag" data-v-f2e69ef2>${ssrInterpolate(active.value.genre)}</span>`);
        if (active.value.rating) {
          _push(`<span class="rating-pill" data-v-f2e69ef2><svg viewBox="0 0 24 24" fill="currentColor" width="11" height="11" data-v-f2e69ef2><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" data-v-f2e69ef2></path></svg> ${ssrInterpolate(typeof active.value.rating === "number" ? active.value.rating.toFixed(1) : active.value.rating)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><h1 class="hero-title" data-v-f2e69ef2>${ssrInterpolate(active.value.title)}</h1><div class="synopsis-wrap" data-v-f2e69ef2><p class="${ssrRenderClass([{ expanded: expanded.value }, "hero-synopsis"])}" data-v-f2e69ef2>${ssrInterpolate(active.value.synopsis)}</p>`);
        if (((_a = active.value.synopsis) == null ? void 0 : _a.length) > 160) {
          _push(`<button class="synopsis-more" data-v-f2e69ef2>${ssrInterpolate(expanded.value ? "See less \u2191" : "See more \u2193")}</button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="meta-row" data-v-f2e69ef2><div class="meta-item" data-v-f2e69ef2><span class="meta-label" data-v-f2e69ef2>FORMAT</span><span class="meta-value" data-v-f2e69ef2>TV</span></div><div class="meta-item" data-v-f2e69ef2><span class="meta-label" data-v-f2e69ef2>RELEASED</span><span class="meta-value" data-v-f2e69ef2>${ssrInterpolate(active.value.year || "\u2014")}</span></div><div class="meta-item" data-v-f2e69ef2><span class="meta-label" data-v-f2e69ef2>EPISODES</span><span class="meta-value" data-v-f2e69ef2>${ssrInterpolate(active.value.episodes || "\u2014")}</span></div><div class="meta-item" data-v-f2e69ef2><span class="meta-label" data-v-f2e69ef2>STATUS</span><span class="${ssrRenderClass([active.value.status === "Airing" ? "status-airing" : "status-done", "meta-value"])}" data-v-f2e69ef2>${ssrInterpolate(active.value.status === "Airing" ? "ONGOING" : "FINISHED")}</span></div>`);
        if (active.value.studio) {
          _push(`<div class="meta-item" data-v-f2e69ef2><span class="meta-label" data-v-f2e69ef2>STUDIO</span><span class="meta-value" data-v-f2e69ef2>${ssrInterpolate(active.value.studio)}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="hero-actions" data-v-f2e69ef2><button class="btn-watch" data-v-f2e69ef2><svg viewBox="0 0 24 24" fill="currentColor" data-v-f2e69ef2><path d="M8 5v14l11-7z" data-v-f2e69ef2></path></svg> WATCH NOW </button>`);
        if (active.value.trailerUrl) {
          _push(`<button class="btn-trailer" data-v-f2e69ef2><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-f2e69ef2><polygon points="23 7 16 12 23 17 23 7" data-v-f2e69ef2></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2" data-v-f2e69ef2></rect></svg> TRAILER </button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<button class="btn-details" data-v-f2e69ef2><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-f2e69ef2><circle cx="12" cy="12" r="10" data-v-f2e69ef2></circle><line x1="12" y1="8" x2="12" y2="12" data-v-f2e69ef2></line><line x1="12" y1="16" x2="12.01" y2="16" data-v-f2e69ef2></line></svg> DETAILS </button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      ssrRenderTeleport(_push, (_push2) => {
        var _a2;
        if (showTrailer.value && ((_a2 = active.value) == null ? void 0 : _a2.trailerUrl)) {
          _push2(`<div class="trailer-modal" data-v-f2e69ef2><div class="trailer-box" data-v-f2e69ef2><button class="trailer-close" data-v-f2e69ef2><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" data-v-f2e69ef2><path d="M18 6 6 18M6 6l12 12" data-v-f2e69ef2></path></svg></button><iframe${ssrRenderAttr("src", active.value.trailerUrl + "&autoplay=1")} class="trailer-iframe" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen data-v-f2e69ef2></iframe></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
      if (!__props.loading && __props.items.length > 1) {
        _push(`<div class="carousel-dots" data-v-f2e69ef2><!--[-->`);
        ssrRenderList(__props.items, (_, i) => {
          _push(`<button class="${ssrRenderClass(["dot", { active: i === current.value }])}"${ssrRenderAttr("aria-label", `Slide ${i + 1}`)} data-v-f2e69ef2></button>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="scroll-hint" aria-hidden="true" data-v-f2e69ef2><span class="scroll-text" data-v-f2e69ef2>SCROLL</span><div class="scroll-line" data-v-f2e69ef2></div></div></section>`);
    };
  }
};
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/HeroSection.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const HeroSection = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-f2e69ef2"]]);
const _sfc_main$7 = {
  __name: "ContinueWatching",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const items = ref([]);
    function timeAgo(iso) {
      const diff = Date.now() - new Date(iso).getTime();
      const mins = Math.floor(diff / 6e4);
      if (mins < 1) return "Just now";
      if (mins < 60) return `${mins}m ago`;
      const hrs = Math.floor(mins / 60);
      if (hrs < 24) return `${hrs}h ago`;
      const days = Math.floor(hrs / 24);
      return days === 1 ? "Yesterday" : `${days}d ago`;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_router_link = resolveComponent("router-link");
      if (items.value.length) {
        _push(`<section${ssrRenderAttrs(mergeProps({ class: "section cw-section" }, _attrs))} data-v-62f82ed5><div class="section-header" data-v-62f82ed5><div class="section-title-wrap" data-v-62f82ed5><span class="section-tag cyan" data-v-62f82ed5>Resume</span><h2 class="section-title" data-v-62f82ed5>Continue <span class="accent" data-v-62f82ed5>Watching</span></h2></div>`);
        _push(ssrRenderComponent(_component_router_link, {
          to: "/history",
          class: "see-all"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`View History \u2192`);
            } else {
              return [
                createTextVNode("View History \u2192")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="cw-scroll" data-v-62f82ed5><!--[-->`);
        ssrRenderList(items.value, (item) => {
          _push(`<div class="cw-card" data-v-62f82ed5><div class="cw-poster" data-v-62f82ed5><img${ssrRenderAttr("src", item.image)}${ssrRenderAttr("alt", item.title)} loading="lazy" data-v-62f82ed5><div class="cw-play-overlay" data-v-62f82ed5><div class="cw-play-btn" data-v-62f82ed5><svg viewBox="0 0 24 24" fill="currentColor" data-v-62f82ed5><path d="M8 5v14l11-7z" data-v-62f82ed5></path></svg></div></div></div><div class="cw-info" data-v-62f82ed5><button class="cw-dismiss" title="Remove from history" data-v-62f82ed5><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" data-v-62f82ed5><path d="M18 6 6 18M6 6l12 12" data-v-62f82ed5></path></svg></button><p class="cw-title" data-v-62f82ed5>${ssrInterpolate(item.title)}</p><p class="cw-episode" data-v-62f82ed5>Episode ${ssrInterpolate(item.episode)}</p><p class="cw-time" data-v-62f82ed5>${ssrInterpolate(timeAgo(item.watchedAt))}</p><div class="cw-resume-btn" data-v-62f82ed5><svg viewBox="0 0 24 24" fill="currentColor" width="10" height="10" data-v-62f82ed5><path d="M8 5v14l11-7z" data-v-62f82ed5></path></svg> RESUME </div></div></div>`);
        });
        _push(`<!--]--></div></section>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ContinueWatching.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const ContinueWatching = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-62f82ed5"]]);
const _sfc_main$6 = {
  __name: "QuickFilterChips",
  __ssrInlineRender: true,
  emits: ["filter"],
  setup(__props, { emit: __emit }) {
    const active = ref("all");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "chips-wrap" }, _attrs))} data-v-d8808cbc><div class="chips-scroll" data-v-d8808cbc><button class="${ssrRenderClass(["chip", { active: active.value === "all" }])}" data-v-d8808cbc><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13" data-v-d8808cbc><rect x="3" y="3" width="7" height="7" rx="1" data-v-d8808cbc></rect><rect x="14" y="3" width="7" height="7" rx="1" data-v-d8808cbc></rect><rect x="3" y="14" width="7" height="7" rx="1" data-v-d8808cbc></rect><rect x="14" y="14" width="7" height="7" rx="1" data-v-d8808cbc></rect></svg> All </button><button class="${ssrRenderClass(["chip", { active: active.value === "anime" }])}" data-v-d8808cbc><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13" data-v-d8808cbc><rect x="2" y="3" width="20" height="14" rx="2" data-v-d8808cbc></rect><path d="M8 21h8M12 17v4" data-v-d8808cbc></path></svg> Anime </button><button class="${ssrRenderClass(["chip", { active: active.value === "movies" }])}" data-v-d8808cbc><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13" data-v-d8808cbc><rect x="2" y="4" width="20" height="16" rx="2" data-v-d8808cbc></rect><line x1="7" y1="4" x2="7" y2="20" data-v-d8808cbc></line><line x1="17" y1="4" x2="17" y2="20" data-v-d8808cbc></line><line x1="2" y1="9" x2="7" y2="9" data-v-d8808cbc></line><line x1="17" y1="9" x2="22" y2="9" data-v-d8808cbc></line><line x1="2" y1="14" x2="7" y2="14" data-v-d8808cbc></line><line x1="17" y1="14" x2="22" y2="14" data-v-d8808cbc></line></svg> Movies </button><button class="${ssrRenderClass(["chip", { active: active.value === "dubbed" }])}" data-v-d8808cbc><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13" data-v-d8808cbc><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" data-v-d8808cbc></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07" data-v-d8808cbc></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14" data-v-d8808cbc></path></svg> Dubbed </button><button class="${ssrRenderClass(["chip", { active: active.value === "subbed" }])}" data-v-d8808cbc><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13" data-v-d8808cbc><rect x="2" y="4" width="20" height="16" rx="2" data-v-d8808cbc></rect><line x1="6" y1="14" x2="12" y2="14" data-v-d8808cbc></line><line x1="6" y1="18" x2="18" y2="18" data-v-d8808cbc></line></svg> Subbed </button><button class="${ssrRenderClass(["chip", { active: active.value === "trending" }])}" data-v-d8808cbc><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13" data-v-d8808cbc><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" data-v-d8808cbc></polyline><polyline points="16 7 22 7 22 13" data-v-d8808cbc></polyline></svg> Trending </button><button class="${ssrRenderClass(["chip", { active: active.value === "new" }])}" data-v-d8808cbc><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13" data-v-d8808cbc><circle cx="12" cy="12" r="10" data-v-d8808cbc></circle><line x1="12" y1="8" x2="12" y2="16" data-v-d8808cbc></line><line x1="8" y1="12" x2="16" y2="12" data-v-d8808cbc></line></svg> New </button></div></div>`);
    };
  }
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/QuickFilterChips.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const QuickFilterChips = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-d8808cbc"]]);
const _sfc_main$5 = {
  __name: "AnimeCard",
  __ssrInlineRender: true,
  props: {
    anime: { type: Object, required: true },
    variant: { type: String, default: "default" }
  },
  setup(__props) {
    useRouter();
    const inLibrary = ref(false);
    ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<article${ssrRenderAttrs(mergeProps({
        class: ["card", __props.variant]
      }, _attrs))} data-v-8c6f2ed0><div class="card-img-wrap" data-v-8c6f2ed0><img${ssrRenderAttr("src", __props.anime.image)}${ssrRenderAttr("alt", __props.anime.title)} loading="lazy" data-v-8c6f2ed0><div class="card-glitch-overlay" data-v-8c6f2ed0></div>`);
      if (__props.anime.new) {
        _push(`<span class="img-badge badge-new" data-v-8c6f2ed0>NEW</span>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.anime.status) {
        _push(`<span class="${ssrRenderClass([__props.anime.status === "Airing" ? "badge-airing" : "badge-done", "img-badge"])}" data-v-8c6f2ed0>${ssrInterpolate(__props.anime.status === "Airing" ? "\u25CF AIRING" : "\u2713 DONE")}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="card-hover-info" data-v-8c6f2ed0><button class="play-btn" aria-label="Watch" data-v-8c6f2ed0><svg viewBox="0 0 24 24" fill="currentColor" data-v-8c6f2ed0><path d="M8 5v14l11-7z" data-v-8c6f2ed0></path></svg></button><button class="${ssrRenderClass(["add-btn", { saved: inLibrary.value }])}"${ssrRenderAttr("aria-label", inLibrary.value ? "Remove from library" : "Add to library")}${ssrRenderAttr("title", inLibrary.value ? "Remove from library" : "Add to library")} data-v-8c6f2ed0><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="16" height="16" data-v-8c6f2ed0>`);
      if (!inLibrary.value) {
        _push(`<path d="M12 5v14M5 12h14" stroke-linecap="round" data-v-8c6f2ed0></path>`);
      } else {
        _push(`<path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round" data-v-8c6f2ed0></path>`);
      }
      _push(`</svg></button></div></div><div class="card-body" data-v-8c6f2ed0><span class="card-genre" data-v-8c6f2ed0>${ssrInterpolate(__props.anime.genre)}</span><h3 class="card-title" data-v-8c6f2ed0>${ssrInterpolate(__props.anime.title)}</h3><div class="card-meta" data-v-8c6f2ed0><span class="card-eps" data-v-8c6f2ed0>${ssrInterpolate(__props.anime.episodes != null ? __props.anime.episodes + " ep" : __props.anime.status === "Airing" ? "Ongoing" : "? ep")}</span><span class="card-rating" data-v-8c6f2ed0>\u2605 ${ssrInterpolate(__props.anime.rating)}</span></div></div></article>`);
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AnimeCard.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const AnimeCard = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-8c6f2ed0"]]);
const _sfc_main$4 = {
  __name: "TrendingNow",
  __ssrInlineRender: true,
  props: {
    items: { type: Array, default: () => [] },
    loading: { type: Boolean },
    title: { type: String, default: "Trending" },
    accent: { type: String, default: "Now" },
    tag: { type: String, default: "Trending" },
    tagColor: { type: String, default: "cyan" },
    link: { type: String, default: "/trending" }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_router_link = resolveComponent("router-link");
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "trending",
        class: "section"
      }, _attrs))} data-v-8d3367d5><div class="section-header" data-v-8d3367d5><div class="section-title-wrap" data-v-8d3367d5><span class="${ssrRenderClass(["section-tag", __props.tagColor])}" data-v-8d3367d5>${ssrInterpolate(__props.tag)}</span><h2 class="section-title" data-v-8d3367d5>${ssrInterpolate(__props.title)} <span class="accent" data-v-8d3367d5>${ssrInterpolate(__props.accent)}</span></h2></div>`);
      _push(ssrRenderComponent(_component_router_link, {
        to: __props.link,
        class: "see-all"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`View All \u2192`);
          } else {
            return [
              createTextVNode("View All \u2192")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (!__props.loading) {
        _push(`<div class="scroll-container" data-v-8d3367d5><!--[-->`);
        ssrRenderList(__props.items, (anime) => {
          _push(ssrRenderComponent(AnimeCard, {
            key: anime.id,
            anime,
            class: "scroll-card"
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="scroll-container" data-v-8d3367d5><!--[-->`);
        ssrRenderList(6, (n) => {
          _push(`<div class="skeleton-card" data-v-8d3367d5><div class="skeleton sk-img" data-v-8d3367d5></div><div class="skeleton sk-line" style="${ssrRenderStyle({ "width": "60%", "margin-top": ".5rem" })}" data-v-8d3367d5></div><div class="skeleton sk-line" style="${ssrRenderStyle({ "width": "80%" })}" data-v-8d3367d5></div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</section>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/TrendingNow.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const TrendingNow = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-8d3367d5"]]);
const _sfc_main$3 = {
  __name: "SeasonalAnime",
  __ssrInlineRender: true,
  props: { items: { type: Array, default: () => [] }, loading: Boolean },
  setup(__props) {
    const now = /* @__PURE__ */ new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const season = month <= 3 ? "Winter" : month <= 6 ? "Spring" : month <= 9 ? "Summer" : "Fall";
    return (_ctx, _push, _parent, _attrs) => {
      const _component_router_link = resolveComponent("router-link");
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "seasonal",
        class: "section"
      }, _attrs))} data-v-86712ec0><div class="section-header" data-v-86712ec0><div class="section-title-wrap" data-v-86712ec0><span class="section-tag pink" data-v-86712ec0>Season</span><h2 class="section-title" data-v-86712ec0>${ssrInterpolate(unref(season))} <span class="accent" data-v-86712ec0>${ssrInterpolate(unref(year))}</span></h2></div>`);
      _push(ssrRenderComponent(_component_router_link, {
        to: "/seasonal",
        class: "see-all"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`View All \u2192`);
          } else {
            return [
              createTextVNode("View All \u2192")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (!__props.loading) {
        _push(`<div class="scroll-container" data-v-86712ec0><!--[-->`);
        ssrRenderList(__props.items, (anime) => {
          _push(ssrRenderComponent(AnimeCard, {
            key: anime.id,
            anime,
            class: "scroll-card"
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="scroll-container" data-v-86712ec0><!--[-->`);
        ssrRenderList(8, (n) => {
          _push(`<div class="skeleton-card" data-v-86712ec0><div class="skeleton sk-img" data-v-86712ec0></div><div class="skeleton sk-line" style="${ssrRenderStyle({ "width": "60%", "margin-top": ".5rem" })}" data-v-86712ec0></div><div class="skeleton sk-line" style="${ssrRenderStyle({ "width": "80%" })}" data-v-86712ec0></div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</section>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SeasonalAnime.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const SeasonalAnime = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-86712ec0"]]);
const _sfc_main$2 = {
  __name: "LandscapeRow",
  __ssrInlineRender: true,
  props: {
    items: { type: Array, default: () => [] },
    loading: { type: Boolean, default: false },
    title: { type: String, default: "Top Movies" },
    accent: { type: String, default: "This Week" },
    tag: { type: String, default: "Films" },
    tagColor: { type: String, default: "pink" },
    icon: { type: String, default: "" },
    link: { type: String, default: "/films" },
    type: { type: String, default: "film" }
    // 'film' | 'anime'
  },
  setup(__props) {
    useRouter();
    const libraryIds = ref(new Set(getLibrary().map((a) => String(a.id))));
    function bgImage(item) {
      return item.backdrop || item.image || "";
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_router_link = resolveComponent("router-link");
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "section" }, _attrs))} data-v-b5329abf><div class="section-header" data-v-b5329abf><div class="section-title-wrap" data-v-b5329abf><span class="${ssrRenderClass(["section-tag", __props.tagColor])}" data-v-b5329abf>${ssrInterpolate(__props.tag)}</span><h2 class="section-title" data-v-b5329abf>${ssrInterpolate(__props.title)} <span class="accent" data-v-b5329abf>${ssrInterpolate(__props.accent)}</span></h2></div>`);
      _push(ssrRenderComponent(_component_router_link, {
        to: __props.link,
        class: "see-all"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`View All \u2192`);
          } else {
            return [
              createTextVNode("View All \u2192")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (!__props.loading) {
        _push(`<div class="ls-scroll" data-v-b5329abf><!--[-->`);
        ssrRenderList(__props.items, (item) => {
          _push(`<div class="ls-card" data-v-b5329abf><div class="ls-img-wrap" data-v-b5329abf>`);
          if (bgImage(item)) {
            _push(`<img${ssrRenderAttr("src", bgImage(item))}${ssrRenderAttr("alt", item.title)} loading="lazy" class="ls-img" data-v-b5329abf>`);
          } else {
            _push(`<div class="ls-placeholder" data-v-b5329abf><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="32" height="32" opacity=".4" data-v-b5329abf><rect x="2" y="4" width="20" height="16" rx="2" data-v-b5329abf></rect><line x1="7" y1="4" x2="7" y2="20" data-v-b5329abf></line><line x1="17" y1="4" x2="17" y2="20" data-v-b5329abf></line><line x1="2" y1="9" x2="7" y2="9" data-v-b5329abf></line><line x1="17" y1="9" x2="22" y2="9" data-v-b5329abf></line><line x1="2" y1="14" x2="7" y2="14" data-v-b5329abf></line><line x1="17" y1="14" x2="22" y2="14" data-v-b5329abf></line></svg></div>`);
          }
          _push(`<div class="ls-overlay" data-v-b5329abf><div class="ls-play" data-v-b5329abf><svg viewBox="0 0 24 24" fill="currentColor" data-v-b5329abf><path d="M8 5v14l11-7z" data-v-b5329abf></path></svg></div><button class="${ssrRenderClass(["ls-add", { saved: libraryIds.value.has(String(item.id)) }])}"${ssrRenderAttr("title", libraryIds.value.has(String(item.id)) ? "Remove from library" : "Add to library")} data-v-b5329abf><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="13" height="13" data-v-b5329abf>`);
          if (!libraryIds.value.has(String(item.id))) {
            _push(`<path d="M12 5v14M5 12h14" stroke-linecap="round" data-v-b5329abf></path>`);
          } else {
            _push(`<path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round" data-v-b5329abf></path>`);
          }
          _push(`</svg></button></div><span class="ls-rating" data-v-b5329abf>\u2605 ${ssrInterpolate(typeof item.rating === "number" ? item.rating.toFixed(1) : item.rating)}</span></div><div class="ls-info" data-v-b5329abf><p class="ls-title" data-v-b5329abf>${ssrInterpolate(item.title)}</p><p class="ls-year" data-v-b5329abf>${ssrInterpolate(item.year)}</p></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="ls-scroll" data-v-b5329abf><!--[-->`);
        ssrRenderList(6, (n) => {
          _push(`<div class="ls-card ls-skel" data-v-b5329abf><div class="skeleton sk-img" data-v-b5329abf></div><div class="skeleton sk-line" style="${ssrRenderStyle({ "width": "70%", "margin-top": ".5rem" })}" data-v-b5329abf></div><div class="skeleton sk-line" style="${ssrRenderStyle({ "width": "40%" })}" data-v-b5329abf></div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</section>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/LandscapeRow.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const LandscapeRow = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-b5329abf"]]);
const _sfc_main$1 = {
  __name: "GenresGrid",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const genres = [
      {
        name: "Action",
        slug: "action",
        gradient: "linear-gradient(135deg,#c0392b,#e74c3c)",
        svg: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10" fill="currentColor"/>'
      },
      {
        name: "Comedy",
        slug: "comedy",
        gradient: "linear-gradient(135deg,#f39c12,#f1c40f)",
        svg: '<circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/><path d="M8 14s1.5 2 4 2 4-2 4-2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="9" y1="9" x2="9.01" y2="9" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><line x1="15" y1="9" x2="15.01" y2="9" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>'
      },
      {
        name: "Sci-Fi",
        slug: "sci-fi",
        gradient: "linear-gradient(135deg,#2980b9,#00d4ff)",
        svg: '<path d="M4.5 16.5c-1.5 1.5-1.5 4 0 5.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/><path d="M9 15c0 1 .5 2.5 2 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/><path d="M20 4s-5 0-8 3l-6 6 4 4 6-6c3-3 3-8 3-8z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" fill="none"/><circle cx="15" cy="9" r="1" fill="currentColor"/>'
      },
      {
        name: "Horror",
        slug: "horror",
        gradient: "linear-gradient(135deg,#1a1a2e,#6c1aff)",
        svg: '<path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>'
      },
      {
        name: "Romance",
        slug: "romance",
        gradient: "linear-gradient(135deg,#FF2D78,#ff6eb4)",
        svg: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" fill="none"/>'
      },
      {
        name: "Drama",
        slug: "drama",
        gradient: "linear-gradient(135deg,#16213e,#0f3460)",
        svg: '<rect x="2" y="7" width="20" height="14" rx="2" ry="2" stroke="currentColor" stroke-width="2" fill="none"/><path d="M16 2l-4 5-4-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/><line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" stroke-width="2"/>'
      },
      {
        name: "Adventure",
        slug: "adventure",
        gradient: "linear-gradient(135deg,#27ae60,#2ecc71)",
        svg: '<circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="currentColor"/>'
      },
      {
        name: "Animation",
        slug: "animation",
        gradient: "linear-gradient(135deg,#8e44ad,#9b59b6)",
        svg: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" stroke="currentColor" stroke-width="2" stroke-linejoin="round" fill="none"/>'
      },
      {
        name: "Thriller",
        slug: "thriller",
        gradient: "linear-gradient(135deg,#2c3e50,#e74c3c)",
        svg: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" fill="none"/>'
      },
      {
        name: "War",
        slug: "war",
        gradient: "linear-gradient(135deg,#4a4a4a,#808080)",
        svg: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" fill="none"/>'
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "section genres-section" }, _attrs))} data-v-9325420c><div class="section-header" data-v-9325420c><div class="section-title-wrap" data-v-9325420c><span class="section-tag pink" data-v-9325420c>Browse</span><h2 class="section-title" data-v-9325420c>Explore <span class="accent" data-v-9325420c>Genres</span></h2></div></div><div class="genres-grid" data-v-9325420c><!--[-->`);
      ssrRenderList(genres, (g) => {
        var _a;
        _push(`<button class="genre-tile" style="${ssrRenderStyle({ background: g.gradient })}" data-v-9325420c><svg viewBox="0 0 24 24" class="genre-icon" data-v-9325420c>${(_a = g.svg) != null ? _a : ""}</svg><span class="genre-name" data-v-9325420c>${ssrInterpolate(g.name)}</span><div class="genre-shine" data-v-9325420c></div></button>`);
      });
      _push(`<!--]--></div></section>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/GenresGrid.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const GenresGrid = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-9325420c"]]);
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const featured = ref([]);
    const trending = ref([]);
    const seasonal = ref([]);
    const popular = ref([]);
    const upcoming = ref([]);
    const tvSeries = ref([]);
    const activeFilter = ref("all");
    const loading = ref({ hero: true, trending: true, seasonal: true, popular: true, upcoming: true, tv: true });
    const lastWatched = ref(null);
    const becauseYouWatched = computed(() => {
      if (!lastWatched.value || !trending.value.length) return [];
      return trending.value.filter((a) => a.genre === lastWatched.value.genre && String(a.id) !== String(lastWatched.value.id)).slice(0, 12);
    });
    const showAnime = computed(() => ["all", "anime", "subbed", "dubbed", "trending", "new"].includes(activeFilter.value));
    const showFilms = computed(() => ["all", "movies"].includes(activeFilter.value));
    const showTV = computed(() => ["all", "movies"].includes(activeFilter.value));
    useSeoMeta({
      title: "Salidumay \u2014 Anime & Film Streaming",
      description: "Discover trending anime, seasonal picks, top-rated films and more on Salidumay."
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page" }, _attrs))} data-v-66e912fe>`);
      _push(ssrRenderComponent(HeroSection, {
        items: featured.value,
        loading: loading.value.hero
      }, null, _parent));
      _push(`<main class="main-content" data-v-66e912fe>`);
      _push(ssrRenderComponent(ContinueWatching, null, null, _parent));
      _push(ssrRenderComponent(QuickFilterChips, {
        onFilter: ($event) => activeFilter.value = $event
      }, null, _parent));
      _push(ssrRenderComponent(TrendingNow, {
        style: showAnime.value ? null : { display: "none" },
        items: trending.value,
        loading: loading.value.trending
      }, null, _parent));
      _push(ssrRenderComponent(LandscapeRow, {
        style: showFilms.value ? null : { display: "none" },
        items: popular.value,
        loading: loading.value.popular,
        title: "Top Movies",
        accent: "This Week",
        tag: "Films",
        tagColor: "pink",
        link: "/films/popular"
      }, null, _parent));
      _push(ssrRenderComponent(LandscapeRow, {
        style: showTV.value ? null : { display: "none" },
        items: tvSeries.value,
        loading: loading.value.tv,
        title: "Popular",
        accent: "TV Series",
        tag: "Series",
        tagColor: "cyan",
        link: "/series",
        type: "series"
      }, null, _parent));
      _push(ssrRenderComponent(SeasonalAnime, {
        style: showAnime.value ? null : { display: "none" },
        items: seasonal.value,
        loading: loading.value.seasonal
      }, null, _parent));
      if (showAnime.value && becauseYouWatched.value.length) {
        _push(ssrRenderComponent(TrendingNow, {
          items: becauseYouWatched.value,
          loading: false,
          title: "Because You Watched",
          accent: (_b = (_a = lastWatched.value) == null ? void 0 : _a.title) != null ? _b : "",
          tag: "Recommended",
          tagColor: "cyan",
          link: "/trending"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(LandscapeRow, {
        style: showFilms.value ? null : { display: "none" },
        items: upcoming.value,
        loading: loading.value.upcoming,
        title: "Upcoming",
        accent: "Releases",
        tag: "Coming Soon",
        tagColor: "cyan",
        link: "/films/coming-soon"
      }, null, _parent));
      _push(ssrRenderComponent(GenresGrid, {
        style: showFilms.value || activeFilter.value === "all" ? null : { display: "none" }
      }, null, _parent));
      _push(`</main>`);
      _push(ssrRenderComponent(AppFooter, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-66e912fe"]]);

export { index as default };
//# sourceMappingURL=index-CX7Pk7wm.mjs.map
