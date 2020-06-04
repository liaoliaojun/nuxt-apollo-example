<template>
  <div class="h-full">
    <div v-if="bgPath" class="w-full bg-cover bg-center bg-no-repeat" :style="`height: 61.8vh;backgroundImage:url(https://api.liaoliaojun.com:3000/${bgPath})`"></div>
    <article class="relative text-xl lg:text-2xl xl:text-3xl h-full">
      <div class="p-8 bg-white leading-10 h-full">
        <h1 class="font-bold">{{ title }}</h1>
        <div class="flex justify-between text-sm text-gray-700">
          <span>五月 26, 2020</span>
          <div class="flex items-center">
            <i class="iconfont icon-browse_fill text-2xl mr-1"></i>
            <span>30</span>
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

  export default defineComponent({
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
