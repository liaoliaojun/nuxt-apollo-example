<template>
  <div
    ref="vm"
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
      const vm: Ref<any> = ref(null)
      const style: Ref<string> = ref('')

      // 赋值图片
      const setStyle = (url: string) => {
        style.value = props.fileUrl ? `backgroundImage: url(https://api.liaoliaojun.com:3000/${props.fileUrl})` : ''
      }

      // 判断是否在视图内
      const watchScroll = () => {
        if (!process.client || !vm.value) return
        const {top, bottom, left, right} = vm.value.getBoundingClientRect()
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
          // ctx.root.$emit('update:nowreload', false)
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
        vm,
        style,
      }
    },
  })
</script>