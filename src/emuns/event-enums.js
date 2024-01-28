import { translate } from '@/i18n/index.js'

// 枚举值，用于逻辑判断
export const EventEnum = {
  // ssl证书到期 默认
  SSL_CERT_EXPIRE: 0,

  // 域名到期
  DOMAIN_EXPIRE: 1,
  // 监控异常
  MONITOR_EXCEPTION: 2,
}

export const EventOptions = [
  {
    value: EventEnum.SSL_CERT_EXPIRE,
    label: translate('SSL证书到期'),
  },
  {
    value: EventEnum.DOMAIN_EXPIRE,
    label: translate('域名到期'),
  },
  {
    value: EventEnum.MONITOR_EXCEPTION,
    label: translate('监控异常'),
  },
]

export function eventFilter(value) {
  const item = EventOptions.find((item) => item.value == value)
  if (item) {
    return item.label
  }
}
