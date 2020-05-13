<template>
  <div>
    graphql
    <br>
    {{ data }}
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  // import gql from 'graphql-tag'

  export default Vue.extend({
    async asyncData () {
      // const data = await app.apolloProvider.defaultClient.query({
      //   query: gql`
      //     query getInfo {
      //       config {
      //         email
      //         author
      //       }
      //     }
      //   `,
      // }).then((res: any) => {
      //   return res
      // }).catch(() => {
      //   return {}
      // })
      const data = {email: '1', author: '2'}
      return {data}
    },
  })
</script>
