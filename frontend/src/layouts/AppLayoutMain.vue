<template>
  <div>
    <header class="header">
      <span class="logo" data-test="app-layout-logo">Plan A</span>
    </header>
    <slot />
  </div>
</template>

<script>
  export default {
    name: 'AppLayoutHome',
  }
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/index.scss';

  .header {
    height: 2.75rem;
    padding: 0 1.75rem;
    display: flex;
    align-items: center;
    background-color: transparent;
    border-bottom: 1px solid $secondary-color;
  }
  .logo {
    font-size: $font-size-1;
    color: $primary-color;
  }
</style>
