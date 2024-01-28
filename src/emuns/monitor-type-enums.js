import { translate } from '@/i18n/index.js'

// 监控类型枚举值
export const MonitorTypeEnum = {
  // 未知
  UNKNOWN: 0,

  // http
  HTTP: 1,
}

export const MonitorTypeOptions = [
  {
    value: MonitorTypeEnum.HTTP,
    label: translate('HTTP'),
  },
]

export const MonitorTypeFilterOptions = [
  {
    value: MonitorTypeEnum.UNKNOWN,
    label: translate('未知'),
  },
  ...MonitorTypeOptions,
]

export function MonitorTypeFilter(value) {
  return MonitorTypeFilterOptions.find((item) => item.value == value)?.label
}
