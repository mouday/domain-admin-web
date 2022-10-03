// 表单验证
export const formRules = {
  // 用户名
  username: [
    {
      message: '用户名不能为空',
      required: true,
      trigger: 'blur',
    },
  ],

  password: [
    {
      message: '密码不能为空',
      required: true,
      trigger: 'blur',
    },
  ],

  // 头像
  avatar_url: [
    {
      message: '头像不能为空',
      required: true,
      trigger: 'blur',
    },
  ],

  // 过期前多少天提醒
  before_expire_days: [
    {
      message: '过期前多少天提醒不能为空',
      required: true,
      trigger: 'blur',
    },
  ],

  // 邮件列表
  email_list: [
    {
      message: '邮件列表不能为空',
      required: true,
      trigger: 'blur',
    },
  ],
}

// 引入枚举值
