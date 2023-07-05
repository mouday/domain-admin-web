import { createRouter, createWebHashHistory } from 'vue-router'

import { routes } from './routes.js'
import { routerHook } from './hook.js'

const Router = createRouter({
  history: createWebHashHistory(),
  routes,
})

routerHook(Router)

export const router = Router
