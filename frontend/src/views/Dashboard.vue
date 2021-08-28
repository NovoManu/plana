<template>
  <div>Index</div>
</template>

<script lang="ts">
  import { emissionsService } from '@/modules/dashboard/services'

  export default {
    name: 'Index',
    async mounted() {
      const data = await emissionsService.getProductAverage('methane')
      console.log(data)
    },
  }
</script>
