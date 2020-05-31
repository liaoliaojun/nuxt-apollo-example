<template>
  <div class="m-8">
    <div class="image-input">
      <label for="field-image">上传本地图片：</label>
      <input
        id="field-image"
        type="file"
        accept="image/*"
        required
        @change="onUploadImage"
      >
    </div>
    <div class="my-4">
      <label for="network-image">上传图片链接：</label>
      <input id="network-image" v-model="fileUrl" type="text" placeholder="请输入上传的图片地址" class="border px-2">
      <button class="cursor-pointer" @click="onUploadNetwork">点击上传</button>
    </div>
    <h3>上传成功列表：</h3>
    <ul>
      <li v-for="file in files" :key="file.id">
        <span>id: {{ file.id }}</span>
        <span>name: {{ file.filename }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import {defineComponent, ref, Ref} from '@vue/composition-api'

  import useUpload from '~/hooks/upload'
  import {File} from '~/types/index'

  export default defineComponent({
    props: {},

    setup (_, ctx: any) {
      const {urlUpload, localUpload} = useUpload(ctx)

      const files: Ref<Array<File>> = ref([])
      const fileUrl: Ref<string> = ref('')

      const onUploadImage = async ({target}: any) => {
        const data = await localUpload({target})
        if (data !== null) {
          files.value.push(data)
          alert('上传本地图片成功')
        }
      }

      
      const onUploadNetwork = async () => {
        const data = await urlUpload(fileUrl.value)
        if (data !== null) {
          files.value.push(data)
          alert('上传网络图片成功')
        }
      }

      return {
        files,
        fileUrl,
        onUploadImage,
        onUploadNetwork,
      }
    },
  })
</script>

<style>

</style>