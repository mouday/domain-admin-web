import { getUUID } from '@/utils/uuid.js'

const ApiKey = 'mXMn18VQJxoH0P'

/**
 * 随机获取一个头像图片地址
 * @returns
 */
export function getAvatarUrl() {
  let uuid = getUUID()

  return `https://api.multiavatar.com/${uuid}.png?apikey=${ApiKey}`
}
