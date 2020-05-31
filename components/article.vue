<template>
  <div class="h-full">
    <div v-if="bgPath" class="w-full bg-cover bg-center bg-no-repeat" :style="`height: 61.8vh;backgroundImage:url(https://api.liaoliaojun.com:3000/${bgPath})`"></div>
    <article
      :class="[{'overflow-hidden': !isMain}, {'h-64': !isMain}, {'auto': isMain}]"
      class="relative text-xl lg:text-2xl xl:text-3xl h-full"
    >
      <div class="bg2 media-padding leading-10 h-full">
        <h1 class="font-bold">{{ title }}</h1>
        <!-- eslint-disable -->
        <div v-show="!isMain" class="absolute top-0 left-0 w-full h-full" style="box-shadow: rgba(145, 107, 107, 0.9) 0px -20px 19px -5px inset;" />
        <div class="markdown-body text-base" v-html="contentHTML" />
        <!-- eslint-enable -->
      </div>
      <div v-show="!isMain" class="absolute text-center text-white text-base w-full bottom-0">点击文章，展开全文</div>
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

      isMain: {
        type: Boolean,
        default: false,
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
