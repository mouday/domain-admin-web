import { isJson, isObject } from '@/utils/validator-util.js'
import { jsonObjectValidator } from '@/utils/validator.js'


// 表单验证
export const formRules = {
  body: [
    {
      message: '请求体不能为空',
      required: true,
      trigger: 'blur',
    },
    {
      validator: jsonObjectValidator,
      trigger: 'blur',
    },
  ],

  appkey: [
    {
      message: '应用key不能为空',
      required: true,
      trigger: 'blur',
    },
  ],

  appsecret: [
    {
      message: '应用密钥不能为空',
      required: true,
      trigger: 'blur',
    },
  ],
}

// 引入枚举值
