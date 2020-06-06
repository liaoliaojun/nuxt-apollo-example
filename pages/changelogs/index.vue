<template>
  <div>
    <the-article :bg-path="bgPath" :title="title" :content="content" :date="date" :views="views" :like-count="likeCount" class="flex-auto" />
  </div>
</template>

<script lang="ts">
  import {defineComponent, computed, ref, Ref, onMounted} from '@vue/composition-api'
  import TheArticle from '~/components/article.vue'
  // @ts-ignore
  import queryArticle from '~/graphql/query/article.gql'

  import {Article} from '~/types/index'

  export default defineComponent({
    components: {
      TheArticle,
    },

    props: {},

    async asyncData ({app: {apolloProvider}, params}) {
      const {article_title, article_content, article_id, bg_path, article_date, article_views, article_like_count}: Article = await apolloProvider.defaultClient.query({
        query: queryArticle,
        fetchPolicy: 'no-cache',
        variables: {
          article_id: 'changelog',
        },
      }).then((res: any) => {
        return res?.data?.result
      }).catch(() => {
        return {article_title: '', article_content: ''}
      })
      return {
        title: article_title, content: article_content,
        bgPath: bg_path, date: article_date,
        views: article_views, likeCount: article_like_count,
        id: article_id,
      }
    },
  })
</script>
