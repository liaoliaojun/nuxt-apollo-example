<template>
  <article
    :class="[{'overflow-hidden': !isMain}, {'h-64 md:h-56 lg:h-40': !isMain}, {'auto': isMain}]"
    class="relative text-xl lg:text-2xl xl:text-3xl"
  >
    <div class="bg2 media-padding leading-10 h-full">
      <h1 class="font-bold">{{ title }}</h1>
      <!-- eslint-disable -->
      <div v-show="!isMain" class="absolute top-0 left-0 w-full h-full" style="box-shadow: inset 0px -13px 10px -4px rgba(255, 255, 255, .9);" />
      <div class="markdown-body text-base" v-html="'&nbsp;&emsp;' + content" />
      <!-- eslint-enable -->
    </div>
  </article>
</template>

<script lang="ts">
  import {defineComponent} from '@vue/composition-api'

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