import { isEmail, isJson } from '@/utils/validator.js'

const validateEmailList = (rule, value, callback) => {
  if (!value) {
    return callback()
  }

  if (!isJson(value)) {
    return callback(new Error('必须是json'))
  }

  let parseValue = JSON.parse(value)

  if (!Array.isArray(parseValue)) {
    callback(new Error('必须是array数组'))
  } else if (parseValue.some((item) => !isEmail(item))) {
    callback(new Error('数组项只能是邮箱地址'))
  } else {
    callback()
  }
}

// 表单验证
export const formRules = {
  // 域名
  email_list: [
    {
      // message: '域名不能为空',
      // required: true,
      validator: validateEmailList,
      trigger: 'blur',
    },
  ],
}

// 引入枚举值
