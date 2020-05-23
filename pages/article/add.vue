<template>
  <div class="flex media-padding">
    <form class="flex flex-col mr-4" style="min-width: 40vw;">
      <input v-model="state.title" type="text" placeholder="请输入标题" class="input-wrapper">
      <textarea v-model="state.content" cols="30" rows="10" placeholder="请输入文章内容" class="p-4 mt-4 textarea-wrapper" />

      <div class="mt-4 text-right">
        <input v-model="state.key" type="text" placeholder="请输入key" class="input-wrapper">
        <button type="submit" class="btn mt-2">提交</button>
      </div>
    </form>
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
    key: '',
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
