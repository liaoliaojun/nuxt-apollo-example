<template>
  <div class="mx-auto h-screen flex flex-col overflow-hidden relative">
    <div class="bg-white shadow-lg z-10">
      <header class="app-header body-width mx-auto flex items-center relative justify-center md:justify-between px-4 lg:px-0" style="height: 48px;">
        <!-- 返回按钮 -->
        <a v-show="showBackBtn" class="cursor-pointer block md:hidden" style="position: absolute; left: 1.1rem;" @click="backTo">
          <i class="llj-btn iconfont icon-fanhui text-xl" />
        </a>
        <!-- logo -->
        <h2 class="text-xl block font-bold llj-btn cursor-pointer">
          <nuxt-link tag="a" to="/">了了君的小站~</nuxt-link>
        </h2>
        <!-- 导航栏 -->
        <ul class="hidden text-sm md:text-base md:flex">
          <li v-for="(item, index) in nav" :key="index" class="h-full first:ml-0 ml-5 lg:ml-8">
            <nuxt-link tag="a" :to="{name: item.routeName}" class="llj-btn cursor-pointer flex items-center h-12 px-6 hover:bg-gray-300">
              {{ item.name }}
            </nuxt-link>
          </li>
        </ul>
        <!-- 邮箱 -->
        <h4 class="hidden text-xs md:block text-gray-700">合作邮箱：me@liaoliaojun.com</h4>
        <!-- 菜单 -->
        <button class="block md:hidden" style="position: absolute; right: 1.1rem;" @click="showSubnav = true">
          <i class="llj-btn iconfont icon-caidan text-2xl" />
        </button>
      </header>
    </div>

    <!-- <nuxt class="flex-1 overflow-y-auto bg-gray-300" /> -->
    <div id="app-container" class="flex-auto items-stretch bg-gray-300 overflow-auto">
      <nuxt keep-alive class="body-width mx-auto h-auto" />

      <footer class="body-width mx-auto px-4 lg:px-0">
        <dl class="text-xs md:text-sm flex flex-col lg:flex-row py-2 text-gray-700">
          <!-- <div class="flex mr-8 last:mr-0">
            <dt>作者：</dt>
            <dd>liaoliaojun</dd>
          </div>
          <div class="flex mr-8 last:mr-0">
            <dt>地址：</dt>
            <dd :title="domain">{{ domain }}</dd>
          </div> -->
          <div class="flex mr-8 last:mr-0">
            <dt>联系邮箱：</dt>
            <dd>me@liaoliaojun.com</dd>
          </div>
        </dl>
      </footer>
    </div>

    <the-subnav v-if="showSubnav" :visible.sync="showSubnav" :data="nav" />
  </div>
</template>

<script lang="ts">
  import {defineComponent, reactive, toRefs, onMounted, ref, watchEffect} from '@vue/composition-api'

  import TheSubnav from '~/components/subnav.vue'
  import GlobalClick from '~/util/global-click'
  import VisibilityChange from '~/util/visibility-change'
  // @ts-ignore
  import SaveVisitor from '~/graphql/mutation/save_visitor'
  import useApolloClient from '~/apollo/'

  export default defineComponent({
    components: {
      TheSubnav,
    },

    props: {},

    setup (_, ctx: any) {
      const showBackBtn = ref(false)
      const showSubnav = ref(false)

      const state = reactive({
        activeIndex: ctx.root.$route.name || 'index',
        domain: 'liaoliaojun.com',
        nav: [
          {
            name: '首页',
            routeName: 'index',
          },
          {
            name: '留言薄',
            routeName: 'guestbook',
          },
          {
            name: '友邻',
            routeName: 'links',
          },
          {
            name: '更新日志',
            routeName: 'changelogs',
          },
        ],
      })

      const backTo = () => {
        const {$route, $router} = ctx.root
        if ($route.matched.length === 0) {
          $router.push({name: 'index'})
        } else {
          $router.go(-1)
        }
      }

      // 处理返回按钮的显示与隐藏
      watchEffect(async () => {
        const routeName = ctx.root.$route.name
        if (process.server) return
        await new Promise<void>((resolve) => {
          setTimeout(() => {
            showBackBtn.value = routeName === 'index'
            resolve()
          }, 500)
        })
      })

      onMounted(() => {
        // 全局点击
        GlobalClick()
        // tab页切换
        VisibilityChange()

        state.domain = window?.location?.hostname ?? 'liaoliaojun.com'

        useApolloClient().defaultClient.mutate({
          mutation: SaveVisitor,
        })
      })

      return {
        backTo,
        showSubnav,
        showBackBtn,
        ...toRefs(state),
      }
    },
  })
</script>

<style lang="scss">
  // 显示清晰结构css代码 便于开发
  // * { background-color: rgba(255, 0, 0, .2); }
  // * * { background-color: rgba(0, 255, 0, .2); }
  // * * * { background-color: rgba(0, 0, 255, .2); }
  // * * * * { background-color: rgba(255, 0, 255, .2); }
  // * * * * * { background-color: rgba(0, 255, 255, .2); }
  // * * * * * * { background-color: rgba(255, 255, 0, .2); }

  .app-header {
    ul .nuxt-link-exact-active {
      @apply bg-gray-400;

      &:hover {
        @apply bg-gray-300;
      }
    }
  }
</style>
