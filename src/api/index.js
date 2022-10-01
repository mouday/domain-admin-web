import DATA_API from './dataApi.js'
import instance from './instance.js'
import { ElMessage } from 'element-plus'

function httpRequest(url) {
  return async function (params = {}) {
    let data = null

    // 可以加一些公共参数
    if (params instanceof FormData) {
      data = params
    } else {
      data = params
    }

    const res = await instance.post(url, data)

    if (res.code == 0) {
      return res
    } else {
      ElMessage.error(res.msg)
    }
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
