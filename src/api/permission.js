import { setToken, getToken, removeToken } from '@/utils/token-util.js'

// 白名单
const WHITE_LIST = ['/api/login', '/api/getSystemVersion']

/**
 * api url权限检查
 * @param {*} url 
 * @returns 
 */
export function hasPermission(url) {
  if (WHITE_LIST.includes(url)) {
    return true
  }

  // token检查
  if (getToken()) {
    return true
  }

  return false
}
