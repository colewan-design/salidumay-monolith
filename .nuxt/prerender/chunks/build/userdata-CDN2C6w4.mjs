import axios from 'file://C:/salidumay-nuxt/node_modules/axios/index.js';

function getBase() {
  return "/api";
}
function authHeaders() {
  return {};
}
function getViewCount(id) {
  return 0;
}
async function incrementViewCount(id, type = "anime") {
  return 0;
}
function formatViews(n) {
  if (n >= 1e6) return (n / 1e6).toFixed(1).replace(/\.0$/, "") + "M";
  if (n >= 1e3) return (n / 1e3).toFixed(1).replace(/\.0$/, "") + "K";
  return String(n);
}
function isLiked(id) {
  return false;
}
function getLibrary() {
  return [];
}
function isInLibrary(animeId) {
  return getLibrary().some((a) => String(a.id) === String(animeId));
}
function getHistory() {
  return [];
}
async function recordHistory(anime, epNum) {
  const entry = {
    id: anime.id,
    title: anime.title,
    image: anime.image,
    genre: anime.genre,
    episode: epNum,
    watchedAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  const list = getHistory().filter((a) => String(a.id) !== String(anime.id));
  list.unshift(entry);
  const trimmed = list.slice(0, 200);
  try {
    await axios.post(`${getBase()}/user/history`, entry, { headers: authHeaders() });
  } catch (_) {
  }
  return trimmed;
}

export { getViewCount as a, isInLibrary as b, isLiked as c, formatViews as f, getLibrary as g, incrementViewCount as i, recordHistory as r };
//# sourceMappingURL=userdata-CDN2C6w4.mjs.map
