import { isNumber } from '@/utils/validator-util.js'

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

  // 负责人
  user_id: [
    {
      message: '负责人不能为空',
      required: true,
      trigger: 'blur',
    },
  ],
  

  // 端口号
  port: [
    {
      required: false,
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
