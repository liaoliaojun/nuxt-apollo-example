<template>
  <div class="bg2 py-2 px-8 text-xl">
    <ul>
      <li
        v-for="(item, index) in data"
        :key="index"
        class="flex justify-between items-center leading-loose"
      >
        <h3>{{ item.title }}</h3>
        <span>{{ item.createDate }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  // import gql from 'graphql-tag'

  export default Vue.extend({
    props: {
      data: {
        type: Array,
        default: () => [],
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