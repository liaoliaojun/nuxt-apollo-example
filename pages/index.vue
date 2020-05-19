<template>
  <div>
    <the-detail :title="title" :content="content" />
    <the-list :data="list" class="mt-8" />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  // import gql from 'graphql-tag'

  import TheList from '~/components/list.vue'
  import TheDetail from '~/components/detail.vue'

  type Items = {
    title: string,
    createDate: string,
  }

  export default Vue.extend({
    components: {
      TheList,
      TheDetail,
    },

    async asyncData ({req}) {
      const list: Array<Items> = await new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            {title: '未来世界属于“去中心化应用”', createDate: '2020.05.20'},
            {title: '为什么不应该跟风《后浪？》', createDate: '2020.05.20'},
          ])
        }, 500)
      })

      const title: string = list?.[0]?.title ?? ''
      const content: string = '俩字缩进，关于我们的事情。造成这种困惑的原因在于，你没有从传统的纯文本以/n换行符表示段落结束和开始的习惯中进入标记语言的思维，因此不理解文本段落就应该用p来表示。br仅仅是提供在必要时候强制换行（比如用于表示程序代码的换行）的格式标记。'
      return {list, title, content, domain: req?.headers?.host}
    },
  })
</script>
