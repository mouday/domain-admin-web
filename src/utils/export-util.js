import { VITE_APP_API } from '@/api/instance.js'

/**
 * 接口获取到的 url 为相对路径，需要拼接完整的页面路径
 * https://github.com/mouday/domain-admin-web/issues/19
 * @param {*} relativePathUrl 是接口返回的文件相对路径，一般为 res.data.url
 * @returns 完整的 url
 */
export function getExportFileUrl(relativePathUrl) {
  return process.env.NODE_ENV === 'development'
    ? VITE_APP_API.replace('/api', relativePathUrl)
    : `${window.location.href.split('/#/')[0]}${relativePathUrl}`
}
