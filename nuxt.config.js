// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  // Global CSS
  css: ['~/assets/css/main.css'],

  // Runtime config (env vars exposed to app)
  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL || 'https://api.salidumay.com/api/anime',
      hiAnimeApi: process.env.NUXT_PUBLIC_HIANIME_API || '',
      tmdbKey: process.env.NUXT_PUBLIC_TMDB_KEY || '',
    },
  },

  // Dev server proxy (mirrors vite.config.js)
  nitro: {
    output: {
      dir: 'output',
    },
    prerender: {
      fallback: '200.html',
    },
    devProxy: {
      '/api': {
        target: 'http://localhost:8001',
        changeOrigin: true,
      },
      '/consumet': {
        target: 'https://consumet-api.vercel.app',
        changeOrigin: true,
        prependPath: false,
      },
      '/animex': {
        target: 'https://animex.wrdd.site',
        changeOrigin: true,
        prependPath: false,
      },
      '/video-proxy': {
        target: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample',
        changeOrigin: true,
        prependPath: false,
      },
    },
  },

  // App head — default SEO tags (pages override with useSeoMeta)
  app: {
    head: {
      title: 'Salidumay — Watch Anime & Films',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Stream thousands of anime episodes and films in HD — dubbed & subbed.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'Salidumay' },
        { property: 'og:description', content: 'Stream thousands of anime episodes and films in HD — dubbed & subbed.' },
        { property: 'og:image', content: '/og-image.jpg' },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cinzel:wght@700;900&family=Nunito:wght@400;500;600;700;800;900&display=swap' },
      ],
      script: [
{
          children: `window._analyticsId='veblHrB1prxf2gA0Am6Fc6z7JxCmWl04';window._analyticsUrl='https://analytics.salidumay.com';`,
        },
        { src: 'https://analytics.salidumay.com/tracker.js', defer: true },
      ],
    },
  },
})
