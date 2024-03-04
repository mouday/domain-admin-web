import axios from 'axios'
import { ElMessage } from 'element-plus'
import { setToken, getToken, removeToken } from '@/utils/token-util.js'
import { getLanguage } from '@/i18n/utils.js'

export const VITE_APP_API = import.meta.env.VITE_APP_API

// https://www.npmjs.com/package/axios
const instance = axios.create({
  baseURL: VITE_APP_API,
  timeout: 60 * 1000, // default is `0` (no timeout) milliseconds
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    let token = getToken()
    let language = getLanguage()

    if (token) {
      config.headers['X-Token'] = token
    }

    if (language) {
      config.headers['X-Language'] = language
    }

    return config
  },
  (err) => {
    console.log(err)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  (res) => {
    return res.data
  },
  (err) => {
    // console.log(err)
    // ElMessage.error(err)
    return {
      data: null,
      msg: err,
      code: -1,
    }
  }
)

export default instance
