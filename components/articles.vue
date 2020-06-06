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
          <!-- <div
            v-if="item.bg_path"
            class="bg-box bg-no-repeat bg-cover bg-center"
            :style="`backgroundImage: url(https://api.liaoliaojun.com:3000/${item.bg_path})`">
          </div> -->
          <the-lazybg v-if="item.bg_path" :file-url="item.bg_path" class="bg-box" />
          <div class="bg-white p-5">
            <h3 class="text-xl">{{ item.article_title }}</h3>
            <span class="text-sm text-gray-700">{{ item.article_date }}</span>
            <p class="mt-4">{{ item.article_content }}</p>
            <div class="flex items-center justify-end text-base leading-none cursor-default text-gray-700 mt-4" @click.stop.prevent>
              <i class="iconfont icon-browse_fill text-2xl mr-1"></i>
              <span>{{ item.article_views || 0 }}</span>
              <i class="iconfont icon-praise_fill text-2xl ml-4 mr-1 cursor-pointer hover:text-gray-800" @click.stop.prevent="setLike(item)"></i>
              <span>{{ item.article_like_count || 0 }}</span>
              <!-- <i class="iconfont icon-message_fill text-2xl ml-4 mr-1"></i>
              <span>3</span> -->
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

  import useLike from '~/hooks/like'
  import TheLazybg from '~/components/lazybg.vue'

  export default defineComponent({
    components: {
      TheLazybg,
    },

    props: {
      data: {
        type: Array,
        default: () => [],
      },
    },

    setup (props, ctx: any) {
      const {setLike} = useLike(ctx)

      return {
        setLike,
      }
    },
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