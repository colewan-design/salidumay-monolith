import axios from 'file://C:/salidumay-nuxt/node_modules/axios/index.js';

const API_BASE = (process.env.NUXT_PUBLIC_API_URL || "/api/anime").replace(/\/anime$/, "/tv");
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
function normalizeDirect(s) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r;
  return {
    id: s.id,
    title: s.name || s.title || "",
    original_title: s.original_name || s.original_title || "",
    overview: s.overview || "",
    image: img(s.poster_path),
    backdrop: img(s.backdrop_path, "original"),
    rating: (_a = s.vote_average) != null ? _a : 0,
    year: s.first_air_date ? s.first_air_date.slice(0, 4) : "",
    genre: ((_c = (_b = s.genres) == null ? void 0 : _b[0]) == null ? void 0 : _c.name) || "",
    genre_ids: s.genre_ids || ((_d = s.genres) == null ? void 0 : _d.map((g) => g.id)) || [],
    genres: ((_e = s.genres) == null ? void 0 : _e.map((g) => ({ id: g.id, name: g.name }))) || [],
    genreNames: ((_f = s.genres) == null ? void 0 : _f.map((g) => g.name)) || [],
    tagline: s.tagline || "",
    status: s.status || "",
    popularity: (_g = s.popularity) != null ? _g : 0,
    vote_count: (_h = s.vote_count) != null ? _h : 0,
    number_of_seasons: (_i = s.number_of_seasons) != null ? _i : null,
    number_of_episodes: (_j = s.number_of_episodes) != null ? _j : null,
    originalLang: s.original_language || "",
    created_by: s.created_by || [],
    cast: (((_k = s.credits) == null ? void 0 : _k.cast) || []).slice(0, 12).map((c) => ({
      id: c.id,
      name: c.name,
      character: c.character,
      image: img(c.profile_path, "w185")
    })),
    trailer_key: ((_n = (_m = (_l = s.videos) == null ? void 0 : _l.results) == null ? void 0 : _m.find((v) => v.type === "Trailer" && v.site === "YouTube")) == null ? void 0 : _n.key) || null,
    trailer: ((_q = (_p = (_o = s.videos) == null ? void 0 : _o.results) == null ? void 0 : _p.find((v) => v.type === "Trailer" && v.site === "YouTube")) == null ? void 0 : _q.key) || null,
    seasons: (s.seasons || []).map((season) => {
      var _a2;
      return {
        id: season.id,
        season_number: season.season_number,
        name: season.name,
        overview: season.overview || "",
        poster_url: img(season.poster_path),
        air_date: season.air_date || "",
        episode_count: (_a2 = season.episode_count) != null ? _a2 : 0,
        episodes: []
      };
    }),
    similar: (((_r = s.similar) == null ? void 0 : _r.results) || []).slice(0, 12).map(normalizeDirect)
  };
}
function normalizeBackend(s) {
  var _a;
  return {
    ...s,
    genreNames: (s.genres || []).map((g) => g.name).filter(Boolean),
    voteCount: (_a = s.vote_count) != null ? _a : 0,
    originalLang: s.original_language || "",
    trailer: s.trailer_key || null,
    similar: s.similar || [],
    seasons: s.seasons || []
  };
}
async function withFallback(backendCall, directCall) {
  var _a, _b, _c;
  try {
    const res = await backendCall();
    const body = res.data;
    if (((_a = body == null ? void 0 : body.data) == null ? void 0 : _a.length) === 0 && TMDB_KEY) return await directCall();
    return {
      data: body.data,
      totalPages: (_c = (_b = body.pagination) == null ? void 0 : _b.total_pages) != null ? _c : 1,
      pagination: body.pagination
    };
  } catch {
    if (TMDB_KEY) return await directCall();
    throw new Error("Backend unavailable and no TMDB key set");
  }
}
function p(extra = {}) {
  return { api_key: TMDB_KEY, ...extra };
}
const getPopularSeries = async (page = 1) => withFallback(
  () => backend.get("/popular", { params: { page } }),
  async () => {
    const { data } = await tmdbDirect.get("/tv/popular", { params: p({ page }) });
    return { data: data.results.map(normalizeDirect), totalPages: data.total_pages, pagination: { has_next: page < data.total_pages, total_pages: data.total_pages } };
  }
);
const getTrendingSeries = async (page = 1) => withFallback(
  () => backend.get("/trending", { params: { page } }),
  async () => {
    const { data } = await tmdbDirect.get("/trending/tv/week", { params: p({ page }) });
    return { data: data.results.map(normalizeDirect), totalPages: data.total_pages, pagination: { has_next: page < data.total_pages, total_pages: data.total_pages } };
  }
);
const getTopRatedSeries = async (page = 1) => withFallback(
  () => backend.get("/top-rated", { params: { page } }),
  async () => {
    const { data } = await tmdbDirect.get("/tv/top_rated", { params: p({ page }) });
    return { data: data.results.map(normalizeDirect), totalPages: data.total_pages, pagination: { has_next: page < data.total_pages, total_pages: data.total_pages } };
  }
);
const getAiringTodaySeries = async (page = 1) => withFallback(
  () => backend.get("/airing-today", { params: { page } }),
  async () => {
    const { data } = await tmdbDirect.get("/tv/airing_today", { params: p({ page }) });
    return { data: data.results.map(normalizeDirect), totalPages: data.total_pages, pagination: { has_next: page < data.total_pages, total_pages: data.total_pages } };
  }
);
const getSeriesByGenre = async (genreId, page = 1) => withFallback(
  () => backend.get(`/genre/${genreId}`, { params: { page } }),
  async () => {
    const { data } = await tmdbDirect.get("/discover/tv", { params: p({ with_genres: genreId, page, sort_by: "popularity.desc" }) });
    return { data: data.results.map(normalizeDirect), totalPages: data.total_pages, pagination: { has_next: page < data.total_pages, total_pages: data.total_pages } };
  }
);
const searchSeries = async (query, page = 1) => withFallback(
  () => backend.get("/search", { params: { q: query, page } }),
  async () => {
    const { data } = await tmdbDirect.get("/search/tv", { params: p({ query, page }) });
    return { data: data.results.map(normalizeDirect), totalPages: data.total_pages, pagination: { has_next: page < data.total_pages, total_pages: data.total_pages } };
  }
);
const getSeriesDetail = async (id) => {
  var _a;
  try {
    const res = await backend.get(`/${id}`);
    const series = (_a = res.data) == null ? void 0 : _a.data;
    if (series) return normalizeBackend(series);
    throw new Error("Not found");
  } catch {
    if (!TMDB_KEY) return null;
    const { data } = await tmdbDirect.get(`/tv/${id}`, {
      params: p({ append_to_response: "credits,similar,videos" })
    });
    return normalizeDirect(data);
  }
};

export { getPopularSeries as a, getSeriesByGenre as b, getSeriesDetail as c, getTopRatedSeries as d, getTrendingSeries as e, getAiringTodaySeries as g, searchSeries as s };
//# sourceMappingURL=tvSeries-7207TLND.mjs.map
