import { translate } from '@/i18n/index.js'

// 枚举值，用于逻辑判断
export const DNSTypeEnum = {
  // 阿里云
  ALIYUN: 1,

  // 腾讯云
  TENCENT_CLOUD: 2
}

export const DNSTypeOptions = [
  {
    value: DNSTypeEnum.ALIYUN,
    label: translate('阿里云'),
  },
  {
    value: DNSTypeEnum.TENCENT_CLOUD,
    label: translate('腾讯云'),
  },
]

export function dnsTypeFilter(value) {
  const item = DNSTypeOptions.find((item) => item.value == value)
  if (item) {
    return item.label
  }
  return
}
