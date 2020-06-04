<template>
  <div class="flex flex-col">
    <h3 class="text-xl my-4">猜你喜欢</h3>
    <!-- 轮播置顶 -->
    <the-carousel :itemLen="upArticles.length" :time="10000" width="100%">
      <template #default="{index}">
        <div
          v-for="(item) in upArticles"
          :key="`${index}-${item.article_id}`"
          class="w-full bg-no-repeat bg-cover bg-center rounded-lg relative"
          :style="`height: 61.8vh; backgroundImage: url(https://api.liaoliaojun.com:3000/${item.bg_path})`"
        >
          <div class="absolute w-full py-6 px-12" style="bottom: 50px;">
            <nuxt-link
              tag="a"
              :to="'article/' + item.article_id"
            >
              <h2 class="text-white text-3xl">{{ item.article_title }}</h2>
            </nuxt-link>
          </div>
        </div>
      </template>
    </the-carousel>

    <!-- <the-article :is-main="isMain" :title="title" :content="content" class="mt-4" :class="!isMain ? 'cursor-pointer' : ''" @click.native="isMain = true" /> -->
    <the-articles :data="articles" class="flex-auto" />
  </div>
</template>

<script lang="ts">
  import {defineComponent} from '@vue/composition-api'

  import TheArticles from '~/components/articles.vue'
  import TheCarousel from '~/components/carousel.vue'
  // @ts-ignore
  import queryArticle from '~/graphql/query/article.gql'
  // @ts-ignore
  import queryArticles from '~/graphql/query/articles.gql'

  import {Article} from '~/types/index'

  export default defineComponent({
    components: {
      TheArticles,
      TheCarousel,
    },

    data () {
      return {
        isMain: false,
      }
    },

    props: {},

    async asyncData ({app: {apolloProvider}, req}) {
      let upArticles: any = []

      // 查询文章列表
      const articles: Array<Article> = await apolloProvider.defaultClient.query({
        query: queryArticles,
      }).then((res: any) => {
        return (res?.data?.result ?? []).map((item: Article) => {
          const content = item.article_content.replace(/<[^>]+>/g,'')

          return {
            ...item,
            // 去掉html标签
            article_content: content.length < 155 ? content : content.substring(0, 155) + '...',
          }
        })
      }).catch(() => {
        return []
      })

      // 查询第一个文章的内容
      if (articles.length) {
        upArticles = [articles[0], articles[1], articles[2], articles[3]]
      }
      return {
        articles,
        upArticles,
        domain: req?.headers?.host,
      }
    },
  })
</script>
