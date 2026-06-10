import axios from "axios";
const backend = axios.create({
  baseURL: process.env.NUXT_PUBLIC_API_URL || "/api/anime",
  headers: { Accept: "application/json" },
  timeout: 2e4
});
function youtubeId(item) {
  if (item.trailer?.youtube_id) return item.trailer.youtube_id;
  if (item.trailer?.embed_url) {
    const m = item.trailer.embed_url.match(/\/embed\/([^?/]+)/);
    if (m?.[1]) return m[1];
  }
  if (item.trailerUrl) {
    const m = item.trailerUrl.match(/\/embed\/([^?/]+)/);
    if (m?.[1]) return m[1];
  }
  return null;
}
function normalizeAnime(item) {
  if (!item) return null;
  const ytId = youtubeId(item);
  return {
    id: item.id ?? item.mal_id,
    title: item.title_english || item.englishTitle || item.title || "",
    subtitle: item.subtitle || item.title_japanese || item.title || "",
    englishTitle: item.englishTitle || item.title_english || "",
    romanizedTitle: item.romanizedTitle || item.title || "",
    image: item.image || item.images?.jpg?.large_image_url || item.images?.jpg?.image_url || "",
    backdrop: ytId ? `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg` : "",
    genre: item.genre || item.genres?.[0]?.name || item.demographics?.[0]?.name || "Anime",
    badge: item.badge || item.genres?.[0]?.name || "Anime",
    rating: typeof item.rating === "number" ? item.rating : typeof item.score === "number" ? item.score : 0,
    episodes: item.episodes ?? "?",
    status: item.status === "Currently Airing" ? "Airing" : item.status || "Done",
    year: item.year ?? item.aired?.prop?.from?.year ?? null,
    studio: item.studio || item.studios?.[0]?.name || "",
    synopsis: item.synopsis || "",
    members: item.members || 0,
    new: item.new ?? item.status === "Currently Airing",
    trailerUrl: item.trailerUrl ?? (item.trailer?.embed_url ? item.trailer.embed_url.replace("autoplay=1", "autoplay=0") + "&enablejsapi=0" : null)
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
export {
  getAnimeSeasons as a,
  getByGenre as b,
  getEpisodes as c,
  getRelated as d,
  getStreamingLinks as e,
  getAnimeDetail as g,
  searchAnime as s
};
//# sourceMappingURL=api-CaxJTo2b.js.map
