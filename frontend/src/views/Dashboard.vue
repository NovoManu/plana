<template>
  <div>Index</div>
</template>

<script lang="ts">
  import { emissionsService } from '@/modules/dashboard/services'

  export default {
    name: 'Index',
    async mounted() {
      const products = await emissionsService.getProducts()
      const average = await emissionsService.getProductAverage(products[0].name)
      console.log(average)
    },
  }
</script>
