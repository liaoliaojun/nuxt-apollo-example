<template>
  <!--  :bg-path="bg_path" :title="article_title" :marked-content="article_marked_content" -->
  <add-article is-update :data="state" @submit="update" />
</template>

<script lang="ts">
  import {defineComponent, computed, reactive, toRefs} from '@vue/composition-api'
  import AddArticle from '../add.vue'
  // @ts-ignore
  import queryArticle from '~/graphql/query/article.js'
  // @ts-ignore
  import MutationUpdateArticle from '~/graphql/mutation/update_article.js'

  import {SubmitArticle} from '~/types/index'

  export default defineComponent({
    components: {
      AddArticle,
    },

    setup (_, vm: any) {
      const {root} = vm
      const id = computed(() => root.$route?.params?.id)
      const state = reactive({
        article_title: '',
        article_marked_content: '',
        bg_path: '',
        is_top: false,
        top_weight: 10,
        tags: [],
      })
      const update = (submitState: SubmitArticle) => {
        root.$apollo.mutate({
          mutation: MutationUpdateArticle,
          variables: {
            input: {
              article_id: id.value,
              key: submitState.key,
              article_title: submitState.article_title,
              article_content: submitState.article_content || '',
              article_marked_content: submitState.article_marked_content || '',
              bg_path: submitState.bg_path || null,
              is_top: submitState.is_top,
              top_weight: Number(submitState.top_weight) || 10,
              tags: submitState.tags || [],
            },
          },
        }).then((res: any) => {
          if (res.data.result === '0') {
            alert('更新失败!')
          } else {
            alert('更新成功！')
          }
        })
      }
      const query = async () => {
        const data = await root.$apollo.query({
          query: queryArticle,
          fetchPolicy: 'no-cache',
          variables: {
            article_id: id.value,
          },
        }).then((res: any) => {
          return res?.data?.result
        }).catch(() => {
          return {}
        })
        state.article_title = data.article_title
        state.article_marked_content = data.article_marked_content
        state.bg_path = data.bg_path
        state.is_top = data.is_top
        state.top_weight = data.top_weight
        state.tags = data.tags || []
      }
      query()

      return {
        state,
        // ...toRefs(state),
        update,
      }
    },
  })
</script>
