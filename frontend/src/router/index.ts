import { createRouter, createWebHistory, RouterOptions } from 'vue-router'
import routes from '@/router/routes'

const router = createRouter(<RouterOptions>{
  history: createWebHistory(),
  routes,
})

export default router
