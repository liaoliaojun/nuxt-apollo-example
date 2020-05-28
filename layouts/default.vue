<template>
  <div class="mx-auto h-screen flex flex-col">
    <!-- <el-menu :default-active="activeIndex" router mode="horizontal" active-text-color="#477de9">
      <el-menu-item index="index" :route="{name: 'index'}">首页</el-menu-item>
      <el-menu-item index="graphql" :route="{name: 'graphql'}">graphql</el-menu-item>
      <el-menu-item index="theme" :route="{name: 'theme'}">主题</el-menu-item>
    </el-menu> -->
    <header class="media-padding bg1">
      <ul class="flex flex-row-reverse text-xl lg:text-2xl">
        <li v-for="(item, index) in nav" :key="index" class="cursor-pointer first:mr-0 hover:text-blue mr-8 lg:mr-12">
          <nuxt-link tag="a" :to="{name: item.routeName}">
            {{ item.name }}
          </nuxt-link>
        </li>
      </ul>
    </header>

    <nuxt class="flex-auto" />

    <footer class="bg3 media-padding mt-4">
      <dl class="text-xs md:text-sm lg:text-base flex flex-col lg:flex-row">
        <div class="flex mr-8 last:mr-0">
          <dt>作者：</dt>
          <dd>了了君</dd>
        </div>
        <div class="flex mr-8 last:mr-0">
          <dt>地址：</dt>
          <dd :title="domain">{{ domain }}</dd>
        </div>
        <div class="flex mr-8 last:mr-0">
          <dt>联系邮箱：</dt>
          <dd>1030219089a@gmail.com</dd>
        </div>
      </dl>
    </footer>
  </div>
</template>

<script lang="ts">
  import {defineComponent, reactive, toRefs, onMounted} from '@vue/composition-api'

  import GlobalClick from '~/util/global-click'
  import VisibilityChange from '~/util/visibility-change'
  // @ts-ignore
  import setVisitor from '~/graphql/mutation/set_visitor.gql'

  export default defineComponent({
    props: {},

    setup (_, ctx: any) {
      const state = reactive({
        activeIndex: ctx.root.$route.name || 'index',
        domain: 'liaoliaojun.com',
        nav: [
          {
            name: '蓝星前沿',
            routeName: 'theme',
          },
          {
            name: '未来',
            routeName: 'graphql',
          },
          {
            name: '前端记',
            routeName: 'index',
          },
        ],
      })

      onMounted(() => {
        // 全局点击
        GlobalClick()
        // tab页切换
        VisibilityChange()

        state.domain = window?.location?.hostname ?? 'liaoliaojun.com'

        ctx.root.$apollo.mutate({
          mutation: setVisitor,
        })
      })

      return {
        ...toRefs(state),
      }
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

  .nuxt-link-active {
    @apply text-blue;
  }

  .media-padding {
    @apply px-3 py-2;
  }

  @screen lg {
    .media-padding {
      @apply px-8 py-3;
    }
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
