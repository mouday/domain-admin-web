// 表单验证
export const formRules = {
  // 域名
  host: [
    {
      message: '主机地址不能为空',
      required: true,
      trigger: 'blur',
    },
  ],

  // 验证类型
  user: [
    {
      message: '用户名不能为空',
      required: true,
      trigger: 'blur',
    },
  ],

  // token
  password: [
    {
      message: '密码不能为空',
      required: true,
      trigger: 'blur',
    },
  ],
  private_key: [
    {
      message: '秘钥不能为空',
      required: true,
      trigger: 'blur',
    },
  ],
}

// 引入枚举值

export const HostAuthTypeEnum = {
  PASSWORD: 1,

  PRIVATE_KEY: 2,
}

export const HostAuthTypeOptions = [
  {
    label: '密码',
    value: HostAuthTypeEnum.PASSWORD,
  },
  {
    label: '私钥证书',
    value: HostAuthTypeEnum.PRIVATE_KEY,
  },
]
