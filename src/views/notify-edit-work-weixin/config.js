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

  corpid: [
    {
      message: '企业ID不能为空',
      required: true,
      trigger: 'blur',
    },
  ],

  corpsecret: [
    {
      message: '凭证密钥不能为空',
      required: true,
      trigger: 'blur',
    },
  ],
}

// 引入枚举值
