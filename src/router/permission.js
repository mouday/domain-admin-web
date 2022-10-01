import { getToken } from '@/utils/token-util.js'

const WHITE_LIST = ['/login']

export function routerPermission(router) {
  router.beforeEach((to, from, next) => {
    if (WHITE_LIST.includes(to.path)) {
      next()
    } else {
      let token = getToken()

      if (token) {
        next()
      } else {
        next({
          path: '/login',
          query: { redirect: to.fullPath },
        })
      }
    }
  })
}
