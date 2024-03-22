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

  app_id: [
    {
      message: '应用key不能为空',
      required: true,
      trigger: 'blur',
    },
  ],

  app_secret: [
    {
      message: '应用密钥不能为空',
      required: true,
      trigger: 'blur',
    },
  ],
}

// 引入枚举值

// 消息接收者id类型
// https://open.feishu.cn/document/server-docs/im-v1/message/create
export const receiveIdTypeOptions = [
  {
    value: 'open_id',
    label: 'open_id',
  },
  {
    value: 'user_id',
    label: 'user_id',
  },
  {
    value: 'union_id',
    label: 'union_id',
  },
  {
    value: 'email',
    label: 'email',
  },
  {
    value: 'chat_id',
    label: 'chat_id',
  },
]
