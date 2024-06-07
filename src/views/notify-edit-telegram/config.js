import { isJson, isObject } from '@/utils/validator-util.js'

const validateHeaders = (rule, value, callback) => {
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
  proxies: [
    {
      validator: validateHeaders,
      trigger: 'blur',
    },
  ],

  chat_id: [
    {
      message: 'ChatId不能为空',
      required: true,
      trigger: 'blur',
    },
  ],
  token: [
    {
      message: 'Token不能为空',
      required: true,
      trigger: 'blur',
    },
  ],
  body: [
    {
      message: '消息内容不能为空',
      required: true,
      trigger: 'blur',
    },
  ],
}

// 引入枚举值
