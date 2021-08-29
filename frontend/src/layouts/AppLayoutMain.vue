<template>
  <div>
    <header class="header">
      <span class="logo">Plan A</span>
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
  $border-color: #d0d8df;
  $logo-color: #1890ff;
  $logo-font-size: 1.75rem;

  .header {
    height: 2.75rem;
    padding: 0 1.75rem;
    display: flex;
    align-items: center;
    background-color: transparent;
    border-bottom: 1px solid $border-color;
  }
  .logo {
    font-size: $logo-font-size;
    color: $logo-color;
  }
</style>
