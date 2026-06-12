import axios from 'axios'

function getBase() {
  if (import.meta.client) {
    return useRuntimeConfig().public.apiUrl?.replace('/anime', '') || '/api'
  }
  return '/api'
}

function authHeaders() {
  if (!import.meta.client) return {}
  const token = localStorage.getItem('auth_token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

// ── Views ─────────────────────────────────────────────────────────────
const VIEWS_KEY = 'view_counts'

export function getViewCount(id) {
  if (!import.meta.client) return 0
  const counts = lsGet(VIEWS_KEY) || {}
  return counts[String(id)] || 0
}

/**
 * Records a view on the server (unique-IP dedup) and updates localStorage.
 * type: 'anime' | 'film'
 * Returns the server-confirmed count, or the local count if the API is unreachable.
 */
export async function incrementViewCount(id, type = 'anime') {
  if (!import.meta.client) return 0

  // Update localStorage immediately so the UI reacts instantly
  const counts = lsGet(VIEWS_KEY) || {}
  counts[String(id)] = (counts[String(id)] || 0) + 1
  lsSet(VIEWS_KEY, counts)

  try {
    const prefix = type === 'film' ? 'films' : 'anime'
    const { data } = await axios.post(`${getBase()}/${prefix}/${id}/view`)
    if (data?.views != null) {
      counts[String(id)] = data.views
      lsSet(VIEWS_KEY, counts)
      return data.views
    }
  } catch (_) {}

  return counts[String(id)]
}

export function formatViews(n) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M'
  if (n >= 1_000)     return (n / 1_000).toFixed(1).replace(/\.0$/, '') + 'K'
  return String(n)
}

// ── Likes / Hearts ────────────────────────────────────────────────────
const LIKES_KEY = 'user_likes'

export function getLiked() {
  return lsGet(LIKES_KEY) || []
}

export function isLiked(id) {
  if (!import.meta.client) return false
  return getLiked().some(item => String(item.id) === String(id))
}

/**
 * Toggles a heart reaction via the API (auth required).
 * Returns { liked: bool, count: number, unauthenticated: bool }.
 * unauthenticated: true  → caller should prompt the user to sign in.
 */
export async function toggleLike(item) {
  if (!import.meta.client) return { liked: false, count: 0, unauthenticated: true }

  const token = localStorage.getItem('auth_token')
  if (!token) {
    return { liked: isLiked(item.id), count: 0, unauthenticated: true }
  }

  try {
    const prefix = item.type === 'film' ? 'films' : 'anime'
    const { data } = await axios.post(
      `${getBase()}/${prefix}/${item.id}/react`,
      {},
      { headers: authHeaders() },
    )

    // Keep localStorage in sync with the server's authoritative state
    const likes = getLiked()
    const idx   = likes.findIndex(i => String(i.id) === String(item.id))
    if (data.liked && idx < 0) {
      likes.unshift({ id: item.id, title: item.title, image: item.image, type: item.type || 'anime', addedAt: new Date().toISOString() })
      lsSet(LIKES_KEY, likes)
    } else if (!data.liked && idx >= 0) {
      likes.splice(idx, 1)
      lsSet(LIKES_KEY, likes)
    }

    return { liked: data.liked, count: data.count, unauthenticated: false }
  } catch (e) {
    if (e.response?.status === 401) {
      return { liked: isLiked(item.id), count: 0, unauthenticated: true }
    }
    // Network / server error — optimistic localStorage toggle as fallback
    const likes  = getLiked()
    const idx    = likes.findIndex(i => String(i.id) === String(item.id))
    const nowLiked = idx < 0
    if (nowLiked) {
      likes.unshift({ id: item.id, title: item.title, image: item.image, type: item.type || 'anime', addedAt: new Date().toISOString() })
    } else {
      likes.splice(idx, 1)
    }
    lsSet(LIKES_KEY, likes)
    return { liked: nowLiked, count: 0, unauthenticated: false }
  }
}

// ── localStorage helpers ──────────────────────────────────────────
function lsGet(key) {
  if (!import.meta.client) return null
  try { return JSON.parse(localStorage.getItem(key) || 'null') } catch { return null }
}
function lsSet(key, val) {
  if (!import.meta.client) return
  localStorage.setItem(key, JSON.stringify(val))
}

// ── Library ───────────────────────────────────────────────────────
const LIBRARY_KEY = 'user_library'

export function getLibrary() {
  return lsGet(LIBRARY_KEY) || []
}

export function isInLibrary(animeId) {
  return getLibrary().some(a => String(a.id) === String(animeId))
}

export async function addToLibrary(anime, type = 'anime') {
  const entry = {
    id:       anime.id,
    title:    anime.title,
    image:    anime.image,
    genre:    anime.genre || anime.genreNames?.[0] || '',
    episodes: anime.episodes ?? null,
    rating:   anime.rating,
    type:     anime.type || type,
    addedAt:  new Date().toISOString(),
  }

  const list = getLibrary().filter(a => String(a.id) !== String(anime.id))
  list.unshift(entry)
  lsSet(LIBRARY_KEY, list)

  try {
    await axios.post(`${getBase()}/user/library`, entry, { headers: authHeaders() })
  } catch (_) {}

  return list
}

export async function removeFromLibrary(animeId) {
  const list = getLibrary().filter(a => String(a.id) !== String(animeId))
  lsSet(LIBRARY_KEY, list)

  try {
    await axios.delete(`${getBase()}/user/library/${animeId}`, { headers: authHeaders() })
  } catch (_) {}

  return list
}

export async function syncLibraryFromServer() {
  try {
    const { data } = await axios.get(`${getBase()}/user/library`, { headers: authHeaders() })
    const serverList = data.data || data || []
    lsSet(LIBRARY_KEY, serverList)
    return serverList
  } catch (_) {
    return getLibrary()
  }
}

// ── Watch History ─────────────────────────────────────────────────
const HISTORY_KEY = 'user_history'

export function getHistory() {
  return lsGet(HISTORY_KEY) || []
}

export async function recordHistory(anime, epNum) {
  const entry = {
    id:        anime.id,
    title:     anime.title,
    image:     anime.image,
    genre:     anime.genre,
    episode:   epNum,
    watchedAt: new Date().toISOString(),
  }

  // Keep only the latest entry per anime (remove older duplicate)
  const list = getHistory().filter(a => String(a.id) !== String(anime.id))
  list.unshift(entry)
  // Cap at 200 entries
  const trimmed = list.slice(0, 200)
  lsSet(HISTORY_KEY, trimmed)

  try {
    await axios.post(`${getBase()}/user/history`, entry, { headers: authHeaders() })
  } catch (_) {}

  return trimmed
}

export async function removeFromHistory(animeId) {
  const list = getHistory().filter(a => String(a.id) !== String(animeId))
  lsSet(HISTORY_KEY, list)

  try {
    await axios.delete(`${getBase()}/user/history/${animeId}`, { headers: authHeaders() })
  } catch (_) {}

  return list
}

export async function clearHistory() {
  lsSet(HISTORY_KEY, [])
  try {
    await axios.delete(`${getBase()}/user/history`, { headers: authHeaders() })
  } catch (_) {}
}

export async function syncHistoryFromServer() {
  try {
    const { data } = await axios.get(`${getBase()}/user/history`, { headers: authHeaders() })
    const serverList = data.data || data || []
    lsSet(HISTORY_KEY, serverList)
    return serverList
  } catch (_) {
    return getHistory()
  }
}
