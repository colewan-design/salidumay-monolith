import { animexSearch, animexBestMatch, animexEpisodeSources } from './animex.js'
import { hiStream, hiAnimeEnabled } from './hiAnime.js'
import { getYugenSources } from './yugen.js'

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

// ── Source: JustAnime (iframe) ────────────────────────────────────
export function getJustAnimeSources(title, ep, altTitle = '') {
  const sources = []
  const seen = new Set()
  for (const t of [title, altTitle].filter(Boolean)) {
    const slug = slugify(t)
    if (seen.has(slug)) continue
    seen.add(slug)
    const i = sources.length + 1
    sources.push({
      label: `JustAnime${sources.length ? ' · ' + i : ''}`,
      url:   `https://justanime.to/watch/${slug}-episode-${ep}`,
      group: 'JustAnime',
      type:  'iframe',
    })
  }
  return sources
}

// ── Source: Dailymotion (iframe via public search API) ────────────
export async function getDailymotionSources(title, ep, altTitle = '') {
  const epNum = Number(ep)
  const epPatterns = [
    new RegExp(`\\bep(isode)?[\\s._-]*0*${epNum}\\b`, 'i'),
    new RegExp(`\\b0*${epNum}\\b`),
  ]

  const searchTitles = [...new Set([altTitle, title].filter(Boolean))]

  const fetchVideos = async (searchTitle) => {
    const query  = encodeURIComponent(`${searchTitle} episode ${ep}`)
    const apiUrl = `https://api.dailymotion.com/videos?search=${query}&fields=id,title&limit=10&sort=relevance`
    const res = await fetch(apiUrl)
    if (!res.ok) return []
    const data = await res.json()
    return data?.list ?? []
  }

  const results = await Promise.all(searchTitles.map(fetchVideos))
  const seen  = new Set()
  const videos = results.flat().filter(v => {
    if (seen.has(v.id)) return false
    seen.add(v.id)
    return true
  })

  const matched = videos.filter(v => epPatterns.some(p => p.test(v.title)))
  const pool = matched.length ? matched : []
  if (!pool.length) return []

  return pool.map((v, i) => ({
    label: `Dailymotion${pool.length > 1 ? ' · ' + (i + 1) : ''}`,
    url:   `https://www.dailymotion.com/embed/video/${v.id}?ui-fullscreen=1&ui-logo=0`,
    group: 'Dailymotion',
    type:  'iframe',
  }))
}

// ── Source: AnimEx ────────────────────────────────────────────────
export async function getAnimexSources(title, ep, altTitle = '') {
  const titlesToTry = [...new Set([title, altTitle].filter(Boolean))]

  for (const t of titlesToTry) {
    const results = await animexSearch(t)
    const match   = animexBestMatch(results, t)
    if (!match) continue

    const { sources, subtitles } = await animexEpisodeSources(match.id, ep)

    // Extract subtitle VTT URLs from iframe sources (vibeplayer.site?sub=<vtt>)
    // keyed by stream ID so HLS sources can look them up by the same stream ID
    const subByStreamId = {}
    for (const s of sources) {
      if (s.type !== 'hls' && s.url?.includes('vibeplayer.site')) {
        try {
          const u = new URL(s.url)
          const streamId = u.pathname.slice(1)
          const subUrl   = u.searchParams.get('sub')
          if (streamId && subUrl) subByStreamId[streamId] = subUrl
        } catch {}
      }
    }

    // Fallback: API-level subtitles (usually empty but handle anyway)
    const apiTracks = (subtitles || []).map((sub, i) => ({
      file:    sub.url || sub.file,
      kind:    'captions',
      label:   sub.label || sub.lang || 'English',
      default: i === 0,
    })).filter(t => t.file)

    const mapped = sources
      .filter(s => s.url && !s.url.includes('kwik.cx') && !s.isM3U8)
      .map(s => {
        let tracks = apiTracks
        if (s.isM3U8) {
          // HLS URL encodes the inner stream URL as ?url=<encoded>
          // Extract stream ID via regex on the encoded path
          const m = s.url.match(/\/stream\/([a-f0-9]+)\/master\.m3u8/)
          const rawSubUrl = m && subByStreamId[m[1]]
          if (rawSubUrl) {
            // Proxy the VTT through same-origin to satisfy <track> CORS rules
            const proxied = import.meta.env.PROD
              ? `/stream-proxy.php?url=${encodeURIComponent(rawSubUrl)}`
              : rawSubUrl
            tracks = [{ file: proxied, kind: 'captions', label: 'English', default: true }]
          }
        }
        return {
          label : `AnimEx${s.quality ? ' · ' + s.quality : ''}${s.lang ? ' · ' + s.lang.toUpperCase() : ''}`,
          url   : s.url,
          group : 'AnimEx',
          type  : s.url.includes('.m3u8') ? 'hls' : (s.type || 'mp4'),
          tracks: tracks.length ? tracks : undefined,
        }
      })
    if (mapped.length) return mapped
  }
  return []
}

// ── Source: HiAnime (only if API is configured) ───────────────────
async function getHiAnimeSources(title, ep, category = 'sub', altTitle = '') {
  if (!hiAnimeEnabled) return []

  const titlesToTry = [...new Set([title, altTitle].filter(Boolean))]

  for (const t of titlesToTry) {
    const result = await hiStream(`${t}:::${ep}`, category)
    if (!result?.sources?.length) continue
    return result.sources.map((s, i) => ({
      label: `HiAnime${result.sources.length > 1 ? ' · ' + (i + 1) : ''}`,
      url:   s.url,
      group: 'HiAnime',
      type:  'hls',
    }))
  }
  return []
}

// ── Aggregate all sources ─────────────────────────────────────────
export async function getAllSources(title, ep, category = 'sub', altTitle = '') {
  const iframeSources = getJustAnimeSources(title, ep, altTitle)

  const [animexRes, hiAnimeRes, dailymotionRes, yugenRes] = await Promise.allSettled([
    getAnimexSources(title, ep, altTitle),
    getHiAnimeSources(title, ep, category, altTitle),
    getDailymotionSources(title, ep, altTitle),
    getYugenSources(title, ep, altTitle),
  ])

  if (animexRes.status === 'rejected')      console.warn('[stream] AnimEx failed:', animexRes.reason)
  else console.log(`[stream] AnimEx: ${animexRes.value.length} source(s)`)

  if (hiAnimeRes.status === 'rejected')     console.warn('[stream] HiAnime failed:', hiAnimeRes.reason)
  else console.log(`[stream] HiAnime: ${hiAnimeRes.value.length} source(s)`)

  if (dailymotionRes.status === 'rejected') console.warn('[stream] Dailymotion failed:', dailymotionRes.reason)
  else console.log(`[stream] Dailymotion: ${dailymotionRes.value.length} source(s)`)

  if (yugenRes.status === 'rejected')       console.warn('[stream] Yugen failed:', yugenRes.reason)
  else console.log(`[stream] Yugen: ${yugenRes.value.length} source(s)`)

  return [
    ...(animexRes.status      === 'fulfilled' ? animexRes.value      : []),
    ...iframeSources,
    ...(dailymotionRes.status === 'fulfilled' ? dailymotionRes.value : []),
    ...(hiAnimeRes.status     === 'fulfilled' ? hiAnimeRes.value     : []),
    ...(yugenRes.status       === 'fulfilled' ? yugenRes.value       : []),
  ]
}
