import { translate } from '@/i18n/index.js'

// 监控状态枚举值
export const MonitorStatusEnum = {
  // 未知
  UNKNOWN: 0,

  // 成功
  SUCCESS: 1,

  // 失败
  ERROR: 2,
}

export const MonitorStatusOptions = [
  {
    value: MonitorStatusEnum.UNKNOWN,
    label: translate('未知'),
    status: null
  },
  {
    value: MonitorStatusEnum.SUCCESS,
    label: translate('成功'),
    status: true
  },
  {
    value: MonitorStatusEnum.ERROR,
    label: translate('失败'),
    status: false
  },
]

export function MonitorStatusFilter(value) {
  return MonitorStatusOptions.find((item) => item.value == value)?.label
}

export function MonitorStatusFilterStatus(value) {
  return MonitorStatusOptions.find((item) => item.value == value)?.status
}
