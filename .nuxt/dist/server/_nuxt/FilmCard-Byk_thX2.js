import { ref, unref, useSSRContext } from "vue";
import { ssrRenderTeleport, ssrRenderAttr, ssrRenderClass, ssrInterpolate } from "vue/server-renderer";
import { useRouter } from "vue-router";
import { f as formatViews } from "./userdata-CDN2C6w4.js";
import { _ as _export_sfc } from "../server.mjs";
const _sfc_main = {
  __name: "FilmCard",
  __ssrInlineRender: true,
  props: {
    film: { type: Object, required: true }
  },
  setup(__props) {
    useRouter();
    const inLibrary = ref(false);
    const liked = ref(false);
    const views = ref(0);
    ref(false);
    ref(false);
    const authToast = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      ssrRenderTeleport(_push, (_push2) => {
        if (authToast.value) {
          _push2(`<div class="auth-toast" data-v-3a182d57>Sign in to like films</div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
      _push(`<article class="card" data-v-3a182d57><div class="card-img" data-v-3a182d57><img${ssrRenderAttr("src", __props.film.image)}${ssrRenderAttr("alt", __props.film.title)} loading="lazy" data-v-3a182d57><span class="film-badge" data-v-3a182d57>FILM</span><div class="card-overlay" data-v-3a182d57><button class="play-btn" aria-label="Watch" data-v-3a182d57><svg viewBox="0 0 24 24" fill="currentColor" data-v-3a182d57><path d="M8 5v14l11-7z" data-v-3a182d57></path></svg></button><div class="action-row" data-v-3a182d57><button class="${ssrRenderClass(["action-btn", { saved: inLibrary.value }])}"${ssrRenderAttr("title", inLibrary.value ? "Remove from library" : "Add to library")} data-v-3a182d57><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="15" height="15" data-v-3a182d57>`);
      if (!inLibrary.value) {
        _push(`<path d="M12 5v14M5 12h14" stroke-linecap="round" data-v-3a182d57></path>`);
      } else {
        _push(`<path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round" data-v-3a182d57></path>`);
      }
      _push(`</svg></button><button class="${ssrRenderClass(["action-btn", "heart-btn", { liked: liked.value }])}" title="Like" data-v-3a182d57><svg viewBox="0 0 24 24"${ssrRenderAttr("fill", liked.value ? "currentColor" : "none")} stroke="currentColor" stroke-width="2.2" width="15" height="15" data-v-3a182d57><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke-linecap="round" stroke-linejoin="round" data-v-3a182d57></path></svg></button></div></div></div><div class="card-body" data-v-3a182d57><h3 class="card-title" data-v-3a182d57>${ssrInterpolate(__props.film.title)}</h3><div class="meta" data-v-3a182d57><span class="year" data-v-3a182d57>${ssrInterpolate(__props.film.year)}</span><span class="rating" data-v-3a182d57>★ ${ssrInterpolate(__props.film.rating?.toFixed(1))}</span></div>`);
      if (views.value > 0) {
        _push(`<div class="views" data-v-3a182d57><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="11" height="11" data-v-3a182d57><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" data-v-3a182d57></path><circle cx="12" cy="12" r="3" data-v-3a182d57></circle></svg> ${ssrInterpolate(unref(formatViews)(views.value))}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></article><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/FilmCard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const FilmCard = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3a182d57"]]);
export {
  FilmCard as F
};
//# sourceMappingURL=FilmCard-Byk_thX2.js.map
