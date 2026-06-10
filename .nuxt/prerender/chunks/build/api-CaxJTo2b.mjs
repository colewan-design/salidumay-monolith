import axios from 'file://C:/salidumay-nuxt/node_modules/axios/index.js';

const backend = axios.create({
  baseURL: process.env.NUXT_PUBLIC_API_URL || "/api/anime",
  headers: { Accept: "application/json" },
  timeout: 2e4
});
function youtubeId(item) {
  var _a, _b;
  if ((_a = item.trailer) == null ? void 0 : _a.youtube_id) return item.trailer.youtube_id;
  if ((_b = item.trailer) == null ? void 0 : _b.embed_url) {
    const m = item.trailer.embed_url.match(/\/embed\/([^?/]+)/);
    if (m == null ? void 0 : m[1]) return m[1];
  }
  if (item.trailerUrl) {
    const m = item.trailerUrl.match(/\/embed\/([^?/]+)/);
    if (m == null ? void 0 : m[1]) return m[1];
  }
  return null;
}
function normalizeAnime(item) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v;
  if (!item) return null;
  const ytId = youtubeId(item);
  return {
    id: (_a = item.id) != null ? _a : item.mal_id,
    title: item.title_english || item.englishTitle || item.title || "",
    subtitle: item.subtitle || item.title_japanese || item.title || "",
    englishTitle: item.englishTitle || item.title_english || "",
    romanizedTitle: item.romanizedTitle || item.title || "",
    image: item.image || ((_c = (_b = item.images) == null ? void 0 : _b.jpg) == null ? void 0 : _c.large_image_url) || ((_e = (_d = item.images) == null ? void 0 : _d.jpg) == null ? void 0 : _e.image_url) || "",
    backdrop: ytId ? `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg` : "",
    genre: item.genre || ((_g = (_f = item.genres) == null ? void 0 : _f[0]) == null ? void 0 : _g.name) || ((_i = (_h = item.demographics) == null ? void 0 : _h[0]) == null ? void 0 : _i.name) || "Anime",
    badge: item.badge || ((_k = (_j = item.genres) == null ? void 0 : _j[0]) == null ? void 0 : _k.name) || "Anime",
    rating: typeof item.rating === "number" ? item.rating : typeof item.score === "number" ? item.score : 0,
    episodes: (_l = item.episodes) != null ? _l : "?",
    status: item.status === "Currently Airing" ? "Airing" : item.status || "Done",
    year: (_q = (_p = item.year) != null ? _p : (_o = (_n = (_m = item.aired) == null ? void 0 : _m.prop) == null ? void 0 : _n.from) == null ? void 0 : _o.year) != null ? _q : null,
    studio: item.studio || ((_s = (_r = item.studios) == null ? void 0 : _r[0]) == null ? void 0 : _s.name) || "",
    synopsis: item.synopsis || "",
    members: item.members || 0,
    new: (_t = item.new) != null ? _t : item.status === "Currently Airing",
    trailerUrl: (_v = item.trailerUrl) != null ? _v : ((_u = item.trailer) == null ? void 0 : _u.embed_url) ? item.trailer.embed_url.replace("autoplay=1", "autoplay=0") + "&enablejsapi=0" : null
  };
}
const searchAnime = async (query) => {
  const { data } = await backend.get("/search", { params: { q: query } });
  return { data: (data.data || []).map(normalizeAnime) };
};
const getAnimeDetail = async (id) => {
  const { data } = await backend.get(`/${id}`);
  return { data: normalizeAnime(data.data) };
};
const getStreamingLinks = async (id) => {
  const { data } = await backend.get(`/${id}/streaming`);
  return { data: data.data || [] };
};
const getEpisodes = async (id) => {
  const { data } = await backend.get(`/${id}/episodes`);
  return { data: data.data || [] };
};
const getByGenre = async (genre, page = 1) => {
  const { data } = await backend.get(`/genre/${encodeURIComponent(genre)}`, { params: { page } });
  return {
    data: (data.data || []).map(normalizeAnime),
    pagination: data.pagination || {}
  };
};
const getRelated = async (id) => {
  const { data } = await backend.get(`/${id}/related`);
  return { data: (data.data || []).map(normalizeAnime) };
};
const getAnimeSeasons = async (id) => {
  const { data } = await backend.get(`/${id}/seasons`);
  return { data: data.data || [] };
};

export { getAnimeSeasons as a, getByGenre as b, getEpisodes as c, getRelated as d, getStreamingLinks as e, getAnimeDetail as g, searchAnime as s };
//# sourceMappingURL=api-CaxJTo2b.mjs.map
