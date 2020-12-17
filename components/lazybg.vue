<template>
  <div
    ref="el"
    class="w-full h-full bg-gray-400 bg-no-repeat bg-cover bg-center relative"
  >
    <img :src="thumbnailUrl" width="100%" class="h-full object-cover" style="filter: blur(20px);">
    <img v-if="originUrl" :src="originUrl" width="100%" class="h-full object-cover absolute left-0 top-0" onerror="this.style.display = 'none'">
    <slot />
  </div>
</template>

<script lang="ts">
  import {defineComponent, computed, ref, watch, onMounted, onBeforeUnmount} from '@vue/composition-api'

  export default defineComponent({
    props: {
      fileUrl: {
        type: String,
        default: '',
      },
      nowreload: {
        type: Boolean,
        default: false,
      },
    },
    setup (props, ctx: any) {
      const el = ref<HTMLElement | null>(null)
      const originUrl = ref('')
      const httpEndpoint = ctx?.root?.$nuxt?.$config?.httpEndpoint ?? 'https://api.liaoliaojun.com/'

      // 拼写缩略图地址
      const thumbnailUrl = computed(() => {
        const [_dir, fileName] = props.fileUrl.split('files/')
        if (!fileName) return ''
        return `${httpEndpoint}/files/thumbnails/${fileName}`
      })

      // 赋值图片
      const setOriginUrl = (url: string) => {
        originUrl.value = props.fileUrl ? `${httpEndpoint}/${props.fileUrl}` : ''
      }

      // 判断是否在视图内
      const watchScroll = () => {
        if (!process.client || !el.value) return
        const {top, bottom, left, right} = el.value.getBoundingClientRect()
        // console.log(top, bottom, left, right)
        // 上下在视图内
        if (top <= window.innerHeight && bottom >= 0) {
          // 左右在视图内
          if (right <= window.innerWidth && left >= 0) {
            setOriginUrl(props.fileUrl)
          }
        }
      }

      // 手动触发
      watch(() => props.nowreload, (newVal) => {
        if (newVal) {
          setOriginUrl(props.fileUrl)
        }
      })

      // 监听滚动事件
      onMounted(() => {
        if (!process.client) return
        watchScroll()
        if (document.querySelector('#app-container')) {
          (document.querySelector('#app-container') as any).addEventListener('scroll', watchScroll)
        }
      })
      onBeforeUnmount(() => {
        (document.querySelector('#app-container') as any).removeEventListener('scroll', watchScroll)
      })

      return {
        el,
        originUrl,
        thumbnailUrl,
      }
    },
  })
</script>
