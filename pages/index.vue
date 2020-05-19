<template>
  <div class="flex flex-col">
    <the-detail :title="title" :content="content" class="cursor-pointer" />
    <the-list :data="list" class="flex-auto mt-8" />
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
    id: number|string,
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
            {id: 1, title: '未来世界属于“去中心化应用”', createDate: '2020.05.20'},
            {id: 2, title: '为什么不应该跟风《后浪？》', createDate: '2020.05.20'},
            {id: 3, title: '中文网站排版', createDate: '2020.05.20'},
            {id: 4, title: 'Serverless实践', createDate: '2020.05.20'},
            {id: 5, title: '万物理论', createDate: '2020.05.20'},
            {id: 6, title: '后天改善面部-口呼吸', createDate: '2020.05.20'},
            {id: 7, title: 'NS 动物之森，塞尔达传说”', createDate: '2020.05.20'},
            {id: 8, title: 'Docker', createDate: '2020.05.20'},
            {id: 9, title: 'Ipv6的世界”', createDate: '2020.05.20'},
            {id: 10, title: 'Graphql', createDate: '2020.05.20'},
            {id: 11, title: 'Typescript', createDate: '2020.05.20'},
          ])
        }, 500)
      })

      const title: string = list?.[0]?.title ?? ''
      const content: string = '俩字缩进，关于我们的事情。造成这种困惑的原因在于，你没有从传统的纯文本以/n换行符表示段落结束和开始的习惯中进入标记语言的思维，因此不理解文本段落就应该用p来表示。br仅仅是提供在必要时候强制换行（比如用于表示程序代码的换行）的格式标记。俩字缩进，关于我们的事情。造成这种困惑的原因在于，你没有从传统的纯文本以/n换行符表示段落结束和开始的习惯中进入标记语言的思维，因此不理解文本段落就应该用p来表示。br仅仅是提供在必要时候强制换行（比如用于表示程序代码的换行）的格式标记。俩字缩进，关于我们的事情。造成这种困惑的原因在于，你没有从传统的纯文本以/n换行符表示段落结束和开始的习惯中进入标记语言的思维，因此不理解文本段落就应该用p来表示。br仅仅是提供在必要时候强制换行（比如用于表示程序代码的换行）的格式标记。'
      return {list, title, content, domain: req?.headers?.host}
    },
  })
</script>
