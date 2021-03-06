const envPath = `config/.env.${process.env.NODE_ENV}`

module.exports = {
  head: {
    title: 'blog_generator',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js + Vuetify.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ]
  },
  plugins: ['~/plugins/vuetify.ts'],
  css: ['~/assets/style/app.styl'],
  loading: { color: '#3B8070' },
  build: {
    extractCSS: true,
    extend(config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue|ts)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  modules: [
    '@nuxtjs/axios',
    'cookie-universal-nuxt',
    ['cookie-universal-nuxt', {
      alias: 'cookiz'
    }],
    ['@nuxtjs/dotenv', {
      filename: envPath
    }]
  ],
  axios: {
    baseURL: process.env.apiURL,
    proxyHeaders: false,
    credentials: false
  },
  buildModules: ['@nuxt/typescript-build'],
  env: {
  }
}
