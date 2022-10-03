import { getToken } from '@/utils/token-util.js'
import { useUserStore } from '@/store/user-store.js'

const WHITE_LIST = ['/login']

export function routerPermission(router) {
  router.beforeEach(async (to, from, next) => {
    let token = getToken()
    const store = useUserStore()

    if (token) {
      await store.updateUserInfo()
    }

    if (WHITE_LIST.includes(to.path)) {
      next()
    } else {
      if (store.hasUserInfo) {
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
