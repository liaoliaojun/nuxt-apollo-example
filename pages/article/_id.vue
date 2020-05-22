<template>
  <div class="flex flex-col">
    id：{{ id }}
    <the-article :title="title" :content="content" is-main class="flex-auto" />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  // import gql from 'graphql-tag'
  import TheArticle from '~/components/article.vue'

  type Items = {
    title: string,
    createDate: string,
  }

  export default Vue.extend({
    components: {
      TheArticle,
    },

    async asyncData ({params}) {
      const list: Array<Items> = await new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            {title: '未来世界属于“去中心化应用”', createDate: '2020.05.20'},
            {title: '为什么不应该跟风《后浪？》', createDate: '2020.05.20'},
            {title: '中文网站排版', createDate: '2020.05.20'},
            {title: 'Serverless实践', createDate: '2020.05.20'},
            {title: '万物理论', createDate: '2020.05.20'},
            {title: '后天改善面部-口呼吸', createDate: '2020.05.20'},
            {title: 'NS 动物之森，塞尔达传说”', createDate: '2020.05.20'},
            {title: 'Docker', createDate: '2020.05.20'},
            {title: 'Ipv6的世界”', createDate: '2020.05.20'},
            {title: 'Graphql', createDate: '2020.05.20'},
            {title: 'Typescript', createDate: '2020.05.20'},
          ])
        }, 500)
      })

      const title: string = list?.[0]?.title ?? ''
      const content: string = '俩字缩进，关于我们的事情。造成这种困惑的原因在于，你没有从传统的纯文本以/n换行符表示段落结束和开始的习惯中进入标记语言的思维，因此不理解文本段落就应该用p来表示。br仅仅是提供在必要时候强制换行（比如用于表示程序代码的换行）的格式标记。俩字缩进，关于我们的事情。造成这种困惑的原因在于，你没有从传统的纯文本以/n换行符表示段落结束和开始的习惯中进入标记语言的思维，因此不理解文本段落就应该用p来表示。br仅仅是提供在必要时候强制换行（比如用于表示程序代码的换行）的格式标记。俩字缩进，关于我们的事情。造成这种困惑的原因在于，你没有从传统的纯文本以/n换行符表示段落结束和开始的习惯中进入标记语言的思维，因此不理解文本段落就应该用p来表示。br仅仅是提供在必要时候强制换行（比如用于表示程序代码的换行）的格式标记。俩字缩进，关于我们的事情。造成这种困惑的原因在于，你没有从传统的纯文本以/n换行符表示段落结束和开始的习惯中进入标记语言的思维，因此不理解文本段落就应该用p来表示。br仅仅是提供在必要时候强制换行（比如用于表示程序代码的换行）的格式标记。'
      return {list, title, content, id: params.id}
    },
  })
</script>
