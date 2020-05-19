<template>
  <!-- <div class="text-center mt-4">
    <h5 class="text-2xl">{{ domain }}</h5>
    <div>
      <dl v-if="data" class="text-xl">
        <dt class="inline-block">email:</dt>
        <dd class="inline-block">{{ data.email }}</dd>
        <br>
        <dt class="inline-block">author:</dt>
        <dd class="inline-block">{{ data.author }}</dd>
        <br>
        <dt class="inline-block">wechat:</dt>
        <dd class="flex justify-center">
          <img src="~@/assets/img/qrcode.jpg" width="150" height="150" alt="qrcode">
        </dd>
      </dl>
    </div>
  </div> -->
  <div>
    <div class="bg3 py-4 px-8 text-2xl leading-10">
      <h1 class="font-bold">不同的前端：工程化与UX</h1>
      <div style="text-indent: 1em;">
        <p class="text-xl">俩字缩进，关于我们的事情。造成这种困惑的原因在于，你没有从传统的纯文本以/n换行符表示段落结束和开始的习惯中进入标记语言的思维，因此不理解文本段落就应该用p来表示。br仅仅是提供在必要时候强制换行（比如用于表示程序代码的换行）的格式标记。</p>
      </div>
    </div>
    <the-list :data="list" class="mt-8" />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  // import gql from 'graphql-tag'

  import TheList from '~/components/list.vue'

  export default Vue.extend({
    components: {
      TheList,
    },
    async asyncData ({req}) {
      const list = await new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            {title: '未来世界属于“去中心化应用”', createDate: '2020.05.20'},
            {title: '为什么不应该跟风《后浪？》', createDate: '2020.05.20'},
          ])
        }, 500)
      })
      return {list, domain: req?.headers?.host}
    },
  })
</script>
