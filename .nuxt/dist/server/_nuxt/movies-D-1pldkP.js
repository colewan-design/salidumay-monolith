import { ref, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderComponent } from "vue/server-renderer";
import { A as AppFooter } from "./AppFooter-DakCUiQ2.js";
import "./api-CaxJTo2b.js";
import { g as getLibrary } from "./userdata-CGpZM_-a.js";
import { _ as _export_sfc, c as useRouter } from "../server.mjs";
import "vue-router";
import "axios";
import "C:/salidumay-nuxt/node_modules/hookable/dist/index.mjs";
import "C:/salidumay-nuxt/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "C:/salidumay-nuxt/node_modules/unctx/dist/index.mjs";
import "C:/salidumay-nuxt/node_modules/h3/dist/index.mjs";
import "C:/salidumay-nuxt/node_modules/defu/dist/defu.mjs";
import "C:/salidumay-nuxt/node_modules/ufo/dist/index.mjs";
const _sfc_main = {
  __name: "movies",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const items = ref([]);
    const loading = ref(true);
    const loadingMore = ref(false);
    ref(1);
    const hasNext = ref(false);
    const libraryIds = ref(new Set(getLibrary().map((a) => String(a.id))));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page" }, _attrs))} data-v-bbe8289a><section class="banner" data-v-bbe8289a><div class="banner-bg" data-v-bbe8289a></div><div class="banner-content" data-v-bbe8289a><span class="tag" data-v-bbe8289a>Cinema</span><h1 class="title" data-v-bbe8289a>Anime <span class="accent" data-v-bbe8289a>Movies</span></h1><p class="sub" data-v-bbe8289a>Top-rated anime films of all time</p></div></section><main class="wrap" data-v-bbe8289a>`);
      if (loading.value) {
        _push(`<div class="grid" data-v-bbe8289a><!--[-->`);
        ssrRenderList(24, (n) => {
          _push(`<div class="skeleton-card" data-v-bbe8289a><div class="sk-img skeleton" data-v-bbe8289a></div><div class="sk-line skeleton" data-v-bbe8289a></div><div class="sk-line2 skeleton" data-v-bbe8289a></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else if (items.value.length) {
        _push(`<div class="grid" data-v-bbe8289a><!--[-->`);
        ssrRenderList(items.value, (anime, i) => {
          _push(`<article class="card" data-v-bbe8289a><div class="card-img" data-v-bbe8289a><img${ssrRenderAttr("src", anime.image)}${ssrRenderAttr("alt", anime.title)} loading="lazy" data-v-bbe8289a><span class="movie-badge" data-v-bbe8289a>🎬 MOVIE</span><span class="rank-badge" data-v-bbe8289a>#${ssrInterpolate(i + 1)}</span><div class="play-overlay" data-v-bbe8289a><div class="play-btn" data-v-bbe8289a><svg viewBox="0 0 24 24" fill="currentColor" data-v-bbe8289a><path d="M8 5v14l11-7z" data-v-bbe8289a></path></svg></div><button class="${ssrRenderClass(["add-btn", { saved: libraryIds.value.has(String(anime.id)) }])}"${ssrRenderAttr("title", libraryIds.value.has(String(anime.id)) ? "Remove from library" : "Add to library")} data-v-bbe8289a><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="16" height="16" data-v-bbe8289a>`);
          if (!libraryIds.value.has(String(anime.id))) {
            _push(`<path d="M12 5v14M5 12h14" stroke-linecap="round" data-v-bbe8289a></path>`);
          } else {
            _push(`<path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round" data-v-bbe8289a></path>`);
          }
          _push(`</svg></button></div></div><div class="card-body" data-v-bbe8289a><span class="genre" data-v-bbe8289a>${ssrInterpolate(anime.genre)}</span><h3 class="card-title" data-v-bbe8289a>${ssrInterpolate(anime.title)}</h3><div class="meta" data-v-bbe8289a><span class="year" data-v-bbe8289a>${ssrInterpolate(anime.year || "—")}</span><span class="rating" data-v-bbe8289a>★ ${ssrInterpolate(typeof anime.rating === "number" ? anime.rating.toFixed(1) : "—")}</span></div></div></article>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="empty" data-v-bbe8289a><p class="empty-icon" data-v-bbe8289a>🎬</p><p class="empty-title" data-v-bbe8289a>No movies yet</p><p class="empty-sub" data-v-bbe8289a>Run <code data-v-bbe8289a>php artisan anime:scrape</code> on the server to populate movies</p></div>`);
      }
      if (!loading.value && hasNext.value) {
        _push(`<div class="load-more-wrap" data-v-bbe8289a><button class="load-more-btn"${ssrIncludeBooleanAttr(loadingMore.value) ? " disabled" : ""} data-v-bbe8289a>`);
        if (loadingMore.value) {
          _push(`<span class="spin" data-v-bbe8289a></span>`);
        } else {
          _push(`<span data-v-bbe8289a>Load More</span>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/movies.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const movies = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-bbe8289a"]]);
export {
  movies as default
};
//# sourceMappingURL=movies-D-1pldkP.js.map
