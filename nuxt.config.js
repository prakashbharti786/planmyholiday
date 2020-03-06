require('dotenv').config()
module.exports = {
  mode: 'universal',

  buildDir: 'dist',

  /*
   ** Headers of the page
   */
  head: {
    title: '',
    titleTemplate: titleChunk => {
      return titleChunk
        ? `${titleChunk} - Planmyholiday - Bespoke vacations to the world’s most exclusive hotels and exotic destinations`
        : 'Planmyholiday - Bespoke vacations to the world’s most exclusive hotels and exotic destinations'
    },
    meta: [
      {
        name: 'keywords',
        content:
          'Bespoke vacations, Exotic destinations, Plan My Holiday, Travel Destinations'
      },
      { name: 'robots', content: 'INDEX, FOLLOW' },
      {
        name: 'google-signin-scope',
        content: `profile email`
      },
      {
        name: 'google-signin-client_id',
        content: `44678081415-h5btbkj5go14vp1ke6bsi06lu119qtl7.apps.googleusercontent.com`
      }
    ],
    link: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Satisfy&display=swap'
      },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Work+Sans:300,400,600&display=swap'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Material+Icons'
      }
    ],
    script: [
      {
        src:
          'https://maps.googleapis.com/maps/api/js?key=AIzaSyDyAiTqDZmdYGrxDfiD4Z1AnLf1kSa9dbs',
        defer: true
      }
    ],
    bodyAttrs: { 'data-toggle': 'affix', id: 'app-body', 'data-ready': true }
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#00838f' },

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~plugins/core-components.js',
    '~plugins/vue-material.js',
    '~/plugins/axios',
    { src: '~/plugins/vuebar.js', ssr: false },
    { src: '~/plugins/swiper.js', ssr: false }
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa'
  ],

  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    proxyHeaders: false,
    proxy: false,
    debug: true,
    baseURL: process.env.API_URL,
    https: false,
    credentials: false
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },

  /*
   ** env
   */
  env: {
    baseUrl: process.env.BASE_URL,
    assetsUrl: process.env.ASSETS_URL,
    adminUrl: process.env.ADMIN_URL,
    apiUrl: process.env.API_URL,
    domain: process.env.DOMAIN,
    isLive: process.env.IS_LIVE
  },

  /*
   ** env
   */
  workbox: {
    importScripts: ['custom-sw.js'],
    cachingExtensions: '@/plugins/workbox-range-request.js'
  },

  /*
   ** meta
   */
  meta: {
    mobileAppIOS: true,
    appleStatusBarStyle: true,
    name: 'Planmyholiday',
    author: 'Planmyholiday',
    description:
      'Plan My Holiday offers you bespoke vacations to the world’s most exclusive hotels and exotic destinations. ' +
      'We are constantly exploring new destinations, attending travel industry events and upgrading our destination knowledge through various webinars and travel modules. ' +
      "We have built a strong network of reliable and experienced travel partners to offer you nothing but the globe's finest hotels, luxury villas and cruises for that unforgettable journey.",
    theme_color: '#00838f',
    lang: 'en',
    ogTitle: 'Planmyholiday - Free and convenient way to eFile your income tax',
    ogHost: process.env.ASSETS_URL,
    ogImage: `img/easyitreturns.jpg`,
    ogUrl: 'https://planmyholiday.co.in',
    twitterCard: 'Summary',
    twitterTitle:
      'Planmyholiday - Bespoke vacations to the world’s most exclusive hotels and exotic destinations',
    twitterSite: 'http://planmyholiday.co.in',
    twitterCreator: '@planmyholiday',
    nativeUI: true
  },

  /*
   ** manifest
   */
  manifest: {
    name: 'Planmyholiday',
    short_name: 'Planmyholiday',
    description:
      'Planmyholiday - Free and convenient way to eFile your income tax',
    lang: 'en',
    crossorigin: 'use-credentials',
    theme_color: '#00838f'
  },

  /* CSS file in the project */
  css: [
    '@/assets/style/material.scss',
    '@/assets/style/style.scss',
    '@/assets/main.css',
    '@/assets/animation.css'
  ],

  router: {
    middleware: ['visits']
  }
}
