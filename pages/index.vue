<template>
  <div class="text-center mt-4">
    <el-button>123</el-button>
    <h5 class="text-2xl">{{ domain }}</h5>
    <div>
      <dl v-if="data" class="text-xl">
        <dt class="inline-block">email:</dt>
        <dd class="inline-block">{{ data.email }}</dd>
        <br>
        <dt class="inline-block">author:</dt>
        <dd class="inline-block">{{ data.author }}</dd>
        <br>
        <dt class="inline-block">wechat:</dt>
        <dd class="flex justify-center">
          <img src="~@/assets/img/qrcode.jpg" width="150" height="150" alt="qrcode">
        </dd>
      </dl>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import gql from 'graphql-tag'

  export default Vue.extend({
    async asyncData ({app, req}) {
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
        return res?.data?.config ?? {}
      }).catch(() => {
        return {}
      })
      return {data, domain: req?.headers?.host}
    },
  })
</script>
