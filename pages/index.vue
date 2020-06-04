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
            <h2 class="text-white text-3xl">{{ item.article_title }}</h2>
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
      let firstArticle: Article = {article_title: '', article_content: ''}
      let upArticles: any = []

      // 查询文章列表
      const articles: Array<Article> = await apolloProvider.defaultClient.query({
        query: queryArticles,
      }).then((res: any) => {
        return res?.data?.result ?? []
      }).catch(() => {
        return []
      })

      // 查询第一个文章的内容
      if (articles.length) {
        upArticles = [articles[0], articles[1], articles[2], articles[3]]
        firstArticle = await apolloProvider.defaultClient.query({
          query: queryArticle,
          variables: {
            article_id: articles[0].article_id,
          },
        }).then((res: any) => {
          return res?.data?.result ?? {article_title: '', article_content: ''}
        }).catch(() => {
          return {article_title: '', article_content: ''}
        })
      }
      console.log(upArticles)
      return {
        articles,
        upArticles,
        title: firstArticle.article_title,
        content: firstArticle.article_content,
        domain: req?.headers?.host,
      }
    },
  })
</script>
