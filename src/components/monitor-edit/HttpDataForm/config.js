import { TimeUnitEnum } from '@/emuns/time-unit-enums.js'
import { translate } from '@/i18n/index.js'

import { isNumber } from '@/utils/validator-util.js'

// 表单验证
export const formRules = {
  url: [
    {
      message: 'URL不能为空',
      required: true,
      trigger: 'blur',
    },
  ],
  method: [
    {
      message: '请求方式不能为空',
      required: true,
      trigger: 'blur',
    },
  ],
  timeout: [
    {
      message: '超时时间不能为空',
      required: true,
      trigger: 'blur',
    },
    {
      validator: (rule, value, callback) => {
        if (!value) {
          return callback()
        }

        if (!isNumber(value) || parseInt(value) <= 0) {
          return callback(new Error('只能是正整数'))
        } else {
          callback()
        }
      },
      trigger: 'blur',
    },
  ],
}

export const TimeoutUnitOptions = [
  {
    value: TimeUnitEnum.Millisecond,
    label: translate('毫秒'),
  },
  {
    value: TimeUnitEnum.Second,
    label: translate('秒'),
  },
]
