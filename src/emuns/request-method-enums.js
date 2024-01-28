import { translate } from '@/i18n/index.js'

// 监控状态枚举值
export const RequestMethodEnum = {
  // GET
  GET: 'GET',

  // POST
  POST: 'POST',
}

export const RequestMethodOptions = [
  {
    value: RequestMethodEnum.GET,
    label: translate('GET'),
  },
  // {
  //   value: RequestMethodEnum.POST,
  //   label: translate('POST'),
  // },
]

export function RequestMethodFilter(value) {
  return RequestMethodOptions.find((item) => item.value == value)?.label
}
