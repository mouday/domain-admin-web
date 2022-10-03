// 表单验证
export const formRules = {
  // 旧密码
  password: [
    {
      message: '旧密码不能为空',
      required: true,
      trigger: 'blur',
    },
  ],

  // 新密码
  new_password: [
    {
      message: '新密码不能为空',
      required: true,
      trigger: 'blur',
    },
  ],
}

// 引入枚举值
