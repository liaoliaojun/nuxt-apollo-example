<template>
  <div class="flex media-padding">
    <div class="flex flex-col mr-4" style="min-width: 40vw;">
      <input v-model="state.title" type="text" placeholder="请输入标题" class="input-wrapper">
      <textarea v-model="state.content" cols="30" rows="10" placeholder="请输入文章内容" class="p-4 mt-4 textarea-wrapper" />
      <button>提交</button>
    </div>
    <the-article :title="state.title" :content="compiledMarkdown" is-main class="flex-auto" style="min-width: 40vw;" />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import marked from 'marked'
  import TheArticle from '~/components/article.vue'

  const state = Vue.observable({
    title: '',
    content: '',
  })

  export default Vue.extend({
    components: {
      TheArticle,
    },

    data () {
      return {
        state,
      }
    },

    computed: {
      compiledMarkdown () {
        return marked(state.content)
      },
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
</style>
