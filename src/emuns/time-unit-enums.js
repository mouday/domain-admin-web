import { translate } from '@/i18n/index.js'

// 时间单位
export const TimeUnitEnum = {
  // 毫秒
  Millisecond: 1,

  // 秒
  Second: 2,

  // 分钟
  Minute: 3,

  // 小时
  Hour: 4,

  // 天
  Day: 5,

  // 周
  Week: 6,

  // 月
  Month: 7,

  // 年
  Year: 8,
}

export const TimeUnitOptions = [
  {
    value: TimeUnitEnum.Millisecond,
    label: translate('毫秒'),
  },
  {
    value: TimeUnitEnum.Second,
    label: translate('秒'),
  },
  {
    value: TimeUnitEnum.Minute,
    label: translate('分钟'),
  },
  {
    value: TimeUnitEnum.Hour,
    label: translate('小时'),
  },
  {
    value: TimeUnitEnum.Day,
    label: translate('天'),
  },
  {
    value: TimeUnitEnum.Week,
    label: translate('周'),
  },
  {
    value: TimeUnitEnum.Month,
    label: translate('月'),
  },
  {
    value: TimeUnitEnum.Year,
    label: translate('年'),
  },
]

export function TimeUnitFilter(value) {
  return TimeUnitOptions.find((item) => item.value == value)?.label
}
