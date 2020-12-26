<template>
  <div class="h-full py-10">
    <input v-model="imgPath" type="text" class="w-full" placeholder="输入图片地址">
    <img :src="imgPath" class="my-3 cursor-pointer" @click="handleClick">
    <button class="text-blue-600" @click="handleClick">点击上方图片显示原图</button>
  </div>
</template>

<script lang="ts">
  import {defineComponent, ref} from '@vue/composition-api'
  import useImagePreview from '~/hooks/image/preview'

  export default defineComponent({
    setup () {
      const imgPath = ref('https://pic1.zhimg.com/v2-1e7acc6053b72ab39b5a9e8c95494d6f_is.jpg')
      const {showPreview} = useImagePreview()

      const handleClick = () => {
        if (showPreview) {
          showPreview(imgPath.value)
        }
      }

      setTimeout(() => {
        imgPath.value = 'https://pic1.zhimg.com/v2-d3c72f432cb75d2fb1f37653051e356e_1440w.jpg?source=172ae18b'
      }, 5000)

      return {
        imgPath,
        handleClick,
      }
    },
  })
</script>
