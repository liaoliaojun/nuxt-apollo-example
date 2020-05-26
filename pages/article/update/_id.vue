<template>
  <add-article is-update :title="article_title" :marked-content="article_marked_content" @submit="update" />
</template>

<script lang="ts">
  import {defineComponent, computed, reactive, toRefs} from '@vue/composition-api'
  import AddArticle from '../add.vue'
  // @ts-ignore
  import queryArticle from '~/graphql/query/article.gql'
  // @ts-ignore
  import MutationUpdateArticle from '~/graphql/mutation/update_article.gql'

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
      }
      query()

      return {
        ...toRefs(state),
        update,
      }
    },
  })
</script>
