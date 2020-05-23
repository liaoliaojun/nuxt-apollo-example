<template>
  <div class="bg2 media-padding text-base lg:text-xl">
    <ul>
      <nuxt-link
        v-for="(item, index) in data"
        :key="index"
        class="flex justify-between items-start leading-loose cursor-pointer hover:text-blue"
        tag="li"
        :to="'article/' + item.article_id"
      >
        <h3>{{ item.article_title }}</h3>
        <span class="ml-2">{{ item.article_date }}</span>
      </nuxt-link>
    </ul>
  </div>
</template>

<script lang="ts">
  import {defineComponent} from '@vue/composition-api'
  // import gql from 'graphql-tag'

  export default defineComponent({
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