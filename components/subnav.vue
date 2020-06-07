<template>
  <transition name="el-fade-in-linear">
    <div
      v-show="visible"
      style="background: rgba(0, 0, 0, .35)"
      class="app-subnav absolute w-full h-full left-0 top-0 z-20"
      @click="close"
    >
      <div class="h-full left-0 top-0 w-2/3 bg-gray-800 text-white overflow-hidden">
        <div class="mt-24 text-center">
          <img src="https://api.liaoliaojun.com:3000/files/wx_avatar.jpg" alt="avatar" class="w-16 h-16 rounded-full mx-auto mb-3">
          <strong class="font-normal text-2xl">了了君</strong>
        </div>
        <ul class="text-xl mt-16 leading-10">
          <li v-for="(item, index) in data" :key="index">
            <nuxt-link tag="a" :to="{name: item.routeName}" class="llj-btn cursor-pointer flex items-center h-12 px-12 hover:bg-gray-300 hover:text-gray-800">
              {{ item.name }}
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
  import {defineComponent, computed} from '@vue/composition-api'

  export default defineComponent({
    props: {
      visible: {
        type: Boolean,
        default: false,
      },
      data: {
        type: Array,
        default: () => [],
      },
    },
    
    setup (props, ctx: any) {
      const close = () => {
        console.log('close')
        ctx.emit('update:visible', false)
      }

      return {
        close,
      }
    },
  })
</script>

<style lang="scss">
  .app-subnav {
    ul .nuxt-link-exact-active {
      @apply bg-gray-300 text-gray-800;
      // hover:bg-gray-300 hover:text-gray-800

      &:hover {
        @apply bg-gray-400 text-gray-900;
      }
    }
  }
</style>
