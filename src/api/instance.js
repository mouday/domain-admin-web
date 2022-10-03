import axios from 'axios'
import { setToken, getToken, removeToken } from '@/utils/token-util.js'

export const VITE_APP_API = import.meta.env.VITE_APP_API

const instance = axios.create({
  baseURL: VITE_APP_API,
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    let token = getToken()

    if (token) {
      config.headers['X-Token'] = token
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
    console.log(err)
  }
)

export default instance
