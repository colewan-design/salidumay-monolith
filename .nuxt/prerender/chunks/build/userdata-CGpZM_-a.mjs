import axios from 'file://C:/salidumay-nuxt/node_modules/axios/index.js';

function authHeaders() {
  return {};
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
    await axios.post(`${BASE}/user/history`, entry, { headers: authHeaders() });
  } catch (_) {
  }
  return trimmed;
}

export { getLibrary as g, isInLibrary as i, recordHistory as r };
//# sourceMappingURL=userdata-CGpZM_-a.mjs.map
