<template>
  <div class="bg2 media-padding text-base lg:text-xl">
    <ul>
      <li v-for="(item, index) in data" :key="index">
        <nuxt-link
          class="flex justify-between items-start leading-loose cursor-pointer hover:text-blue"
          tag="a"
          :to="'article/' + item.article_id"
        >
          <h3>{{ item.article_title }}</h3>
          <span class="ml-2">{{ item.article_date }}</span>
        </nuxt-link>
      </li>
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