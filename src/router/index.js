import { createRouter, createWebHashHistory } from 'vue-router'

import { routes } from './routes.js'
import { routerPermission } from './permission.js'

const Router = createRouter({
  history: createWebHashHistory(),
  routes,
})

routerPermission(Router)

export const router = Router
