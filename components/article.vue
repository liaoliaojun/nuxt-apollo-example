<template>
  <div class="article-view flex flex-col h-full" style="min-height: calc(100vh - 48px - 37px - 0rem);">
    <the-lazybg :file-url="bgPath" class="bg-box" />
    <article class="relative text-xl lg:text-2xl xl:text-3xl flex flex-col flex-auto">
      <div class="p-8 bg-white leading-10 flex-1">
        <h1 class="font-bold">{{ title }}</h1>
        <div class="flex justify-between text-sm text-gray-700">
          <span>{{ date }}</span>
          <div class="flex items-center">
            <i class="iconfont icon-browse_fill text-2xl mr-1" />
            <span>{{ views }}</span>
          </div>
        </div>
        <!-- eslint-disable -->
        <div class="markdown-body text-base" v-html="contentHTML" />
        <!-- eslint-enable -->
      </div>
    </article>
  </div>
</template>

<script lang="ts">
  import {defineComponent, computed} from '@vue/composition-api'
  import TheLazybg from '~/components/lazybg.vue'

  export default defineComponent({
    components: {
      TheLazybg,
    },
    props: {
      title: {
        type: String,
        default: '',
      },

      content: {
        type: String,
        default: '',
      },

      bgPath: {
        type: String,
        default: '',
      },

      date: {
        type: String,
        default: '',
      },

      views: {
        type: Number,
        default: 0,
      },

      likeCount: {
        type: Number,
        default: 0,
      },
    },

    setup (props) {
      const contentHTML = computed(() => '&nbsp;&emsp;' + props.content)

      return {
        contentHTML,
      }
    },

    // async asyncData ({req}) {
    //   // const data = await app.apolloProvider.defaultClient.query({
    //   //   query: gql`
    //   //     query getInfo {
    //   //       config {
    //   //         email
    //   //         author
    //   //       }
    //   //     }
    //   //   `,
    //   // }).then((res: any) => {
    //   //   return res?.data?.config ?? {}
    //   // }).catch(() => {
    //   //   return {}
    //   // })
    //   console.log(req)
    //   return {domain: req?.headers?.host}
    // },
  })
</script>
<style src="github-markdown-css"></style>

<style lang="scss">
  .article-view {
    .bg-box {
      height: 30vh;
    }
  }

  @screen lg {
    .article-view  {
      .bg-box {
        height: 61.8vh;
      }
    }
  }
</style>
