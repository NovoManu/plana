<template>
  <AppLayout>
    <router-view />
  </AppLayout>
</template>

<script lang="ts">
  import AppLayout from '@/layouts/AppLayout.vue'

  export default {
    name: 'App',
    components: { AppLayout },
  }
</script>
