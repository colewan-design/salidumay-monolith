import { _ as __nuxt_component_0 } from "./nuxt-link-BPQThyuX.js";
import { computed, ref, watch, mergeProps, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { A as AppFooter } from "./AppFooter-DakCUiQ2.js";
import { F as FilmCard } from "./FilmCard-Byk_thX2.js";
import { a as getFilmsByGenre, f as getUpcomingFilms, b as getNowPlayingFilms, d as getTopRatedFilms, e as getTrendingFilms, c as getPopularFilms } from "./tmdb-D41Aoa6c.js";
import { _ as _export_sfc, b as useRoute, c as useRouter } from "../server.mjs";
import "C:/salidumay-nuxt/node_modules/ufo/dist/index.mjs";
import "C:/salidumay-nuxt/node_modules/defu/dist/defu.mjs";
import "vue-router";
import "./userdata-CDN2C6w4.js";
import "axios";
import "C:/salidumay-nuxt/node_modules/hookable/dist/index.mjs";
import "C:/salidumay-nuxt/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "C:/salidumay-nuxt/node_modules/unctx/dist/index.mjs";
import "C:/salidumay-nuxt/node_modules/h3/dist/index.mjs";
const _sfc_main = {
  __name: "[category]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    useRouter();
    const CATEGORIES = {
      popular: { title: "Featured", accent: "Films", tag: "Cinema", color: "pink", fetcher: (p) => getPopularFilms(p) },
      trending: { title: "Trending", accent: "Films", tag: "Hot", color: "cyan", fetcher: (p) => getTrendingFilms(p) },
      "top-rated": { title: "Top", accent: "Rated", tag: "Best", color: "pink", fetcher: (p) => getTopRatedFilms(p) },
      "now-playing": { title: "Now", accent: "Playing", tag: "In Cinemas", color: "cyan", fetcher: (p) => getNowPlayingFilms(p) },
      "coming-soon": { title: "Coming", accent: "Soon", tag: "Upcoming", color: "cyan", fetcher: (p) => getUpcomingFilms(p) },
      action: { title: "Action", accent: "Movies", tag: "Action", color: "pink", fetcher: (p) => getFilmsByGenre(28, p) },
      horror: { title: "Horror", accent: "Films", tag: "Horror", color: "cyan", fetcher: (p) => getFilmsByGenre(27, p) },
      "sci-fi": { title: "Sci-Fi", accent: "Movies", tag: "Sci-Fi", color: "pink", fetcher: (p) => getFilmsByGenre(878, p) },
      comedy: { title: "Comedy", accent: "Films", tag: "Comedy", color: "cyan", fetcher: (p) => getFilmsByGenre(35, p) },
      romance: { title: "Romance", accent: "Films", tag: "Romance", color: "pink", fetcher: (p) => getFilmsByGenre(10749, p) },
      thriller: { title: "Thriller", accent: "Films", tag: "Thriller", color: "cyan", fetcher: (p) => getFilmsByGenre(53, p) },
      animation: { title: "Animation", accent: "Films", tag: "Animated", color: "pink", fetcher: (p) => getFilmsByGenre(16, p) }
    };
    const slug = computed(() => route.params.category);
    const config = computed(() => CATEGORIES[slug.value] || CATEGORIES.popular);
    const items = ref([]);
    const loading = ref(true);
    const loadingMore = ref(false);
    const page = ref(1);
    const totalPages = ref(1);
    async function load(p = 1) {
      if (p === 1) {
        loading.value = true;
        items.value = [];
      } else loadingMore.value = true;
      const res = await config.value.fetcher(p).catch(() => null);
      if (res) {
        items.value = p === 1 ? res.data : [...items.value, ...res.data];
        totalPages.value = res.totalPages ?? res.pagination?.total_pages ?? 1;
        page.value = p;
      }
      loading.value = false;
      loadingMore.value = false;
    }
    watch(slug, () => {
      page.value = 1;
      load(1);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page" }, _attrs))} data-v-1bd3b732><section class="banner" data-v-1bd3b732><div class="${ssrRenderClass([config.value.color, "banner-bg"])}" data-v-1bd3b732></div><div class="banner-content" data-v-1bd3b732><span class="${ssrRenderClass(["tag", config.value.color])}" data-v-1bd3b732>${ssrInterpolate(config.value.tag)}</span><h1 class="title" data-v-1bd3b732>${ssrInterpolate(config.value.title)} <span class="${ssrRenderClass(["accent", config.value.color])}" data-v-1bd3b732>${ssrInterpolate(config.value.accent)}</span></h1>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/films",
        class: "back-link"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`← All Films`);
          } else {
            return [
              createTextVNode("← All Films")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></section><main class="wrap" data-v-1bd3b732>`);
      if (loading.value) {
        _push(`<div class="grid" data-v-1bd3b732><!--[-->`);
        ssrRenderList(20, (n) => {
          _push(`<div class="skeleton-card" data-v-1bd3b732><div class="sk-img skeleton" data-v-1bd3b732></div><div class="sk-line skeleton" data-v-1bd3b732></div><div class="sk-line2 skeleton" data-v-1bd3b732></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else if (items.value.length) {
        _push(`<div class="grid" data-v-1bd3b732><!--[-->`);
        ssrRenderList(items.value, (film) => {
          _push(ssrRenderComponent(FilmCard, {
            key: film.id,
            film
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="empty" data-v-1bd3b732><p class="empty-icon" data-v-1bd3b732>🎬</p><p class="empty-title" data-v-1bd3b732>No films found</p><p class="empty-sub" data-v-1bd3b732>Try a different category</p></div>`);
      }
      if (!loading.value && page.value < totalPages.value) {
        _push(`<div class="load-more-wrap" data-v-1bd3b732><button class="load-more-btn"${ssrIncludeBooleanAttr(loadingMore.value) ? " disabled" : ""} data-v-1bd3b732>`);
        if (loadingMore.value) {
          _push(`<span class="spin" data-v-1bd3b732></span>`);
        } else {
          _push(`<span data-v-1bd3b732>Load More</span>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/films/[category].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _category_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1bd3b732"]]);
export {
  _category_ as default
};
//# sourceMappingURL=_category_-CSFwX-zh.js.map
