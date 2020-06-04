<template>
  <div class="mx-auto h-screen flex flex-col">
    <div class="bg-white shadow-lg z-10">
      <header class="body-width mx-auto flex items-center relative justify-center app-header">
        <h2 class="text-xl left-0 font-bold llj-btn cursor-pointer" style="position: absolute;">
          <nuxt-link tag="a" to="/">了了君</nuxt-link>
        </h2>
        <ul class="flex text-sm lg:text-base">
          <li v-for="(item, index) in nav" :key="index" class="h-full first:ml-0 ml-5 lg:ml-8">
            <nuxt-link tag="a" :to="{name: item.routeName}" class="llj-btn cursor-pointer flex items-center h-12 px-6 hover:bg-gray-300">
              {{ item.name }}
            </nuxt-link>
          </li>
        </ul>
        <h4 class="text-xs absolute right-0">合作邮箱：me@liaoliaojun.com</h4>
      </header>
    </div>

    <!-- <nuxt class="flex-auto overflow-y-auto bg-gray-300" /> -->
    <div class="flex-auto flex flex-col overflow-y-auto bg-gray-300">
      <nuxt class="flex-auto body-width mx-auto"/>

      <footer class="body-width mx-auto mt-6">
        <dl class="text-xs md:text-sm lg:text-sm flex flex-col lg:flex-row py-2">
          <!-- <div class="flex mr-8 last:mr-0">
            <dt>作者：</dt>
            <dd>liaoliaojun</dd>
          </div>
          <div class="flex mr-8 last:mr-0">
            <dt>地址：</dt>
            <dd :title="domain">{{ domain }}</dd>
          </div> -->
          <div class="flex mr-8 last:mr-0">
            <dt>合作邮箱：</dt>
            <dd>me@liaoliaojun.com</dd>
          </div>
        </dl>
      </footer>
    </div>
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
            name: '首页',
            routeName: 'index',
          },
          {
            name: '留言',
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

<style lang="scss">
  .app-header {
    ul .nuxt-link-exact-active {
      @apply bg-gray-400;

      &:hover {
        @apply bg-gray-300;
      }
    }
  }
</style>
