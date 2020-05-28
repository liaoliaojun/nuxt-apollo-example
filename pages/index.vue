<template>
  <div class="flex flex-col">
    <the-article :is-main="isMain" :count="count" :title="title" :content="content" class="mt-4" :class="!isMain ? 'cursor-pointer' : ''" @click.native="isMain = true" />
    <the-articles :data="articles" class="flex-auto mt-4" />
  </div>
</template>

<script lang="ts">
  import {defineComponent} from '@vue/composition-api'

  import TheArticle from '~/components/article.vue'
  import TheArticles from '~/components/articles.vue'
  // @ts-ignore
  import queryArticle from '~/graphql/query/article.gql'
  // @ts-ignore
  import queryArticles from '~/graphql/query/articles.gql'

  import {Article} from '~/types/index'

  export default defineComponent({
    components: {
      TheArticle,
      TheArticles,
    },

    data () {
      return {
        isMain: false,
      }
    },

    props: {},

    async asyncData ({app: {apolloProvider}, req}) {
      let firstArticle: Article = {article_title: '', article_content: ''}

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
      return {
        articles,
        title: firstArticle.article_title,
        content: firstArticle.article_content,
        domain: req?.headers?.host,
      }
    },
  })
</script>
