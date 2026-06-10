import { ref, computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrRenderStyle } from "vue/server-renderer";
import "./tmdb-D41Aoa6c.js";
import "C:/salidumay-nuxt/node_modules/hookable/dist/index.mjs";
import { _ as _export_sfc, b as useRoute, c as useRouter } from "../server.mjs";
import "axios";
import "C:/salidumay-nuxt/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "C:/salidumay-nuxt/node_modules/unctx/dist/index.mjs";
import "C:/salidumay-nuxt/node_modules/h3/dist/index.mjs";
import "vue-router";
import "C:/salidumay-nuxt/node_modules/defu/dist/defu.mjs";
import "C:/salidumay-nuxt/node_modules/ufo/dist/index.mjs";
const _sfc_main = {
  __name: "watch",
  __ssrInlineRender: true,
  setup(__props) {
    useRoute();
    useRouter();
    const film = ref(null);
    const loading = ref(true);
    const sources = ref([]);
    const activeSrc = ref("");
    const activeSrcIdx = ref(0);
    const isPlaying = ref(false);
    const srcError = ref(false);
    const showControls = ref(true);
    const isMiniPlayer = ref(false);
    const miniMode = ref("fit");
    const miniPos = ref({ x: null, y: null });
    ref(null);
    const miniPlayerStyle = computed(() => {
      if (miniPos.value.x === null) return {};
      return {
        left: miniPos.value.x + "px",
        top: miniPos.value.y + "px",
        right: "auto",
        bottom: "auto"
      };
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["watch-page", { "hide-cursor": isPlaying.value && !isMiniPlayer.value && !showControls.value }]
      }, _attrs))} data-v-962d2ef7>`);
      if (loading.value) {
        _push(`<div class="center-screen" data-v-962d2ef7><div class="spin" data-v-962d2ef7></div></div>`);
      } else if (film.value) {
        _push(`<!--[-->`);
        if (!isPlaying.value || isMiniPlayer.value) {
          _push(`<div class="backdrop" data-v-962d2ef7><img${ssrRenderAttr("src", film.value.backdrop || film.value.image)} class="backdrop-img"${ssrRenderAttr("alt", film.value.title)} data-v-962d2ef7><div class="backdrop-overlay" data-v-962d2ef7></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (isMiniPlayer.value) {
          _push(`<div class="mini-bg-info" data-v-962d2ef7><p class="mini-bg-label" data-v-962d2ef7>NOW WATCHING</p><p class="mini-bg-title" data-v-962d2ef7>${ssrInterpolate(film.value.title)}</p><p class="mini-bg-year" data-v-962d2ef7>${ssrInterpolate(film.value.year)}</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="${ssrRenderClass(["top-bar", { visible: !isPlaying.value || showControls.value && !isMiniPlayer.value || isMiniPlayer.value }])}" data-v-962d2ef7><div class="top-left" data-v-962d2ef7><svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-962d2ef7><line x1="3" y1="6" x2="21" y2="6" data-v-962d2ef7></line><line x1="3" y1="12" x2="21" y2="12" data-v-962d2ef7></line><line x1="3" y1="18" x2="21" y2="18" data-v-962d2ef7></line></svg><div class="top-title-group" data-v-962d2ef7><span class="top-title" data-v-962d2ef7>${ssrInterpolate(film.value.title)}</span><span class="top-badge" data-v-962d2ef7>Movie</span></div></div><div class="top-right" data-v-962d2ef7><!--[-->`);
        ssrRenderList(sources.value, (src, i) => {
          _push(`<button class="${ssrRenderClass(["server-btn", { active: activeSrcIdx.value === i && isPlaying.value }])}" data-v-962d2ef7><span class="server-dot" data-v-962d2ef7></span> SERVER ${ssrInterpolate(i + 1)}</button>`);
        });
        _push(`<!--]-->`);
        if (isPlaying.value) {
          _push(`<button class="${ssrRenderClass(["mini-toggle-btn", { active: isMiniPlayer.value }])}" title="Mini player" data-v-962d2ef7><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="15" height="15" data-v-962d2ef7><rect x="2" y="13" width="9" height="7" rx="1.5" data-v-962d2ef7></rect><path d="M2 4h20v10H2z" stroke-dasharray="2 1.5" opacity=".4" data-v-962d2ef7></path></svg> MINI </button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<button class="close-btn" data-v-962d2ef7>✕</button></div></div><div class="stage" style="${ssrRenderStyle(!isMiniPlayer.value ? null : { display: "none" })}" data-v-962d2ef7>`);
        if (!isPlaying.value) {
          _push(`<div class="pre-play" data-v-962d2ef7><button class="play-circle" aria-label="Play" data-v-962d2ef7><svg viewBox="0 0 24 24" fill="currentColor" data-v-962d2ef7><path d="M8 5v14l11-7z" data-v-962d2ef7></path></svg></button><p class="pre-title" data-v-962d2ef7>${ssrInterpolate(film.value.title)}</p><p class="pre-year" data-v-962d2ef7>${ssrInterpolate(film.value.year)}</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="player-wrap" style="${ssrRenderStyle(isPlaying.value ? null : { display: "none" })}" data-v-962d2ef7>`);
        if (srcError.value) {
          _push(`<div class="center-screen" data-v-962d2ef7><p class="err-icon" data-v-962d2ef7>⚠</p><p data-v-962d2ef7>All sources unavailable.</p></div>`);
        } else {
          _push(`<iframe${ssrRenderAttr("src", activeSrc.value)} class="player-iframe" allow="autoplay; encrypted-media; fullscreen; picture-in-picture" allowfullscreen frameborder="0" scrolling="no" data-v-962d2ef7></iframe>`);
        }
        _push(`</div></div>`);
        if (isMiniPlayer.value && isPlaying.value) {
          _push(`<div class="${ssrRenderClass(["mini-player", `mini-${miniMode.value}`])}" style="${ssrRenderStyle(miniPlayerStyle.value)}" data-v-962d2ef7><div class="mp-bar" data-v-962d2ef7><svg class="mp-drag-icon" viewBox="0 0 24 24" fill="currentColor" width="14" height="14" data-v-962d2ef7><circle cx="9" cy="5" r="1.5" data-v-962d2ef7></circle><circle cx="15" cy="5" r="1.5" data-v-962d2ef7></circle><circle cx="9" cy="12" r="1.5" data-v-962d2ef7></circle><circle cx="15" cy="12" r="1.5" data-v-962d2ef7></circle><circle cx="9" cy="19" r="1.5" data-v-962d2ef7></circle><circle cx="15" cy="19" r="1.5" data-v-962d2ef7></circle></svg><span class="mp-title" data-v-962d2ef7>${ssrInterpolate(film.value.title)}</span><div class="mp-bar-actions" data-v-962d2ef7><button class="mp-action-btn" title="Restore to full screen" data-v-962d2ef7><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="13" height="13" data-v-962d2ef7><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" data-v-962d2ef7></path></svg></button><button class="mp-action-btn mp-close" title="Close" data-v-962d2ef7>✕</button></div></div><div class="mp-video" data-v-962d2ef7>`);
          if (srcError.value) {
            _push(`<div class="mp-error" data-v-962d2ef7>⚠ Source unavailable</div>`);
          } else {
            _push(`<iframe${ssrRenderAttr("src", activeSrc.value)} class="mp-iframe" allow="autoplay; encrypted-media; fullscreen; picture-in-picture" allowfullscreen frameborder="0" scrolling="no" data-v-962d2ef7></iframe>`);
          }
          _push(`</div><div class="mp-controls" data-v-962d2ef7><span class="mp-controls-label" data-v-962d2ef7>View</span><button class="${ssrRenderClass(["mp-view-btn", { active: miniMode.value === "fit" }])}" data-v-962d2ef7><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12" data-v-962d2ef7><rect x="3" y="3" width="18" height="18" rx="2" data-v-962d2ef7></rect><rect x="6" y="7" width="12" height="10" rx="1" data-v-962d2ef7></rect></svg> Fit </button><button class="${ssrRenderClass(["mp-view-btn", { active: miniMode.value === "full" }])}" data-v-962d2ef7><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12" data-v-962d2ef7><rect x="2" y="4" width="20" height="16" rx="2" data-v-962d2ef7></rect><path d="M2 8h20M2 16h20" opacity=".4" data-v-962d2ef7></path></svg> Full </button></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      } else if (!loading.value) {
        _push(`<div class="center-screen" data-v-962d2ef7><p data-v-962d2ef7>Film not found.</p><button class="close-btn" data-v-962d2ef7>Go back</button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/film/[id]/watch.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const watch = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-962d2ef7"]]);
export {
  watch as default
};
//# sourceMappingURL=watch-XOfoJAYg.js.map
