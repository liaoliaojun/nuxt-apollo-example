<template>
  <div
    ref="el"
    class="w-full h-full bg-gray-400 bg-no-repeat bg-cover bg-center relative"
    :style="style"
  >
    <slot />
  </div>
</template>

<script lang="ts">
  import {defineComponent, computed, ref, Ref, watch,onMounted, onBeforeUnmount} from '@vue/composition-api'

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
      const el: Ref<any> = ref(null)
      const style: Ref<string> = ref('')
      const httpEndpoint = ctx?.root?.$nuxt?.$config?.httpEndpoint ?? 'https://api.liaoliaojun.com/'

      // 赋值图片
      const setStyle = (url: string) => {
        style.value = props.fileUrl ? `backgroundImage: url(${httpEndpoint}/${props.fileUrl})` : ''
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
            setStyle(props.fileUrl)
          }
        }
      }

      // 手动触发
      watch(() => props.nowreload, (newVal) => {
        if (newVal) {
          setStyle(props.fileUrl)
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
        style,
      }
    },
  })
</script>
