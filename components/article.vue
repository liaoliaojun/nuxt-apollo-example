<template>
  <article
    :class="{'overflow-hidden': !isMain}"
    :style="{maxHeight: isMain ? 'auto' : 'calc(1em + 40px + (40px * 3))'}"
  >
    <div class="bg2 media-padding text-xl lg:text-2xl xl:text-3xl leading-10 h-full">
      <h1 class="font-bold">{{ title }}</h1>
      <div style="text-indent: 1em;">
        <!-- eslint-disable -->
        <div class="markdown-body text-base lg:text-xl" v-html="content" />
        <!-- eslint-enable -->
      </div>
    </div>
  </article>
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
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