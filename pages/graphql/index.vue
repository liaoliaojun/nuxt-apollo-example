<template>
  <div class="px-4 mt-4">
    graphql
    <br>
    {{ data }}
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import gql from 'graphql-tag'

  export default Vue.extend({
    async asyncData ({app}) {
      const data = await app.apolloProvider.defaultClient.query({
        query: gql`
          query getInfo {
            config {
              email
              author
            }
          }
        `,
      }).then((res: any) => {
        return res
      }).catch(() => {
        return {}
      })
      return {data}
    },
  })
</script>
