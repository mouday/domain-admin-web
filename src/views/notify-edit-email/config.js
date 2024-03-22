import { isEmail, isJson } from '@/utils/validator-util.js'

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
  } else if (parseValue.length == 0) {
    callback(new Error('数组长度不能为空'))
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
      message: '邮件列表不能为空',
      required: true,
      trigger: 'blur',
    },
    {
      // message: '域名不能为空',
      // required: true,
      validator: validateEmailList,
      trigger: 'blur',
    },
  ],

  type_id: [
    {
      message: '触发事件不能为空',
      required: true,
      trigger: 'blur',
    },
  ],
}

// 引入枚举值
