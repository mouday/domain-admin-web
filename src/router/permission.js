//导入
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import { getToken } from '@/utils/token-util.js'
import { useUserStore } from '@/store/user-store.js'
import { hasPermission } from './util.js'

const WHITE_LIST = ['/login']

export function routerPermission(router) {
  router.beforeEach(async (to, from, next) => {
    // console.log(to)

    // 显示
    NProgress.start()

    let token = getToken()
    const store = useUserStore()

    if (token && !store.hasUserInfo) {
      await store.updateUserInfo()
    }

    // 未匹配
    if (!to.matched || to.matched.length == 0) {
      next({ path: '/' })
    } else if (WHITE_LIST.includes(to.path)) {
      next()
    } else {
      if (store.hasUserInfo) {
        if (to.meta && to.meta.roles) {
          if (hasPermission(to.meta.roles, store.userRoles)) {
            next()
          } else {
            next({ path: '/' })
          }
        } else {
          next()
        }
      } else {
        next({
          path: '/login',
          query: { redirect: to.fullPath },
        })
      }
    }
  })

  router.afterEach(() => {
    // 关闭
    NProgress.done()
  })
}
