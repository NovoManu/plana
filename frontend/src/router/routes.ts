import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Dashboard.vue'),
    meta: {
      layout: 'AppLayoutMain',
    },
  },
  // Note: handle redirect to home in case of not found route
  // Must be last one, do not add any routes after
  { path: '/:catchAll(.*)', redirect: '/' },
]

export default routes
