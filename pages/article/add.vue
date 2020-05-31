<template>
  <div class="flex media-padding">
    <form class="flex flex-col mr-4" style="min-width: 40vw;" @submit.prevent>
      <input v-model="state.article_title" type="text" placeholder="请输入标题" class="input-wrapper">
      <textarea ref="textareaInput" v-model="state.article_marked_content" cols="30" rows="10" placeholder="请输入文章内容" class="p-4 mt-4 textarea-wrapper" @keydown="tab" />

      <div class="mt-4 text-right">
        <div class="flex">
          <input v-model="imageUrl" type="text" placeholder="输入配图图片地址，生成图片ID" class="input-wrapper">
          <button class="border px-2 ml-3 text-blue whitespace-no-wrap" @click="onUploadNetwork">上传图片至服务器</button>
        </div>
        <input v-model="state.bg_path" type="text" placeholder="图片ID" class="input-wrapper mt-3">
        <input v-model="state.key" type="text" placeholder="请输入key" class="input-wrapper my-3">
        <button type="submit" class="btn" @click="submit">提交</button>
      </div>
    </form>
    <the-article :bg-path="state.bg_path" :title="state.article_title" :content="compiledMarkdown" is-main class="flex-auto" style="min-width: 40vw;" />
  </div>
</template>

<script lang="ts">
  import {SubmitArticle, File} from '~/types/index'
  import {defineComponent, reactive, ref, Ref, computed, watch, onMounted} from '@vue/composition-api'

  import marked from 'marked'
  import TheArticle from '~/components/article.vue'
  // @ts-ignore
  import MutationAddArticle from '~/graphql/mutation/add_article.gql'

  import useUpload from '~/hooks/upload'

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
      bgPath: {
        type: String,
        default: '',
      },
    },

    setup (props, ctx: any) {
      const {urlUpload} = useUpload(ctx)

      const imageUrl: Ref<String> = ref('')
      const state: SubmitArticle = reactive({
        key: '',
        article_title: props.title || '',
        article_marked_content: props.markedContent || '',
        bg_path: props.bgPath || '',
      })
  
      const compiledMarkdown = computed(() => {
        if (state.article_marked_content) {
          return marked((state.article_marked_content as string), {
            gfm: true,
          })
        } else {
          return ''
        }
      })

      // 提交文章
      const submit = () => {
        if (!state.key || !state.article_title || !state.article_marked_content) {
          alert('请填写完整信息')
          return
        }
        if (props.isUpdate) {
          ctx.emit('submit', {
            key: state.key,
            article_title: state.article_title,
            article_content: compiledMarkdown.value || '',
            article_marked_content: state.article_marked_content || '',
            bg_path: state.bg_path,
          })
          return
        }
        ctx.root.$apollo.mutate({
          mutation: MutationAddArticle,
          variables: {
            input: {
              key: state.key,
              article_title: state.article_title,
              article_content: compiledMarkdown.value || '',
              article_marked_content: state.article_marked_content || '',
              bg_path: state.bg_path,
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
          const textarea = ctx.refs.textareaInput

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

      // 上传网络图片
      const onUploadNetwork = async () => {
        if (!imageUrl.value) return
        const data = await urlUpload(imageUrl.value)
        if ((data as File).path) {
          state.bg_path = (data as File).path
        }
        alert('上传网络图片成功')
      }

      watch(() => [props.title, props.markedContent, props.bgPath], () => {
        state.article_title = props.title
        state.article_marked_content = props.markedContent
        state.bg_path = props.bgPath
      })

      onMounted(() => {
        state.key = localStorage.getItem('app-key') ?? ''
      })

      return {
        tab,
        submit,
        state,
        compiledMarkdown,
        imageUrl,
        onUploadNetwork,
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
