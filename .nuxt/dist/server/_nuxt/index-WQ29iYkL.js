import { _ as __nuxt_component_0 } from "./nuxt-link-BPQThyuX.js";
import { ref, watch, mergeProps, withCtx, createTextVNode, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderTeleport } from "vue/server-renderer";
import { g as getFilmDetail, F as FILM_EMBED_SOURCES } from "./tmdb-D41Aoa6c.js";
import { f as formatViews, b as isInLibrary, c as isLiked, a as getViewCount, i as incrementViewCount } from "./userdata-CDN2C6w4.js";
import { _ as _export_sfc, b as useRoute, c as useRouter } from "../server.mjs";
import { a as useSeoMeta } from "./v3-BGyVWe_n.js";
import "C:/salidumay-nuxt/node_modules/ufo/dist/index.mjs";
import "C:/salidumay-nuxt/node_modules/defu/dist/defu.mjs";
import "axios";
import "C:/salidumay-nuxt/node_modules/hookable/dist/index.mjs";
import "C:/salidumay-nuxt/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "C:/salidumay-nuxt/node_modules/unctx/dist/index.mjs";
import "C:/salidumay-nuxt/node_modules/h3/dist/index.mjs";
import "vue-router";
import "C:/salidumay-nuxt/node_modules/@unhead/vue/dist/index.mjs";
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    useRouter();
    const film = ref(null);
    const loading = ref(true);
    const activeTab = ref("related");
    const sources = ref([]);
    const activeSrc = ref("");
    const activeSrcIdx = ref(0);
    const isPlaying = ref(false);
    const srcError = ref(false);
    const inLibrary = ref(false);
    const liked = ref(false);
    const likesCount = ref(0);
    const views = ref(0);
    const saving = ref(false);
    const likeWorking = ref(false);
    const authToast = ref(false);
    useSeoMeta({
      title: () => film.value ? `${film.value.title} — Salidumay` : "Film — Salidumay",
      description: () => film.value?.overview || "Watch this film on Salidumay."
    });
    async function fetchFilm(id) {
      loading.value = true;
      film.value = null;
      isPlaying.value = false;
      sources.value = [];
      activeSrc.value = "";
      const data = await getFilmDetail(id).catch(() => null);
      if (data) {
        film.value = data;
        sources.value = FILM_EMBED_SOURCES(id);
        inLibrary.value = isInLibrary(id);
        liked.value = data.user_liked ?? isLiked();
        likesCount.value = data.likes ?? 0;
        views.value = data.views ?? getViewCount();
        incrementViewCount(id, "film").then((n) => {
          views.value = n;
        });
      }
      loading.value = false;
    }
    watch(() => route.params.id, (id) => fetchFilm(id));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page" }, _attrs))} data-v-9411c89f><div class="breadcrumb" data-v-9411c89f>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "bc-link"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Home`);
          } else {
            return [
              createTextVNode("Home")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<span class="bc-sep" data-v-9411c89f>›</span>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/films",
        class: "bc-link"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Films`);
          } else {
            return [
              createTextVNode("Films")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<span class="bc-sep" data-v-9411c89f>›</span><span class="bc-current" data-v-9411c89f>${ssrInterpolate(film.value?.title || "…")}</span></div>`);
      if (film.value?.backdrop) {
        _push(`<div class="backdrop-wrap" data-v-9411c89f><img${ssrRenderAttr("src", film.value.backdrop)} class="backdrop-img"${ssrRenderAttr("alt", film.value.title)} data-v-9411c89f><div class="backdrop-fade" data-v-9411c89f></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="layout" data-v-9411c89f><div class="player-col" data-v-9411c89f>`);
      if (film.value) {
        _push(`<div class="player-header" data-v-9411c89f><div class="player-header-top" data-v-9411c89f><h1 class="film-title" data-v-9411c89f>${ssrInterpolate(film.value.title)}</h1></div><div class="film-meta-row" data-v-9411c89f><span class="pill" data-v-9411c89f>${ssrInterpolate(film.value.year)}</span><span class="pill star" data-v-9411c89f>★ ${ssrInterpolate(film.value.rating.toFixed(1))}</span>`);
        if (film.value.runtime) {
          _push(`<span class="pill" data-v-9411c89f>${ssrInterpolate(Math.floor(film.value.runtime / 60))}h ${ssrInterpolate(film.value.runtime % 60)}m</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--[-->`);
        ssrRenderList(film.value.genreNames.slice(0, 3), (g) => {
          _push(`<span class="pill genre" data-v-9411c89f>${ssrInterpolate(g)}</span>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="${ssrRenderClass(["play-hero", { "is-playing": isPlaying.value }])}" data-v-9411c89f>`);
      if (loading.value) {
        _push(`<div class="overlay-center" data-v-9411c89f><div class="spin" data-v-9411c89f></div></div>`);
      } else if (!isPlaying.value && film.value) {
        _push(`<!--[-->`);
        if (film.value.backdrop) {
          _push(`<img${ssrRenderAttr("src", film.value.backdrop)} class="hero-backdrop"${ssrRenderAttr("alt", film.value.title)} data-v-9411c89f>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="hero-overlay" data-v-9411c89f></div><button class="hero-play-btn" aria-label="Watch now" data-v-9411c89f><svg viewBox="0 0 24 24" fill="currentColor" data-v-9411c89f><path d="M8 5v14l11-7z" data-v-9411c89f></path></svg></button><!--]-->`);
      } else if (isPlaying.value) {
        _push(`<!--[-->`);
        if (srcError.value) {
          _push(`<div class="overlay-center" data-v-9411c89f><p class="err-icon" data-v-9411c89f>⚠</p><p data-v-9411c89f>All sources unavailable.</p></div>`);
        } else {
          _push(`<iframe${ssrRenderAttr("src", activeSrc.value)} class="player-iframe" allow="autoplay; encrypted-media; fullscreen; picture-in-picture" allowfullscreen frameborder="0" scrolling="no" data-v-9411c89f></iframe>`);
        }
        _push(`<div class="player-overlay" data-v-9411c89f><div class="po-top" data-v-9411c89f><div class="src-btns" data-v-9411c89f><!--[-->`);
        ssrRenderList(sources.value, (src, i) => {
          _push(`<button class="${ssrRenderClass(["src-btn", { active: activeSrcIdx.value === i }])}" data-v-9411c89f><span class="src-dot" data-v-9411c89f></span> S${ssrInterpolate(i + 1)}</button>`);
        });
        _push(`<!--]--></div><button class="fullscreen-btn" title="Open full screen" data-v-9411c89f><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="13" height="13" data-v-9411c89f><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" data-v-9411c89f></path></svg> Full Screen </button></div></div><!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (film.value?.tagline) {
        _push(`<p class="tagline" data-v-9411c89f>&quot;${ssrInterpolate(film.value.tagline)}&quot;</p>`);
      } else {
        _push(`<!---->`);
      }
      if (film.value?.overview) {
        _push(`<p class="overview" data-v-9411c89f>${ssrInterpolate(film.value.overview)}</p>`);
      } else {
        _push(`<!---->`);
      }
      if (film.value) {
        _push(`<div class="tabs-wrap" data-v-9411c89f><div class="tabs" data-v-9411c89f><button class="${ssrRenderClass(["tab", { active: activeTab.value === "related" }])}" data-v-9411c89f> Related <span class="tc" data-v-9411c89f>${ssrInterpolate(film.value.similar.length)}</span></button><button class="${ssrRenderClass(["tab", { active: activeTab.value === "cast" }])}" data-v-9411c89f> Cast <span class="tc" data-v-9411c89f>${ssrInterpolate(film.value.cast.length)}</span></button></div>`);
        if (activeTab.value === "related") {
          _push(`<div class="related-grid" data-v-9411c89f>`);
          if (!film.value.similar.length) {
            _push(`<div class="empty-tab" data-v-9411c89f>No related films found.</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--[-->`);
          ssrRenderList(film.value.similar, (m) => {
            _push(`<div class="rel-card" data-v-9411c89f><div class="rel-img" data-v-9411c89f>`);
            if (m.image) {
              _push(`<img${ssrRenderAttr("src", m.image)}${ssrRenderAttr("alt", m.title)} loading="lazy" data-v-9411c89f>`);
            } else {
              _push(`<div class="rel-placeholder" data-v-9411c89f>🎬</div>`);
            }
            _push(`<div class="rel-play" data-v-9411c89f><svg viewBox="0 0 24 24" fill="currentColor" data-v-9411c89f><path d="M8 5v14l11-7z" data-v-9411c89f></path></svg></div><span class="rel-rating" data-v-9411c89f>★ ${ssrInterpolate(m.rating.toFixed(1))}</span></div><div class="rel-info" data-v-9411c89f><h4 class="rel-title" data-v-9411c89f>${ssrInterpolate(m.title)}</h4><span class="rel-year" data-v-9411c89f>${ssrInterpolate(m.year)}</span></div></div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        if (activeTab.value === "cast") {
          _push(`<div class="cast-grid" data-v-9411c89f>`);
          if (!film.value.cast.length) {
            _push(`<div class="empty-tab" data-v-9411c89f>Cast info unavailable.</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--[-->`);
          ssrRenderList(film.value.cast, (c) => {
            _push(`<div class="cast-card" data-v-9411c89f><div class="cast-img" data-v-9411c89f>`);
            if (c.image) {
              _push(`<img${ssrRenderAttr("src", c.image)}${ssrRenderAttr("alt", c.name)} loading="lazy" data-v-9411c89f>`);
            } else {
              _push(`<div class="cast-ph" data-v-9411c89f>${ssrInterpolate(c.name[0])}</div>`);
            }
            _push(`</div><p class="cast-name" data-v-9411c89f>${ssrInterpolate(c.name)}</p><p class="cast-char" data-v-9411c89f>${ssrInterpolate(c.character)}</p></div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><aside class="sidebar" data-v-9411c89f>`);
      if (loading.value) {
        _push(`<!--[--><div class="sk-poster skeleton" data-v-9411c89f></div><div class="sk-title skeleton" data-v-9411c89f></div><div class="sk-line skeleton" data-v-9411c89f></div><!--]-->`);
      } else if (film.value) {
        _push(`<!--[--><div class="poster-wrap" data-v-9411c89f><img${ssrRenderAttr("src", film.value.image)}${ssrRenderAttr("alt", film.value.title)} class="poster" data-v-9411c89f><div class="poster-glow" data-v-9411c89f></div></div><div class="badge-row" data-v-9411c89f><span class="badge-pink" data-v-9411c89f>FILM</span><!--[-->`);
        ssrRenderList(film.value.genreNames.slice(0, 2), (g) => {
          _push(`<span class="badge-outline" data-v-9411c89f>${ssrInterpolate(g)}</span>`);
        });
        _push(`<!--]--></div><h2 class="sb-title" data-v-9411c89f>${ssrInterpolate(film.value.title)}</h2><div class="stats" data-v-9411c89f><div class="stat" data-v-9411c89f><span class="stat-icon star" data-v-9411c89f>★</span><div data-v-9411c89f><span class="stat-val" data-v-9411c89f>${ssrInterpolate(film.value.rating.toFixed(1))}</span><span class="stat-lbl" data-v-9411c89f>Rating</span></div></div>`);
        if (film.value.year) {
          _push(`<div class="stat" data-v-9411c89f><span class="stat-icon" data-v-9411c89f>📅</span><div data-v-9411c89f><span class="stat-val" data-v-9411c89f>${ssrInterpolate(film.value.year)}</span><span class="stat-lbl" data-v-9411c89f>Year</span></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (film.value.runtime) {
          _push(`<div class="stat" data-v-9411c89f><span class="stat-icon" data-v-9411c89f>⏱</span><div data-v-9411c89f><span class="stat-val" data-v-9411c89f>${ssrInterpolate(Math.floor(film.value.runtime / 60))}h ${ssrInterpolate(film.value.runtime % 60)}m</span><span class="stat-lbl" data-v-9411c89f>Runtime</span></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (views.value > 0) {
          _push(`<div class="stat" data-v-9411c89f><span class="stat-icon" data-v-9411c89f>👁</span><div data-v-9411c89f><span class="stat-val" data-v-9411c89f>${ssrInterpolate(unref(formatViews)(views.value))}</span><span class="stat-lbl" data-v-9411c89f>Views</span></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="action-btns" data-v-9411c89f><button class="${ssrRenderClass(["lib-btn", { saved: inLibrary.value }])}"${ssrIncludeBooleanAttr(saving.value) ? " disabled" : ""} data-v-9411c89f><svg viewBox="0 0 24 24"${ssrRenderAttr("fill", inLibrary.value ? "currentColor" : "none")} stroke="currentColor" stroke-width="2" width="16" height="16" data-v-9411c89f><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" stroke-linecap="round" stroke-linejoin="round" data-v-9411c89f></path></svg> ${ssrInterpolate(inLibrary.value ? "In Library" : "Add to Library")}</button><button class="${ssrRenderClass(["heart-btn", { liked: liked.value }])}"${ssrIncludeBooleanAttr(likeWorking.value) ? " disabled" : ""}${ssrRenderAttr("title", liked.value ? "Unlike" : "Like")} data-v-9411c89f><svg viewBox="0 0 24 24"${ssrRenderAttr("fill", liked.value ? "currentColor" : "none")} stroke="currentColor" stroke-width="2.2" width="16" height="16" data-v-9411c89f><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke-linecap="round" stroke-linejoin="round" data-v-9411c89f></path></svg>`);
        if (likesCount.value > 0) {
          _push(`<span class="likes-count" data-v-9411c89f>${ssrInterpolate(likesCount.value)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</button></div>`);
        ssrRenderTeleport(_push, (_push2) => {
          if (authToast.value) {
            _push2(`<div class="auth-toast-detail" data-v-9411c89f>Sign in to like this film</div>`);
          } else {
            _push2(`<!---->`);
          }
        }, "body", false, _parent);
        _push(`<div class="detail-table" data-v-9411c89f>`);
        if (film.value.status) {
          _push(`<div class="dt-row" data-v-9411c89f><span class="dt-key" data-v-9411c89f>Status</span><span class="dt-val" data-v-9411c89f>${ssrInterpolate(film.value.status)}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        if (film.value.director) {
          _push(`<div class="dt-row" data-v-9411c89f><span class="dt-key" data-v-9411c89f>Director</span><span class="dt-val" data-v-9411c89f>${ssrInterpolate(film.value.director)}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        if (film.value.originalLang) {
          _push(`<div class="dt-row" data-v-9411c89f><span class="dt-key" data-v-9411c89f>Language</span><span class="dt-val" data-v-9411c89f>${ssrInterpolate(film.value.originalLang.toUpperCase())}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        if (film.value.voteCount) {
          _push(`<div class="dt-row" data-v-9411c89f><span class="dt-key" data-v-9411c89f>Votes</span><span class="dt-val" data-v-9411c89f>${ssrInterpolate(film.value.voteCount.toLocaleString())}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if (film.value.trailer) {
          _push(`<a${ssrRenderAttr("href", `https://www.youtube.com/watch?v=${film.value.trailer}`)} target="_blank" rel="noopener" class="trailer-btn" data-v-9411c89f><svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" data-v-9411c89f><path d="M8 5v14l11-7z" data-v-9411c89f></path></svg> Watch Trailer </a>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</aside></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/film/[id]/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9411c89f"]]);
export {
  index as default
};
//# sourceMappingURL=index-WQ29iYkL.js.map
