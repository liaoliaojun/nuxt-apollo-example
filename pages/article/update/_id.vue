<template>
  <div>
    <add-article is-update :title="title" :content="content" @submit="update" />
  </div>
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
        title: '',
        content: '',
      })
      const update = (state: SubmitArticle) => {
        root.$apollo.mutate({
          mutation: MutationUpdateArticle,
          variables: {
            input: {
              article_id: id.value,
              key: state.key,
              article_title: state.title,
              article_content: state.content || '',
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
        state.title = data.article_title
        state.content = data.article_content
      }
      query()

      return {
        ...toRefs(state),
        update,
      }
    },
  })
</script>
