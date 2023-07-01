// 表单验证
export const formRules = {
  // 服务器地址
  mail_host: [
    {
      message: '服务器地址不能为空',
      required: true,
      trigger: 'blur',
    },
  ],

  // 服务器端口
  mail_port: [
    {
      message: '服务器端口不能为空',
      required: true,
      trigger: 'blur',
    },
  ],

  // 发件人名称
  mail_alias: [
    {
      message: '发件人名称不能为空',
      required: false,
      trigger: 'blur',
    },
  ],

  // 发件人账号
  mail_username: [
    {
      message: '发件人账号不能为空',
      required: false,
      trigger: 'blur',
    },
  ],

  // 发件人密码
  mail_password: [
    {
      message: '发件人密码不能为空',
      required: false,
      trigger: 'blur',
    },
  ],
}

// 引入枚举值
