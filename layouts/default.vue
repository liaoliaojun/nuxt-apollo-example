<template>
  <div class="mx-auto h-screen flex flex-col">
    <header class="flex justify-center bg-white shadow-lg app-header z-10">
      <ul class="flex flex-row-reverse text-sm lg:text-base">
        <li v-for="(item, index) in nav" :key="index" class="h-full first:mr-0 mr-5 lg:mr-8">
          <nuxt-link tag="a" :to="{name: item.routeName}" class="llj-btn cursor-pointer flex items-center h-12 px-6 hover:bg-gray-300">
            {{ item.name }}
          </nuxt-link>
        </li>
      </ul>
    </header>

    <!-- <nuxt class="flex-auto overflow-y-auto bg-gray-300" /> -->
    <div class="flex-auto overflow-y-auto bg-gray-300">
      <nuxt class="body-width mx-auto"/>
    </div>

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
            name: '友邻',
            routeName: 'theme',
          },
          {
            name: '留言',
            routeName: 'graphql',
          },
          {
            name: '首页',
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

<style lang="scss">
  .app-header {
    .nuxt-link-exact-active {
      @apply bg-gray-400;

      &:hover {
        @apply bg-gray-300;
      }
    }
  }
</style>
