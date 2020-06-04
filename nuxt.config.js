import {resolve} from 'path'
import fs from 'fs'
import axios from 'axios'
// import {createApolloFetch} from 'apollo-fetch'

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: '了了君的小破站~' || process.env.npm_package_name,
    meta: [
      {charset: 'utf-8'},
      {'http-equiv': 'X-UA-Compatible', content: 'IE=Edge'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no'},
      {hid: 'description', name: 'description', content: process.env.npm_package_description || ''},
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
    ],
  },
  /*
  ** Customize the progress-bar color
  */
  loading: {color: '#fff'},
  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '~/assets/css/base.scss',
    '~/assets/font/iconfont.css',
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {src: '~/plugins/composition-api'},
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxt/typescript-build',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/apollo',
    '@nuxtjs/sitemap',
  ],
  /*
  ** Build configuration
  */
  build: {
    babel: {
      presets({isServer}) {
        return [
          [
            require.resolve('@nuxt/babel-preset-app'),
            // require.resolve('@nuxt/babel-preset-app-edge'), // For nuxt-edge users
            {
              buildTarget: isServer ? 'server' : 'client',
              corejs: {version: 3},
            },
          ],
        ]
      },
    },
    /*
    ** You can extend webpack config here
    */
    extend () {
    },
  },
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: 'https://api.liaoliaojun.com:3000/graphql',
      },
    },
  },
  tailwindcss: {
    configPath: resolve(__dirname, './tailwind.config.js'),
    cssPath: '~/assets/css/tailwind.css',
  },
  server: {
    host: '0.0.0.0',
    port: 3001,
    https: {
      key: fs.readFileSync(resolve(__dirname, 'ssl/liaoliaojun.com.key')),
      cert: fs.readFileSync(resolve(__dirname, 'ssl/liaoliaojun.com.crt')),
    },
  },
  // 设置网站地图
  sitemap: {
    path: '/sitemap.xml',
    gzip: true,
    routes: async () => {
      // https://graphql.org/graphql-js/graphql-clients/
      // const apolloFetch = createApolloFetch({uri: 'https://api.liaoliaojun.com:3000/graphql'})
      const query = `
        query queryArticles {
          result: articles {
            # 文章id
            article_id
          }
        }
      `
      return await axios.post('https://api.liaoliaojun.com:3000/graphql', {query}, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      })
      .then(res => {
        return (res.data.data.result || []).map((article) => `/article/${article.article_id}`)
      }).catch((error) => console.log(`dynamic routes error: ${error}`))
    },
  },
}
