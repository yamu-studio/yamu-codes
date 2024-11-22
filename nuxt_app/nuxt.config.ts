// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          // NOTE: modern APIを使う
          api: 'modern-compiler',
        },
      },
    },
  },
  css: [
    // 'bulma/css/bulma.css',
    'bulma/css/versions/bulma-no-dark-mode.css',
    '@fortawesome/fontawesome-free/css/all.css',
  ],
})
