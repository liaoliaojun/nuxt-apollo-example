<template>
  <div class="flex px-4 mt-5 relative w-full">
    <form class="flex flex-col mr-4" style="min-width: 48%;" @submit.prevent>
      <input v-model="state.title" type="text" placeholder="请输入标题" class="input-wrapper">
      <textarea ref="textareaInput" v-model="state.marked_content" cols="30" rows="10" placeholder="请输入文章内容" class="p-4 mt-4 textarea-wrapper" @keydown="tab" />

      <div class="mt-4 text-right">
        <div class="flex">
          <input v-model="imageUrl" type="text" placeholder="输入配图图片地址，生成图片ID" class="input-wrapper">
          <button class="border px-2 ml-3 text-blue whitespace-no-wrap" @click="onUploadNetwork">上传图片至服务器</button>
        </div>
        <input v-model="state.bg_path" type="text" placeholder="图片ID" class="input-wrapper mt-3">
        <input v-model="state.key" type="text" placeholder="请输入key" class="input-wrapper my-3">
        <div class="bg-white py-2 px-3 text-left mb-2">
          <el-switch v-model="state.is_top" active-text="置顶" inactive-text="不置顶" />
          <input v-model="state.top_weight" type="number" placeholder="置顶权重" class="input-wrapper my-3">
          <div>
            <el-tag
              v-for="tag in state.tags"
              :key="tag"
              size="medium"
              closable
              @close="handleClose(tag)"
              class="ml-4 first:ml-0"
            >
              {{ tag }}
            </el-tag>
            <el-input
              v-if="tagInputVisible"
              v-model="tagInputValue"
              ref="tagInput"
              size="small"
              class="input-new-tag w-40 mt-3"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            >
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
          </div>
        </div>
        <el-button type="submit" size="small" @click="submit">提交</el-button>
      </div>
    </form>
    <div class="flex-auto overflow-y-scroll h-full absolute rounded-lg" style="right: 1rem; min-width: 50%; max-width: 50%;">
      <the-article :bg-path="state.bg_path" :title="state.title" :content="compiledMarkdown" is-main />
    </div>
  </div>
</template>

<script lang="ts">
  import {Tag as ElTag, Switch as ElSwitch, Input as ElInput, Button as ElButton} from 'element-ui'
  import {SubmitArticle, File} from '~/types/index'
  import {defineComponent, reactive, ref, computed, watch, onMounted, SetupContext} from '@vue/composition-api'

  import marked from 'marked'
  import TheArticle from '~/components/article.vue'
  // @ts-ignore
  import MutationAddArticle from '~/graphql/mutation/add_article'

  import useUpload from '~/hooks/upload'
  import useApolloClient from '~/apollo/'
  import 'element-ui/lib/theme-chalk/index.css'

  export default defineComponent({
    components: {
      TheArticle,
      ElTag,
      ElInput,
      ElSwitch,
      ElButton,
    },

    props: {
      data: {
        type: Object,
        default: () => {},
      },
      isUpdate: {
        type: Boolean,
        default: false,
      },
      // title: {
      //   type: String,
      //   default: '',
      // },
      // markedContent: {
      //   type: String,
      //   default: '',
      // },
      // bgPath: {
      //   type: String,
      //   default: '',
      // },
    },

    setup (props, ctx: SetupContext) {
      const {urlUpload} = useUpload()
      const imageUrl = ref('')

      const state: SubmitArticle = reactive({
        key: '',
        title: '',
        marked_content: '',
        bg_path: '',
        is_top: false,
        top_weight: 10,
        tags: [],
      })

      // 标签相关状态
      const tagInputVisible = ref(false)
      const tagInputValue = ref('')
  
      const compiledMarkdown = computed(() => {
        if (state.marked_content) {
          return marked((state.marked_content as string), {
            gfm: true,
          })
        } else {
          return ''
        }
      })

      // 提交文章
      const submit = () => {
        if (!state.key || !state.title || !state.marked_content) {
          alert('请填写完整信息')
          return
        }
        if (props.isUpdate) {
          ctx.emit('submit', {
            key: state.key,
            title: state.title,
            content: compiledMarkdown.value || '',
            marked_content: state.marked_content || '',
            bg_path: state.bg_path,
            is_top: Boolean(state.is_top),
            top_weight: Number(state.top_weight) || 10,
            tags: state.tags || [],
          })
          return
        }
        useApolloClient().defaultClient.mutate({
          mutation: MutationAddArticle,
          variables: {
            input: {
              key: state.key,
              title: state.title,
              content: compiledMarkdown.value || '',
              marked_content: state.marked_content || '',
              bg_path: state.bg_path,
              is_top: Boolean(state.is_top),
              top_weight: Number(state.top_weight) || 10,
              tags: state.tags || [],
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
          // @ts-ignore
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

      // 删除标签 
      const handleClose = (tag: string) => {
        state.tags.splice(state.tags.indexOf(tag), 1)
      }

      // 显示输入框
      const showInput = () => {
        tagInputVisible.value = true
        ctx.root.$nextTick(() => {
          // @ts-ignore
          if (!ctx.root.$refs?.tagInput?.input) return
          // @ts-ignore
          ctx.root.$refs?.tagInput?.input.focus()
        })
      }

      // 插入标签
      const handleInputConfirm = () => {
        if (tagInputValue.value) {
          state.tags.push(tagInputValue.value)
        }
        tagInputVisible.value = false
        tagInputValue.value = ''
      }

      watch(() => props.data, () => {
        if (!props.data?.title) return
        state.bg_path = props.data.bg_path
        state.title = props.data.title
        state.marked_content = props.data.marked_content
        state.is_top = props.data.is_top
        state.top_weight = props.data.top_weight
        state.tags = props.data.tags || []
      }, {deep: true})

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
        tagInputValue,
        tagInputVisible,
        handleClose,
        showInput,
        handleInputConfirm,
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
