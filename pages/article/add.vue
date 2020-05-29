<template>
  <div class="flex media-padding">
    <form class="flex flex-col mr-4" style="min-width: 40vw;" @submit.prevent>
      <input v-model="state.article_title" type="text" placeholder="请输入标题" class="input-wrapper">
      <textarea ref="textareaInput" v-model="state.article_marked_content" cols="30" rows="10" placeholder="请输入文章内容" class="p-4 mt-4 textarea-wrapper" @keydown="tab" />

      <div class="mt-4 text-right">
        <input v-model="state.key" type="password" placeholder="请输入key" class="input-wrapper">
        <button type="submit" class="btn mt-2" @click="submit">提交</button>
      </div>
    </form>
    <the-article :title="state.article_title" :content="compiledMarkdown" is-main class="flex-auto" style="min-width: 40vw;" />
  </div>
</template>

<script lang="ts">
  import {defineComponent, reactive, computed, watch, onMounted} from '@vue/composition-api'

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
      markedContent: {
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
        key: '',
        article_title: props.title || '',
        article_marked_content: props.markedContent || '',
      })
      // @ts-ignore
      const compiledMarkdown = computed(() => {
        if (state.article_marked_content) {
          return marked(state.article_marked_content, {
            gfm: true,
          })
        } else {
          return ''
        }
      })

      watch(() => [props.title, props.markedContent], () => {
        state.article_title = props.title
        state.article_marked_content = props.markedContent
      })

      // 添加文字
      const submit = () => {
        if (!state.key || !state.article_title || !state.article_marked_content) {
          alert('请填写完整信息')
          return
        }
        if (props.isUpdate) {
          vm.emit('submit', {
            key: state.key,
            article_title: state.article_title,
            article_content: compiledMarkdown.value || '',
            article_marked_content: state.article_marked_content || '',
          })
          return
        }
        vm.root.$apollo.mutate({
          mutation: MutationAddArticle,
          variables: {
            input: {
              key: state.key,
              article_title: state.article_title,
              article_content: compiledMarkdown.value || '',
              article_marked_content: state.article_marked_content || '',
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

      const tab = (e: any) => {
        if (e.keyCode === 9) {
          const textarea = vm.refs.textareaInput

          const start = textarea.selectionStart
          const end = textarea.selectionEnd

          const target = e.target
          const value = target.value

          // set textarea value to: text before caret + tab + text after caret
          target.value = value.substring(0, start) + '  ' + value.substring(end)

          // put caret at right position again (add one for the tab)
          textarea.selectionStart = textarea.selectionEnd = start + 2

          // prevent the focus lose
          e.preventDefault()
        }
      }

      onMounted(() => {
        state.key = localStorage.getItem('app-key') ?? ''
      })

      return {
        tab,
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
