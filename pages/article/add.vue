<template>
  <div class="flex media-padding">
    <form class="flex flex-col mr-4" style="min-width: 40vw;" @submit.prevent>
      <input v-model="state.title" type="text" placeholder="请输入标题" class="input-wrapper">
      <textarea v-model="state.content" cols="30" rows="10" placeholder="请输入文章内容" class="p-4 mt-4 textarea-wrapper" />

      <div class="mt-4 text-right">
        <input v-model="state.key" type="text" placeholder="请输入key" class="input-wrapper">
        <button type="submit" class="btn mt-2" @click="submit">提交</button>
      </div>
    </form>
    <the-article :title="state.title" :content="compiledMarkdown" is-main class="flex-auto" style="min-width: 40vw;" />
  </div>
</template>

<script lang="ts">
  import {defineComponent, reactive, computed, watch} from '@vue/composition-api'

  import marked from 'marked'
  import TheArticle from '~/components/article.vue'
  // @ts-ignore
  import MutationAddArticle from '~/graphql/mutation/add_article.gql'

  import {SubmitArticle} from '~/types/index'

  export default defineComponent({
    components: {
      TheArticle,
    },

    props: {
      title: {
        type: String,
        default: '',
      },
      content: {
        type: String,
        default: '',
      },
      isUpdate: {
        type: Boolean,
        default: false,
      },
    },

    setup (props, vm: any) {
      const state: SubmitArticle = reactive({
        title: props.title || '',
        content: props.content || '',
        key: '',
      })
      const compiledMarkdown = computed(() => marked(state.content, {
        gfm: true,
      }))

      watch(() => [props.title, props.content], () => {
        state.title = props.title
        state.content = props.content
      })

      // 添加文字
      const submit = () => {
        console.log(compiledMarkdown)
        console.log(compiledMarkdown.value)
        if (!state.key || !state.title || !state.content) {
          alert('请填写完整信息')
          return
        }
        if (props.isUpdate) {
          vm.emit('submit', {
            key: state.key,
            title: state.title,
            content: compiledMarkdown.value || '',
          })
          return
        }
        vm.root.$apollo.mutate({
          mutation: MutationAddArticle,
          variables: {
            input: {
              key: state.key,
              article_title: state.title,
              article_content: compiledMarkdown.value || '',
            },
          },
        }).then((res: any) => {
          if (res.data.result === '0') {
            alert('提交失败!')
          } else {
            alert('提交成功！')
          }
        })
      }

      return {
        submit,
        state,
        compiledMarkdown,
      }
    },
  })
</script>

<style>
  .input-wrapper,
  .textarea-wrapper {
    width: 100%;
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    outline: none;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
  }

  .input-wrapper {
    height: 2em;
    line-height: 2em;
    padding: 0 1em;
  }

  .btn {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #dcdfe6;
    color: #606266;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    transition: .1s;
    font-weight: 500;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    padding: 8px 16px;
    font-size: 14px;
    border-radius: 4px;
  }
</style>
