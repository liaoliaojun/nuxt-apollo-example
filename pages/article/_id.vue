<template>
  <div class="flex flex-col flex-auto mt-0 lg:mt-4">
    <!-- <div class="cursor-pointer" @click="addLike">
      点赞{{ likeCount }}
    </div> -->
    <the-article :bg-path="bgPath" :title="title" :content="content" :date="date" :views="views" :like-count="likeCount" class="flex-auto" />
    <!-- 隐藏入口 -->
    <div v-if="showEntry" class="flex">
      <button class="llj-btn border hover:text-blue-500" @click="$router.push({path: '/article/update/' + id})">编辑</button>
      <button class="llj-btn ml-2 border hover:text-blue-500" @click="deleted(id)">删除</button>
    </div>
  </div>
</template>

<script lang="ts">
  import {defineComponent, computed, ref, Ref, onMounted} from '@vue/composition-api'
  import {Article} from '~/types/index'
  import TheArticle from '~/components/article.vue'
  // @ts-ignore
  import queryArticle from '~/graphql/query/article'
  // @ts-ignore
  import mutateDeleteArticle from '~/graphql/mutation/delete_article'

  import useApolloClient from '~/apollo/'

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
      const {article_title, article_content, article_id, bg_path, article_date, article_views, article_like_count}: Article = await useApolloClient().defaultClient.query({
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
      return {
        title: article_title, content: article_content,
        bgPath: bg_path, date: article_date,
        views: article_views, likeCount: article_like_count,
        id: article_id,
      }
    },

    setup (_, ctx: any) {
      const showEntry: Ref<boolean> = ref(false)
      const deleted = async (article_id: string) => {
        if (!article_id) return
        const isSuccess: boolean|string = await useApolloClient().defaultClient.mutate({
          mutation: mutateDeleteArticle,
          variables: {
            input: {
              article_id,
              key: localStorage.getItem('app-key') ?? '',
            },
          },
        }).then((x: any) => x.data?.result)
        if (isSuccess === article_id) {
          alert('删除成功')
        }
      }

      onMounted(() => {
        showEntry.value = Boolean(localStorage.getItem('app-key'))
      })

      return {
        deleted,
        showEntry,
      }
    },
  })
</script>
