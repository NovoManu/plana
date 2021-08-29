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
<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
  body {
    min-height: 100vh;
    margin: 0;
    scroll-behavior: smooth;
    text-rendering: optimizeSpeed;
    font-family: 'Roboto', sans-serif;
    line-height: 1.5;
  }
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
</style>
