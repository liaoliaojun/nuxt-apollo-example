<template>
  <div class="flex flex-col mt-0 lg:mt-4">
    <!-- <div class="cursor-pointer" @click="addLike">
      点赞{{ likeCount }}
    </div> -->
    <the-article :bg-path="bgPath" :title="title" :content="content" class="flex-auto" />
  </div>
</template>

<script lang="ts">
  import {defineComponent, computed} from '@vue/composition-api'
  import TheArticle from '~/components/article.vue'
  // @ts-ignore
  import queryArticle from '~/graphql/query/article.gql'
  // @ts-ignore
  // import addArticleLike from '~/graphql/query/add_article_like.gql'

  import {Article} from '~/types/index'

  export default defineComponent({
    components: {
      TheArticle,
    },

    head () {
      return {
        // @ts-ignore
        title: this.title,
        // meta: [
        //   // @ts-ignore
        //   {hid: this.id, name: 'description', content: '这是我的博客，热爱编程。该博客使用的技术栈有 前端：Nuxtjs, ApolloClient/Graphql，TailwindCss，Css，Js，Css/Css3，Canvas, Vue、React。后台：Node，ApolloServer, Docker，Nginx'},
        // ],
      }
    },

    props: {},

    async asyncData ({store, app: {apolloProvider}, params}) {
      const {article_title, article_content, article_like_count, article_id, bg_path}: Article = await apolloProvider.defaultClient.query({
        query: queryArticle,
        fetchPolicy: 'no-cache',
        variables: {
          article_id: params.id,
        },
      }).then((res: any) => {
        return res?.data?.result
      }).catch(() => {
        return {article_title: '', article_content: ''}
      })
      store.commit('article/setLikeCount', article_like_count || 0)
      return {title: article_title, content: article_content, bgPath: bg_path, id: article_id}
    },

    setup (_, {root: {$store}}) {
      const likeCount = computed(() => $store.state.article.count)

      const addLike = () => {
        $store.commit('article/addLikeCount')
      }
      return {
        addLike,
        likeCount,
      }
    },
  })
</script>
