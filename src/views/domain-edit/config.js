import { isNumber } from '@/utils/validator-util.js'

// 加密方式
export const sslTypeOptions = [
  {
    label: 'SSL/TLS',
    value: 0,
  },
  {
    label: 'STARTTLS',
    value: 1,
  },
]

// 表单验证
export const formRules = {
  // 域名
  domain: [
    {
      message: '域名不能为空',
      required: true,
      trigger: 'blur',
    },
  ],

  // 端口号
  port: [
    {
      required: true,
      trigger: 'blur',
      validator: (rule, value, callback) => {
        if (!value) {
          return callback()
        }

        if (!isNumber(value)) {
          return callback(new Error('端口号只能是数字'))
        } else {
          callback()
        }
      },
    },
  ],
}

// 引入枚举值
