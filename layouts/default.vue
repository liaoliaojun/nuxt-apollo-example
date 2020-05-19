<template>
  <div class="mx-auto h-screen flex flex-col">
    <!-- <el-menu :default-active="activeIndex" router mode="horizontal" active-text-color="#477de9">
      <el-menu-item index="index" :route="{name: 'index'}">首页</el-menu-item>
      <el-menu-item index="graphql" :route="{name: 'graphql'}">graphql</el-menu-item>
      <el-menu-item index="theme" :route="{name: 'theme'}">主题</el-menu-item>
    </el-menu> -->
    <header class="mb-8 bg1">
      <ul class="flex text-2xl py-3 px-8">
        <li class="ml-12 cursor-pointer first:ml-0 hover:text-blue">前端记</li>
        <li class="ml-12 cursor-pointer first:ml-0 hover:text-blue">蓝星前沿</li>
        <li class="ml-12 cursor-pointer first:ml-0 hover:text-blue">未来</li>
      </ul>
    </header>

    <nuxt class="flex-auto" />

    <footer class="bg3 mt-4">
      <dl class="py-3 px-8 flex">
        <dt class="ml-8 first:ml-0">作者：</dt>
        <dd>了了君</dd>
        <dt class="ml-8 first:ml-0">地址：</dt>
        <dd :title="domain">{{ domain }}</dd>
        <dt class="ml-8 first:ml-0">联系邮箱：</dt>
        <dd>1030219089a@gmail.com</dd>
      </dl>
    </footer>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import GlobalClick from '~/util/global-click'
  import VisibilityChange from '~/util/visibility-change'

  export default Vue.extend({
    // async asyncData ({req}) {
    //   return {domain: req?.headers?.host ?? '1'}
    // },
  
    data () {
      return {
        activeIndex: 'index',
        domain: 'liaoliaojun.com',
      }
    },

    created () {
      this.activeIndex = this.$route.name || 'index'
    },

    mounted () {
      this.domain =  window?.location?.hostname ?? ''

      // 全局点击
      GlobalClick()
      // tab页切换
      VisibilityChange()
    },
  })
</script>

<style>
  .bg1 {
    background-image: url('~@/assets/img/bg1.jpg');
  }
  .bg2 {
    background-image: url('~@/assets/img/bg2.jpg');
  }
  .bg3 {
    background-image: url('~@/assets/img/bg3.jpg');
  }

  html {
    font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
    margin: 0;
  }

  .button--green {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #3b8070;
    color: #3b8070;
    text-decoration: none;
    padding: 10px 30px;
  }

  .button--green:hover {
    color: #fff;
    background-color: #3b8070;
  }

  .button--grey {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #35495e;
    color: #35495e;
    text-decoration: none;
    padding: 10px 30px;
    margin-left: 15px;
  }

  .button--grey:hover {
    color: #fff;
    background-color: #35495e;
  }
</style>
