import axios from 'axios'

const ax = axios.create({ timeout: 25000 })

export async function getYugenSources(title, ep, altTitle = '') {
  const titlesToTry = [...new Set([title, altTitle].filter(Boolean))]

  for (const t of titlesToTry) {
    const { data } = await ax.get('/yugen-proxy.php', { params: { title: t, ep } })

    if (data.error || !data.sources?.length) {
      console.warn('[yugen] no sources for', t, ':', data.error ?? 'empty')
      continue
    }

    return data.sources.map(s => ({
      label: `Yugen${s.quality && s.quality !== 'auto' ? ' · ' + s.quality : ''}`,
      url:   s.url,
      group: 'Yugen',
      type:  s.type === 'hls' ? 'hls' : 'mp4',
    }))
  }

  return []
}
