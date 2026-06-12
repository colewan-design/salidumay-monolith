import { _ as __nuxt_component_0 } from './nuxt-link-BPQThyuX.mjs';
import { ref, computed, watch, mergeProps, withCtx, createTextVNode, unref, nextTick, useSSRContext } from 'file://C:/salidumay-nuxt/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderAttr, ssrRenderStyle, ssrRenderList } from 'file://C:/salidumay-nuxt/node_modules/vue/server-renderer/index.mjs';
import { useRouter as useRouter$1 } from 'file://C:/salidumay-nuxt/node_modules/vue-router/vue-router.node.mjs';
import axios from 'file://C:/salidumay-nuxt/node_modules/axios/index.js';
import { u as useAuth } from './useAuth-CsDdxmPs.mjs';
import { _ as _export_sfc, b as useRoute, c as useRouter, d as useRuntimeConfig } from './server.mjs';
import { g as getAnimeDetail, c as getEpisodes, d as getRelated, e as getStreamingLinks, a as getAnimeSeasons } from './api-CaxJTo2b.mjs';
import { b as isInLibrary, i as incrementViewCount, r as recordHistory } from './userdata-CDN2C6w4.mjs';
import { a as useSeoMeta } from './v3-BGyVWe_n.mjs';
import 'file://C:/salidumay-nuxt/node_modules/ufo/dist/index.mjs';
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

const _sfc_main$1 = {
  __name: "CommentSection",
  __ssrInlineRender: true,
  props: { animeId: { type: [String, Number], required: true } },
  setup(__props) {
    const props = __props;
    useRouter$1();
    const { isLoggedIn, user } = useAuth();
    const BASE2 = (useRuntimeConfig().public.apiUrl || "/api/anime").replace("/anime", "");
    const comments = ref([]);
    const nextPageUrl = ref(null);
    const totalCount = ref(0);
    const loadingList = ref(false);
    const loadingMore = ref(false);
    const submitting = ref(false);
    const body = ref("");
    const error = ref("");
    async function fetchComments(url = null) {
      if (!url) {
        loadingList.value = true;
        comments.value = [];
      } else {
        loadingMore.value = true;
      }
      try {
        const endpoint = url || `${BASE2}/comments/${props.animeId}`;
        const { data } = await axios.get(endpoint);
        comments.value = url ? [...comments.value, ...data.data] : data.data;
        nextPageUrl.value = data.next_page_url;
        totalCount.value = data.total;
      } catch (_) {
      }
      loadingList.value = false;
      loadingMore.value = false;
    }
    function formatDate(iso) {
      const d = new Date(iso);
      const diff = (Date.now() - d) / 1e3;
      if (diff < 60) return "just now";
      if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
      if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
      return d.toLocaleDateString();
    }
    watch(() => props.animeId, () => fetchComments());
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "comments-section" }, _attrs))} data-v-d13436aa><h3 class="comments-title" data-v-d13436aa> Comments `);
      if (totalCount.value) {
        _push(`<span class="comments-count" data-v-d13436aa>${ssrInterpolate(totalCount.value)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</h3>`);
      if (unref(isLoggedIn)) {
        _push(`<div class="compose-box" data-v-d13436aa>`);
        if ((_a = unref(user)) == null ? void 0 : _a.avatar) {
          _push(`<img${ssrRenderAttr("src", unref(user).avatar)} class="compose-avatar" alt="avatar" data-v-d13436aa>`);
        } else {
          _push(`<div class="compose-avatar compose-avatar-init" data-v-d13436aa>${ssrInterpolate(((_d = (_c = (_b = unref(user)) == null ? void 0 : _b.name) == null ? void 0 : _c[0]) == null ? void 0 : _d.toUpperCase()) || "U")}</div>`);
        }
        _push(`<div class="compose-right" data-v-d13436aa><textarea class="compose-input" placeholder="Share your thoughts\u2026" rows="2" maxlength="1000" data-v-d13436aa>${ssrInterpolate(body.value)}</textarea><div class="compose-footer" data-v-d13436aa>`);
        if (error.value) {
          _push(`<span class="compose-error" data-v-d13436aa>${ssrInterpolate(error.value)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<span class="compose-hint" data-v-d13436aa>Ctrl+Enter to post</span><button class="btn-post"${ssrIncludeBooleanAttr(submitting.value || !body.value.trim()) ? " disabled" : ""} data-v-d13436aa>${ssrInterpolate(submitting.value ? "Posting\u2026" : "Post")}</button></div></div></div>`);
      } else {
        _push(`<div class="guest-cta" data-v-d13436aa><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="cta-icon" data-v-d13436aa><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" data-v-d13436aa></path></svg><p data-v-d13436aa>Join the conversation</p><div class="cta-actions" data-v-d13436aa><button class="btn-cta-primary" data-v-d13436aa>Sign In</button><button class="btn-cta-secondary" data-v-d13436aa>Create Account</button></div></div>`);
      }
      if (loadingList.value) {
        _push(`<div class="comments-list" data-v-d13436aa><!--[-->`);
        ssrRenderList(3, (n) => {
          _push(`<div class="comment-skeleton" data-v-d13436aa><div class="sk-avatar skeleton" data-v-d13436aa></div><div class="sk-body" data-v-d13436aa><div class="sk-line skeleton" style="${ssrRenderStyle({ "width": "30%" })}" data-v-d13436aa></div><div class="sk-line skeleton" style="${ssrRenderStyle({ "width": "90%" })}" data-v-d13436aa></div><div class="sk-line skeleton" style="${ssrRenderStyle({ "width": "70%" })}" data-v-d13436aa></div></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="comments-list" data-v-d13436aa>`);
        if (!comments.value.length) {
          _push(`<div class="comments-empty" data-v-d13436aa> No comments yet. Be the first! </div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--[-->`);
        ssrRenderList(comments.value, (comment) => {
          var _a2, _b2, _c2, _d2, _e, _f, _g;
          _push(`<div class="comment-item" data-v-d13436aa>`);
          if ((_a2 = comment.user) == null ? void 0 : _a2.avatar) {
            _push(`<img${ssrRenderAttr("src", comment.user.avatar)} class="comment-avatar" alt="avatar" data-v-d13436aa>`);
          } else {
            _push(`<div class="comment-avatar comment-avatar-init" data-v-d13436aa>${ssrInterpolate(((_d2 = (_c2 = (_b2 = comment.user) == null ? void 0 : _b2.name) == null ? void 0 : _c2[0]) == null ? void 0 : _d2.toUpperCase()) || "U")}</div>`);
          }
          _push(`<div class="comment-body" data-v-d13436aa><div class="comment-header" data-v-d13436aa><span class="comment-author" data-v-d13436aa>${ssrInterpolate((_e = comment.user) == null ? void 0 : _e.name)}</span><span class="comment-time" data-v-d13436aa>${ssrInterpolate(formatDate(comment.created_at))}</span>`);
          if (unref(isLoggedIn) && ((_f = unref(user)) == null ? void 0 : _f.id) === ((_g = comment.user) == null ? void 0 : _g.id)) {
            _push(`<button class="btn-delete" title="Delete comment" data-v-d13436aa>\u2715</button>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><p class="comment-text" data-v-d13436aa>${ssrInterpolate(comment.body)}</p></div></div>`);
        });
        _push(`<!--]-->`);
        if (nextPageUrl.value) {
          _push(`<button class="btn-load-more"${ssrIncludeBooleanAttr(loadingMore.value) ? " disabled" : ""} data-v-d13436aa>${ssrInterpolate(loadingMore.value ? "Loading\u2026" : "Load more comments")}</button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      }
      _push(`</section>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CommentSection.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const CommentSection = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-d13436aa"]]);
function buildUrl(path, params = {}) {
  {
    const qs2 = new URLSearchParams({ path, ...params }).toString();
    return `/animex-proxy.php?${qs2}`;
  }
}
const ax$1 = axios.create({
  timeout: 12e3,
  headers: { Accept: "application/json, text/plain, */*" }
});
async function animexSearch(title) {
  const { data } = await ax$1.get(buildUrl("/api/anime/browse", { q: title }));
  return data.data || [];
}
function animexBestMatch(results, title) {
  if (!results.length) return null;
  const norm = (s) => (s == null ? void 0 : s.toLowerCase().replace(/[^a-z0-9]/g, "")) || "";
  const target = norm(title);
  return results.find((r) => norm(r.title) === target) || results.find((r) => norm(r.title).includes(target) || target.includes(norm(r.title))) || null;
}
async function animexEpisodeSources(animeId, ep) {
  const { data } = await ax$1.get(buildUrl(`/api/anime/${animeId}/episodes/${ep}`));
  return {
    sources: data.sources || [],
    subtitles: data.subtitles || [],
    intro: data.intro || null,
    outro: data.outro || null
  };
}
const BASE = (process.env.NUXT_PUBLIC_HIANIME_API || "" || "").replace(/\/$/, "");
const hiAnimeEnabled = !!BASE;
const hi = axios.create({ baseURL: BASE, timeout: 2e4 });
const hiStream = async (episodeId, category = "sub") => {
  var _a;
  const [title, epNum] = episodeId.includes(":::") ? episodeId.split(":::") : [episodeId, "1"];
  const audioKey = category === "dub" ? "sdub" : "ssub";
  const { data } = await hi.get(`/anime/extract/${encodeURIComponent(title)}`, {
    params: epNum ? { ep: epNum } : {}
  });
  const streamData = data[audioKey] || data.ssub || data.sdub;
  if (!((_a = streamData == null ? void 0 : streamData.streams) == null ? void 0 : _a.length)) return null;
  const stream = [...streamData.streams].sort((a, b) => {
    var _a2, _b;
    return ((_a2 = a.priority) != null ? _a2 : 99) - ((_b = b.priority) != null ? _b : 99);
  }).find((s) => s.url);
  if (!(stream == null ? void 0 : stream.url)) return null;
  const proxyBase = "/stream-proxy.php";
  const referer = encodeURIComponent("https://hianime.to/");
  const proxiedUrl = `${proxyBase}?url=${encodeURIComponent(stream.url)}&referer=${referer}`;
  return {
    sources: [{ url: proxiedUrl, type: "hls" }],
    tracks: (streamData.subtitles || []).map((s) => ({
      file: s.file,
      kind: "captions",
      label: "English",
      default: true
    }))
  };
};
const ax = axios.create({ timeout: 25e3 });
async function getYugenSources(title, ep, altTitle = "") {
  var _a, _b;
  const titlesToTry = [...new Set([title, altTitle].filter(Boolean))];
  for (const t of titlesToTry) {
    const { data } = await ax.get("/yugen-proxy.php", { params: { title: t, ep } });
    if (data.error || !((_a = data.sources) == null ? void 0 : _a.length)) {
      console.warn("[yugen] no sources for", t, ":", (_b = data.error) != null ? _b : "empty");
      continue;
    }
    return data.sources.map((s) => ({
      label: `Yugen${s.quality && s.quality !== "auto" ? " \xB7 " + s.quality : ""}`,
      url: s.url,
      group: "Yugen",
      type: s.type === "hls" ? "hls" : "mp4"
    }));
  }
  return [];
}
function slugify(title) {
  return title.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");
}
function getJustAnimeSources(title, ep, altTitle = "") {
  const sources = [];
  const seen = /* @__PURE__ */ new Set();
  for (const t of [title, altTitle].filter(Boolean)) {
    const slug = slugify(t);
    if (seen.has(slug)) continue;
    seen.add(slug);
    const i = sources.length + 1;
    sources.push({
      label: `JustAnime${sources.length ? " \xB7 " + i : ""}`,
      url: `https://justanime.to/watch/${slug}-episode-${ep}`,
      group: "JustAnime",
      type: "iframe"
    });
  }
  return sources;
}
async function getDailymotionSources(title, ep, altTitle = "") {
  const epNum = Number(ep);
  const epPatterns = [
    new RegExp(`\\bep(isode)?[\\s._-]*0*${epNum}\\b`, "i"),
    new RegExp(`\\b0*${epNum}\\b`)
  ];
  const searchTitles = [...new Set([altTitle, title].filter(Boolean))];
  const fetchVideos = async (searchTitle) => {
    var _a;
    const query = encodeURIComponent(`${searchTitle} episode ${ep}`);
    const apiUrl = `https://api.dailymotion.com/videos?search=${query}&fields=id,title&limit=10&sort=relevance`;
    const res = await fetch(apiUrl);
    if (!res.ok) return [];
    const data = await res.json();
    return (_a = data == null ? void 0 : data.list) != null ? _a : [];
  };
  const results = await Promise.all(searchTitles.map(fetchVideos));
  const seen = /* @__PURE__ */ new Set();
  const videos = results.flat().filter((v) => {
    if (seen.has(v.id)) return false;
    seen.add(v.id);
    return true;
  });
  const matched = videos.filter((v) => epPatterns.some((p) => p.test(v.title)));
  const pool = matched.length ? matched : [];
  if (!pool.length) return [];
  return pool.map((v, i) => ({
    label: `Dailymotion${pool.length > 1 ? " \xB7 " + (i + 1) : ""}`,
    url: `https://www.dailymotion.com/embed/video/${v.id}?ui-fullscreen=1&ui-logo=0`,
    group: "Dailymotion",
    type: "iframe"
  }));
}
async function getAnimexSources(title, ep, altTitle = "") {
  var _a;
  const titlesToTry = [...new Set([title, altTitle].filter(Boolean))];
  for (const t of titlesToTry) {
    const results = await animexSearch(t);
    const match = animexBestMatch(results, t);
    if (!match) continue;
    const { sources, subtitles } = await animexEpisodeSources(match.id, ep);
    const subByStreamId = {};
    for (const s of sources) {
      if (s.type !== "hls" && ((_a = s.url) == null ? void 0 : _a.includes("vibeplayer.site"))) {
        try {
          const u = new URL(s.url);
          const streamId = u.pathname.slice(1);
          const subUrl = u.searchParams.get("sub");
          if (streamId && subUrl) subByStreamId[streamId] = subUrl;
        } catch {
        }
      }
    }
    const apiTracks = (subtitles || []).map((sub, i) => ({
      file: sub.url || sub.file,
      kind: "captions",
      label: sub.label || sub.lang || "English",
      default: i === 0
    })).filter((t2) => t2.file);
    const mapped = sources.filter((s) => s.url && !s.url.includes("kwik.cx") && !s.isM3U8).map((s) => {
      let tracks = apiTracks;
      if (s.isM3U8) {
        const m = s.url.match(/\/stream\/([a-f0-9]+)\/master\.m3u8/);
        const rawSubUrl = m && subByStreamId[m[1]];
        if (rawSubUrl) {
          const proxied = `/stream-proxy.php?url=${encodeURIComponent(rawSubUrl)}`;
          tracks = [{ file: proxied, kind: "captions", label: "English", default: true }];
        }
      }
      return {
        label: `AnimEx${s.quality ? " \xB7 " + s.quality : ""}${s.lang ? " \xB7 " + s.lang.toUpperCase() : ""}`,
        url: s.url,
        group: "AnimEx",
        type: s.url.includes(".m3u8") ? "hls" : s.type || "mp4",
        tracks: tracks.length ? tracks : void 0
      };
    });
    if (mapped.length) return mapped;
  }
  return [];
}
async function getHiAnimeSources(title, ep, category = "sub", altTitle = "") {
  var _a;
  if (!hiAnimeEnabled) return [];
  const titlesToTry = [...new Set([title, altTitle].filter(Boolean))];
  for (const t of titlesToTry) {
    const result = await hiStream(`${t}:::${ep}`, category);
    if (!((_a = result == null ? void 0 : result.sources) == null ? void 0 : _a.length)) continue;
    return result.sources.map((s, i) => ({
      label: `HiAnime${result.sources.length > 1 ? " \xB7 " + (i + 1) : ""}`,
      url: s.url,
      group: "HiAnime",
      type: "hls"
    }));
  }
  return [];
}
async function getAllSources(title, ep, category = "sub", altTitle = "") {
  const iframeSources = getJustAnimeSources(title, ep, altTitle);
  const [animexRes, hiAnimeRes, dailymotionRes, yugenRes] = await Promise.allSettled([
    getAnimexSources(title, ep, altTitle),
    getHiAnimeSources(title, ep, category, altTitle),
    getDailymotionSources(title, ep, altTitle),
    getYugenSources(title, ep, altTitle)
  ]);
  if (animexRes.status === "rejected") console.warn("[stream] AnimEx failed:", animexRes.reason);
  else console.log(`[stream] AnimEx: ${animexRes.value.length} source(s)`);
  if (hiAnimeRes.status === "rejected") console.warn("[stream] HiAnime failed:", hiAnimeRes.reason);
  else console.log(`[stream] HiAnime: ${hiAnimeRes.value.length} source(s)`);
  if (dailymotionRes.status === "rejected") console.warn("[stream] Dailymotion failed:", dailymotionRes.reason);
  else console.log(`[stream] Dailymotion: ${dailymotionRes.value.length} source(s)`);
  if (yugenRes.status === "rejected") console.warn("[stream] Yugen failed:", yugenRes.reason);
  else console.log(`[stream] Yugen: ${yugenRes.value.length} source(s)`);
  return [
    ...animexRes.status === "fulfilled" ? animexRes.value : [],
    ...iframeSources,
    ...dailymotionRes.status === "fulfilled" ? dailymotionRes.value : [],
    ...hiAnimeRes.status === "fulfilled" ? hiAnimeRes.value : [],
    ...yugenRes.status === "fulfilled" ? yugenRes.value : []
  ];
}
const _sfc_main = {
  __name: "[ep]",
  __ssrInlineRender: true,
  async setup(__props) {
    const route = useRoute();
    useRouter();
    const { isLoggedIn } = useAuth();
    const theaterMode = ref(false);
    const animeId = computed(() => route.params.id);
    const currentEp = ref(Number(route.params.ep) || 1);
    const anime = ref(null);
    const synopsisExpanded = ref(false);
    const episodes = ref([]);
    const related = ref([]);
    const seasons = ref([]);
    const streamingLinks = ref([]);
    const loading = ref(true);
    const activeTab = ref("episodes");
    const audioMode = ref("sub");
    const inLibrary = ref(false);
    const streamLoading = ref(false);
    const streamError = ref("");
    const allSources = ref([]);
    const activeSrc = ref("");
    const activeGroup = ref("");
    const activeSource = ref(null);
    const videoRef = ref(null);
    ref(null);
    let sourceIndex = 0;
    let iframeTimer = null;
    const skipTimes = ref(null);
    const showSkipIntro = ref(false);
    const showSkipOutro = ref(false);
    const currentEpisode = computed(() => episodes.value.find((e) => e.number === currentEp.value) || null);
    const hasNext = computed(() => episodes.value.some((e) => e.number === currentEp.value + 1));
    const hasPrev = computed(() => episodes.value.some((e) => e.number === currentEp.value - 1));
    const hasStream = computed(() => !!activeSrc.value);
    computed(() => {
      var _a;
      return ((_a = activeSource.value) == null ? void 0 : _a.type) === "hls";
    });
    const isVideoSrc = computed(() => {
      var _a, _b;
      return ((_a = activeSource.value) == null ? void 0 : _a.type) === "hls" || ((_b = activeSource.value) == null ? void 0 : _b.type) === "mp4";
    });
    const serviceIcons = {
      Crunchyroll: "\u{1F7E0}",
      Netflix: "\u{1F534}",
      Funimation: "\u{1F7E3}",
      "Amazon Prime Video": "\u{1F535}",
      "Disney+": "\u{1F537}",
      HIDIVE: "\u{1F7E6}",
      Hulu: "\u{1F7E2}"
    };
    function mountHls(url) {
      return;
    }
    function clearIframeTimer() {
      if (iframeTimer) {
        clearTimeout(iframeTimer);
        iframeTimer = null;
      }
    }
    function selectSource(src) {
      clearIframeTimer();
      activeSource.value = src;
      activeSrc.value = src.url;
      activeGroup.value = src.group;
      sourceIndex = allSources.value.indexOf(src);
      if (src.type === "hls") {
        nextTick(() => mountHls(src.url));
      } else if (src.type === "mp4") {
        nextTick(() => {
          const el = videoRef.value;
          if (el) {
            el.src = src.url;
            el.play().catch(() => {
            });
          }
        });
      } else {
        iframeTimer = setTimeout(() => {
          console.warn("[stream] iframe timeout, trying next source");
          tryNextSource();
        }, 12e3);
      }
    }
    function tryNextSource() {
      const next = allSources.value[sourceIndex + 1];
      if (next) selectSource(next);
    }
    async function fetchSkipTimes(malId, ep) {
      skipTimes.value = null;
      showSkipIntro.value = false;
      showSkipOutro.value = false;
      try {
        const res = await fetch(`https://api.aniskip.com/v1/skip-times/${malId}/${ep}?types[]=op&types[]=ed`);
        if (!res.ok) return;
        const { results } = await res.json();
        const times = {};
        for (const r of results != null ? results : []) {
          if (r.skip_type === "op") {
            times.introStart = r.interval.start_time;
            times.introEnd = r.interval.end_time;
          }
          if (r.skip_type === "ed") {
            times.outroStart = r.interval.start_time;
            times.outroEnd = r.interval.end_time;
          }
        }
        if (times.introStart !== void 0 || times.outroStart !== void 0) skipTimes.value = times;
      } catch {
      }
    }
    async function loadEpisodeStream(epNum) {
      var _a;
      clearIframeTimer();
      activeSrc.value = "";
      activeSource.value = null;
      allSources.value = [];
      streamError.value = "";
      streamLoading.value = true;
      sourceIndex = 0;
      try {
        const usedEnglish = !!anime.value.englishTitle;
        const title = anime.value.englishTitle || anime.value.title;
        const originalTitle = anime.value.romanizedTitle || "";
        const cat = audioMode.value;
        let sources = await getAllSources(title, epNum, cat, originalTitle);
        if (!sources.length && !usedEnglish) {
          try {
            const fresh = await getAnimeDetail(animeId.value);
            const freshEnglish = (_a = fresh == null ? void 0 : fresh.data) == null ? void 0 : _a.englishTitle;
            if (freshEnglish && freshEnglish !== title) {
              anime.value = { ...anime.value, ...fresh.data };
              sources = await getAllSources(freshEnglish, epNum, cat, originalTitle);
            }
          } catch {
          }
        }
        allSources.value = sources;
        if (sources.length) selectSource(sources[0]);
        fetchSkipTimes(animeId.value, epNum);
        if (isLoggedIn.value && anime.value) recordHistory(anime.value, epNum);
      } catch (e) {
        streamError.value = e.message;
      }
      streamLoading.value = false;
    }
    async function fetchData() {
      var _a;
      loading.value = true;
      activeSrc.value = "";
      allSources.value = [];
      const [ad, ep, rel, sl, sv] = await Promise.allSettled([
        getAnimeDetail(animeId.value),
        getEpisodes(animeId.value),
        getRelated(animeId.value),
        getStreamingLinks(animeId.value),
        getAnimeSeasons(animeId.value)
      ]);
      if (ad.status === "fulfilled") anime.value = ad.value.data;
      if (ep.status === "fulfilled") episodes.value = ep.value.data;
      if (rel.status === "fulfilled") related.value = rel.value.data;
      if (sl.status === "fulfilled") streamingLinks.value = sl.value.data;
      if (sv.status === "fulfilled") seasons.value = sv.value.data;
      loading.value = false;
      if ((_a = anime.value) == null ? void 0 : _a.title) {
        inLibrary.value = isInLibrary(anime.value.id);
        incrementViewCount(anime.value.id, "anime");
        await loadEpisodeStream(currentEp.value);
      }
    }
    useSeoMeta({
      title: computed(() => anime.value ? `${anime.value.title} \u2014 Episode ${currentEp.value} | Salidumay` : "Watch | Salidumay"),
      description: computed(() => {
        var _a;
        return ((_a = anime.value) == null ? void 0 : _a.synopsis) || "Stream anime episodes on Salidumay.";
      })
    });
    watch(() => route.params.id, () => {
      currentEp.value = 1;
      fetchData();
    });
    watch(theaterMode, (v) => (void 0).body.classList.toggle("theater-mode", v));
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page" }, _attrs))} data-v-ca6999f2><div class="breadcrumb" data-v-ca6999f2>`);
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
      _push(`<span class="bc-sep" data-v-ca6999f2>\u203A</span>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/watch",
        class: "bc-link"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Watch`);
          } else {
            return [
              createTextVNode("Watch")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<span class="bc-sep" data-v-ca6999f2>\u203A</span><span class="bc-current" data-v-ca6999f2>${ssrInterpolate(((_a = anime.value) == null ? void 0 : _a.title) || "\u2026")}</span>`);
      if (currentEpisode.value) {
        _push(`<span class="bc-sep" data-v-ca6999f2>\u203A</span>`);
      } else {
        _push(`<!---->`);
      }
      if (currentEpisode.value) {
        _push(`<span class="bc-ep" data-v-ca6999f2>Episode ${ssrInterpolate(currentEp.value)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="${ssrRenderClass(["player-layout", { theater: theaterMode.value }])}" data-v-ca6999f2><div class="player-left" data-v-ca6999f2><div class="ep-nav" data-v-ca6999f2><button class="ep-nav-btn"${ssrIncludeBooleanAttr(!hasPrev.value) ? " disabled" : ""} data-v-ca6999f2><svg viewBox="0 0 24 24" fill="currentColor" data-v-ca6999f2><path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" data-v-ca6999f2></path></svg> Prev </button><span class="ep-nav-label" data-v-ca6999f2><span class="ep-nav-title" data-v-ca6999f2>${ssrInterpolate((_b = anime.value) == null ? void 0 : _b.title)}</span><span class="ep-nav-ep" data-v-ca6999f2>Episode ${ssrInterpolate(currentEp.value)}</span></span>`);
      if (allSources.value.length) {
        _push(`<div class="audio-toggle" data-v-ca6999f2><button class="${ssrRenderClass(["audio-btn", { active: audioMode.value === "sub" }])}" data-v-ca6999f2>SUB</button><button class="${ssrRenderClass(["audio-btn", { active: audioMode.value === "dub" }])}" data-v-ca6999f2>DUB</button></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(isLoggedIn) && anime.value) {
        _push(`<button class="${ssrRenderClass(["library-btn", { saved: inLibrary.value }])}"${ssrRenderAttr("title", inLibrary.value ? "Remove from Library" : "Add to Library")} data-v-ca6999f2><svg viewBox="0 0 24 24"${ssrRenderAttr("fill", inLibrary.value ? "currentColor" : "none")} stroke="currentColor" stroke-width="2" data-v-ca6999f2><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" data-v-ca6999f2></path></svg> ${ssrInterpolate(inLibrary.value ? "Saved" : "Save")}</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button class="ep-nav-btn"${ssrIncludeBooleanAttr(!hasNext.value) ? " disabled" : ""} data-v-ca6999f2> Next <svg viewBox="0 0 24 24" fill="currentColor" data-v-ca6999f2><path d="M6 18l8.5-6L6 6v12zm2-8.14 5.03 3.6L8 17.14V9.86zM16 6h2v12h-2z" data-v-ca6999f2></path></svg></button><button class="${ssrRenderClass(["theater-btn", { active: theaterMode.value }])}"${ssrRenderAttr("title", theaterMode.value ? "Exit Theater Mode" : "Theater Mode")} data-v-ca6999f2><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-ca6999f2><rect x="2" y="5" width="20" height="14" rx="2" data-v-ca6999f2></rect>`);
      if (!theaterMode.value) {
        _push(`<path d="M8 9l-3 3 3 3M16 9l3 3-3 3" data-v-ca6999f2></path>`);
      } else {
        _push(`<path d="M11 9l3 3-3 3M13 9l-3 3 3 3" data-v-ca6999f2></path>`);
      }
      _push(`</svg></button></div><div class="player-wrap" data-v-ca6999f2>`);
      if (isVideoSrc.value && hasStream.value) {
        _push(`<video class="video-el" controls playsinline style="${ssrRenderStyle({ "background": "#000" })}" data-v-ca6999f2><!--[-->`);
        ssrRenderList((_c = activeSource.value) == null ? void 0 : _c.tracks, (t, i) => {
          _push(`<track${ssrRenderAttr("src", t.file)}${ssrRenderAttr("kind", t.kind || "captions")}${ssrRenderAttr("label", t.label)}${ssrIncludeBooleanAttr(t.default) ? " default" : ""} data-v-ca6999f2>`);
        });
        _push(`<!--]--></video>`);
      } else {
        _push(`<!---->`);
      }
      if (isVideoSrc.value && showSkipIntro.value) {
        _push(`<button class="skip-intro" data-v-ca6999f2>Skip Intro \u203A</button>`);
      } else {
        _push(`<!---->`);
      }
      if (isVideoSrc.value && showSkipOutro.value) {
        _push(`<button class="skip-intro" data-v-ca6999f2>Skip Outro \u203A</button>`);
      } else if (!isVideoSrc.value && hasStream.value) {
        _push(`<iframe class="video-el"${ssrRenderAttr("src", activeSrc.value)} allow="autoplay; encrypted-media; fullscreen; picture-in-picture" allowfullscreen frameborder="0" scrolling="no" data-v-ca6999f2></iframe>`);
      } else {
        _push(`<!---->`);
      }
      if (streamLoading.value) {
        _push(`<div class="overlay-center" data-v-ca6999f2><div class="spin" data-v-ca6999f2></div><p data-v-ca6999f2>Loading stream\u2026</p></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!streamLoading.value && !hasStream.value) {
        _push(`<div class="overlay-center" data-v-ca6999f2><div class="no-video-icon" data-v-ca6999f2>\u25B6</div><p data-v-ca6999f2>No stream available for this episode</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (!isVideoSrc.value && hasStream.value) {
        _push(`<div class="ad-warning" data-v-ca6999f2><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="ad-warning-icon" data-v-ca6999f2><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" data-v-ca6999f2></path><line x1="12" y1="9" x2="12" y2="13" data-v-ca6999f2></line><line x1="12" y1="17" x2="12.01" y2="17" data-v-ca6999f2></line></svg><span data-v-ca6999f2> This stream provider may show ads or open new tabs. Use <strong data-v-ca6999f2>uBlock Origin</strong> or <strong data-v-ca6999f2>Brave Browser</strong> for an ad-free experience. </span></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!isVideoSrc.value && hasStream.value && allSources.value[unref(sourceIndex) + 1]) {
        _push(`<div class="fallback-bar" data-v-ca6999f2><span class="fallback-label" data-v-ca6999f2>Video not loading?</span><button class="fallback-btn" data-v-ca6999f2> Try Source ${ssrInterpolate(unref(sourceIndex) + 2)} \u2192 </button></div>`);
      } else {
        _push(`<!---->`);
      }
      if (allSources.value.length) {
        _push(`<div class="server-bar" data-v-ca6999f2><span class="server-label" data-v-ca6999f2>Source</span><!--[-->`);
        ssrRenderList(allSources.value, (src) => {
          _push(`<button class="${ssrRenderClass(["server-btn", { active: activeSrc.value === src.url }])}" data-v-ca6999f2>${ssrInterpolate(src.label)} `);
          if (src.type && src.type !== "iframe") {
            _push(`<span class="src-type-badge" data-v-ca6999f2>${ssrInterpolate(src.type.toUpperCase())}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</button>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!streamLoading.value && !hasStream.value && !allSources.value.length) {
        _push(`<div class="trailer-notice" data-v-ca6999f2><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="notice-icon" data-v-ca6999f2><circle cx="12" cy="12" r="10" data-v-ca6999f2></circle><line x1="12" y1="8" x2="12" y2="12" data-v-ca6999f2></line><line x1="12" y1="16" x2="12.01" y2="16" data-v-ca6999f2></line></svg> Stream unavailable for this episode. Try another episode or check back later. `);
        if (streamError.value) {
          _push(`<span class="error-detail" data-v-ca6999f2>${ssrInterpolate(streamError.value)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (!loading.value && streamingLinks.value.length) {
        _push(`<div class="streaming-section" data-v-ca6999f2><p class="streaming-label" data-v-ca6999f2>Watch Licensed Episodes On</p><div class="streaming-links" data-v-ca6999f2><!--[-->`);
        ssrRenderList(streamingLinks.value, (link) => {
          _push(`<a${ssrRenderAttr("href", link.url)} target="_blank" rel="noopener noreferrer" class="streaming-btn" data-v-ca6999f2><span data-v-ca6999f2>${ssrInterpolate(serviceIcons[link.name] || "\u25B6")}</span> ${ssrInterpolate(link.name)}</a>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="tabs-wrap" data-v-ca6999f2><div class="tabs" data-v-ca6999f2><button class="${ssrRenderClass(["tab", { active: activeTab.value === "episodes" }])}" data-v-ca6999f2> Episodes <span class="tab-count" data-v-ca6999f2>${ssrInterpolate(episodes.value.length)}</span></button><button class="${ssrRenderClass(["tab", { active: activeTab.value === "related" }])}" data-v-ca6999f2> Related <span class="tab-count" data-v-ca6999f2>${ssrInterpolate(related.value.length)}</span></button></div>`);
      if (activeTab.value === "episodes") {
        _push(`<div data-v-ca6999f2>`);
        if (seasons.value.length) {
          _push(`<div class="season-cards-wrap" data-v-ca6999f2><span class="season-cards-label" data-v-ca6999f2>Seasons</span><div class="season-cards" data-v-ca6999f2><div class="season-card active" data-v-ca6999f2><div class="season-card-img" data-v-ca6999f2>`);
          if ((_d = anime.value) == null ? void 0 : _d.image) {
            _push(`<img${ssrRenderAttr("src", anime.value.image)}${ssrRenderAttr("alt", anime.value.title)} data-v-ca6999f2>`);
          } else {
            _push(`<div class="season-card-img-ph" data-v-ca6999f2>${ssrInterpolate((_f = (_e = anime.value) == null ? void 0 : _e.title) == null ? void 0 : _f[0])}</div>`);
          }
          _push(`</div><div class="season-card-info" data-v-ca6999f2><span class="season-card-badge current" data-v-ca6999f2>Current</span><span class="season-card-title" data-v-ca6999f2>${ssrInterpolate((_g = anime.value) == null ? void 0 : _g.title)}</span></div></div><!--[-->`);
          ssrRenderList(seasons.value, (s) => {
            var _a2;
            _push(`<div class="${ssrRenderClass(["season-card", s.relation === "Prequel" ? "prequel" : "sequel"])}" data-v-ca6999f2><div class="season-card-img" data-v-ca6999f2>`);
            if (s.image) {
              _push(`<img${ssrRenderAttr("src", s.image)}${ssrRenderAttr("alt", s.title)} data-v-ca6999f2>`);
            } else {
              _push(`<div class="season-card-img-ph" data-v-ca6999f2>${ssrInterpolate((_a2 = s.title) == null ? void 0 : _a2[0])}</div>`);
            }
            _push(`<div class="season-card-play" data-v-ca6999f2><svg viewBox="0 0 24 24" fill="currentColor" data-v-ca6999f2><path d="M8 5v14l11-7z" data-v-ca6999f2></path></svg></div></div><div class="season-card-info" data-v-ca6999f2><span class="${ssrRenderClass(["season-card-badge", s.relation === "Prequel" ? "prequel" : "sequel"])}" data-v-ca6999f2>${ssrInterpolate(s.relation)}</span><span class="season-card-title" data-v-ca6999f2>${ssrInterpolate(s.title)}</span></div></div>`);
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="ep-list" data-v-ca6999f2>`);
        if (!episodes.value.length && !loading.value) {
          _push(`<div class="ep-empty" data-v-ca6999f2>No episode list available</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--[-->`);
        ssrRenderList(episodes.value, (ep) => {
          _push(`<button class="${ssrRenderClass(["ep-item", { active: ep.number === currentEp.value }])}" data-v-ca6999f2><div class="ep-thumb" data-v-ca6999f2>`);
          if (ep.thumbnail) {
            _push(`<img${ssrRenderAttr("src", ep.thumbnail)}${ssrRenderAttr("alt", `EP ${ep.number}`)} loading="lazy" data-v-ca6999f2>`);
          } else {
            _push(`<div class="ep-thumb-ph" data-v-ca6999f2>${ssrInterpolate(ep.number)}</div>`);
          }
          _push(`<div class="ep-play-icon" data-v-ca6999f2><svg viewBox="0 0 24 24" fill="currentColor" data-v-ca6999f2><path d="M8 5v14l11-7z" data-v-ca6999f2></path></svg></div></div><div class="ep-info" data-v-ca6999f2><span class="ep-num" data-v-ca6999f2>Episode ${ssrInterpolate(ep.number)}</span><span class="ep-title-text" data-v-ca6999f2>${ssrInterpolate(ep.title)}</span></div>`);
          if (ep.number === currentEp.value) {
            _push(`<span class="ep-now" data-v-ca6999f2>PLAYING</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</button>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (activeTab.value === "related") {
        _push(`<div class="related-grid" data-v-ca6999f2>`);
        if (!related.value.length && !loading.value) {
          _push(`<div class="ep-empty" data-v-ca6999f2>No related anime</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--[-->`);
        ssrRenderList(related.value, (rel) => {
          _push(`<div class="rel-card" data-v-ca6999f2><div class="rel-img" data-v-ca6999f2><img${ssrRenderAttr("src", rel.image)}${ssrRenderAttr("alt", rel.title)} loading="lazy" data-v-ca6999f2><div class="rel-play" data-v-ca6999f2><svg viewBox="0 0 24 24" fill="currentColor" data-v-ca6999f2><path d="M8 5v14l11-7z" data-v-ca6999f2></path></svg></div></div><div class="rel-info" data-v-ca6999f2><span class="rel-genre" data-v-ca6999f2>${ssrInterpolate(rel.genre)}</span><h4 class="rel-title" data-v-ca6999f2>${ssrInterpolate(rel.title)}</h4><div class="rel-meta" data-v-ca6999f2><span data-v-ca6999f2>${ssrInterpolate(rel.episodes)} ep</span><span class="rel-rating" data-v-ca6999f2>\u2605 ${ssrInterpolate(rel.rating)}</span></div></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (animeId.value) {
        _push(ssrRenderComponent(CommentSection, { "anime-id": animeId.value }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><aside class="player-sidebar" data-v-ca6999f2>`);
      if (loading.value) {
        _push(`<!--[--><div class="sk-poster skeleton" data-v-ca6999f2></div><div class="sk-title skeleton" data-v-ca6999f2></div><div class="sk-line skeleton" data-v-ca6999f2></div><div class="sk-line skeleton" style="${ssrRenderStyle({ "width": "70%" })}" data-v-ca6999f2></div><!--]-->`);
      } else if (anime.value) {
        _push(`<!--[--><div class="sidebar-poster" data-v-ca6999f2><img${ssrRenderAttr("src", anime.value.image)}${ssrRenderAttr("alt", anime.value.title)} data-v-ca6999f2><div class="sidebar-poster-glow" data-v-ca6999f2></div></div><div class="sidebar-meta" data-v-ca6999f2><span class="badge-glow" data-v-ca6999f2>${ssrInterpolate(anime.value.badge || anime.value.genre)}</span><span class="badge-outline" data-v-ca6999f2>${ssrInterpolate(anime.value.genre)}</span></div><h2 class="sidebar-title gradient-text" data-v-ca6999f2>${ssrInterpolate(anime.value.title)}</h2><p class="sidebar-subtitle" data-v-ca6999f2>${ssrInterpolate(anime.value.subtitle)}</p><div class="sidebar-stats" data-v-ca6999f2><div class="s-stat" data-v-ca6999f2><span class="s-stat-icon" data-v-ca6999f2>\u25B6</span><div data-v-ca6999f2><span class="s-stat-val" data-v-ca6999f2>${ssrInterpolate(anime.value.episodes)}</span><span class="s-stat-label" data-v-ca6999f2>Episodes</span></div></div><div class="s-stat" data-v-ca6999f2><span class="s-stat-icon star" data-v-ca6999f2>\u2605</span><div data-v-ca6999f2><span class="s-stat-val" data-v-ca6999f2>${ssrInterpolate(typeof anime.value.rating === "number" ? anime.value.rating.toFixed(1) : anime.value.rating)}</span><span class="s-stat-label" data-v-ca6999f2>Rating</span></div></div>`);
        if (anime.value.studio) {
          _push(`<div class="s-stat" data-v-ca6999f2><span class="s-stat-icon" data-v-ca6999f2>\u{1F3AC}</span><div data-v-ca6999f2><span class="s-stat-val" data-v-ca6999f2>${ssrInterpolate(anime.value.studio)}</span><span class="s-stat-label" data-v-ca6999f2>Studio</span></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="synopsis-wrap" data-v-ca6999f2><p class="${ssrRenderClass([{ expanded: synopsisExpanded.value }, "sidebar-synopsis"])}" data-v-ca6999f2>${ssrInterpolate(anime.value.synopsis)}</p>`);
        if (((_h = anime.value.synopsis) == null ? void 0 : _h.length) > 180) {
          _push(`<button class="synopsis-toggle" data-v-ca6999f2>${ssrInterpolate(synopsisExpanded.value ? "See less \u2191" : "See more \u2193")}</button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if (anime.value.episodes && typeof anime.value.episodes === "number") {
          _push(`<div class="series-progress" data-v-ca6999f2><div class="sp-header" data-v-ca6999f2><span class="sp-label" data-v-ca6999f2>Progress</span><span class="sp-val" data-v-ca6999f2>${ssrInterpolate(currentEp.value)} / ${ssrInterpolate(anime.value.episodes)}</span></div><div class="sp-track" data-v-ca6999f2><div class="sp-fill" style="${ssrRenderStyle({ width: currentEp.value / anime.value.episodes * 100 + "%" })}" data-v-ca6999f2></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="details-table" data-v-ca6999f2>`);
        if (anime.value.status) {
          _push(`<div class="dt-row" data-v-ca6999f2><span class="dt-key" data-v-ca6999f2>Status</span><span class="${ssrRenderClass(["dt-val", anime.value.status === "Airing" ? "text-cyan" : "text-green"])}" data-v-ca6999f2>${ssrInterpolate(anime.value.status)}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        if (anime.value.year) {
          _push(`<div class="dt-row" data-v-ca6999f2><span class="dt-key" data-v-ca6999f2>Year</span><span class="dt-val" data-v-ca6999f2>${ssrInterpolate(anime.value.year)}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        if (anime.value.studio) {
          _push(`<div class="dt-row" data-v-ca6999f2><span class="dt-key" data-v-ca6999f2>Studio</span><span class="dt-val" data-v-ca6999f2>${ssrInterpolate(anime.value.studio)}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        if (anime.value.genre) {
          _push(`<div class="dt-row" data-v-ca6999f2><span class="dt-key" data-v-ca6999f2>Genre</span><span class="dt-val" data-v-ca6999f2>${ssrInterpolate(anime.value.genre)}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        if (allSources.value.length) {
          _push(`<div class="dt-row" data-v-ca6999f2><span class="dt-key" data-v-ca6999f2>Stream</span><span class="dt-val text-cyan" data-v-ca6999f2>${ssrInterpolate(((_i = allSources.value[0]) == null ? void 0 : _i.group) || "Available")} \u2713</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><!--]-->`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/watch/[id]/ep/[ep].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _ep_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ca6999f2"]]);

export { _ep_ as default };
//# sourceMappingURL=_ep_-9mpM94ZU.mjs.map
