import { isJson, isObject } from '@/utils/validator.js'

const validateBody = (rule, value, callback) => {
  if (!value) {
    return callback()
  }

  if (!isJson(value)) {
    return callback(new Error('必须是json'))
  }

  let parseValue = JSON.parse(value)

  if (!isObject(parseValue)) {
    callback(new Error('必须是object对象'))
  } else {
    callback()
  }
}

// 表单验证
export const formRules = {
  body: [
    {
      message: '请求体不能为空',
      required: true,
      trigger: 'blur',
    },
    {
      validator: validateBody,
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
