<template>
  <article
    :class="{'overflow-hidden': !isMain}"
    :style="{maxHeight: isMain ? 'auto' : 'calc(1.5rem + 40px + (40px * 3))'}"
  >
    <div class="bg2 py-4 px-8 text-2xl leading-10">
      <h1 class="font-bold">{{ title }}</h1>
      <div style="text-indent: 1em;">
        <p class="text-xl">{{ content }}</p>
      </div>
    </div>
  </article>
</template>

<script lang="ts">
  import Vue from 'vue'
  // import gql from 'graphql-tag'

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

<style>

</style>