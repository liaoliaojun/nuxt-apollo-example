<template>
  <div>
    <the-article :bg-path="bgPath" :title="title" :content="content" :date="date" :views="views" :like-count="likeCount" class="flex-auto" />
  </div>
</template>

<script lang="ts">
  import {defineComponent} from '@vue/composition-api'
  import {Article} from '~/types/index'
  import TheArticle from '~/components/article.vue'
  // @ts-ignore
  import queryArticle from '~/graphql/query/article'

  import useApolloClient from '~/apollo/'

  export default defineComponent({

    components: {
      TheArticle,
    },

    props: {},

    async asyncData ({app: {apolloProvider: _apolloProvider}}) {
      const {title, content, article_id, bg_path, date, views, like_count}: Article = await useApolloClient().default.query({
        query: queryArticle,
        fetchPolicy: 'no-cache',
        variables: {
          article_id: 'changelog',
        },
      }).then((res: any) => {
        return res?.data?.result
      }).catch(() => {
        return {title: '', content: ''}
      })
      return {
        title,
        content,
        bgPath: bg_path,
        date,
        views,
        likeCount: like_count,
        id: article_id,
      }
    },
    head () {
      return {
        title: '更新日志',
      }
    },
  })
</script>
