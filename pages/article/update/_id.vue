<template>
  <!--  :bg-path="bg_path" :title="title" :marked-content="marked_content" -->
  <add-article is-update :data="state" @submit="update" />
</template>

<script lang="ts">
  import {defineComponent, computed, reactive} from '@vue/composition-api'
  import type {SetupContext} from '@vue/composition-api'
  import AddArticle from '../add.vue'
  import {SubmitArticle} from '~/types/index'
  // @ts-ignore
  import queryArticle from '~/graphql/query/article'
  // @ts-ignore
  import MutationUpdateArticle from '~/graphql/mutation/update_article'

  import useApolloClient from '~/apollo/'

  export default defineComponent({
    components: {
      AddArticle,
    },

    setup (_, {root}: SetupContext) {
      const id = computed(() => root.$route?.params?.id)
      const state = reactive({
        title: '',
        marked_content: '',
        bg_path: '',
        is_top: false,
        top_weight: 10,
        tags: [],
      })
      const update = (submitState: SubmitArticle) => {
        useApolloClient().defaultClient.mutate({
          mutation: MutationUpdateArticle,
          variables: {
            input: {
              article_id: id.value,
              key: submitState.key,
              title: submitState.title,
              content: submitState.content || '',
              marked_content: submitState.marked_content || '',
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
        const data = await useApolloClient().defaultClient.query({
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
        state.title = data.title
        state.marked_content = data.marked_content
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
