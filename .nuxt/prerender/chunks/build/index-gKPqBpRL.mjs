import { _ as __nuxt_component_0 } from './nuxt-link-BPQThyuX.mjs';
import { ref, computed, watch, mergeProps, withCtx, createTextVNode, useSSRContext } from 'file://C:/salidumay-nuxt/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrRenderStyle } from 'file://C:/salidumay-nuxt/node_modules/vue/server-renderer/index.mjs';
import { c as getSeriesDetail } from './tvSeries-7207TLND.mjs';
import { _ as _export_sfc, b as useRoute, c as useRouter } from './server.mjs';
import { a as useSeoMeta } from './v3-BGyVWe_n.mjs';
import 'file://C:/salidumay-nuxt/node_modules/ufo/dist/index.mjs';
import 'file://C:/salidumay-nuxt/node_modules/axios/index.js';
import 'file://C:/salidumay-nuxt/node_modules/ofetch/dist/node.mjs';
import '../_/renderer.mjs';
import 'file://C:/salidumay-nuxt/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import 'file://C:/salidumay-nuxt/node_modules/h3/dist/index.mjs';
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
import 'file://C:/salidumay-nuxt/node_modules/vue-router/vue-router.node.mjs';

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    useRouter();
    const series = ref(null);
    const loading = ref(true);
    const activeSeason = ref(null);
    const activeEp = ref(null);
    const sources = ref([]);
    const activeSrc = ref("");
    const activeSrcIdx = ref(0);
    const isPlaying = ref(false);
    const srcError = ref(false);
    const activeTab = ref("episodes");
    useSeoMeta({
      title: () => series.value ? `${series.value.title} \u2014 Salidumay` : "TV Series \u2014 Salidumay",
      description: () => {
        var _a;
        return ((_a = series.value) == null ? void 0 : _a.overview) || "Watch this series on Salidumay.";
      }
    });
    const visibleSeasons = computed(
      () => {
        var _a;
        return (((_a = series.value) == null ? void 0 : _a.seasons) || []).filter((s) => s.season_number > 0);
      }
    );
    const currentEpisodes = computed(
      () => {
        var _a;
        return ((_a = activeSeason.value) == null ? void 0 : _a.episodes) || [];
      }
    );
    async function fetchSeries(id) {
      var _a;
      loading.value = true;
      series.value = null;
      activeSeason.value = null;
      activeEp.value = null;
      isPlaying.value = false;
      const data = await getSeriesDetail(id).catch(() => null);
      if (data) {
        series.value = data;
        const first = (data.seasons || []).find((s) => s.season_number > 0) || ((_a = data.seasons) == null ? void 0 : _a[0]) || null;
        activeSeason.value = first;
      }
      loading.value = false;
    }
    watch(() => route.params.id, (id) => fetchSeries(id));
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page" }, _attrs))} data-v-6952df97><div class="breadcrumb" data-v-6952df97>`);
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
      _push(`<span class="bc-sep" data-v-6952df97>\u203A</span>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/series",
        class: "bc-link"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`TV Series`);
          } else {
            return [
              createTextVNode("TV Series")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<span class="bc-sep" data-v-6952df97>\u203A</span><span class="bc-current" data-v-6952df97>${ssrInterpolate(((_a = series.value) == null ? void 0 : _a.title) || "\u2026")}</span></div>`);
      if ((_b = series.value) == null ? void 0 : _b.backdrop) {
        _push(`<div class="backdrop-wrap" data-v-6952df97><img${ssrRenderAttr("src", series.value.backdrop)} class="backdrop-img"${ssrRenderAttr("alt", series.value.title)} data-v-6952df97><div class="backdrop-fade" data-v-6952df97></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="layout" data-v-6952df97><div class="main-col" data-v-6952df97>`);
      if (series.value) {
        _push(`<div class="player-header" data-v-6952df97><h1 class="series-title" data-v-6952df97>${ssrInterpolate(series.value.title)}</h1><div class="meta-row" data-v-6952df97><span class="pill" data-v-6952df97>${ssrInterpolate(series.value.year)}</span><span class="pill star" data-v-6952df97>\u2605 ${ssrInterpolate(typeof series.value.rating === "number" ? series.value.rating.toFixed(1) : series.value.rating)}</span>`);
        if (series.value.number_of_seasons) {
          _push(`<span class="pill" data-v-6952df97>${ssrInterpolate(series.value.number_of_seasons)} Season${ssrInterpolate(series.value.number_of_seasons !== 1 ? "s" : "")}</span>`);
        } else {
          _push(`<!---->`);
        }
        if (series.value.number_of_episodes) {
          _push(`<span class="pill" data-v-6952df97>${ssrInterpolate(series.value.number_of_episodes)} Episodes</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--[-->`);
        ssrRenderList((series.value.genreNames || []).slice(0, 3), (g) => {
          _push(`<span class="pill genre" data-v-6952df97>${ssrInterpolate(g)}</span>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="${ssrRenderClass([{ "is-playing": isPlaying.value }, "player-box"])}" data-v-6952df97>`);
      if (loading.value) {
        _push(`<div class="overlay-center" data-v-6952df97><div class="spin" data-v-6952df97></div></div>`);
      } else if (!isPlaying.value) {
        _push(`<!--[-->`);
        if ((_c = series.value) == null ? void 0 : _c.backdrop) {
          _push(`<img${ssrRenderAttr("src", series.value.backdrop)} class="hero-backdrop"${ssrRenderAttr("alt", (_d = series.value) == null ? void 0 : _d.title)} data-v-6952df97>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="hero-overlay" data-v-6952df97></div><div class="pre-play-msg" data-v-6952df97><svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32" style="${ssrRenderStyle({ "color": "var(--cyan)" })}" data-v-6952df97><path d="M8 5v14l11-7z" data-v-6952df97></path></svg><p data-v-6952df97>Select an episode below to start watching</p></div><!--]-->`);
      } else {
        _push(`<!--[-->`);
        if (srcError.value) {
          _push(`<div class="overlay-center" data-v-6952df97><p class="err-icon" data-v-6952df97>\u26A0</p><p data-v-6952df97>All sources unavailable.</p><button class="back-btn" data-v-6952df97>Back to episodes</button></div>`);
        } else {
          _push(`<iframe${ssrRenderAttr("src", activeSrc.value)} class="player-iframe" allow="autoplay; encrypted-media; fullscreen; picture-in-picture" allowfullscreen frameborder="0" scrolling="no" data-v-6952df97></iframe>`);
        }
        _push(`<div class="player-overlay" data-v-6952df97><div class="po-top" data-v-6952df97><div class="po-left" data-v-6952df97><button class="back-ep-btn" data-v-6952df97><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="12" height="12" data-v-6952df97><path d="M19 12H5M12 5l-7 7 7 7" stroke-linecap="round" stroke-linejoin="round" data-v-6952df97></path></svg> Episodes </button>`);
        if (activeEp.value) {
          _push(`<span class="now-playing" data-v-6952df97> S${ssrInterpolate(activeSeason.value.season_number)}E${ssrInterpolate(activeEp.value.episode_number)} \u2014 ${ssrInterpolate(activeEp.value.name)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="src-btns" data-v-6952df97><!--[-->`);
        ssrRenderList(sources.value, (src, i) => {
          _push(`<button class="${ssrRenderClass(["src-btn", { active: activeSrcIdx.value === i }])}" data-v-6952df97><span class="src-dot" data-v-6952df97></span>S${ssrInterpolate(i + 1)}</button>`);
        });
        _push(`<!--]--></div></div></div><!--]-->`);
      }
      _push(`</div>`);
      if ((_e = series.value) == null ? void 0 : _e.tagline) {
        _push(`<p class="tagline" data-v-6952df97>&quot;${ssrInterpolate(series.value.tagline)}&quot;</p>`);
      } else {
        _push(`<!---->`);
      }
      if ((_f = series.value) == null ? void 0 : _f.overview) {
        _push(`<p class="overview" data-v-6952df97>${ssrInterpolate(series.value.overview)}</p>`);
      } else {
        _push(`<!---->`);
      }
      if (series.value) {
        _push(`<div class="tabs-wrap" data-v-6952df97><div class="tabs" data-v-6952df97><button class="${ssrRenderClass(["tab", { active: activeTab.value === "episodes" }])}" data-v-6952df97> Episodes </button><button class="${ssrRenderClass(["tab", { active: activeTab.value === "cast" }])}" data-v-6952df97> Cast <span class="tc" data-v-6952df97>${ssrInterpolate(series.value.cast.length)}</span></button>`);
        if ((_g = series.value.similar) == null ? void 0 : _g.length) {
          _push(`<button class="${ssrRenderClass(["tab", { active: activeTab.value === "similar" }])}" data-v-6952df97> Similar <span class="tc" data-v-6952df97>${ssrInterpolate(series.value.similar.length)}</span></button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if (activeTab.value === "episodes") {
          _push(`<div data-v-6952df97>`);
          if (visibleSeasons.value.length > 1) {
            _push(`<div class="season-tabs" data-v-6952df97><!--[-->`);
            ssrRenderList(visibleSeasons.value, (s) => {
              var _a2;
              _push(`<button class="${ssrRenderClass(["season-btn", { active: ((_a2 = activeSeason.value) == null ? void 0 : _a2.season_number) === s.season_number }])}" data-v-6952df97>Season ${ssrInterpolate(s.season_number)}</button>`);
            });
            _push(`<!--]--></div>`);
          } else {
            _push(`<!---->`);
          }
          if (!currentEpisodes.value.length) {
            _push(`<div class="empty-tab" data-v-6952df97>`);
            if (!activeSeason.value) {
              _push(`<p data-v-6952df97>No season selected.</p>`);
            } else {
              _push(`<p data-v-6952df97>Episode details not available. Episodes will load after the series is scraped.</p>`);
            }
            _push(`</div>`);
          } else {
            _push(`<div class="ep-grid" data-v-6952df97><!--[-->`);
            ssrRenderList(currentEpisodes.value, (ep) => {
              var _a2;
              _push(`<div class="${ssrRenderClass(["ep-card", { active: ((_a2 = activeEp.value) == null ? void 0 : _a2.episode_number) === ep.episode_number && isPlaying.value }])}" data-v-6952df97><div class="ep-still" data-v-6952df97>`);
              if (ep.still_url) {
                _push(`<img${ssrRenderAttr("src", ep.still_url)}${ssrRenderAttr("alt", ep.name)} loading="lazy" data-v-6952df97>`);
              } else {
                _push(`<div class="ep-still-ph" data-v-6952df97><svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" style="${ssrRenderStyle({ "color": "rgba(255,255,255,.2)" })}" data-v-6952df97><path d="M8 5v14l11-7z" data-v-6952df97></path></svg></div>`);
              }
              _push(`<div class="ep-play-overlay" data-v-6952df97><svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22" data-v-6952df97><path d="M8 5v14l11-7z" data-v-6952df97></path></svg></div><span class="ep-num" data-v-6952df97>E${ssrInterpolate(ep.episode_number)}</span>`);
              if (ep.rating) {
                _push(`<span class="ep-rating" data-v-6952df97>\u2605 ${ssrInterpolate(ep.rating.toFixed(1))}</span>`);
              } else {
                _push(`<!---->`);
              }
              _push(`</div><div class="ep-info" data-v-6952df97><p class="ep-name" data-v-6952df97>${ssrInterpolate(ep.name)}</p>`);
              if (ep.runtime) {
                _push(`<p class="ep-meta" data-v-6952df97>${ssrInterpolate(ep.runtime)}m</p>`);
              } else {
                _push(`<!---->`);
              }
              if (ep.overview) {
                _push(`<p class="ep-overview" data-v-6952df97>${ssrInterpolate(ep.overview)}</p>`);
              } else {
                _push(`<!---->`);
              }
              _push(`</div></div>`);
            });
            _push(`<!--]--></div>`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        if (activeTab.value === "cast") {
          _push(`<div class="cast-grid" data-v-6952df97>`);
          if (!series.value.cast.length) {
            _push(`<div class="empty-tab" data-v-6952df97>Cast info unavailable.</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--[-->`);
          ssrRenderList(series.value.cast, (c) => {
            _push(`<div class="cast-card" data-v-6952df97><div class="cast-img" data-v-6952df97>`);
            if (c.image) {
              _push(`<img${ssrRenderAttr("src", c.image)}${ssrRenderAttr("alt", c.name)} loading="lazy" data-v-6952df97>`);
            } else {
              _push(`<div class="cast-ph" data-v-6952df97>${ssrInterpolate(c.name[0])}</div>`);
            }
            _push(`</div><p class="cast-name" data-v-6952df97>${ssrInterpolate(c.name)}</p><p class="cast-char" data-v-6952df97>${ssrInterpolate(c.character)}</p></div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        if (activeTab.value === "similar") {
          _push(`<div class="related-grid" data-v-6952df97><!--[-->`);
          ssrRenderList(series.value.similar, (s) => {
            _push(`<div class="rel-card" data-v-6952df97><div class="rel-img" data-v-6952df97>`);
            if (s.image) {
              _push(`<img${ssrRenderAttr("src", s.image)}${ssrRenderAttr("alt", s.title)} loading="lazy" data-v-6952df97>`);
            } else {
              _push(`<div class="rel-placeholder" data-v-6952df97>\u{1F4FA}</div>`);
            }
            _push(`<div class="rel-play" data-v-6952df97><svg viewBox="0 0 24 24" fill="currentColor" data-v-6952df97><path d="M8 5v14l11-7z" data-v-6952df97></path></svg></div><span class="rel-rating" data-v-6952df97>\u2605 ${ssrInterpolate(typeof s.rating === "number" ? s.rating.toFixed(1) : s.rating)}</span></div><div class="rel-info" data-v-6952df97><h4 class="rel-title" data-v-6952df97>${ssrInterpolate(s.title)}</h4><span class="rel-year" data-v-6952df97>${ssrInterpolate(s.year)}</span></div></div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><aside class="sidebar" data-v-6952df97>`);
      if (loading.value) {
        _push(`<!--[--><div class="sk-poster skeleton" data-v-6952df97></div><div class="sk-title skeleton" data-v-6952df97></div><div class="sk-line skeleton" data-v-6952df97></div><!--]-->`);
      } else if (series.value) {
        _push(`<!--[--><div class="poster-wrap" data-v-6952df97><img${ssrRenderAttr("src", series.value.image)}${ssrRenderAttr("alt", series.value.title)} class="poster" data-v-6952df97><div class="poster-glow" data-v-6952df97></div></div><div class="badge-row" data-v-6952df97><span class="badge-cyan" data-v-6952df97>SERIES</span><!--[-->`);
        ssrRenderList((series.value.genreNames || []).slice(0, 2), (g) => {
          _push(`<span class="badge-outline" data-v-6952df97>${ssrInterpolate(g)}</span>`);
        });
        _push(`<!--]--></div><h2 class="sb-title" data-v-6952df97>${ssrInterpolate(series.value.title)}</h2><div class="stats" data-v-6952df97><div class="stat" data-v-6952df97><span class="stat-icon star" data-v-6952df97>\u2605</span><div data-v-6952df97><span class="stat-val" data-v-6952df97>${ssrInterpolate(typeof series.value.rating === "number" ? series.value.rating.toFixed(1) : series.value.rating)}</span><span class="stat-lbl" data-v-6952df97>Rating</span></div></div>`);
        if (series.value.year) {
          _push(`<div class="stat" data-v-6952df97><span class="stat-icon" data-v-6952df97>\u{1F4C5}</span><div data-v-6952df97><span class="stat-val" data-v-6952df97>${ssrInterpolate(series.value.year)}</span><span class="stat-lbl" data-v-6952df97>Year</span></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (series.value.number_of_seasons) {
          _push(`<div class="stat" data-v-6952df97><span class="stat-icon" data-v-6952df97>\u{1F4FA}</span><div data-v-6952df97><span class="stat-val" data-v-6952df97>${ssrInterpolate(series.value.number_of_seasons)}</span><span class="stat-lbl" data-v-6952df97>Seasons</span></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="detail-table" data-v-6952df97>`);
        if (series.value.status) {
          _push(`<div class="dt-row" data-v-6952df97><span class="dt-key" data-v-6952df97>Status</span><span class="dt-val" data-v-6952df97>${ssrInterpolate(series.value.status)}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        if (series.value.originalLang) {
          _push(`<div class="dt-row" data-v-6952df97><span class="dt-key" data-v-6952df97>Language</span><span class="dt-val" data-v-6952df97>${ssrInterpolate(series.value.originalLang.toUpperCase())}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        if (series.value.number_of_episodes) {
          _push(`<div class="dt-row" data-v-6952df97><span class="dt-key" data-v-6952df97>Episodes</span><span class="dt-val" data-v-6952df97>${ssrInterpolate(series.value.number_of_episodes)}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        if (series.value.voteCount) {
          _push(`<div class="dt-row" data-v-6952df97><span class="dt-key" data-v-6952df97>Votes</span><span class="dt-val" data-v-6952df97>${ssrInterpolate((_h = series.value.voteCount) == null ? void 0 : _h.toLocaleString())}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        if ((_i = series.value.created_by) == null ? void 0 : _i.length) {
          _push(`<div class="dt-row" data-v-6952df97><span class="dt-key" data-v-6952df97>Created by</span><span class="dt-val" data-v-6952df97>${ssrInterpolate(series.value.created_by.map((c) => c.name).join(", "))}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if (series.value.trailer) {
          _push(`<a${ssrRenderAttr("href", `https://www.youtube.com/watch?v=${series.value.trailer}`)} target="_blank" rel="noopener" class="trailer-btn" data-v-6952df97><svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" data-v-6952df97><path d="M8 5v14l11-7z" data-v-6952df97></path></svg> Watch Trailer </a>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/series/[id]/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6952df97"]]);

export { index as default };
//# sourceMappingURL=index-gKPqBpRL.mjs.map
