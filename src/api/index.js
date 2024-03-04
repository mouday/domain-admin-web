import { ElMessage } from 'element-plus'

import DATA_API from './dataApi.js'
import instance from './instance.js'
import { VITE_APP_API } from './instance.js'
import { HttpCodeEnum } from './enums.js'
import { hasPermission } from './permission.js'

function httpRequest(url) {
  return async function (params = {}, config) {
    // let data = null
    // console.log(params)

    // 可以加一些公共参数
    // if (params instanceof FormData) {
    //   data = params
    // } else {
    //   data = params
    // }

    // 权限检查
    // if (!hasPermission(url)) {
    //   return
    // }

    const res = await instance.post(url, params, config)

    res.ok = false

    if (res.code == 0) {
      res.ok = true
    } else {
      ElMessage.closeAll()
      ElMessage.error(res.msg)
    }

    return res
  }
}

function getHttpRequest() {
  let http = {}

  for (let [key, url] of Object.entries(DATA_API)) {
    // async 作用，避免进入回调地狱
    http[key] = httpRequest(url)
  }

  return http
}

export const Http = getHttpRequest()

export function resolve_api_url(url) {
  return VITE_APP_API + url
}
