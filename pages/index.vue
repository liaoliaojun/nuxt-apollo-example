<template>
  <div class="flex flex-col px-4 lg:px-0 mt-4">
    <!-- 轮播置顶 -->
    <the-carousel :itemLen="topArticles.length" :time="6000" width="100%" style="height: 70vh;" @toggleIndex="(index) => {carouselItemIndex = index}">
      <template #default="{index}">
        <the-lazybg
          v-for="(item, itemIndex) in topArticles"
          :key="`${index}-${item.article_id}`"
          :file-url="item.bg_path"
          :nowreload="carouselItemIndex === itemIndex ? true : false"
        >
          <div class="absolute w-full p-5" style="bottom: 50px;">
            <nuxt-link
              tag="a"
              :to="'article/' + item.article_id"
            >
              <h2 class="text-white text-3xl">{{ item.article_title }}</h2>
            </nuxt-link>
          </div>
        </the-lazybg>
      </template>
    </the-carousel>

    <!-- <the-article :is-main="isMain" :title="title" :content="content" class="mt-4" :class="!isMain ? 'cursor-pointer' : ''" @click.native="isMain = true" /> -->
    <the-articles :data="articles" class="flex-auto" />
  </div>
</template>

<script lang="ts">
  import {defineComponent, Ref, ref, watch, computed} from '@vue/composition-api'
  import {Article} from '~/types/index'

  import TheArticles from '~/components/articles.vue'
  import TheCarousel from '~/components/carousel.vue'
  import TheLazybg from '~/components/lazybg.vue'
  // @ts-ignore
  import queryArticle from '~/graphql/query/article'
  // @ts-ignore
  import queryArticles from '~/graphql/query/articles'
  // @ts-ignore
  import queryTops from '~/graphql/query/tops'

  import useApolloClient from '~/apollo/'

  export default defineComponent({
    components: {
      TheArticles,
      TheCarousel,
      TheLazybg,
    },

    data () {
      return {
        isMain: false,
        carouselItemIndex: 0,
      }
    },

    props: {},

    async asyncData ({app: {apolloProvider}, req}) {
      const [articles, topArticles]: [Array<Article>, Article] = await Promise.all([
        // 查询文章列表
        useApolloClient().defaultClient.query({
          query: queryArticles,
        })
        .then((res: any) => {
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
        }),
        // 查询置顶文章
        useApolloClient().defaultClient.query({
          query: queryTops,
        })
        .then((x: any) => x?.data?.result ?? [])
        .catch(() => [])
      ])
      return {
        articles,
        topArticles,
        domain: req?.headers?.host,
      }
    },
  })
</script>
