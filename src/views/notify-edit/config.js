// 表单验证
export const formRules = {
  // 事件类型
  // event_id: [
  //   {
  //     message: '事件类型不能为空',
  //     required: true,
  //     trigger: 'blur',
  //   },
  // ],

  // 通知方式
  // type_id: [
  //   {
  //     message: '通知方式不能为空',
  //     required: true,
  //     trigger: 'blur',
  //   },
  // ],

  // 状态
  status: [
    {
      message: '状态不能为空',
      required: true,
      trigger: 'blur',
    },
  ],

  // 通知配置
  value: [
    {
      message: '通知配置不能为空',
      required: true,
      trigger: 'blur',
    },
  ],

  expire_days: [
    {
      message: '剩余天数不能为空',
      required: true,
      trigger: 'blur',
    },
  ],
  groups: [
    {
      message: '分组不能为空',
      required: true,
      trigger: 'blur',
    },
  ]
}

// 引入枚举值
