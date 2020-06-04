<template>
  <div class="articles-view mt-4">
    <h3 class="text-xl">全部文章</h3>
    <ul>
      <li v-for="(item, index) in data" :key="index" class="mt-5">
        <nuxt-link
          class="block cursor-pointer overflow-hidden rounded-lg hover:text-blue"
          tag="a"
          :to="'article/' + item.article_id"
        >
          <div
            v-if="item.bg_path"
            class="bg-box bg-no-repeat bg-cover bg-center"
            :style="`backgroundImage: url(https://api.liaoliaojun.com:3000/${item.bg_path})`">
          </div>
          <div class="bg-white p-5">
            <h3 class="text-xl">{{ item.article_title }}</h3>
            <span class="text-sm">五月 26, 2020</span>
            <p class="mt-4">{{item.article_content}}</p>
            <div class=" flex items-center justify-end text-base leading-none text-gray-700 mt-4">
              <i class="iconfont icon-browse_fill text-2xl mr-1"></i>
              <span>30</span>
              <i class="iconfont icon-praise_fill text-2xl ml-4 mr-1" @click.stop="setKike"></i>
              <span>3</span>
              <i class="iconfont icon-message_fill text-2xl ml-4 mr-1"></i>
              <span>3</span>
            </div>
          </div>
          <!-- <span class="ml-2">{{ item.article_date }}</span> -->
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

<style lang="scss">
  .articles-view {
    width: 100%;
    .bg-box {
      height: 30vh;
    }
  }

  @screen lg {
    .articles-view  {
      width: 61.8%;
      .bg-box {
        height: 50vh;
      }
    }
  }
</style>