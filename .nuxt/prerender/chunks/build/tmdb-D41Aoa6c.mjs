import axios from 'file://C:/salidumay-nuxt/node_modules/axios/index.js';

const API_BASE = (process.env.NUXT_PUBLIC_API_URL || "/api/anime").replace(/\/anime$/, "/films");
const backend = axios.create({
  baseURL: API_BASE,
  headers: { Accept: "application/json" },
  timeout: 15e3
});
const TMDB_KEY = process.env.NUXT_PUBLIC_TMDB_KEY || "";
const TMDB_BASE = "https://api.themoviedb.org/3";
const IMG_BASE = "https://image.tmdb.org/t/p";
const tmdbDirect = axios.create({ baseURL: TMDB_BASE, timeout: 15e3 });
function img(path, size = "w500") {
  return path ? `${IMG_BASE}/${size}${path}` : "";
}
function normalizeDirect(m) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v;
  return {
    id: m.id,
    title: m.title || m.name || "",
    overview: m.overview || "",
    image: img(m.poster_path),
    backdrop: img(m.backdrop_path, "original"),
    rating: (_a = m.vote_average) != null ? _a : 0,
    year: m.release_date ? m.release_date.slice(0, 4) : "",
    genre: ((_c = (_b = m.genres) == null ? void 0 : _b[0]) == null ? void 0 : _c.name) || "",
    genre_ids: m.genre_ids || ((_d = m.genres) == null ? void 0 : _d.map((g) => g.id)) || [],
    genres: ((_e = m.genres) == null ? void 0 : _e.map((g) => ({ id: g.id, name: g.name }))) || [],
    genreNames: ((_f = m.genres) == null ? void 0 : _f.map((g) => g.name)) || [],
    runtime: (_g = m.runtime) != null ? _g : null,
    tagline: m.tagline || "",
    status: m.status || "",
    popularity: (_h = m.popularity) != null ? _h : 0,
    vote_count: (_i = m.vote_count) != null ? _i : 0,
    voteCount: (_j = m.vote_count) != null ? _j : 0,
    adult: (_k = m.adult) != null ? _k : false,
    originalLang: m.original_language || "",
    director: ((_n = (_m = (_l = m.credits) == null ? void 0 : _l.crew) == null ? void 0 : _m.find((c) => c.job === "Director")) == null ? void 0 : _n.name) || "",
    cast: (((_o = m.credits) == null ? void 0 : _o.cast) || []).slice(0, 12).map((c) => ({
      id: c.id,
      name: c.name,
      character: c.character,
      image: img(c.profile_path, "w185")
    })),
    trailer_key: ((_r = (_q = (_p = m.videos) == null ? void 0 : _p.results) == null ? void 0 : _q.find((v) => v.type === "Trailer" && v.site === "YouTube")) == null ? void 0 : _r.key) || null,
    trailer: ((_u = (_t = (_s = m.videos) == null ? void 0 : _s.results) == null ? void 0 : _t.find((v) => v.type === "Trailer" && v.site === "YouTube")) == null ? void 0 : _u.key) || null,
    similar: (((_v = m.similar) == null ? void 0 : _v.results) || []).slice(0, 12).map(normalizeDirect)
  };
}
async function withFallback(backendCall, directCall) {
  var _a, _b, _c, _d;
  try {
    const res = await backendCall();
    const body = res.data;
    if (((_a = body == null ? void 0 : body.data) == null ? void 0 : _a.length) === 0 && TMDB_KEY) {
      return await directCall();
    }
    return {
      data: body.data,
      totalPages: (_d = (_c = (_b = body.pagination) == null ? void 0 : _b.total_pages) != null ? _c : body.totalPages) != null ? _d : 1,
      pagination: body.pagination
    };
  } catch {
    if (TMDB_KEY) return await directCall();
    throw new Error("Backend unavailable and no VITE_TMDB_KEY set");
  }
}
function p(extra = {}) {
  return { api_key: TMDB_KEY, ...extra };
}
const getPopularFilms = async (page = 1) => {
  return withFallback(
    () => backend.get("/popular", { params: { page } }),
    async () => {
      const { data } = await tmdbDirect.get("/movie/popular", { params: p({ page }) });
      return { data: data.results.map(normalizeDirect), totalPages: data.total_pages, pagination: { has_next: page < data.total_pages, total_pages: data.total_pages } };
    }
  );
};
const getTopRatedFilms = async (page = 1) => {
  return withFallback(
    () => backend.get("/top-rated", { params: { page } }),
    async () => {
      const { data } = await tmdbDirect.get("/movie/top_rated", { params: p({ page }) });
      return { data: data.results.map(normalizeDirect), totalPages: data.total_pages, pagination: { has_next: page < data.total_pages, total_pages: data.total_pages } };
    }
  );
};
const getTrendingFilms = async (page = 1) => {
  return withFallback(
    () => backend.get("/trending", { params: { page } }),
    async () => {
      const { data } = await tmdbDirect.get("/trending/movie/week", { params: p({ page }) });
      return { data: data.results.map(normalizeDirect), totalPages: data.total_pages, pagination: { has_next: page < data.total_pages, total_pages: data.total_pages } };
    }
  );
};
const getNowPlayingFilms = async (page = 1) => {
  return withFallback(
    () => backend.get("/now-playing", { params: { page } }),
    async () => {
      const { data } = await tmdbDirect.get("/movie/now_playing", { params: p({ page }) });
      return { data: data.results.map(normalizeDirect), totalPages: data.total_pages, pagination: { has_next: page < data.total_pages, total_pages: data.total_pages } };
    }
  );
};
const getFilmsByGenre = async (genreId, page = 1) => {
  return withFallback(
    () => backend.get(`/genre/${genreId}`, { params: { page } }),
    async () => {
      const { data } = await tmdbDirect.get("/discover/movie", { params: p({ with_genres: genreId, page, sort_by: "popularity.desc" }) });
      return { data: data.results.map(normalizeDirect), totalPages: data.total_pages, pagination: { has_next: page < data.total_pages, total_pages: data.total_pages } };
    }
  );
};
const getUpcomingFilms = async (page = 1) => {
  return withFallback(
    () => backend.get("/upcoming", { params: { page } }),
    async () => {
      const { data } = await tmdbDirect.get("/movie/upcoming", { params: p({ page }) });
      return { data: data.results.map(normalizeDirect), totalPages: data.total_pages, pagination: { has_next: page < data.total_pages, total_pages: data.total_pages } };
    }
  );
};
const searchFilms = async (query, page = 1) => {
  return withFallback(
    () => backend.get("/search", { params: { q: query, page } }),
    async () => {
      const { data } = await tmdbDirect.get("/search/movie", { params: p({ query, page }) });
      return { data: data.results.map(normalizeDirect), totalPages: data.total_pages, pagination: { has_next: page < data.total_pages, total_pages: data.total_pages } };
    }
  );
};
function normalizeBackend(f) {
  var _a;
  return {
    ...f,
    genreNames: (f.genres || []).map((g) => g.name).filter(Boolean),
    similar: f.similar || [],
    voteCount: (_a = f.vote_count) != null ? _a : 0,
    originalLang: f.original_language || "",
    trailer: f.trailer_key || null
  };
}
const getFilmDetail = async (id) => {
  var _a;
  try {
    const res = await backend.get(`/${id}`);
    const film = (_a = res.data) == null ? void 0 : _a.data;
    if (film) return normalizeBackend(film);
    throw new Error("Not found");
  } catch {
    if (!TMDB_KEY) return null;
    const { data } = await tmdbDirect.get(`/movie/${id}`, {
      params: p({ append_to_response: "credits,similar,videos" })
    });
    return normalizeDirect(data);
  }
};
const FILM_EMBED_SOURCES = (tmdbId) => [
  { label: "VidSrc", url: `https://vidsrc.to/embed/movie/${tmdbId}` },
  { label: "VidSrc 2", url: `https://vidsrc.me/embed/movie?tmdb=${tmdbId}` },
  { label: "2Embed", url: `https://www.2embed.cc/embed/${tmdbId}` },
  { label: "Embed.su", url: `https://embed.su/embed/movie/${tmdbId}` },
  { label: "AutoEmbed", url: `https://autoembed.cc/movie/tmdb/${tmdbId}` },
  { label: "MultiEmbed", url: `https://multiembed.mov/?video_id=${tmdbId}&tmdb=1` },
  { label: "Videasy", url: `https://player.videasy.net/movie/${tmdbId}` }
];

export { FILM_EMBED_SOURCES as F, getFilmsByGenre as a, getNowPlayingFilms as b, getPopularFilms as c, getTopRatedFilms as d, getTrendingFilms as e, getUpcomingFilms as f, getFilmDetail as g, searchFilms as s };
//# sourceMappingURL=tmdb-D41Aoa6c.mjs.map
