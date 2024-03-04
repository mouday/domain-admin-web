//导入
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import { getToken } from '@/utils/token-util.js'
import { useUserStore } from '@/store/user-store.js'
import { hasPermission } from './permission.js'

const WHITE_LIST = ['/login']

export function routerHook(router) {
  router.beforeEach(async (to, from, next) => {
    // console.log(to)

    // 显示
    NProgress.start()

    let token = getToken()
    const store = useUserStore()

    if (token && !store.hasUserInfo) {
      await store.updateUserInfo()
    }

    if (!to.matched || to.matched.length == 0) {
      // 未匹配
      next({ path: '/' })
    } else if (WHITE_LIST.includes(to.path)) {
      // 白名单直接走
      next()
    } else {
      if (token && store.hasUserInfo) {
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
