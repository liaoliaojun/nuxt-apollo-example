<template>
  <div class="bg3 py-4 px-8 text-2xl leading-10">
    <h1 class="font-bold">{{ title }}</h1>
    <div style="text-indent: 1em;">
      <p class="text-xl">{{ content }}</p>
    </div>
  </div>
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