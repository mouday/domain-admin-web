import { translate } from '@/i18n/index.js'

// 枚举值，ssl证书部署方式
export const CertDeployTypeEnum = {
  SSH: 0,

  WEB_HOOK: 1,

  OSS: 2,

  CDN: 3,

  DCDN: 4,
}

export const CertDeployTypeOptions = [
  {
    value: CertDeployTypeEnum.SSH,
    label: translate('SSH'),
  },
  {
    value: CertDeployTypeEnum.WEB_HOOK,
    label: translate('WEB_HOOK'),
  },
]

export function dnsTypeFilter(value) {
  const item = CertDeployTypeOptions.find((item) => item.value == value)
  if (item) {
    return item.label
  }
  return
}
