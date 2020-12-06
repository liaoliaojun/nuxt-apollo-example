import {resolve} from 'path'
import gql from 'graphql-tag'
import useApolloClient, {init} from './apollo/'

const httpEndpoint = process.env.NODE_ENV !== 'production' ? 'https://api.liaoliaojun.com' : 'http://dev.api.liaoliaojun.com:3000'
const graphqlEndpoint = process.env.NODE_ENV !== 'production' ? 'https://api.liaoliaojun.com/graphql' : 'http://dev.api.liaoliaojun.com:3000/graphql'

export default {
  ssr: true,
  publicRuntimeConfig: {
    httpEndpoint,
    graphqlEndpoint,
  },
  head: {
    title: '了了君的小站' || process.env.npm_package_name,
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
  // render: {
  //   resourceHints: false,  // 添加prefetch和preload，以加快初始化页面加载时间。如果有许多页面和路由，可禁用此项
  // },
  router: {
    prefetchLinks: false,  // 全局禁用所有链接上的预取
    scrollBehavior: () => {
      return new Promise((resolve) => {
        // @ts-ignore
        window.$nuxt.$once('triggerScroll', () => {
          // 跳转时，滚动至顶部
          if (document.querySelector('#app-container')) {
            try {
              // scroll to anchor by returning the selector
              // @ts-ignore
              document.querySelector('#app-container').scrollTop = 0
            } catch (e) {
              console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
            }
          }
          resolve({x: 0, y: 0})
        })
      })
    },
  },
  /*
  ** Customize the progress-bar color
  */
  loading: {color: '#fff'},
  /*
  ** Global CSS
  */
  css: [
    '~/assets/css/base.scss',
    '~/assets/font/iconfont.css',
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {src: '~/plugins/loading.ts'},
    {src: '~/plugins/composition-api.ts'},
    {src: '~/plugins/provide-apollo-client.ts'},
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
    // '@nuxtjs/apollo',
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
  // apollo: {
  //   clientConfigs: {
  //     default: {
  //       httpEndpoint: 'https://api.liaoliaojun.com:3000/graphql',
  //     },
  //   },
  // },
  tailwindcss: {
    configPath: resolve(__dirname, './tailwind.config.js'),
    cssPath: '~/assets/css/tailwind.css',
  },
  server: {
    host: '0.0.0.0',
    port: 3001,
  },
  // 设置网站地图
  sitemap: {
    path: '/sitemap.xml',
    gzip: true,
    routes: async () => {
      const query = gql`
        query queryArticles {
          result: articles {
            # 文章id
            article_id
          }
        }
      `
      init(graphqlEndpoint)
      return await useApolloClient().defaultClient.query({
        query,
      }).then((res) => {
        return (res.data.result || []).map((article) => `/article/${article.article_id}`)
      }).catch((error) => console.log(`dynamic routes error: ${error}`))
    },
  },
}
