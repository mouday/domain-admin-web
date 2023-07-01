import { isValidCron } from 'cron-validator'

// 表单验证
export const formRules = {
  // 定时检测
  scheduler_cron: [
    {
      message: '定时检测不能为空',
      required: true,
      trigger: 'blur',
    },
    {
      trigger: 'blur',
      
      validator: (rule, value, callback) => {
        if (!isValidCron(value)) {
          return callback(new Error('cron表达式不正确'))
        } else {
          callback()
        }
      },
    },
  ],
}

// 引入枚举值
