<template>
  <div>
    <!-- <div>
      <label for="field-name" class="label">Name</label>
      <input
        id="field-name"
        v-model="name"
        placeholder="Type a name"
        class="input"
      >
    </div> -->
    <div class="image-input">
      <label for="field-image">Image</label>
      <input
        id="field-image"
        type="file"
        accept="image/*"
        required
        @change="onUploadImage"
      >
    </div>
  </div>
</template>

<script lang="ts">
  import {defineComponent} from '@vue/composition-api'

  // @ts-ignore
  import UPLOAD_FILE from '~/graphql/mutation/upload-file.gql'

  export default defineComponent({
    props: {},

    setup (_, ctx: any) {
      const onUploadImage = async ({target}: any) => {
        if (!target.validity.valid) return
        await ctx.root.$apollo.mutate({
          mutation: UPLOAD_FILE,
          variables: {
            file: target.files[0],
            key: localStorage.getItem('app-key'),
          },
        }).then(({data}: any) => {
          if (data?.result?.id) {
            alert('上传图片成功')
          }
        })
      }

      return {
        onUploadImage,
      }
    },
  })
</script>

<style>

</style>