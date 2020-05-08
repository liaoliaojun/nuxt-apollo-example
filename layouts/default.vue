<template>
  <div class="mx-auto" style="width: 1200px;">
    <el-menu :default-active="activeIndex" router mode="horizontal" active-text-color="#477de9">
      <el-menu-item index="index" :route="{name: 'index'}">首页</el-menu-item>
      <el-menu-item index="graphql" :route="{name: 'graphql'}">graphql</el-menu-item>
      <el-menu-item index="theme" :route="{name: 'theme'}">主题</el-menu-item>
    </el-menu>
    <nuxt />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import GlobalClick from '~/util/global-click'
  import VisibilityChange from '~/util/visibility-change'

  export default Vue.extend({
    data () {
      return {
        activeIndex: 'index',
      }
    },

    created () {
      this.activeIndex = this.$route.name || 'index'
    },

    mounted () {
      // 全局点击
      GlobalClick()
      // tab页切换
      VisibilityChange()
    },
  })
</script>

<style>
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
