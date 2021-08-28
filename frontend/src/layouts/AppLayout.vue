<template>
  <component :is="layout">
    <slot />
  </component>
</template>

<script>
  import AppLayoutDefault from './AppLayoutDefault'

  export default {
    name: 'AppLayout',
    data() {
      return {
        layout: AppLayoutDefault,
      }
    },
    watch: {
      $route: {
        immediate: true,
        async handler(route) {
          try {
            const component = await import(`@/layouts/${route.meta.layout}.vue`)
            this.layout = component?.default || AppLayoutDefault
          } catch {
            this.layout = AppLayoutDefault
          }
        },
      },
    },
  }
</script>
