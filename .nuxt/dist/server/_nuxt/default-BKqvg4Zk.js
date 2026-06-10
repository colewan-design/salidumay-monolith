import { ssrRenderClass, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderAttrs, ssrRenderSlot } from "vue/server-renderer";
import { ref, unref, withCtx, createVNode, openBlock, createBlock, toDisplayString, createTextVNode, useSSRContext, watch, mergeProps } from "vue";
import { useRoute, useRouter, RouterLink } from "vue-router";
import { u as useAuth } from "./useAuth-CHMkirah.js";
import { _ as _export_sfc } from "../server.mjs";
import { s as searchAnime } from "./api-CaxJTo2b.js";
import { s as searchFilms } from "./tmdb-D41Aoa6c.js";
import { s as searchSeries } from "./tvSeries-7207TLND.js";
import "axios";
import "C:/salidumay-nuxt/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "C:/salidumay-nuxt/node_modules/hookable/dist/index.mjs";
import "C:/salidumay-nuxt/node_modules/unctx/dist/index.mjs";
import "C:/salidumay-nuxt/node_modules/h3/dist/index.mjs";
import "C:/salidumay-nuxt/node_modules/defu/dist/defu.mjs";
import "C:/salidumay-nuxt/node_modules/ufo/dist/index.mjs";
const _sfc_main$2 = {
  __name: "AppNavbar",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    useRouter();
    const { user, isLoggedIn } = useAuth();
    const collapsed = ref(false);
    const mobileOpen = ref(false);
    const navItems = [
      { label: "Home", to: "/", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
      { label: "Trending", to: "/trending", icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" },
      { label: "Seasonal", to: "/seasonal", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
      { label: "Rankings", to: "/rankings", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
      { label: "Genres", to: "/genre", icon: "M4 6h16M4 10h16M4 14h16M4 18h16" }
    ];
    const contentItems = [
      { label: "Anime Movies", to: "/movies", icon: "M7 4v16M17 4v16M3 8h4m10 0h4M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" },
      { label: "TV Series", to: "/series", icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
      { label: "All Films", to: "/films", icon: "M15 10l4.553-2.069A1 1 0 0121 8.868V15.13a1 1 0 01-1.447.899L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" },
      { label: "Coming Soon", to: "/films/coming-soon", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
      { label: "Action", to: "/films/action", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
      { label: "Watch", to: "/watch", icon: "M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }
    ];
    const accountItems = [
      { label: "Library", to: "/library", icon: "M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" },
      { label: "History", to: "/history", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" }
    ];
    function isActive(to) {
      if (to === "/") return route.path === "/";
      return route.path.startsWith(to);
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><button class="mob-toggle" aria-label="Menu" data-v-6840ae47><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" data-v-6840ae47>`);
      if (!mobileOpen.value) {
        _push(`<path d="M4 6h16M4 12h16M4 18h16" data-v-6840ae47></path>`);
      } else {
        _push(`<path d="M6 18L18 6M6 6l12 12" data-v-6840ae47></path>`);
      }
      _push(`</svg></button>`);
      if (mobileOpen.value) {
        _push(`<div class="mob-overlay" data-v-6840ae47></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<aside class="${ssrRenderClass(["sidebar", { collapsed: collapsed.value, "mob-open": mobileOpen.value }])}" data-v-6840ae47>`);
      _push(ssrRenderComponent(unref(RouterLink), {
        to: "/",
        class: "logo",
        onClick: ($event) => mobileOpen.value = false
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="logo-kanji" data-v-6840ae47${_scopeId}>サ</span><span class="logo-text" data-v-6840ae47${_scopeId}>Salidumay</span>`);
          } else {
            return [
              createVNode("span", { class: "logo-kanji" }, "サ"),
              createVNode("span", { class: "logo-text" }, "Salidumay")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<nav class="nav" data-v-6840ae47><p class="nav-label" data-v-6840ae47>Discover</p><!--[-->`);
      ssrRenderList(navItems, (item) => {
        _push(ssrRenderComponent(unref(RouterLink), {
          key: item.to,
          to: item.to,
          class: ["nav-item", { active: isActive(item.to) }],
          onClick: ($event) => mobileOpen.value = false
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" data-v-6840ae47${_scopeId}><path${ssrRenderAttr("d", item.icon)} stroke-linecap="round" stroke-linejoin="round" data-v-6840ae47${_scopeId}></path></svg><span class="nav-label-text" data-v-6840ae47${_scopeId}>${ssrInterpolate(item.label)}</span>`);
            } else {
              return [
                (openBlock(), createBlock("svg", {
                  class: "nav-icon",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "1.8"
                }, [
                  createVNode("path", {
                    d: item.icon,
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round"
                  }, null, 8, ["d"])
                ])),
                createVNode("span", { class: "nav-label-text" }, toDisplayString(item.label), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--><p class="nav-label" data-v-6840ae47>Content</p><!--[-->`);
      ssrRenderList(contentItems, (item) => {
        _push(ssrRenderComponent(unref(RouterLink), {
          key: item.to,
          to: item.to,
          class: ["nav-item", { active: isActive(item.to) }],
          onClick: ($event) => mobileOpen.value = false
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" data-v-6840ae47${_scopeId}><path${ssrRenderAttr("d", item.icon)} stroke-linecap="round" stroke-linejoin="round" data-v-6840ae47${_scopeId}></path></svg><span class="nav-label-text" data-v-6840ae47${_scopeId}>${ssrInterpolate(item.label)}</span>`);
            } else {
              return [
                (openBlock(), createBlock("svg", {
                  class: "nav-icon",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "1.8"
                }, [
                  createVNode("path", {
                    d: item.icon,
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round"
                  }, null, 8, ["d"])
                ])),
                createVNode("span", { class: "nav-label-text" }, toDisplayString(item.label), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]-->`);
      if (unref(isLoggedIn)) {
        _push(`<!--[--><p class="nav-label" data-v-6840ae47>Account</p><!--[-->`);
        ssrRenderList(accountItems, (item) => {
          _push(ssrRenderComponent(unref(RouterLink), {
            key: item.to,
            to: item.to,
            class: ["nav-item", { active: isActive(item.to) }],
            onClick: ($event) => mobileOpen.value = false
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" data-v-6840ae47${_scopeId}><path${ssrRenderAttr("d", item.icon)} stroke-linecap="round" stroke-linejoin="round" data-v-6840ae47${_scopeId}></path></svg><span class="nav-label-text" data-v-6840ae47${_scopeId}>${ssrInterpolate(item.label)}</span>`);
              } else {
                return [
                  (openBlock(), createBlock("svg", {
                    class: "nav-icon",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "1.8"
                  }, [
                    createVNode("path", {
                      d: item.icon,
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round"
                    }, null, 8, ["d"])
                  ])),
                  createVNode("span", { class: "nav-label-text" }, toDisplayString(item.label), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--><!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</nav><div class="sidebar-bottom" data-v-6840ae47>`);
      if (unref(isLoggedIn)) {
        _push(`<!--[--><div class="user-row" data-v-6840ae47><div class="user-avatar" data-v-6840ae47>`);
        if (unref(user)?.avatar) {
          _push(`<img${ssrRenderAttr("src", unref(user).avatar)}${ssrRenderAttr("alt", unref(user).name)} data-v-6840ae47>`);
        } else {
          _push(`<span data-v-6840ae47>${ssrInterpolate(unref(user)?.name?.[0]?.toUpperCase() || "U")}</span>`);
        }
        _push(`</div><div class="user-info" data-v-6840ae47><span class="user-name" data-v-6840ae47>${ssrInterpolate(unref(user)?.name)}</span><span class="user-email" data-v-6840ae47>${ssrInterpolate(unref(user)?.email)}</span></div></div><button class="signout-btn" data-v-6840ae47>Sign Out</button><!--]-->`);
      } else {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(unref(RouterLink), {
          to: "/login",
          class: "auth-btn primary",
          onClick: ($event) => mobileOpen.value = false
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Sign In`);
            } else {
              return [
                createTextVNode("Sign In")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(RouterLink), {
          to: "/register",
          class: "auth-btn",
          onClick: ($event) => mobileOpen.value = false
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Register`);
            } else {
              return [
                createTextVNode("Register")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<!--]-->`);
      }
      _push(`</div></aside><!--]-->`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppNavbar.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const AppNavbar = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-6840ae47"]]);
const _sfc_main$1 = {
  __name: "AppTopbar",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const searchQuery = ref("");
    const suggestions = ref([]);
    const showSug = ref(false);
    const activeSug = ref(-1);
    let searchTimer = null;
    function scoreMatch(title, query) {
      const t = (title || "").toLowerCase().replace(/[^a-z0-9\s]/g, "");
      const q = query.toLowerCase().replace(/[^a-z0-9\s]/g, "");
      if (t === q) return 100;
      if (t.startsWith(q)) return 90;
      if (t.includes(q)) return 75;
      const qWords = q.split(/\s+/).filter(Boolean);
      const tWords = t.split(/\s+/);
      const fullWordMatches = qWords.filter((w) => tWords.some((tw) => tw === w || tw.startsWith(w))).length;
      if (fullWordMatches === qWords.length) return 65;
      const partialMatches = qWords.filter((w) => t.includes(w)).length;
      return Math.floor(partialMatches / qWords.length * 40);
    }
    watch(searchQuery, (q) => {
      clearTimeout(searchTimer);
      activeSug.value = -1;
      const t = q.trim();
      if (t.length >= 2) {
        searchTimer = setTimeout(async () => {
          const [animeRes, filmRes, tvRes] = await Promise.allSettled([
            searchAnime(t),
            searchFilms(t, 1),
            searchSeries(t, 1)
          ]);
          const anime = animeRes.status === "fulfilled" ? (animeRes.value.data || []).map((a) => ({ ...a, _type: "anime", _score: scoreMatch(a.title, t) })) : [];
          const films = filmRes.status === "fulfilled" ? (filmRes.value.data || []).map((f) => ({ ...f, _type: "film", _score: scoreMatch(f.title, t) })) : [];
          const tv = tvRes.status === "fulfilled" ? (tvRes.value.data || []).map((s) => ({ ...s, _type: "tv", _score: scoreMatch(s.title, t) })) : [];
          suggestions.value = [...anime, ...films, ...tv].sort((a, b) => b._score - a._score).slice(0, 8);
          showSug.value = suggestions.value.length > 0;
        }, 350);
      } else {
        suggestions.value = [];
        showSug.value = false;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "topbar" }, _attrs))} data-v-26209acb><div class="topbar-search" data-v-26209acb><svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" data-v-26209acb><circle cx="11" cy="11" r="7" data-v-26209acb></circle><path d="m21 21-4.35-4.35" data-v-26209acb></path></svg><input${ssrRenderAttr("value", searchQuery.value)} class="search-input" placeholder="Search anime &amp; films…" autocomplete="off" data-v-26209acb>`);
      if (showSug.value && suggestions.value.length) {
        _push(`<ul class="suggestions" data-v-26209acb><!--[-->`);
        ssrRenderList(suggestions.value, (item, i) => {
          _push(`<li class="${ssrRenderClass(["sug-item", { active: activeSug.value === i }])}" data-v-26209acb><img${ssrRenderAttr("src", item.image)} class="sug-img"${ssrRenderAttr("alt", item.title)} data-v-26209acb><div class="sug-info" data-v-26209acb><span class="sug-title" data-v-26209acb>${ssrInterpolate(item.title)}</span><span class="sug-meta" data-v-26209acb><span class="${ssrRenderClass(["sug-badge", item._type])}" data-v-26209acb>${ssrInterpolate(item._type === "film" ? "FILM" : item._type === "tv" ? "SERIES" : "ANIME")}</span> ${ssrInterpolate(item.genre || item.genreNames?.[0] || "")} · ★ ${ssrInterpolate(typeof item.rating === "number" ? item.rating.toFixed(1) : item.rating)}</span></div></li>`);
        });
        _push(`<!--]--></ul>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></header>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppTopbar.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const AppTopbar = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-26209acb"]]);
const _sfc_main = {
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(AppNavbar, null, null, _parent));
      _push(ssrRenderComponent(AppTopbar, null, null, _parent));
      _push(`<div class="content-shell">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=default-BKqvg4Zk.js.map
