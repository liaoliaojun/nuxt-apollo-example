<template>
  <div class="px-4 mt-4">
    graphql
    <br>
    {{ result }}
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {useQueryOwnerQuery} from '~/types/schema'

  export default Vue.extend({

    setup () {
      const {result} = useQueryOwnerQuery()
      return {
        result,
      }
    },
  })
</script>
