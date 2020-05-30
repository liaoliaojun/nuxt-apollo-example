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

  // @ts-ignore
  import UPLOAD_FILE from '~/graphql/mutation/upload_file.gql'
  // @ts-ignore
  import UPLOAD_FILE_NETWORK from '~/graphql/mutation/upload_file_network.gql'

  import {File} from '~/types/index'

  export default defineComponent({
    props: {},

    setup (_, ctx: any) {
      const files: Ref<Array<File>> = ref([])
      const fileUrl: Ref<string> = ref('')

      const onUploadImage = async ({target}: any) => {
        if (!target.validity.valid) return
        await ctx.root.$apollo.mutate({
          mutation: UPLOAD_FILE,
          variables: {
            file: target.files[0],
            key: localStorage.getItem('app-key'),
          },
        }).then((x: any) => {
          return x.data.result
          // keyof T
          // if (res?.result?.id) {
          //   files.value.push(data.result || [])
          // }
        }).then((file: File) => {
          files.value.push(file)
          alert('上传本地图片成功')
        })
      }

      const onUploadNetwork =  async () => {
        if (!fileUrl.value) return
        await ctx.root.$apollo.mutate({
          mutation: UPLOAD_FILE_NETWORK,
          variables: {
            fileUrl: fileUrl.value,
            key: localStorage.getItem('app-key'),
          },
        }).then((x: any) => {
          return x.data.result
          // keyof T
          // if (res?.result?.id) {
          //   files.value.push(data.result || [])
          // }
        }).then((file: File) => {
          files.value.push(file)
          alert('上传网络图片成功')
        })
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