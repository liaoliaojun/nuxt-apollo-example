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
  import {defineComponent, ref, onMounted} from '@vue/composition-api'
  import type {SetupContext} from '@vue/composition-api'
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

    props: {},

    setup (_, _ctx: SetupContext) {
      const showEntry = ref(false)
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

    async asyncData ({store, app: {apolloProvider: _apolloProvider}, params}) {
      const {title, content, article_id, bg_path, date, views, like_count}: Article = await useApolloClient().defaultClient.query({
        query: queryArticle,
        fetchPolicy: 'no-cache',
        variables: {
          article_id: params.id,
        },
      }).then((res: any) => {
        return res?.data?.result
      }).catch(() => {
        return {title: '', content: ''}
      })
      store.commit('article/setLikeCount', like_count || 0)
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

    // @ts-ignore
    head () {
      return {
        title: this.title,
        // meta: [
        //   // @ts-ignore
        //   {hid: this.id, name: 'description', content: '这是我的博客，热爱编程。该博客使用的技术栈有 前端：Nuxtjs, ApolloClient/Graphql，TailwindCss，Css，Js，Css/Css3，Canvas, Vue、React。后台：Node，ApolloServer, Docker，Nginx'},
        // ],
      }
    },
  })
</script>
