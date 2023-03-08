import { isJson, isObject } from '@/utils/validator.js'

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
  body: [
    {
      validator: validateHeaders,
      trigger: 'blur',
    },
  ],
}

// 引入枚举值
